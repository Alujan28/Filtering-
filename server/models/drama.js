const mongoose = require('mongoose');

const DramaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Ensure this field exists
    year: { type: Number, required: true },
    genre: { type: [String], required: true },
    rating: { type: Number, required: true }
});

module.exports = mongoose.model("Drama", DramaSchema);
