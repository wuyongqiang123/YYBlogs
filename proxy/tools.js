/**
 * Created by yongqiang on 2017/8/17.
 */
var toolsModel = require('../models/tools').ToolsModel;
var redisClient = require('../utility/redisClient');
var tool = require('../utility/tool');

/**
 * 获取工具管理数据
 * @param callback 回调函数
 */
exports.gettools = function (callback) {
    toolsModel.find().limit(15).skip(0).then(function (err,toolss) {
        if (err) {
            return callback(err);
        }
        if (toolss) {
            return callback(toolss);
        }
    });

}
/**
 * 根据id获取工具
 * @param id 工具id
 * @param callback 回调函数
 */
exports.getById = function (id, callback) {
    toolsModel.findById(id, function (err, article) {
        if (err) {
            return callback(err);
        }
        return callback(null, article);
    });
};
/**
 * 新增或更新工具
 * @param params 参数对象
 * @param callback 回调函数
 */
exports.save = function (params, callback) {
    var _id = params.UniqueId,
        entity = new toolsModel({
            Title: params.Title,
            Summary: params.Summary,
            Url: params.Url,
            IsDraft: params.IsDraft === 'True',
            ModifyTime: new Date()
        });
    toolsModel.findById(_id, function (err, result) {
        if (err) {
            return callback(err);
        }
        if (!result) {
            //新增
            entity._id = _id;
            entity.CreateTime = new Date();
            entity.save(function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        } else {
            //更新
            toolsModel.update({"_id": _id}, entity, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        }
    })
};
/**
 * 删除工具
 * @param ids 工具id
 * @param callback 回调函数
 */
exports.delete = function (ids, callback) {
    toolsModel.remove({'_id': ids}, function (err) {

        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};

