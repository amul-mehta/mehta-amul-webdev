/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.checkSafeURL = checkSafeURL;


        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.currentWidgetId = $routeParams['wgid'];
            vm.loc = $location;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            vm.currentWidget = WidgetService.findWidgetById(vm.currentWidgetId);

        }


        init();

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeURL(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;

            return $sce.trustAsResourceUrl(url);
        }

    }

    // Widget Chooser
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.createNewWidget = createNewWidget;


        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.newWidgetHeader = {_id: "", widgetType: "HEADER", pageId: vm.pageId, size: 2, text: "New Header Text"};
            vm.newWidgetImage = {
                _id: "",
                widgetType: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            };
            vm.newWidgetYouTube = {
                _id: "",
                widgetType: "YOUTUBE",
                pageId: vm.pageId,
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            };
            vm.newWidgetHTML = {_id: "", widgetType: "HTML", pageId: vm.pageId, text: "<p>Lorem ipsum</p>"};
        }

        init();

        function createNewWidget(newWidget) {

            var widgetCreated = WidgetService.createWidget(vm.pageId, newWidget);

            if (widgetCreated._id != 0) {
                // Redirecting to widget edit page
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetCreated._id);
            }
            else {
                vm.error = "Failed to create new widget";
            }

        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.currentWidgetId = $routeParams['wgid'];
            vm.getOptions = WidgetService.getOptions();
            vm.currentWidget = WidgetService.findWidgetById(vm.currentWidgetId);
        }

        init();

        function updateWidget() {
            var updateSuccessful = WidgetService.updateWidget(vm.currentWidgetId, vm.currentWidget);

            if (updateSuccessful) {
                // Redirect to widget list page
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                vm.error = "Failed to update widget";
            }
        }

        function deleteWidget() {
            var deleteSuccessful = WidgetService.deleteWidget(vm.currentWidgetId);
            console.log(deleteSuccessful);
            if (deleteSuccessful) {
                // Redirect to widget list page
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                vm.error = "Failed to delete widget";
            }
        }

    }
})();

