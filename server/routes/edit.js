const router = require('express').Router();
const db = require('../utilities/db');

/**
 * @route("/edit/store/:id")
 * @method("PUT")
 * @roles("admin")
 *
 * Handles editing a store.
 *
 */
router.put('/store', (req, res) => {
    // Admin only.
    if (req.user.roles.indexOf('admin') === -1) {
        res.status(403).send({
            error: "You are not authorized to edit a store."
        });
        return;
    }

    let id = req.body._id;

    let store = {
        name: req.body.name,
        location: req.body.location,
        manager: req.body.manager,
        phone: req.body.phone
    };

    db.update('stores', id, store)
        .then( (result) => {
            res.send(result);
        })
        .catch( (err) => {
            console.log("error: ", err);
            res.status(404).send(err);
        });
});

module.exports = router;
