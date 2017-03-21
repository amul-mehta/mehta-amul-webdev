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

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    console.log(user);
                    if (user.length == 0) {
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
                    if (user.length == 0) {
                        vm.error = "No such user";
                    }
                    else {
                        vm.user = user;
                    }
                });
        }

        init();

        function updateUser(userId, updateUser) {
            UserService.updateUser(userId, updateUser)
                .then(function (response) {
                    console.log("sdgss");
                    vm.success = " User updated successfully.";
                }, function (error) {
                    vm.error = "Failed to update user";
                });
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
                        if (foundUser == null) {
                            var promise = UserService.createUser(user);
                            promise
                                .success(function (user) {
                                    if (user == null) {
                                        vm.error = err + "\nFailed to create user. Please try again!!"
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
        }
    }
})();