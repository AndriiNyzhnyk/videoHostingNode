const db = require('./database');
const streamVideo = require('./streamVideo');
const security = require('./security');
const dataDbControllers = require('./database/controller/dataDb');
const sendEmail = require('./sendEmail');
const upload = require('./upload');
const func = require('./functions');


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
        if(func.checkCookie(req)) {
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
                {
                    signed: true,
                    path: '/',
                    httpOnly: true
                });

            res.status(200).send('/admin-control-panel');
        } else {
            res.status(200).send('badLoginOrPassword');
        }

    });

    app.post('/upload', (req, res) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        } else  {
            upload(req, res);
        }
    });

    app.post('/feedback', urlencodedParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);

        sendEmail(req.body)
            .then( (value) => {
                if(value === 'ok') {
                    res.status(200).send('Дякуємо за ваш відгук !');
                } else {
                    res.status(400).send(value);
                }
            })

    });

    // routes for work database
    // getting list data
    app.get("/api/films", (req, res) => {
        if(func.checkCookie(req)) {
            dataDbControllers.films(req, res);
        } else {
            res.status(401).send('Unauthorized');
        }
    });

// get one user by id
    app.get("/api/films/:id", (req, res) => {
        if(func.checkCookie(req)) {
            dataDbControllers.getFilmId(req, res);
        } else {
            res.status(401).send('Unauthorized');
        }
    });

// add a user to the database
    app.post("/api/film", jsonParser, (req, res) => {
        if(func.checkCookie(req)) {
            dataDbControllers.postAddFilm(req, res);
        } else {
            res.status(401).send('Unauthorized');
        }
    });

// remove user by id
    app.delete("/api/film/:id", (req, res) => {
        if(func.checkCookie(req)) {
            dataDbControllers.deleteFilm(req, res);
        } else {
            res.status(401).send('Unauthorized');
        }
    });

// change movie data
    app.put("/api/film", jsonParser, (req, res) => {
        if(func.checkCookie(req)) {
            dataDbControllers.putFilm(req, res);
        } else {
            res.status(401).send('Unauthorized');
        }
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