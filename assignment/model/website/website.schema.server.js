/**
 * Created by amulmehta on 3/17/17.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "userModel"},
        name: {type: String, required: true},
        description: String,
        dateCreated: {type: Date, default: Date.now()},
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'pageModel'}]
    },{collection: "website"});
    return websiteSchema;
};