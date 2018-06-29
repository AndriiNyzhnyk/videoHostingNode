const db = require('./database');
const streamVideo = require('./streamVideo');
const security = require('./security');

module.exports = (app, urlencodedParser) => {
    // routes for web page
    app.get('/', (req, res) => {
        res.render('home.hbs', db.optionsMainPage);
    });

    app.get('/pageFilm', (req, res) => {
        res.render('pageFilm.hbs');
    });

    // routes for stream video
    app.get('/video', (req, res) => {
        streamVideo(req, res);
    });

    // routes for admin control panel
    app.get('/signInControlPanel', (req, res) => {
        res.render('signIn.hbs');
    });

    app.get('/admin-control-panel', (req, res) => {
        res.render('adminControlPanel.hbs');
    });

    app.post('/signInAdmin', urlencodedParser, (req, res) => {
        if(!req.body) return res.sendStatus(400);

        let result = security(req.body.login, req.body.password);

        if(result === 'ok') {
            res.status(200).send('/admin-control-panel');
        } else {
            res.status(200).send('badLoginOrPassword');
        }
        console.log(result);
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