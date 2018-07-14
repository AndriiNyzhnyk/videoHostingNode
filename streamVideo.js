const fs = require('fs');
const path = require('path');

async function startStream(req, res, sourse) {
    try {
        await stream(req, res, sourse);

    } catch (err) {
        console.error(err);
    }
}

function stream(req, res, sourse) {
    return new Promise( (resolve, reject) => {
        // console.log(sourse);
        const pathVideo = path.join(__dirname, `public${sourse}`);
        const stat = fs.statSync(pathVideo);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(pathVideo, {start, end});
            const head = {
                'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(pathVideo).pipe(res)
        }

        resolve('ok');
    });
}

module.exports = startStream;