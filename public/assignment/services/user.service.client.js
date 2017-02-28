/**
 * Created by amulmehta on 2/8/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("UserService", UserService);
    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            users: userList
        };
        return api;

        function userList() {
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
            var newUser = {
                    _id: getNewUserId(),
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };

                return $http.post("/api/user", newUser);
        }

        // Returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        // Updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, user) {
            // var updateSuccessful = false;
            // for (var u in users) {
            //     curUser = users[u];
            //     if (curUser._id === userId) {
            //         users[u].firstName = user.firstName;
            //         users[u].lastName = user.lastName;
            //         users[u].email = user.email;
            //         updateSuccessful = true;
            //         break;
            //     }
            // }
            // return updateSuccessful;
            return $http.put("/api/user/" + userId, user);
        }

        // Removes the user whose _id matches the userId parameter
        function deleteUser(userId) {
            // for (var index = 0; index < users.length; index++) {
            //     if (users[index]._id === userId) {
            //         users.splice(index, 1);
            //         break;
            //     }
            // }
            // return users;
            return $http.delete("/api/user/" + userId);
        }

        // Returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
            // var userFound = null;
            //
            // for (var u in users) {
            //     user = users[u];
            //     if (user.username === username && user.password === password) {
            //         userFound = user;
            //         break;
            //     }
            // }
            // return angular.copy(userFound);

            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        // Returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId) {
            // var userFound = null;
            //
            // for (var u in users) {
            //     user = users[u];
            //     if (user._id === userId) {
            //         userFound = user;
            //         break;
            //     }
            // }
            // return angular.copy(userFound);
            return $http.get("/api/user/" + userId);
        }
    }
})();