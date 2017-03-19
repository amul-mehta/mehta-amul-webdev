/**
 * Created by amulmehta on 3/18/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "b21f54246ca241e2b36a5433eaf112b9";
    var secret = "2b0469b6f5766fad";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();
