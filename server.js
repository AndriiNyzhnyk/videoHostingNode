const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const security = require('./security/securityKey');

const urlencodedParser = bodyParser.urlencoded({extended: true});

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser(security.cookieSecret));
app.use(fileUpload());

require('./routes.js')(app, urlencodedParser, jsonParser);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});