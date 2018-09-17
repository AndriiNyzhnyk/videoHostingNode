const DataDb = require('../models/dataDb');

exports.films = (req, res) => {
    DataDb.films((err, films, client) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(films);
        client.close();
    });
};

exports.getFilmId = (req, res) => {
    DataDb.getFilmId(req, (err, film, client) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(film);
        client.close();
    });
};

exports.postAddFilm = (req, res) => {
    DataDb.postAddFilm(req, (err, result, client, film) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(film);
        client.close();
    })
};

exports.deleteFilm = (req, res) => {
    DataDb.deleteFilm(req, (err, result, client) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(result.value);
        client.close();
    });
};

exports.putFilm = (req, res) => {
    DataDb.putFilm(req, (err, result, client) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send( result.value);
        client.close();
    })
};