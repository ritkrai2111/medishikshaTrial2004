const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    category: {type:[String],required:true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true}
    // Add other fields as needed
});



const Course = mongoose.model('Course', courseSchema);

module.exports = Course;