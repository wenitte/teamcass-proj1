var express = require('express');
var router = express.Router();
const { exec } = require("child_process");

router.post('/', function (req, res, next) {

    let recordings = req.body.recordings;
    let paths = [];
    for (let i = 0; i < recordings.length; i++) {
        let rec = recordings[i];
        paths.push(`public/recordings/${rec.songID}/${rec.partID}/${rec.uid}-${rec.songID}-${rec.partID}.mp3`);
    }
    console.log(paths);
    // Send a request to /mix/{the song title from the record song page}
    // Change directories into the uploaded song files folder
    // Use the Sound Exchange library to mix all 4 parts into one part
    for (let i = 0; i < paths.length; i++) {
        let mvCmd = exec(`cp ${paths[i]} public/recordings/tmp`
            , (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        mvCmd.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code);
        });
    }


    let title = req.body.recordings[0].songID;
    let currentTime = Date.now();
    let mixedFile = `${title}-${currentTime}-mixed.mp3`;
    const mixCmd = exec(`
    set - e &&
    cd public/recordings/tmp/ &&
    sox -m *.mp3 ${title}-${currentTime}-mixed.mp3 &&
    mv  ${mixedFile} ../mixed/ &&
    rm * &&
    echo ${ title} - mixed.mp3 has been created.
    `, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    mixCmd.on('exit', function (code) {
        console.log('Child process exited with exit code ' + code);
    });
    res.json({ "url": `/recordings/mixed/${mixedFile}` });
});

module.exports = router;

// api/public/midi /midi-files