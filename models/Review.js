const mongoose = require("mongoose");
const Blog = require("./Blog");
const Product = require("./Product")
const Schema = mongoose.Schema;

const reviewSchema = Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.ObjectId, required: true, ref: "User" },
        blog: { type: Schema.ObjectId, required: false, ref: "Blog" },
        likeCount: { type: Number, default: 0 },
        product: { type: Schema.ObjectId, required: false, ref: "Product" },
        rating: { type: Number, },
    },
    { timestamps: true },
);

reviewSchema.statics.calculateReviews = async function (blogId) {
    const reviewCount = await this.find({ blog: blogId }).countDocuments();
    await Blog.findByIdAndUpdate(blogId, { reviewCount: reviewCount });
};


reviewSchema.statics.calculateAverage = async function (product) {
    const ans = await Review.aggregate().match({ product: product }).group({
        "_id": null,
        "average": { "$avg": "$rating" }
    });
    await Product.findByIdAndUpdate(product, { averageRating: ans[0].average })

}

reviewSchema.post("save", async function () {
    await this.constructor.calculateReviews(this.blog);
    await this.constructor.calculateAverage(this.product);

});

// Neither findByIdAndUpdate norfindByIdAndDelete have access to document middleware.
// They only get access to query middleware
// Inside this hook, this will point to the current query, not the current review.
// Therefore, to access the review, we’ll need to execute the query
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.doc = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
    await this.doc.constructor.calculateReviews(this.doc.blog);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
