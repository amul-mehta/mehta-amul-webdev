/**
 * Created by amulmehta on 3/17/17.
 */
module.exports = function (model) {

    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
            _website: {type: mongoose.Schema.ObjectId, ref: "websiteModel"},
            name: {type: String, required: true},
            title: String,
            description: String,
            dateCreated: {type: Date, default: Date.now()},
            widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}]
        },
        {collection: "page"});

    PageSchema.post('remove', function (next) {
        var page = this;
        var widgetModel = model.widgetModel.getModel();
        var websiteModel = model.websiteModel.getModel();
        widgetModel.remove({_page: page._id}).exec();
        websiteModel.findById(page._website)
            .then(function (website) {
            var index = website.pages.indexOf(page._id);
            if (index > -1) {
                website.pages.splice(index, 1);
                website.save();
            }
        });

    });

    return PageSchema;


};
