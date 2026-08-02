const youtubedl = require('youtube-dl-exec');

async function getInfo(url) {
    const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true
    });

    console.log('='.repeat(60));
    console.log('Title:', info.title);
    console.log('Duration:', (info.duration / 60).toFixed(2), 'min');
    console.log('Uploader:', info.uploader);
    console.log('View count:', info.view_count);
    console.log('='.repeat(60));

    // ---------- THUMBNAILS ----------
    console.log('\n📷 THUMBNAILS');
    if (info.thumbnails && info.thumbnails.length) {
        info.thumbnails.forEach(t => {
            console.log(`  ${t.width || '?'}x${t.height || '?'}  ->  ${t.url}`);
        });
        console.log('  Best:', info.thumbnail);
    } else {
        console.log('  None found');
    }

    // ---------- VIDEO QUALITIES ----------
    console.log('\n🎞️  VIDEO FORMATS (video-only or combined)');
    const videoFormats = info.formats.filter(f => f.vcodec !== 'none');
    videoFormats
        .sort((a, b) => (b.height || 0) - (a.height || 0))
        .forEach(f => {
            const type = f.acodec !== 'none' ? 'video+audio' : 'video-only';
            console.log(
                `  [${f.format_id}] ${f.ext.padEnd(5)} ${String(f.height || '?').padStart(4)}p ` +
                `${(f.fps || '?')}fps  ${f.vcodec.padEnd(10)} (${type})  ~${f.filesize_approx ? (f.filesize_approx / 1024 / 1024).toFixed(1) + 'MB' : 'size?'}`
            );
        });

    // ---------- AUDIO TRACKS / LANGUAGES ----------
    console.log('\n🔊 AUDIO TRACKS (by language)');
    const audioFormats = info.formats.filter(f => f.acodec !== 'none' && f.vcodec === 'none');
    if (audioFormats.length) {
        audioFormats
            .sort((a, b) => (b.abr || 0) - (a.abr || 0))
            .forEach(f => {
                console.log(
                    `  [${f.format_id}] lang=${(f.language || 'unknown').padEnd(6)} ` +
                    `${f.ext.padEnd(5)} ${f.acodec.padEnd(8)} ${f.abr || '?'}kbps ` +
                    `${f.format_note ? '(' + f.format_note + ')' : ''}`
                );
            });
    } else {
        console.log('  No audio-only tracks found (may only have combined formats)');
    }

    // ---------- SUBTITLES ----------
    console.log('\n📝 MANUAL SUBTITLES');
    const subs = info.subtitles || {};
    if (Object.keys(subs).length) {
        Object.entries(subs).forEach(([lang, tracks]) => {
            const formats = tracks.map(t => t.ext).join(', ');
            console.log(`  ${lang}: ${formats}`);
        });
    } else {
        console.log('  None found');
    }

    // ---------- AUTO CAPTIONS ----------
    console.log('\n🤖 AUTO-GENERATED CAPTIONS');
    const autoCaps = info.automatic_captions || {};
    if (Object.keys(autoCaps).length) {
        Object.entries(autoCaps).forEach(([lang, tracks]) => {
            const formats = tracks.map(t => t.ext).join(', ');
            console.log(`  ${lang}: ${formats}`);
        });
    } else {
        console.log('  None found');
    }

    console.log('\n' + '='.repeat(60));

    // Return structured data too, in case you want to use it programmatically
    return {
        title: info.title,
        duration: info.duration,
        thumbnails: info.thumbnails,
        bestThumbnail: info.thumbnail,
        videoFormats,
        audioFormats,
        subtitles: subs,
        automaticCaptions: autoCaps
    };
}

const data = getInfo('https://youtu.be/QnmCeP4x6L8?si=0qsaseUmwqUSG5CN')
    .then((result) => {
        console.log("===========================================================");
        console.log(result);   // log the resolved value
        return result;         // optionally pass it along
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });