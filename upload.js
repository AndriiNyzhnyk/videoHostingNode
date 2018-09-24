module.exports = (req, res) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let partNameArr = req.files.sampleFile.name.split('.');
    let oldName = partNameArr[0];
    let newName = req.body.nameFile;
    let extension = partNameArr[partNameArr.length - 1];
    let endName;
    let pathToDir = `${__dirname}/public/`;

    if(req.body.content === 'movie') {
        pathToDir = `${__dirname}/public/films`;
    } else {
        pathToDir = `${__dirname}/public/img`;
    }

    if(newName === '') {
        endName = oldName;
    } else {
        endName = newName;
    }

    let destination = `${pathToDir}/${endName}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(destination, (err) => {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });

};