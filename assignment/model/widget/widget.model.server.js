/**
 * Created by amulmehta on 3/17/17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("widgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteBulkWidgets: deleteBulkWidgets,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;

        return WidgetModel
            .find({"_page": pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;

                    return WidgetModel
                        .create(widget)
                        .then(
                            function (newWidget) {
                                return model
                                    .pageModel
                                    .findPageById(pageId)
                                    .then(
                                        function (page) {
                                            page.widgets.push(newWidget);
                                            newWidget._page = page._id;
                                            page.save();
                                            newWidget.save();
                                            return newWidget;
                                        },
                                        function (error) {
                                            console.log(error);
                                        }
                                    );
                            },
                            function (error) {
                                console.log(error);
                            });

                },
                function (err) {
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {_id: widgetId}, {
                    $set: widget
                });
    }

    function deleteBulkWidgets(arrWidgetId){
        return WidgetModel.remove({'_id':{'$in':arrWidgetId}});
    }

    function deleteWidget(widgetId) {
        // TODO: complete this
    }

    function reorderWidget(pageId, start, end) {
        // TODO: complete this
    }

};