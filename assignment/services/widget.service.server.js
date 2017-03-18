/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app,widgetModel) {

    // var widgets =
    //     [
    //         {
    //             "_id": "567",
    //             "widgetType": "HEADER",
    //             "pageId": "321",
    //             "size": 4,
    //             "text": "Lorem ipsum",
    //             "name": ""
    //         },
    //         {
    //             "_id": "123",
    //             "widgetType": "HEADER",
    //             "pageId": "321",
    //             "size": 2,
    //             "text": "GIZMODO",
    //             "name": ""
    //         },
    //         {
    //             "_id": "234",
    //             "widgetType": "HEADER",
    //             "pageId": "321",
    //             "size": 4,
    //             "text": "Lorem ipsum",
    //             "name": ""
    //         },
    //         {
    //             "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //             "url": "https://youtu.be/AM2Ivdi9c4E", "name": ""
    //         },
    //         {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": ""},
    //         {
    //             "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //             "url": "http://lorempixel.com/400/200/", "name": ""
    //         },
    //         {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": ""}
    //     ];

    var options =
        [1, 2, 3, 4, 5, 6];


    var multer = require('multer'); // npm install multer --save

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/options", getOptions);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", updateWidgetOrder);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var newWidget = req.body;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (newWidget) {
                    res.send(newWidget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
        // widgets.push(newWidget);
        // res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

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
        //
        // res.json(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });

        // var widgetFound = null;
        //
        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget._id === widgetId) {
        //         widgetFound = widget;
        //         break
        //     }
        // }
        // res.json(widgetFound);
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // var updatedWidget = null;
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets[w] = widget;
        //         updatedWidget = widget;
        //         break;
        //     }
        // }
        //
        // res.json(updatedWidget);
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // var deleteSuccessful = 400;
        // var totalWidgets = widgets.length;
        // for (var index = 0; index < totalWidgets; index++) {
        //     if (widgets[index]._id === widgetId) {
        //         //var pageId = widgets[index].pageId;
        //         //var deleteIndex = widgets[index].index;
        //         widgets.splice(index, 1);
        //         //updateIndexesAfterDelete(deleteIndex, pageId, totalWidgets - 1);
        //         deleteSuccessful = 200;
        //         break;
        //     }
        // }
        // res.sendStatus(deleteSuccessful);
    }

    function updateIndexesAfterDelete(deletedIndex, deletedWidgetPageId) {
        var widgetsToUpdate = widgets.filter(function (w) {
            return w.pageId == deletedWidgetPageId;
        });
        console.log(deletedIndex);
        console.log("widgets to u[dae");
        console.log(widgetsToUpdate);
        for (var index = 0; index < widgetsToUpdate.length; index++) {
            console.log(widgetsToUpdate[index].index);
            if (widgetsToUpdate[index].index > deletedIndex) {
                widgetsToUpdate[index].index--;
            }
        }
        console.log(widgetsToUpdate);
        console.log("fgsds");
        console.log(widgets);
    }


    function uploadImage(req, res) {
        if (req.file) {
            console.log(req.myFile);
            console.log(req.body);
            var pageId = null;
            var widgetId = req.body.widgetId;
            var width = req.body.width;
            var userId = req.body.userId;
            var websiteId = req.body.websiteId;
            var myFile = req.file;
            var destination = myFile.destination; // folder where file is saved to

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                    pageId = widgets[i].pageId;
                }
            }

        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

    }


    function updateWidgetOrder(req, res) {

        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        console.log(start);
        console.log(end);
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }

};