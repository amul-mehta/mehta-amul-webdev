/**
 * Created by amulmehta on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);
    function WebsiteService($http) {


        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        // Adds the website parameter instance to the local websites array.
        // The new website's developerId is set to the userId parameter
        function createWebsite(userId, website) {

            var url = "/api/user/" + userId + "/website";

            var newWebsite = {
                 name: website.name,
                developerId: userId,
                description: website.description
            };

            return $http.post(url, newWebsite);

        }

        // Retrieves the websites in local websites array whose developerId matches the parameter userId
        function findWebsitesByUser(userId) {

            return $http.get("/api/user/" + userId + "/website");

        }

        // Retrieves the website in local websites array whose _id matches the websiteId parameter
        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId);
        }

        // Updates the website in local websites array whose _id matches the websiteId parameter
        function updateWebsite(websiteId, website) {

            return $http.put("/api/website/" + websiteId, website);
        }

        // Removes the website from local websites array whose _id matches the websiteId parameter
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
        }
    }
})();