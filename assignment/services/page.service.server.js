/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app,pageModel) {

    // var pages = [
    //     {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
    //     {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
    //     {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
    // ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        console.log(newPage);
        console.log(websiteId);
        pageModel
            .createPage(websiteId, newPage)
            .then(function (newPage) {
                console.log("lol");
                    res.send(newPage);

                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
        // pages.push(newPage);
        // res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

        // var result = [];
        //
        // for (var p in pages) {
        //
        //     var page = pages[p];
        //
        //     if (page.websiteId === websiteId) {
        //         result.push(page);
        //     }
        // }
        //
        // res.json(result);

    }

    function findPageById(req, res) {

        var pageId = req.params.pageId;

       pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
        // var pageFound = null;
        //
        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page._id === pageId) {
        //         pageFound = page;
        //         break;
        //     }
        // }
        // res.json(pageFound);
    }

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // var updatedPage = null;
        // for (var p in pages) {
        //     var curPage = pages[p];
        //     if (curPage._id === pageId) {
        //         curPage.name = page.name;
        //         curPage.description = page.description;
        //         updatedPage = curPage;
        //         break;
        //     }
        // }
        // res.json(updatedPage);
    }

    function deletePage(req, res) {

        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for (var index = 0; index < pages.length; index++) {
        //     if (pages[index]._id === pageId) {
        //         pages.splice(index, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        //
        // res.sendStatus(400);
    }

};