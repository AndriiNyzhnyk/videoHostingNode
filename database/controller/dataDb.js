const DataDb = require('../models/dataDb');

exports.films = (req, res) => {
    DataDb.films((err, films, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(films);
        db.close();
    });
};

exports.getFilmId = (req, res) => {
    DataDb.getFilmId(req, (err, film, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(film);
        db.close();
    });
};

exports.postAddFilm = (req, res) => {
    DataDb.postAddFilm(req, (err, result, db, film) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(film);
        db.close();
    })
};

exports.deleteFilm = (req, res) => {
    DataDb.deleteFilm(req, (err, result, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(result.value);
        db.close();
    });
};

exports.putFilm = (req, res) => {
    DataDb.putFilm(req, (err, result, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send( result.value);
        db.close();
    })
};