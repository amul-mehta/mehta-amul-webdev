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

            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgetsFound) {
                    vm.widgets = widgetsFound;
                    console.log(widgetsFound);
                })
                .error(function (err) {
                    vm.error = "Error while fetching widgets!! Please try after sometime";
                });

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

            vm.newWidgetHeader = {
                type: "HEADER",
                pageId: vm.pageId,
                size: 2,
                text: "New Header Text",
                name: "Header Widget"

            };
            vm.newWidgetImage = {
                type: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/",
                name: "ImageWidget"
            };
            vm.newWidgetYouTube = {
                type: "YOUTUBE",
                pageId: vm.pageId,
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E",
                name: "YouTube Widget"
            };
            vm.newWidgetHTML = {
                type: "HTML",
                pageId: vm.pageId,
                text: "<p>Lorem ipsum</p>",
                name: "HTML Widget"
            };
            vm.newWidgetText = {
                name: "Text Input Widget",
                type: "INPUT",
                formatted: false,
                rows: 1,
                placeholder: "",
                text: ""
            };
        }

        init();

        function createNewWidget(newWidget) {

            WidgetService.createWidget(vm.pageId, newWidget)
                .success(function (widgetCreated) {
                    if (widgetCreated != null) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetCreated._id);
                    }
                    else {
                        vm.error = "Failed to create new widget";
                    }
                });
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

            WidgetService.getOptions()
                .success(function (response) {
                    if (response != null) {
                        vm.options = response;
                    }
                    else {
                        vm.error = "Failed to get options";
                    }
                });
            //vm.getOptions = WidgetService.getOptions();
            WidgetService.findWidgetById(vm.currentWidgetId)
                .success(function (response) {
                    console.log(response);
                    if (response != null) {
                        vm.currentWidget = response;
                    }
                    else {
                        vm.error = "Failed to get current Widget";
                    }
                });
        }

        init();

        function validateWidgetType(widgetToTest) {
            var validationFailed = false;

            switch (widgetToTest.type) {
                case "HEADING":
                    if (widgetToTest.text == '' || widgetToTest.text == null) {
                        validationFailed = true;
                    }
                    break;
                case "IMAGE":
                    if (widgetToTest.url == '' || widgetToTest.url == null) {
                        validationFailed = true;
                    }
                    break;
                case "YOUTUBE":
                    if (widgetToTest.url == '' || widgetToTest.url == null) {
                        validationFailed = true;
                    }
                    break;
            }

            return validationFailed;
        }

        function updateWidget() {
            if (validateWidgetType(vm.currentWidget)) {
                switch (vm.currentWidget.type) {
                    case "HEADING":
                        vm.error = "Header Text cannot be blank";
                        break;
                    case "IMAGE":
                        vm.error = "Image Url cannot be blank";
                        break;
                    case "YOUTUBE":
                        vm.error = "Video Url cannot be blank";
                        break;
                    default:
                        vm.error = "There is something wrong. Please check whether form fields are correctly filled."
                        break;
                }
            }
            else {
                console.log(vm.currentWidget);
                WidgetService.updateWidget(vm.currentWidgetId, vm.currentWidget)
                    .success(function (response) {
                        console.log(response);
                        if (response != null) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                        else {
                            vm.error = "Failed to update widget";
                        }
                    });
            }
        }

        function deleteWidget() {
            console.log(vm.currentWidgetId);

                WidgetService.deleteWidget($routeParams['wgid'])
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (err) {
                    vm.error = "Failed to delete widget";
                });
        }

    }
})();

