const { Schema, model, Types } = require('mongoose');

const offerSchema = new Schema({
    title: { type: String, required: true, minlength: [3, 'Title must be at least 3 characters long!'] },
    description: { type: String, required: true, minlength: [5, 'Description must be at least 5 characters long!'] },
    price: { type: Number, required: true, min: [10, 'Price must be at least 10 EUR!'] },
    city: { type: String, required: true, minlength: [3, 'City must be at least 5 letters!'] },
    imageUrl: { type: String, required: [true, 'Image URL is required!'] },
    _ownerId: { type: String, ref: 'User', required: true },
    likes: { type: Array, default: [], required: false },
    comments: { type: Array, default: [], required: [false, [5, 'Comment must be at least 5 letters!']] }

}, { timestamps: { createdAt: 'created_at' } });

const Offer = model('Offer', offerSchema);

module.exports = Offer;