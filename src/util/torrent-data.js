const ptt = require("parse-torrent-title");

class TorrentData {
    cleanTitle(data) {
        let output = '';
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i).match(/^[0-9a-zA-Z\s]+$/)) {
                output += data.charAt(i);
                continue;
            }
            break;
        }
        output = output.trim();
        return output;
    }

    extractSizeIn(data) {
        const a = data.split(' ');
        return a[a.length - 1];
    }

    extractSizeData(data) {
        let res = data.substr(data.indexOf(' ') + 1);
        let output = '';
        for (var i = 0; i < res.length; i++) {
            if (res.charAt(i).match(/^[0-9\.]+$/)) {
                output += res.charAt(i);
                continue;
            }
            break;
        }
        output = output.trim();
        return output;
    }

    calcSize(data) {
        let sizeData = data.substring(data.indexOf('Size'), data.length);
        sizeData = sizeData.substring(0, sizeData.indexOf(','));
        sizeData = sizeData.trim();

        let size = this.extractSizeData(sizeData);
        let decimalPart = 0;
        if (size.indexOf('.') > -1) {
            decimalPart = size.substr(size.indexOf('.') + 1);
            size = size.substr(0, size.indexOf('.'));
        }
        size = parseInt(size);
        const sizeIn = this.extractSizeIn(sizeData);

        if (decimalPart > 0 && sizeIn.startsWith('G')) {
            size = size * 1000;
            let multiplyBy = 1;
            if (decimalPart.length === 1) {
                multiplyBy = 100;
            }
            if (decimalPart.length === 2) {
                multiplyBy = 10;
            }
            size = size + (decimalPart * multiplyBy);
        }
        if (decimalPart > 0) {
            size++;
        }

        return size;
    }

    torrentInformation(series, torrentTitle, magnet, sizeData) {
        const information = ptt.parse(torrentTitle);
        const output = {
            title: this.cleanTitle(information.title),
            season: information.season,
            episode: information.episode,
            magnet: magnet,
            sizeInMegaBytes: this.calcSize(sizeData),
            orgTitle: torrentTitle,
            id: series.id
        }
        let match = (String(output.title).toUpperCase().startsWith(String(series.name).toUpperCase()));
        if(!output.season || !output.episode){
            match = false;
        }
        output.isCandidate = match;
        output.print = `Title: ${output.title} S${output.season} E${output.episode} Size: ${output.sizeInMegaBytes}`
        return output;
    }
}

module.exports = new TorrentData();