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

        // Generates a unique random integer
        function getNewWebSiteId() {
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

        // Adds the website parameter instance to the local websites array.
        // The new website's developerId is set to the userId parameter
        function createWebsite(userId, website) {

            var url = "/api/user/"+userId+"/website";

            var newWebsite = {
                _id: getNewWebSiteId(),
                name: website.name,
                developerId: userId,
                description: website.description};

            return $http.post(url, newWebsite);

            // var websiteCreated = false;
            //
            // var websiteExisting = false;
            //
            // for (var w in websites) {
            //     if ((w.name === website.name) && (w.developerId === userId)) {
            //         websiteExisting = true;
            //         break;
            //     }
            // }
            //
            // if (!websiteExisting) {
            //     var newWebsite = {
            //         _id: getNewWebSiteId(),
            //         name: website.name,
            //         developerId: userId,
            //         description: website.description
            //     };
            //
            //     websites.push(newWebsite);
            //     websiteCreated = true;
            // }
            //
            // return websiteCreated;
        }

        // Retrieves the websites in local websites array whose developerId matches the parameter userId
        function findWebsitesByUser(userId) {

            return $http.get("/api/user/"+userId+"/website");

            // var result = [];
            //
            // for (var w in websites) {
            //
            //     var website = websites[w];
            //
            //     if (website.developerId === userId) {
            //         result.push(website);
            //     }
            // }
            // return result;
        }

        // Retrieves the website in local websites array whose _id matches the websiteId parameter
        function findWebsiteById(websiteId) {

            return $http.get("/api/website/"+websiteId);
            // var websiteFound = null;
            //
            // for (var w in websites) {
            //     var website = websites[w];
            //     if (website._id === websiteId) {
            //         websiteFound = website;
            //         break;
            //     }
            // }
            // return angular.copy(websiteFound);
        }

        // Updates the website in local websites array whose _id matches the websiteId parameter
        function updateWebsite(websiteId, website) {

            return $http.put("/api/website/"+ websiteId, website);
            // var updateSuccessful = false;
            // for (var w in websites) {
            //     var curWebSite = websites[w];
            //     if (curWebSite._id === websiteId) {
            //         websites[w].name = website.name;
            //         websites[w].description = website.description;
            //         updateSuccessful = true;
            //         break;
            //     }
            // }
            // return updateSuccessful;
        }

        // Removes the website from local websites array whose _id matches the websiteId parameter
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
            // var deleteSuccessful = false;
            //
            // for (var index = 0; index < websites.length; index++) {
            //     if (websites[index]._id === websiteId) {
            //         websites.splice(index, 1);
            //         deleteSuccessful = true;
            //         break;
            //     }
            // }
            //
            // return deleteSuccessful;
        }
    }
})();