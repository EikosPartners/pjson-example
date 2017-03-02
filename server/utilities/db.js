const collection = require('tingoose').collection;

function find(collName) {
    return new Promise( (resolve, reject) => {
        collection[collName]
            .find()
            .toArray()
            .then( (results) => {
                resolve(results);
            })
            .catch( (err) => {
                reject(err);
            });
    });
}

function findById(collName, id) {
    return new Promise( (resolve, reject) => {
        collection[collName]
            .find({ _id: id })
            .toArray()
            .then( (result) => {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject({
                        error: "There does not exist a value by that id"
                    });
                }
            })
            .catch( (err) => {
                reject({
                    error: err
                });
            });
    });
}

function add(collName, data) {
    return new Promise( (resolve, reject) => {
        collection[collName]
            .insert(data, {}, (err, res) => {
                if (err) {
                    reject({
                        error: err
                    });
                } else {
                    resolve(res);
                }
            });
    });
}

function remove(collName, id) {
    return new Promise( (resolve, reject) => {
        collection[collName]
            .remove({
                _id: id
            })
            .then( (res) => {
                console.log(res);
                if (res > 0) {
                    resolve({
                        msg: "success"
                    });
                } else {
                    reject({
                        error: "There was no element to delete with the provided id."
                    });
                }
            })
            .catch( (err) => {
                reject({
                    error: err
                });
            });
    });
}

function update(collName, id, data) {
    return new Promise( (resolve, reject) => {
        collection[collName]
            .update(
                {
                    _id: id
                },
                {
                    $set: data
                }
            )
            .then( (result) => {
                if (result > 0) {
                    resolve({
                        msg: "Success"
                    });
                } else {
                    reject({
                        error: "There was no element to update with the provided id."
                    });
                }
            })
            .catch( (err) => {
                reject({
                    error: err
                });
            });
    });
}

module.exports = {
    find: find,
    findById: findById,
    add: add,
    remove: remove,
    update: update
};