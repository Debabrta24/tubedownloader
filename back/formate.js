const youtubedl = require('youtube-dl-exec');
//main code
async function getInfo(url) {
    const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true
    });

    console.log('Title:', info.title);
    console.log('Duration:', info.duration / 60);
    console.log('Formats:', info.formats);
    console.log("thumbnail", info.thumbnail)
    // console.log('Manual subtitles:', Object.keys(info.subtitles || {}));
    // console.log('Auto-generated captions:', Object.keys(info.automatic_captions || {}));

}

//
//  getInfo('https://youtu.be/QnmCeP4x6L8?si=0qsaseUmwqUSG5CN');

// getInfo('https://www.instagram.com/reel/DU-HxxHkhf-/?igsh=ODFqcTN6ZWJocmpj');

getInfo('https://www.facebook.com/share/v/1ES8rLmMPd/');