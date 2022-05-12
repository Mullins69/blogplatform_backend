
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    username:{
        type: String
}
    ,
    post: {
        type: Array,
        default: []
    },
    category:{
        type: String
    }
    ,
    created_date: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);
