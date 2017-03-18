module.exports = function () {
    var mongoose = require('mongoose');

    //var connectionString = 'mongodb://amulmehta:webdevelopment@ds161038.mlab.com:61038/webdev-mongdb';

    //mongoose.createConnection(connectionString);
    console.log(mongoose.connection.readyState);
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    widgetModel.setModel(model);
    pageModel.setModel(model);
    websiteModel.setModel(model);
    userModel.setModel(model);
    console.log(mongoose.connection.readyState);
    mongoose.connection.on('connected', function(){
        console.log("HEYLO");
    });
    return model;
};