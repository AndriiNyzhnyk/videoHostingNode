const db = require('./database');
const streamVideo = require('./streamVideo');

module.exports = (app, urlencodedParser) => {
    app.get('/', (req, res) => {
        res.render('home.hbs', db.optionsMainPage);
    });

    app.get('/signInControlPanel', (req, res) => {
        res.render('signIn.hbs');
    });

    app.get('/testVideoStream', (req, res) => {
        res.render('testVideoStream');
    });

    app.get('/video', (req, res) => {
        streamVideo(req, res);
    });

    app.post('/signInAdmin', urlencodedParser, (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        } else {
            // res.sendStatus(200);
            res.status(200).send("ok")
        }
        console.log(req.body);
    });

    // Обробник 404 помилки
    app.use((req, res, next) => {
        res.status(404);
        res.render('404.hbs')
    });

    // Обробник 500 помилки
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        res.render('500.hbs');
    });
};