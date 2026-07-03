const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
    "https://images.unsplash.com/photo-1541461975765-a6e5a408ff39?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532906430983-0506ebc37258?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502570020610-8b17ee7b1988?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629202575218-c2b3e8e2eb3e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510006240033-d8db1cb4b3f8?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584347710389-9e0c52bb1339?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564564293-1eb9fcb30d31?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611802315798-da71f2ff2b08?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517409477028-c11df5b30691?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600862088894-3a78bf5553e4?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576435010696-27db2d711bc1?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554988771-4dcbdc7bb2aa?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475730335043-34e8721c56ab?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603507111818-ee62075a329e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572502693891-b3b381a1fa99?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583091005230-f655baad8e61?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598285573435-0814a60c042d?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564639735-86641249b6ce?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548684277-2244f77c3882?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626083547468-b751240c313f?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605336681026-6218d6e3c04d?q=80&w=2000&auto=format&fit=crop"
];

const dir = path.join(__dirname, 'public', 'circuits');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }
            const file = fs.createWriteStream(filepath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function run() {
    for (let i = 0; i < urls.length; i++) {
        const filepath = path.join(dir, `track-${i + 1}.jpg`);
        console.log(`Downloading ${filepath}...`);
        try {
            await downloadImage(urls[i], filepath);
            console.log(`Successfully downloaded ${filepath}`);
        } catch (e) {
            console.error(e);
        }
    }
}

run();
