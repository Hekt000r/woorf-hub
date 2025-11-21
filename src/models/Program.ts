import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
  name: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  alternativesTo: string[];
}

const ProgramSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  alternativesTo: { type: [String], default: [] },
});

// Add text index for efficient searching
ProgramSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text', 
  alternativesTo: 'text' 
});

// Check if the model is already compiled to prevent OverwriteModelError
const Program: Model<IProgram> = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

export default Program;
