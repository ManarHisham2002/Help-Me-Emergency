import mongoose from 'mongoose';
import postModel from '../model/postModel.js';
import AppError from '../utilites/AppError.js';
import commentModel from '../model/commentModel.js';

class postController {
    static createPost = async (req, res, next) => {
        try {
            const { content } = req.body;
            const authorId = req.user._id;

            const newPost = await postModel.create({ content, author: authorId });

            res.status(201).json(newPost);
        } catch (err) {
            console.error('Error creating post:', err);
            return next(new AppError('Failed to create post. Please try again later.', 500));
        }
    };

    static getPostsAndComments = async (req, res, next) => {
        try {
            const userId = req.user._id;

            const posts = await postModel.find({ author: userId })
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin'
                });

            const postIds = posts.map(post => post._id);

            const comments = await commentModel.find({ post: { $in: postIds } })
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin'
                });

            const postsWithComments = posts.map(post => {
                const postComments = comments
                    .filter(comment => comment.post.equals(post._id))
                    .map(({ _id, comment, author }) => ({
                        _id,
                        comment,
                        author
                    }));

                return {
                    content: post.content,
                    author: post.author,
                    comments: postComments
                };
            });

            res.status(200).json(postsWithComments);
        } catch (error) {
            next(error);
        }
    };

    static deletePostWithComments = async (req, res, next) => {
        const postId = req.params.id;

        try {
            const post = await postModel.findById(postId);

            if (!post) {
                return next(new AppError('Post not found.', 404));
            }

            await commentModel.deleteMany({ post: postId });
            await postModel.findByIdAndDelete(postId);

            res.status(200).json({ message: 'Post and associated comments deleted successfully.' });
        } catch (error) {
            next(error);
        }
    };

    static getAllPosts = async (req, res, next) => {
        try {
            const posts = await postModel.find({})
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin'
                });

            const postIds = posts.map(post => post._id);

            const comments = await commentModel.find({ post: { $in: postIds } })
                .populate({
                    path: 'author',
                    select: '-_id -password -email -gender -phone -location -isAdmin'
                });

            const postsWithComments = posts.map(post => {
                const postComments = comments
                    .filter(comment => comment.post.equals(post._id))
                    .map(({ _id, comment, author }) => ({
                        _id,
                        comment,
                        author
                    }));

                return {
                    content: post.content,
                    author: post.author,
                    comments: postComments
                };
            });

            res.status(200).json(postsWithComments);
        } catch (error) {
            next(error);
        }
    };
}

export default postController;
