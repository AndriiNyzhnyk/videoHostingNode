const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home.hbs');
});

// app.get("/contact", (req, res) => {
//
//     res.render("home.hbs");
// });

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


app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});