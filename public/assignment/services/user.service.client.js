/**
 * Created by amulmehta on 2/8/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("UserService", UserService);
    function UserService() {
        /*var users = [
         {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
         {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
         {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
         ];*/

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

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            users: usersarr
        };
        return api;

        function usersarr() {
            return users;
        }

        // Generates a unique random integer
        function getNewUserId() {
            var date = new Date();

            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];

            var id = components.join("");

            return id;
        }

        // Adds the user parameter instance to the local users array
        function createUser(user) {
            if (!findUserByUsername(user.username)) {
                var newUser = {
                    _id: getNewUserId(),
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };

                users.push(newUser);

                return angular.copy(newUser);
            }
            else {
                return null;
            }
        }

        // Returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username) {

            var userFound = null;

            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    userFound = user;
                    break;
                }
            }
            return angular.copy(userFound);
        }

        // Updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, user) {
            var updateSuccessful = false;
            for (var u in users) {
                curUser = users[u];
                if (curUser._id === userId) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    updateSuccessful = true;
                    break;
                }
            }
            return updateSuccessful;
        }

        // Removes the user whose _id matches the userId parameter
        function deleteUser(userId) {
            for (var index = 0; index < users.length; index++) {
                if (users[index]._id === userId) {
                    users.splice(index, 1);
                    break;
                }
            }
            return users;
        }

        // Returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
            var userFound = null;

            for (var u in users) {
                user = users[u];
                if (user.username === username && user.password === password) {
                    userFound = user;
                    break;
                }
            }
            return angular.copy(userFound);
        }

        // Returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId) {

            var userFound = null;

            for (var u in users) {
                user = users[u];
                if (user._id === userId) {
                    userFound = user;
                    break;
                }
            }
            return angular.copy(userFound);
        }
    }
})();