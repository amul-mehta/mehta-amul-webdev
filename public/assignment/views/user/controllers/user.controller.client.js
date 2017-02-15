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

            if (typeof(username) === "undefined" || typeof(password) === "undefined") {
                vm.error = "Username / Password cannot be blank";
                return;
            }
            var user = UserService.findUserByCredentials(username, password);

            if (user === null) {
                vm.error = "No such user";
            }
            else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {

        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            var userById = UserService.findUserById($routeParams.uid);
            vm.error = null;
            vm.userId = $routeParams['uid'];
            if (userById != null) {
                vm.user = userById;
            }
            else {
                vm.error = "No such user";
            }
        }

        init();

        function updateUser(userId, updateUser) {
            var isUpdateSuccessful = UserService.updateUser(userId, updateUser);
            if (isUpdateSuccessful) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Failed to update user";
            }
        }

        function unregisterUser() {
            console.log(vm.userId);
            var isDeleteSuccessful = UserService.deleteUser(vm.userId);

            if (isDeleteSuccessful) {
                $location.url("/login");
            }
            else {
                vm.error = "Failed to update user";
            }
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
                console.log(user);
                isUserCreated = UserService.createUser(user);

                if (isUserCreated != null) {
                    $location.url("/user/" + isUserCreated._id);
                }
                else {
                    vm.error = "Failed to create user. Please try again!!"
                }
            }
            else {
                vm.error = "Passwords do not match!!"
            }
        }
    }
})();