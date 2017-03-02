const router = require('express').Router();

router.get('/:id', (req, res) => {
    let inventory = [
        {
            id: "1",
            items: [
                {
                    id: 1123,
                    name: "Water Bottle (32 oz)",
                    quantity: 4,
                    category: "Home",
                    unitPrice: "$23"
                },
                {
                    id: 163,
                    name: "CSS Mug",
                    quantity: 1,
                    category: "Home",
                    unitPrice: "$6"
                },
                {
                    id: 981,
                    name: "Macbook Pro 15\"",
                    quantity: 10,
                    category: "Technology",
                    unitPrice: "$1800"
                }
            ]
        }
    ];

    let id = req.params.id,
        storeInventory = {};

    inventory.some( (store) => {
        if (store.id === id) {
            storeInventory = store.items;
            return true;
        }
    });

    res.send(storeInventory);
});

module.exports = router;