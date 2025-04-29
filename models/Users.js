const mongoose = require('mongoose');
const { Editor, Admin } = require('../config/roles_list');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    roles: {
        User: {
            type: Number,
            default: 2800
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type:String
    }
});

module.exports = mongoose.model('User',UsersSchema)