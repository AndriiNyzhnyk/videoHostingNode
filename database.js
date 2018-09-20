const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'moviesdb';
const mainCollection = 'films';
const dbOptions = {useNewUrlParser: true};

let allMovies;
let filterListMovies;
let optionsMainPage;

async function initRequest() {
    try {
        allMovies = await getAllMovies();
        // console.log(allMovies);
        filterListMovies = await filterMovies(allMovies);
        // console.log(filterListMovies);
        optionsMainPage = await createOptionsMainPage(filterListMovies);
        // console.log(options);
    } catch (err) {
        console.error(err);
    }
}

// get all movies for slider in header
function getAllMovies() {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, dbOptions, (err, client) => {
            client.db(dbName).collection(mainCollection).find({}).toArray( (err, films) => {
                if (err) {
                    console.error(err);
                    client.close();
                    reject(err);
                } else {
                    client.close();
                    resolve(films);
                }
            });
        });
    });
}

// function that filter all movies and return only nameUa, nameEn and sourseImg movies
function filterMovies(movies) {
    return new Promise((resolve, reject) => {
        let list = [];

        for (let i = 0; i < movies.length; i++) {
            list.push([movies[i].nameUa, movies[i].nameEn, movies[i].sourseImg])
        }

        resolve(list);
    });
}

// create options for handlebars "main page"
function createOptionsMainPage(list) {
    return new Promise((resolve, reject) => {
        let options = Object.create(null);
        options.title = 'VideoHost.ua';

        for (let i = 0; i < list.length; i++) {
            options['filmName' + (i + 1)] = list[i][0];
            options['filmNameEn' + (i + 1)] = list[i][1];
            options['filmSrcImg' + (i + 1)] = list[i][2];
        }

        resolve(options)
    });
}

// create options for movie page
async function createOptionsForMoviePage (movie) {
    try {
        let indexMovie = await searchIndex(movie);
        return await getDataMovie(indexMovie);
    } catch (err) {
        console.error(err);
    }
}

function searchIndex(movie) {
    return new Promise((resolve, reject) => {
        let startString = '/img/slider/';
        let endString = '.jpg';
        let src = `${startString}${movie}${endString}`;
        // console.log(src);

        for(let i = 0; i < allMovies.length; i++) {
            if(allMovies[i].sourseImg === src) {
                resolve(i);
                break;
            }
        }

        reject('No matches were found');

    });
}

function getDataMovie(index) {
    return new Promise((resolve, reject) => {
        resolve(allMovies[index]);
    });
}

// init call
initRequest();

// update data every 30 minutes
setInterval(initRequest, 1800000);

module.exports.getOptionsMainPage = () => {
    return optionsMainPage;
};

module.exports.getOptionsMoviePage = createOptionsForMoviePage;

module.exports.allMovies = () => {
    return allMovies;
};

module.exports.getMoviesForSearch = () => {
    return filterListMovies;
};