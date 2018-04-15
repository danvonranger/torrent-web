import TorrentData from '../util/torrent-data';
import WebService from '../data/web-service';
const cheerio = require('cheerio');
const config = require('../config/config');

class DownloadManager {
    async getTorrentInformation(series) {
        const currentSeasonData = await WebService.retrieveSeasonData(series.id);

        const urlData = DownloadManager.generateTargetUrls(series);
        let torrentInformation = [];
        for (let url of urlData.urls) {
            console.log('URL: ', url);
            let rawHtmlData;
            try {
                rawHtmlData = await WebService.scrapeHtmlPageFor(urlData.proxyUrl, url, series.name);
            } catch (err) {
                console.log('Skipping: Failed to get data for', url);
                continue;
            }
            const $ = cheerio.load(rawHtmlData.data);
            const searchResults = $('#searchResult td');

            $(searchResults).each(function (i, elem) {
                if ($(elem).attr('class') === undefined && $(elem).attr('align') === undefined) {
                    const candidateTitle = $(this).find("div > a").text();
                    const magnet = $(this).parent().find("td > a").attr("href");
                    const sizeData = $(this).parent().find("td > font").text();
                    const torrentData = TorrentData.torrentInformation(series, candidateTitle, magnet, sizeData);

                    console.log('==> Candidate:', torrentData.print);
                    if (torrentData.isCandidate && torrentData.sizeInMegaBytes <= config.downloadSizes.max) {
                        let downloadedBefore = DownloadManager.downloadedBefore(torrentData, currentSeasonData);
                        if (!downloadedBefore) {
                            const canAdd = DownloadManager.canAdd(torrentInformation, torrentData);
                            if (canAdd) {
                                torrentInformation.push(torrentData);
                            }
                        }
                    }
                }
            });
        }

        return torrentInformation;
    }

    static generateTargetUrls(series) {
        let output = {
            proxyUrl: config.torrentData.proxyServerUrl,
            urls: [],
        };

        let url = '';
        const encodedName = encodeURIComponent(series.name);
        for (let user of config.torrentData.userNames) {
            url = `${config.torrentData.urlPrefix}${encodedName}+${user}${config.torrentData.urlSuffix}`;
            output.urls.push(url);
        }
        // without user
        url = `${config.torrentData.urlPrefix}${encodedName}${config.torrentData.urlSuffix}`;
        output.urls.push(url);

        return output;
    }

    static canAdd(torrentInformation, torrentData) {
        let isInArray = false;
        // see if this one is bigger in size than one in array
        for (let t of torrentInformation) {
            if (t.season === torrentData.season && t.episode === torrentData.episode) {
                isInArray = true;
                if (t.sizeInMegaBytes >= config.downloadSizes.ideal) {
                    break;
                }
                if (t.sizeInMegaBytes < torrentData.sizeInMegaBytes) {
                    t.magnet = torrentData.magnet;
                    t.sizeInMegaBytes = torrentData.sizeInMegaBytes;
                    break;
                }
            }
        }
        return !isInArray;
    }

    static downloadedBefore(torrentData, currentSeasonData) {
        let hasBeen = false;
        for (let cs of currentSeasonData) {
            if (parseInt(cs.season) === torrentData.season) {
                if (cs.episode === '*' || parseInt(cs.episode) === torrentData.episode) {
                    hasBeen = true;
                    break;
                }
            }
        }

        return hasBeen;
    }
}

export default new DownloadManager();