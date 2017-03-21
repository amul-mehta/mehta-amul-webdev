/**
 * Created by amulmehta on 3/17/17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema ;
    var PageModel ;



    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deleteBulkPages: deleteBulkPages,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
         PageSchema = require('./page.schema.server')(_model);
         PageModel = mongoose.model("pageModel", PageSchema);


    }

    function getModel() {
        return PageModel;
    }

    function createPage(websiteId, page) {
        //page._website = websiteId;
        //return PageModel.create(page);

        return PageModel
            .create(page)
            .then(
                function (newPage) {
                    console.log(newPage);
                    return model
                        .websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (website) {
                                console.log(website.pages);
                                website.pages.push(newPage);
                                console.log("sdsdd");
                                newPage._website = website._id;
                                console.log("sdsdd");
                                website.save();
                                console.log("sdsdd");
                                newPage.save();
                                console.log("sdsdd");
                                return newPage;

                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                },
                function (error) {
                    console.log(error);
                });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update({
                    _id: pageId
                },
                {
                    $set: page
                });
    }

    function deleteBulkPages(arrPageId) {
        return PageModel.remove({'_id': {'$in': arrPageId}});
    }

    function deletePage(pageId) {
        return PageModel.findByIdAndRemove(pageId, function (err,page) {
            page.remove();
        });

        // return model
        //     .pageModel
        //     .findPageById(pageId)
        //     .then(function (page) {
        //         return model
        //             .websiteModel
        //             .findWebsiteById(page._website)
        //             .then(
        //                 function (website) {
        //                     //Remove reference of pageId in website.pages array
        //                     for (var i = 0; i < website.pages.length; ++i) {
        //                         if (page._id.equals(website.pages[i])) {
        //                             website.pages.splice(i, 1);
        //                             website.save();
        //                             break;
        //                         }
        //                     }
        //
        //                     var widgets = page.widgets;
        //
        //                     if (0 === widgets.length) {
        //                         return PageModel.remove({_id: pageId});
        //                     }
        //                     else {
        //                         return model
        //                             .widgetModel
        //                             .deleteBulkWidgets(widgets)
        //                             .then(function (status) {
        //                                     return PageModel.remove({_id: pageId});
        //                                 },
        //                                 function (error) {
        //                                     console.log(error);
        //                                 });
        //                     }
        //                 },
        //                 function (error) {
        //                     console.log(error);
        //                 }
        //             )
        //
        //     });
    }
};