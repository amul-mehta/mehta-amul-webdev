/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app,websiteModel) {

    // var websites = [
    //     {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
    //     {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
    //     {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
    //     {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
    //     {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
    //     {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
    // ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;

        // var newWebsite = req.body;
        // websites.push(newWebsite);
        // res.json(newWebsite);

        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

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
        // res.json(result);

    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });

        // var websiteFound = null;
        //
        // for (var w in websites) {
        //     var website = websites[w];
        //     if (website._id === websiteId) {
        //         websiteFound = website;
        //         break;
        //     }
        // }
        // res.json(websiteFound);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // var updatedWebsite = null;
        // for (var w in websites) {
        //     var curWebSite = websites[w];
        //     if (curWebSite._id === websiteId) {
        //         curWebSite.name = website.name;
        //         curWebSite.description = website.description;
        //         updatedWebsite = curWebSite;
        //         break;
        //     }
        // }
        // res.json(updatedWebsite);
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for (var index = 0; index < websites.length; index++) {
        //     if (websites[index]._id === websiteId) {
        //         websites.splice(index, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        //
        // res.sendStatus(400);

    }
};