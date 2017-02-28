/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    // _id when accessing directly from array, userId when accesing from variable
    function LoginController($location, UserService) {

        var vm = this;

        function init() {
            vm.error = null;
            vm.login = login;
        }

        init();

        function login(username, password) {

            // if (typeof(username) === "undefined" || typeof(password) === "undefined") {
            //     vm.error = "Username / Password cannot be blank";
            //     return;
            // }
            // var user = UserService.findUserByCredentials(username, password);
            //
            // if (user === null) {
            //     vm.error = "No such user";
            // }
            // else {
            //     $location.url("/user/" + user._id);
            // }

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user ===  null) {
                        vm.error = "No such user";
                    }
                    else {
                        console.log(user);
                        $location.url("/user/" + user._id);
                    }
                });
        }
    }

    function ProfileController($routeParams, $location, UserService) {

        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            vm.error = null;
            vm.userId = $routeParams['uid'];

            var promise = UserService.findUserById($routeParams['uid']);
            promise
                .success(function (user) {
                    if (user === null) {
                        vm.error = "No such user";
                    }
                    else {
                        vm.user = user;
                    }
                });
            //var userById = UserService.findUserById($routeParams.uid);

            // if (userById != null) {
            //     vm.user = userById;
            // }
            // else {
            //     vm.error = "No such user";
            // }
        }

        init();

        function updateUser(userId, updateUser) {
            console.log(userId);
            UserService.updateUser(userId, updateUser)
                .success(function (user) {
                    if (user === null) {
                        vm.error = "Failed to update user";
                    }
                    else {
                        vm.success = "User successfully updated";
                    }
                });
            // var isUpdateSuccessful = UserService.updateUser(userId, updateUser);
            // if (isUpdateSuccessful) {
            //     vm.success = "User successfully updated";
            // }
            // else {
            //     vm.error = "Failed to update user";
            // }
        }

        function unregisterUser() {

            UserService.deleteUser(vm.userId)
                .then(function (response) {
                    $location.url("/login");
                }, function (error) {
                    vm.error = "Failed to Un-Register user";
                });
        }

    }

    function RegisterController($location, UserService) {

        var vm = this;
        vm.createNewUser = createNewUser;

        function init() {
            vm.error = null;
        }

        init();

        function createNewUser(user) {

            if (user.password === user.verifypassword) {
                var findUserPromise = UserService.findUserByUsername(user.username);

                findUserPromise
                    .success(function (foundUser) {
                        if (foundUser == null){
                            var promise = UserService.createUser(user);
                            promise
                                .success(function (user) {
                                    if(user == null){
                                        vm.error = err+ "\nFailed to create user. Please try again!!"
                                    }
                                    else {
                                        $location.url("/user/" + user._id);
                                    }
                                });
                        }
                        else {
                            vm.error = "User " + user.username + " already existing!! Please try different username";
                        }
                    });
            }
            else {
                vm.error = "Passwords do not match!!"
            }

            // if (user.password === user.verifypassword) {
            //     console.log(user);
            //     var isUserCreated = UserService.createUser(user);
            //
            //     if (isUserCreated != null) {
            //         $location.url("/user/" + isUserCreated._id);
            //     }
            //     else {
            //         vm.error = "Failed to create user. Please try again!!"
            //     }
            // }
            // else {
            //     vm.error = "Passwords do not match!!"
            // }
        }
    }
})();