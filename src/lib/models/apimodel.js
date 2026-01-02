import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 70,
  },
  description: { type: String, required: true, maxlength: 1000 },
  documentation: { type: String, required: true },
  category: { type: String, required: true },
  apiEndpint: { type: String, required: true },
});

export default mongoose.models.Api || mongoose.model("Api", apiSchema);
