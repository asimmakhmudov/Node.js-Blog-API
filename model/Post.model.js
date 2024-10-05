const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        tags: [String],
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        state: {
            type: String,
            enum: ["draft", "published"]
        },
        body: {
            type: String,
            required: [true, "Body is required"]
        },
        readTime: {
            type: String,
        }
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema);
module.export = Post;