const db = require('./database');
const streamVideo = require('./streamVideo');
const security = require('./security');
const securityKey = require('./security/securityKey');
const dataDbControllers = require('./database/controller/dataDb');


module.exports = (app, urlencodedParser, jsonParser) => {
    // routes for web page
    app.get('/', (req, res) => {
        res.render('home.hbs', db.getOptionsMainPage());
    });

    app.get('/movie/:movie', (req, res) => {
        let movie = req.params['movie'];
        // console.log(movie);

        db.getOptionsMoviePage(movie).then( (options) => {
            // console.log(options);
            res.render('pageFilm.hbs', options);
        })
    });

    app.get('/searchMovie/', (req, res) => {
        res.sendFile(__dirname + '/searchPageReact/index.html');
    });

    app.get('/getMoviesForSearch', (req, res) => {
        res.send(db.getMoviesForSearch());
    });

    app.get('/download/:movie', (req, res) => {
        let movie = '/films/' + req.params['movie'] + '.mp4';
        let allMovies = db.allMovies();

        for(let i = 0; i < allMovies.length; i++) {
            if(movie === allMovies[i].sourseVideo) {
                res.download(__dirname + '/public' + allMovies[i].sourseVideo);
                break;
            }
        }
    });

    // routes for stream video
    app.get('/video/:part1/:part2.:part3', (req, res) => {
        let part1 = req.params['part1'];
        let part2 = req.params['part2'];
        let part3 = req.params['part3'];

        let sourse = `/${part1}/${part2}.${part3}`;
        // console.log(sourse);
        streamVideo(req, res, sourse);
    });

    // routes for admin control panel
    app.get('/signInControlPanel', (req, res) => {
        res.render('signIn.hbs');
    });

    app.get('/admin-control-panel', (req, res) => {
        if(req.signedCookies.signedMonster === securityKey.myCookie) {
            res.render('adminControlPanel.hbs');
        } else {
            res.redirect('/signInControlPanel');
        }
    });

    app.post('/signInAdmin', urlencodedParser, (req, res) => {
        if(!req.body) return res.sendStatus(400);

        let result = security(req.body.login, req.body.password);

        if(result === 'ok') {
            res.cookie('signedMonster', 'welcomeAdmin',
                {signed: true,
                maxAge: 100000,
                httpOnly: true});
            res.status(200).send('/admin-control-panel');
        } else {
            res.status(200).send('badLoginOrPassword');
        }
        // console.log(result);
    });

    // routes for work database
    // getting list data
    app.get("/api/films", dataDbControllers.films);

// get one user by id
    app.get("/api/films/:id", dataDbControllers.getFilmId);

// add a user to the database
    app.post("/api/film", jsonParser, dataDbControllers.postAddFilm);

// remove user by id
    app.delete("/api/film/:id", dataDbControllers.deleteFilm);

// change movie data
    app.put("/api/film", jsonParser, dataDbControllers.putFilm);


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