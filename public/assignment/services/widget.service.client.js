/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);
    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            getOptions: getOptions
        };
        return api;

        function getNewWidgetId() {
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

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            var newWidget = widget;
            newWidget._id = getNewWidgetId();
            newWidget.pageId = pageId;
            return $http.post(url, newWidget);
            // var newWidget = widget;
            // newWidget._id = getNewWidgetId();
            // newWidget.pageId = pageId;
            // widgets.push(newWidget);
            //
            // return angular.copy(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
            // var result = [];
            //
            // for (var w in widgets) {
            //
            //     var widget = widgets[w];
            //
            //     if (widget.pageId === pageId) {
            //         result.push(widget);
            //     }
            // }
            // return result;
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
            // var widgetFound = null;
            //
            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (widget._id === widgetId) {
            //         widgetFound = widget;
            //         break;
            //     }
            // }
            // return angular.copy(widgetFound);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
            // var updateSuccessful = false;
            // for (var w in widgets) {
            //     var curwidget = widgets[w];
            //     if (curwidget._id === widgetId) {
            //         widgets[w] = widget;
            //         updateSuccessful = true;
            //         break;
            //     }
            // }
            // return updateSuccessful;
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
            // var deleteSuccessful = false;
            //
            // for (var index = 0; index < widgets.length; index++) {
            //     if (widgets[index]._id === widgetId) {
            //         widgets.splice(index, 1);
            //         deleteSuccessful = true;
            //         break;
            //     }
            // }
            // return deleteSuccessful;
        }

        function getOptions() {
            console.log("sdofisd");
            return $http.get("/api/widget/options");
        }
    }
})();