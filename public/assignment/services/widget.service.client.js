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
            updateWidgetOrder: updateWidgetOrder,
            getOptions: getOptions
        };
        return api;

        // function getNewWidgetId() {
        //     var date = new Date();
        //
        //     var components = [
        //         date.getYear(),
        //         date.getMonth(),
        //         date.getDate(),
        //         date.getHours(),
        //         date.getMinutes(),
        //         date.getSeconds(),
        //         date.getMilliseconds()
        //     ];
        //
        //     var id = components.join("");
        //
        //     return id;
        // }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            var newWidget = widget;
            newWidget.pageId = pageId;
            return $http.post(url, newWidget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }

        function getOptions() {
            return $http.get("/api/widget/options");
        }

        function updateWidgetOrder(pageId, startIndex, endIndex) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
        }
    }
})();