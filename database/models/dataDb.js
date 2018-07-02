let  mongoClient = require('mongodb').MongoClient;
let  objectId = require('mongodb').ObjectID;
let  url = 'mongodb://localhost:27017/moviesdb';
let func = require('../../functions');

exports.films = (cb) => {
    mongoClient.connect(url, (err, db) => {
        db.collection("films").find({}).toArray((err, films) => {
            cb(err, films, db);
        });
    });
};

exports.getFilmId = (req, cb) => {
    let id = new objectId(req.params.id);
    mongoClient.connect(url, (err, db) => {
        db.collection("films").findOne({_id: id}, (err, film) => {
            cb(err, film, db);
        });
    });
};

exports.postAddFilm = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    // let userName = req.body.name;
    // let surname = req.body.surname;
    // let userAge = req.body.age;
    // let user = {name: userName, surname: surname, age: userAge};
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

    mongoClient.connect(url, (err, db) => {
        db.collection("films").insertOne(film, (err, result) => {
            cb(err, result, db, film);
        });
    });
};

exports.deleteFilm = (req, cb) => {
    let id = new objectId(req.params.id);

    mongoClient.connect(url, (err, db) => {
        db.collection("films").findOneAndDelete({_id: id}, (err, result) => {
            cb(err, result, db);
        });
    });
};

exports.putFilm = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    let id = new objectId(req.body.id);
    // let userName = req.body.name;
    // let surname = req.body.surname;
    // let userAge = req.body.age;


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

    mongoClient.connect(url, (err, db) => {
        db.collection("films").findOneAndUpdate({_id: id},
            {$set: film},
            {returnOriginal: false}, (err, result) => {
                cb(err, result, db);
            });
    });
};