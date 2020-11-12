const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Blog = require("../models/Blog")
const Review = require("../models/Review")
const blogController = {};

blogController.createBlog = catchAsync(async (req, res) => {
    const userId = req.userId;
    const { title, pictureUrl, content } = req.body;
    const blog = await Blog.create({
        title,
        pictureUrl,
        content,
        author: userId,
    })
    return sendResponse(res, 200, true, blog, null, "Successfully created an Blog")
})
blogController.updateBlog = catchAsync(async (req, res, next) => {
    const author = req.userId;
    const blogId = req.params.id;
    const { title, pictureUrl, content } = req.body;
    const blog = await Blog.findOneAndUpdate(
        { _id: blogId, author: author },
        {
            content: content,
            title: title,
            pictureUrl, pictureUrl,
        },
        { new: true }
    );
    if (!blog)
        return next(
            new AppError(
                400,
                "Blog not found or User not authorized",
                "Update Blog Error"
            )
        );
    return sendResponse(res, 200, true, blog, null, "Update Blog successful");
});

blogController.getSingleBlog = catchAsync(async (req, res) => {
    let blog = await (await Blog.findById(req.params.id)) //NOTE add   .populate("author") sau
    if (!blog) {
        return next(new AppError(404, "Blog not found", "Get Single Blog Error"));
    }
    //ANCHOR toJson? check lai cho nay
    blog = await blog.toJSON();
    blog.reviews = await Review.find({ blog: blog._id }).populate("user");
    console.log("blog reviews", blog.reviews)
    return sendResponse(res, 200, true, blog, null, `Successfully get ${blog.title} Blog`)
})

blogController.getAllBlog = catchAsync(async (req, res, next) => {
    let { page, limit } = { ...req.query }
    filter = {
        $and: [{ isDeleted: false }]
    }
    //how to filter 
    // if (minPrice) filter.$and.push({ price: { $gte: minPrice } })
    // if (maxPrice) filter.$and.push({ price: { $lte: maxPrice } })

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalBlogs = await Blog.find(filter).countDocuments()
    console.log("totalBlogs", totalBlogs)
    const totalPages = Math.ceil(totalBlogs / limit);
    const offset = limit * (page - 1);
    const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author");

    return sendResponse(res, 200, true, { blogs, totalPages }, null, "");
})

blogController.deleteBlog = catchAsync(async (req, res, next) => {
    const blogId = req.params.id;

    const blog = await Blog.findOneAndUpdate(
        { _id: blogId },
        { isDeleted: true },
        { new: true }
    );
    if (!blog)
        return next(
            new AppError(
                400,
                "Blog not found or User not authorized",
                "Delete Blog Error"
            )
        );
    return sendResponse(res, 200, true, null, null, "Delete Blog successful");

})

module.exports = blogController