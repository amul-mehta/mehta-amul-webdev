/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pagesFound) {
                    vm.pages = pagesFound;
                });

        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createNewPage = createNewPage;

        function init() {

            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (err) {
                    vm.error = "Error while fetching websites!! Please try after sometime";
                });

        }

        init();

        function createNewPage(newPage) {
            if (newPage.name == null) {
                vm.error = "Please give name for the page!!";
            }
            else {
                console.log("In Page created");
                PageService.createPage(vm.websiteId, newPage)
                    .success(function (newCreatedPage) {
                        console.log(newCreatedPage);
                        if (newCreatedPage == null) {
                            vm.error = "Failed to create new page, Please try again after sometime";
                        }
                        else {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                    });
            }
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            PageService.findPageById(vm.pageId)
                .success(function (curPage) {
                    if (curPage == null) {
                        vm.error = "Cannot find current page!! Please try again"
                    }
                    else {
                        vm.currentpage = curPage;
                    }
                });

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (err) {
                    vm.error = "Error while fetching websites!! Please try after sometime";
                });
        }

        init();

        function updatePage() {

            if (vm.currentpage.name != '' && vm.currentpage.name != null) {
                PageService.updatePage(vm.pageId, vm.currentpage)
                    .success(function (page) {
                        if (page != null) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                        else {
                            vm.error = "Failed to update page";
                        }
                    });
            }

            else {
                vm.error = "Page name cannot be empty";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function (err) {
                    vm.error = "Failed to delete page";
                });
        }
    }

})();
