const router = require('express').Router();
const db = require('../utilities/db');

/**
 * @route("/add/store")
 * @method("POST")
 * @roles("admin")
 *
 * Handles adding a new store.
 *
 * body: {
 *          name: String - name of the store
 *          location: String - location of the store,
 *          phone: String - phone number of the store
 *          manager: String - manager of the store
 *       }
 *
 * @return Returns the newly created store object and its ID.
 */
router.post('/store', (req, res) => {
    // Admin only
    if (req.user.roles.indexOf('admin') === -1) {
        res.status(403).send({
            error: "You are not authorized to add a store."
        });

        return;
    }

    let newStore = {
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        manager: req.body.manager
    };

    db.add('stores', newStore)
        .then( (store) => {
            res.send(store);
        })
        .catch( (error) => {
            res.send(error);
        });
});

module.exports = router;