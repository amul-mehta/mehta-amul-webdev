/**
 * Created by amulmehta on 3/9/17.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("userModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        // delete user._id;
        return UserModel.create(user);

    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    $set: user
                }
            );
    }

    function deleteUser(userId) {
        return model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                return model
                    .websiteModel
                    .findWebsiteById(page._website)
                    .then(
                        function (website) {
                            //Remove reference of pageId in website.pages array
                            for (var i = 0; i < website.pages.length; ++i) {
                                if (page._id.equals(website.pages[i])) {
                                    website.pages.splice(i, 1);
                                    website.save();
                                    break;
                                }
                            }

                            var widgets = page.widgets;

                            if (0 === widgets.length) {
                                return PageModel.remove({_id: pageId});
                            }
                            else {
                                return model
                                    .widgetModel
                                    .deleteBulkWidgets(widgets)
                                    .then(function (status) {
                                            return PageModel.remove({_id: pageId});
                                        },
                                        function (error) {
                                            console.log(error);
                                        });
                            }
                        },
                        function (error) {
                            console.log(error);
                        }
                    )

            });
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }
};
