const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    body: {
        type: String
    },
    link: {
        type: String,
        match: [/([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/] // needs to match url
    },
    cat: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;