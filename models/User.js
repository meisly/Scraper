const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/]

    },
    savedArticles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;