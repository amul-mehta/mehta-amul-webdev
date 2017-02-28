/**
 * Created by amulmehta on 2/27/17.
 */
module.exports = function (app) {

    var widgets =
        [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name": ""},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": ""},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name": ""
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": ""},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": ""},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E", "name": ""
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": ""}
        ];

    var options =
        [1, 2, 3, 4, 5, 6];


    var multer = require('multer'); // npm install multer --save

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/options", getOptions);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    //app.put("/page/:pageId/widget", updateWidgetOrder);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        var result = [];

        for (var w in widgets) {

            var widget = widgets[w];

            if (widget.pageId === pageId) {
                result.push(widget);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        var widgetFound = null;

        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                widgetFound = widget;
                break
            }
        }
        res.json(widgetFound);
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var updatedWidget = null;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                updatedWidget = widget;
                break;
            }
        }

        res.json(updatedWidget);
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        var deleteSuccessful = 400;

        for (var index = 0; index < widgets.length; index++) {
            if (widgets[index]._id === widgetId) {
                widgets.splice(index, 1);
                deleteSuccessful = 200;
                break;
            }
        }
        res.sendStatus(deleteSuccessful);
    }
    function uploadImage(req, res) {
        console.log(req.myFile);
        console.log(req.body);
        var pageId        = null;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

};