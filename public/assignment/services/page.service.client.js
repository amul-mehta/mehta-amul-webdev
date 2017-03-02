/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);
    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        // Generates a unique random integer
        function getNewPageId() {
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

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";

            var newPage = {
                _id: getNewPageId(),
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };

            return $http.post(url, newPage);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");

        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }


})();
