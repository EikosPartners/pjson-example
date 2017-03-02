const router = require('express').Router();
const db = require('../utilities/db');
const collection = require('tingoose').collection;

router.get('/', (req, res) => {
    db.find('stores')
        .then( (data) => {
            res.send(data);
        });
});

router.get('/:id', (req, res) => {
    db.findById('stores', req.params.id)
        .then( (data) => {
            res.send(data);
        })
        .catch( (err) => {
            res.send(err);
        });
});

module.exports = router;