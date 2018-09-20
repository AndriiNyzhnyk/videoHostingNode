const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const func = require('../../functions');
const url = 'mongodb://localhost:27017/';
const dbName = 'moviesdb';
const mainCollection = 'films';
const dbOptions = {useNewUrlParser: true};

exports.films = (cb) => {
    mongoClient.connect(url, dbOptions, (err, client) => {
        client.db(dbName).collection(mainCollection).find({}).toArray( (err, films) => {
            cb(err, films, client);
        });
    });
};

exports.getFilmId = (req, cb) => {
    let id = new objectId(req.params.id);
    mongoClient.connect(url, dbOptions, (err, client) => {
        client.db(dbName).collection(mainCollection).findOne({_id: id}, (err, film) => {
            cb(err, film, client);
        });
    });
};

exports.postAddFilm = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    let film = {
        nameUa: req.body.nameUa,
        nameEn: req.body.nameEn,
        sourseImg: req.body.sourseImg,
        sourseVideo: req.body.sourseVideo,
        qualityVideo: req.body.qualityVideo,
        translation: req.body.translation,
        motto: req.body.motto,
        year: req.body.year,
        country: req.body.country,
        genre: req.body.genre,
        category: req.body.category,
        producer: req.body.producer,
        duration: req.body.duration,
        age: req.body.age,
        firstRun: req.body.firstRun
    };

    mongoClient.connect(url, dbOptions, (err, client) => {
        client.db(dbName).collection(mainCollection).insertOne(film, (err, result) => {
            cb(err, result, client, film);
        });
    });
};

exports.deleteFilm = (req, cb) => {
    let id = new objectId(req.params.id);

    mongoClient.connect(url, dbOptions, (err, client) => {
        client.db(dbName).collection(mainCollection).findOneAndDelete({_id: id}, (err, result) => {
            cb(err, result, client);
        });
    });
};

exports.putFilm = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    let id = new objectId(req.body.id);

    let film = {
        nameUa: req.body.nameUa,
        nameEn: req.body.nameEn,
        sourseImg: req.body.sourseImg,
        sourseVideo: req.body.sourseVideo,
        qualityVideo: req.body.qualityVideo,
        translation: req.body.translation,
        motto: req.body.motto,
        year: req.body.year,
        country: req.body.country,
        genre: req.body.genre,
        category: req.body.category,
        producer: req.body.producer,
        duration: req.body.duration,
        age: req.body.age,
        firstRun: req.body.firstRun
    };

    mongoClient.connect(url, dbOptions, (err, client) => {
        client.db(dbName).collection(mainCollection).findOneAndUpdate(
                {_id: id}, {$set: film}, {returnOriginal: false}, (err, result) => {
                    cb(err, result, client);
                });
    });
};