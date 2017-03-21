/**
 * Created by amulmehta on 3/17/17.
 */
module.exports = function (model) {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page:  {type: mongoose.Schema.ObjectId, ref:"pageModel"},
        type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: {type: String, required: true},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()},
        order: Number
    },{collection: "widget"});

    WidgetSchema.post('remove', function(next) {
        var pageModel = model.pageModel.getModel();
        var widget = this;
        pageModel.findById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });

    return WidgetSchema;


};