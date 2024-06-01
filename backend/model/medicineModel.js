import mongoose, { Schema, model } from 'mongoose';
import slugify from 'slugify';

const medicineSchema = new mongoose.Schema({
  id: Number,
  category: String,
  medicine: Array,
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Middleware to generate slug before saving the document
medicineSchema.pre('save', function(next) {
  if (this.isModified('category') || this.isNew) {
    this.slug = slugify(this.category, {
      lower: true,
      strict: true
    });
  }
  next();
});

const medicineModel = model('medicine', medicineSchema);
export default medicineModel;
