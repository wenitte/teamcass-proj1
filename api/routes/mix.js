var express = require('express');
var router = express.Router();
const { exec } = require("child_process");

router.get('/:title', function (req, res, next) {

    // Send a request to /mix/{the song title from the record song page}
    // Change directories into the uploaded song files folder
    // Use the Sound Exchange library to mix all 4 parts into one part

    let title = req.params.title;
    const mixCmd = exec(`
    set -e &&
    cd public/audio/${title}/ && 
    sox -m *.mp3 ${title}-mixed.mp3 &&
    echo ${title}-mixed.mp3 has been created.
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
    res.json({ message: `Created new audio file - ${title}-mixed.mp3` });
});

module.exports = router;

// 