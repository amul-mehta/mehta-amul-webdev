/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app) {

    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: "abc@husky.neu.edu"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: "abc123@husky.neu.edu"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: "123abc@husky.neu.edu"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: "1abc1@husky.neu.edu"
        }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        users.push(user);
        res.json(user);
    }

    function deleteUser(req, res) {
        var uid = req.params.userId;
        for (var u in users) {
            if (users[u]._id == uid) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;
        for (var u in users) {
            if (users[u]._id == uid) {
                users[u] = user;
                res.json(users[u]);
                return;
            }
        }
    }

    function findUser(req, res) {
        console.log("inuser");
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        var userFound = null;

        for (var u in users) {
            user = users[u];
            if (user.username === username) {
                userFound = user;

            }
        }
        res.json(userFound);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var userFound = null;
        for (var u in users) {
            user = users[u];
            if (user.username === username && user.password === password) {
                userFound = user;
            }
        }
        res.json(userFound);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var userFound = null;
        for (var u in users) {
            user = users[u];
            if (user._id === userId) {
                userFound = user;

            }
        }
        res.json(userFound);

    }

};

