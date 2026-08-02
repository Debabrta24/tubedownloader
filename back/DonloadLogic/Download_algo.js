const youtubedl = require('youtube-dl-exec');

function getFormattedType(f) {
    const hasVideo = f.vcodec && f.vcodec !== 'none';
    const hasAudio = f.acodec && f.acodec !== 'none';
    if (hasVideo && hasAudio) return 'both';
    if (hasVideo && !hasAudio) return 'video';
    if (!hasVideo && hasAudio) return 'audio';
    return 'unknown';
}

function getSizeMB(f) {
    const bytes = f.filesize || f.filesize_approx;
    if (!bytes) return 'unknown';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function summarizeFormats(formats) {
    return formats.map(f => ({
        url: f.url,
        downloader_options: f.downloader_options,
        type: getFormattedType(f),
        // http_headers: f.http_headers,
        resolution: f.resolution || (f.width && f.height ? `${f.width}x${f.height}` : 'audio-only'),
        video_size: getSizeMB(f)
    }));
}


async function getInfo(url) {
    const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
        cookies: './cookies.txt',
        format: 'best/bestvideo+bestaudio'
    });


    const cleanFormats = summarizeFormats(info.formats);
    // console.log('Title:', info.title);
    // console.log('Duration:', info.duration / 60);
    // console.log('Formats:', cleanFormats);
    // console.log("thumbnail", info.thumbnail)

    return {
        title: info.title,
        duration: info.duration / 60,
        formats: cleanFormats,
        thumbnail: info.thumbnail
    };
}

module.exports = getInfo;

// getInfo('https://www.facebook.com/share/v/1ES8rLmMPd/');
