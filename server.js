const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const cors = require('cors');
const helmet = require('helmet');

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes.js')(app);



app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});