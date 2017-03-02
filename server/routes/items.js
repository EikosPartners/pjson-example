const router = require('express').Router();

router.get('/', (req, res) => {
    let itemJSON = [
        {
            name: "Water Bottle (32 oz)",
            quantity: 4,
            category: "Home",
            unitPrice: "$23"
        }
    ];

    res.send(itemJSON);
});

module.exports = router;
