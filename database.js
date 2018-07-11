const  mongoClient = require('mongodb').MongoClient;
const  url = 'mongodb://localhost:27017/moviesdb';

let options;

async function initRequest() {
    let movies = await getAllMovies();
    // console.log(movies);
    let filterListMovies = await filterMovies(movies);
    // console.log(filterListMovies);
    options = await createOptionsMainPage(filterListMovies);
}

// get all movies for slider in header
function getAllMovies() {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, (err, db) => {
            db.collection("films").find({}).toArray((err, films) => {
                if (err) {
                    console.error(err);
                    db.close();
                    reject(err);
                } else {
                    db.close();
                    resolve(films);
                }
            });
        });
    });
}

// function that filter all movies and return only nameUa and sourseImg movies
function filterMovies(movies) {
    return new Promise((resolve, reject) => {
        let list = [];

        for (let i = 0; i < movies.length; i++) {
            list.push([movies[i].nameUa, movies[i].sourseImg])
        }

        resolve(list);
    });
}

// create options for handlebars "main page"
function createOptionsMainPage(list) {
    return new Promise((resolve, reject) => {
        let options = Object.create(null);
        options.title ='VideoHost.ua';

        for (let i = 0; i < list.length; i++) {
            options['filmName' + (i + 1)] = list[i][0];
            options['filmSrcImg' + (i + 1)] = list[i][1];
        }

        resolve(options)
    });
}

// init call
initRequest();

// update options for main page every 30 minutes
setInterval(initRequest, 1800000);

module.exports.optionsMainPage = () => {
    return options;
};