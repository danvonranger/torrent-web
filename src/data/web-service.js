class WebService {
    async retrieveSeriesAsync() {
        const res = await fetch('/api/series/');
        return await res.json();
    }

    async retrieveSeasonData(id) {
        const res = await fetch(`/api/seasons/${id}`);
        return await res.json();
    }

    async markComplete(torrent){
        const body = {
            id: torrent.id,
            season: torrent.season,
            episode: torrent.episode,
        };
        const res = await fetch('/api/update', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        return res.status === 200;
    }

    async triggerDownload(torrent){
        const magnetEncoded = Buffer.from(String(torrent.magnet)).toString('base64');
        const body = {
            magnet: magnetEncoded,
            season: torrent.season,
            episode: torrent.episode,
        };
        const res = await fetch('/api/download', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        return res.status === 200;
    }

    scrapeHtmlPageFor(proxyurl, url, name) {
        const responseData = {
            name: name,
            success: false,
            data: ""
        };

        var xhr = this.createCORSRequest('GET', proxyurl + url);
        if (!xhr) {
            throw new Error('CORS not supported');
        }

        xhr.onload = function () {
            var text = xhr.responseText;
            responseData.data = text;
            responseData.success = true;
        };

        xhr.onerror = function (e) {
            console.log('Woops, there was an error making the request.');
        };

        xhr.send();
        return responseData
    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, false);

        } else if (typeof XDomainRequest !== "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }
}

export default new WebService();