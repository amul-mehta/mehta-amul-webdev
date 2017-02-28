/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app) {

    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
        {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
        {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req,res){
        var newPage = req.body;
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req,res){

        var websiteId = req.params.websiteId;

        var result = [];

        for(var p in pages){

            var page = pages[p];

            if(page.websiteId === websiteId){
                result.push(page);
            }
        }

        res.json(result);

    }

    function findPageById(req,res){

        var pageId = req.params.pageId;

        var pageFound = null;

        for(var p in pages){
            var page = pages[p];
            if(page._id === pageId){
                pageFound = page;
                break;
            }
        }
        res.json(pageFound);
    }

    function updatePage(req,res){

        var pageId = req.params.pageId;
        var page = req.body;
        var updatedPage = null;
        for(var p in pages){
            var curPage = pages[p];
            if(curPage._id === pageId){
                curPage.name = page.name;
                curPage.description = page.description;
                updatedPage = curPage;
                break;
            }
        }
        res.json(updatedPage);
    }

    function deletePage(req,res){

        var pageId = req.params.pageId;

        for(var index = 0;index < pages.length; index++){
            if(pages[index]._id === pageId){
                pages.splice(index,1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(400);
    }

};