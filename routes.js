const db = require('./database');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('home.hbs', db.optionsMainPage);
    });

    app.get('/testSignIn', (req, res) => {
        res.render('signIn.hbs');
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