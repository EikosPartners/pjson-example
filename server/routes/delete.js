const router = require('express').Router();
const db = require('../utilities/db');

/**
 * @route('/delete/store')
 * @method("DELETE")
 * @roles("admin")
 *
 * Handles deleting a store.
 *
 * body: {
 *          id: The id of the store
 *       }
 */
router.delete('/store', (req, res) => {
    // Admin only.
    if (req.user.roles.indexOf('admin') === -1) {
        res.status(403).send({
            error: "You are not authorized to delete a store."
        });
        return;
    }

    let id = parseInt(req.body.id);

    db.remove('stores', id)
        .then( (result) => {
            res.send(result);
        })
        .catch( (err) => {
            res.status(404).send(err);
        });
});

module.exports = router;