const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const fonts = {
    'Inter-Regular.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.ttf',
    'Inter-SemiBold.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-SemiBold.ttf',
    'Inter-Bold.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.ttf',
};

for (const [filename, url] of Object.entries(fonts)) {
    const dest = path.join(dir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            https.get(response.headers.location, (res) => {
                res.pipe(file);
            });
        } else {
            response.pipe(file);
        }
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}: ${err.message}`);
        fs.unlink(dest, () => {});
    });
}
