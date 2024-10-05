const Post = require("../model/Post.model")
const User = require("../model/User.model")


// get all posts
exports.getAllPublishedPost = async(req, res) => {
    try {
        const posts = await Post.find({ state: "published"});

        res.status(200).json({
            status: "succes",
            posts
        })
    } catch(err) {
        throw err
    }
}

// get single published posts
exports.getSinglePublishedPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        .where("state")
        .eq("published");
        if(!post) {
            return res.status(404).json({
                status: "Failed",
                message: "Post with given ID not found"
            })
        } else {
            post.readCount == 0 ? post.readCount++ : post.readCount++;
            await post.save();
        }
        res.status(200).json({
            status: "success",
            post,
        })
    } catch(err) {
        throw err
    }
}

// create post
exports.createAPost = async (req, res) => {
    try {
        const {title, description, tags, body} = req.body
        const wmp = 225; // word per minute
        const numberOfWords = body.trim().split(/\s+/).length
        const readTime = Math.ceil(numberOfWords / wmp)

        let { firstname, lastname } = req.user;
        let author = `${firstname} ${lastname}`;
        let authorId = req.user._id;

        const post = await Post.create({
            title,
            description,
            tags,
            body,
            author,
            authorId,
            readTime,
        })

        let user = await User.findById(req.user._id)
        user.post.push(post_id)
        await user.save()

        res.status(201).json({
            status: "success",
            post,
        })
    } catch(err) {
        throw err
    }
};

// update post
exports.updateAPost = async (req, res) => {
    const {state, body} = req.body;
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: {state, body},
            },
            {new: true}
        );

        if(post.authorId.toString() !== req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "You are not the author of this post",
            })
        }

        res.status(200).json({
            status: "success",
            post
        })
    } catch(err) {
        throw err
    }
}

// delete post
exports.deleteAPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.postId, {
            authorId: req.user.id,
        });

        if(!post) return res.status(404).json({
            status: "Failed",
            message: "Post with given id not founded"
        })

        if(post.authorId.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Failed",
                message: "You can only delete a post you created!",
            })
        }

        const postByUser = await User.findById(req.user._id);
        postByUser.posts.pull(post._id)
        await postByUser.updateOne({posts: postByUser.posts});

        res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
        })
    } catch(err) {
        throw err
    }
}