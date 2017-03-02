const http = require('http');
const pjsonLoader = require('pjson-loader');
const express = require('express');
const bundler = require('./server/bundler.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const opensesameProfile = require('opensesame-profile');

const tingoose = require('tingoose');
const collection = tingoose.collection;
const storesData = require('./data/stores.json');

const app = express();
const server = http.createServer(app);

const itemsRoute = require('./server/routes/items');
const storesRoute = require('./server/routes/stores');
const inventoryRoute = require('./server/routes/inventory');
const addRoute = require('./server/routes/add');
const deleteRoute = require('./server/routes/delete');
const editRoute = require('./server/routes/edit');

// Use cors when in the test environment.
// Run with: NODE_ENV=test npm start.
if (app.get('env') === 'test') {
    console.log('in test env');
    app.use(cors({
        origin: true,
        credentials: true,
        preflightContinue: true
    }));
}


//Check out the documentation and examples here https://github.com/EikosPartners/opensesame-profile
//you can give opensesame-profile an express app object
opensesameProfile({
   secret: 'testSecret',
   middleware: function (req, res, next) {
       // Can do route authorization here.
       next();
   },
   httpsOnly: false
}, app);



// For more info checkout the repo https://github.com/EikosPartners/tingoose
// Load data into tingoose.
tingoose.loadCollections([
    {
        name: 'stores',
        data: storesData,
        defaultPath: './data/stores.json'
    }
]);


app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/items', itemsRoute);
app.use('/stores', storesRoute);
app.use('/inventory', inventoryRoute);
app.use('/add', addRoute);
app.use('/delete', deleteRoute);
app.use('/edit', editRoute);

// pjson setup.
pjsonLoader.load(app, {
    routes: [
        {
            url: '/ui/:type/:page',
            queryParam: false,
            params: ['type', 'page']
        }
    ],
    jsonTransform: (req, res, data) => {
        // If the user isn't an admin, strip out anything they shouldn't see.
        if (req.user.roles.indexOf('admin') === -1) {
            if (data[0].type === 'dashboard') {
                data[1].children[0].children.splice(0, 1);
            }
        }

        return data;
    }
}, (err) => {
    if (err) {
        console.log(err);
    }
});

bundler(app);

/* GET home page. */
app.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: 'public' });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Listening on %j...', server.address());
});

module.exports = app;
