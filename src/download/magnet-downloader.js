const magnet = `magnet:?xt=urn:btih:e180c3014fbf70f1cc1ebad55c9f9e4e6c43895d&dn=Into+The+Badlands+S02E07720p+WEB+x264-%5BMULVAcoded%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969`;

const { spawn } = require('child_process');
const torrentDownloadApp = 'C:\\Program Files\\tixati\\tixati.exe';
const path = require('path');
class MagnetLinkDownloader {
    static run() {
        const bat = spawn('cmd.exe', ['/c', torrentDownloadApp, magnet]);

        bat.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        bat.stderr.on('data', (data) => {
            console.log(data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    }
}

export default new MagnetLinkDownloader();