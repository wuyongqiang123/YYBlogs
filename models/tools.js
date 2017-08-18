var db = require('./db'),
    mongoose = db.mongoose,
    base = db.base;

var ToolsSchema = base.extend({
    //标题
    Title: {type: String},
    //摘要
    Summary: {type: String},
    //外链Url
    Url: {type: String}
});

exports.ToolsModel = mongoose.model('tools', ToolsSchema, 'tools');