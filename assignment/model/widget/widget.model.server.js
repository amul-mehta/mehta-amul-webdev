/**
 * Created by amulmehta on 3/17/17.
 */
var WidgetModelReference;
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var WidgetSchema;
    var WidgetModel;

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteBulkWidgets: deleteBulkWidgets,
        reorderWidget: reorderWidget,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model("widgetModel", WidgetSchema);

    }
    function getModel() {
        return WidgetModel;
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
                                            console.log(page);
                                            page.widgets.push(newWidget);
                                            newWidget._page = page._id;
                                            page.save();
                                            newWidget.save();
                                            console.log(newWidget);
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
        return model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                return model
                    .pageModel
                    .findPageById(widget._page)
                    .then(
                        function (page) {
                            //Remove reference of widgetid in page.widgets array
                            for (var i = 0; i < page.widgets.length; ++i) {
                                if (widget._id.equals(page.widgets[i])) {
                                    page.widgets.splice(i, 1);
                                    page.save();
                                    break;
                                }
                            }
                            return WidgetModel
                                .remove({
                                    _id: widgetId
                                });

                        },
                        function (error) {
                            console.log(error);
                        }
                    )

            });
    }

    function reorderWidget(pageId, start, end) {
        console.log("sdfsdf");
        return WidgetModel
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order == start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.order == start) {
                            widget.order = end;
                            widget.save();
                        }

                        else if (widget.order < start && widget.order >= end) {
                            widget.order = widget.order + 1;
                            widget.save();
                        }
                    }
                });
            });
    }

};
module.exports.ref = WidgetModelReference;