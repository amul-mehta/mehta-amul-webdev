/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams['uid'];
            var promise = WebsiteService.findWebsitesByUser(vm.userId);

            promise
                .success(function (arrWebsites) {
                    vm.websites = arrWebsites;
                })
                .error(function (err) {
                    vm.error = "Error while fetching websites!! Please try after sometime";
                });
            //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createNewWebsite = createNewWebsite;


        function init() {
            vm.userId = $routeParams['uid'];

            var promise = WebsiteService.findWebsitesByUser(vm.userId);

            promise
                .success(function (arrWebsites) {
                    vm.websites = arrWebsites;
                })
                .error(function (err) {
                    vm.error = "Error while fetching websites!! Please try after sometime";
                });
            //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createNewWebsite(newWebSite) {

            if (newWebSite.name == null) {
                vm.error = "Please give name for the website!!";
            }
            else {
                var websiteCreatedPromise = WebsiteService.createWebsite(vm.userId, newWebSite);

                websiteCreatedPromise
                    .success(function (newWebSite) {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function (err) {
                        vm.error = "Failed to create new website";
                    });
            }
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
            vm.userId = $routeParams['uid'];
            vm.currentWebSiteId = $routeParams['wid'];

            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (arrWebsites) {
                    vm.websites = arrWebsites;
                })
                .error(function (err) {
                    vm.error = "Error while fetching websites!! Please try after sometime";
                });

            WebsiteService.findWebsiteById(vm.currentWebSiteId)
                .success(function (foundWebsite) {
                    vm.currentwebsite = foundWebsite;
                })
                .error(function (err) {
                    vm.error = "Cannot find current website!! Please try again"
                });

            //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            //vm.currentwebsite = WebsiteService.findWebsiteById(vm.currentWebSiteId);
        }

        init();

        function updateWebsite() {
            console.log("fgbgxfgds");
            if (vm.currentwebsite.name != '' && vm.currentwebsite.name != null) {
                WebsiteService.updateWebsite(vm.currentWebSiteId, vm.currentwebsite)
                    .success(function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (error) {
                        vm.error = "Failed to update website";
                    });
            }
            else {
                vm.error = "Website name cannot be empty";
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.currentWebSiteId)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function (err) {
                    vm.error = "Failed to delete website";
                });
        }
    }

})();
