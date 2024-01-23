// EducatorController.mjs
import { Educator } from './EducatorModel.mjs';

// Create a new educator
export async function createEducator(data) {
  try {
    const educator = new Educator(data);
    await educator.save();
    return educator;
  } catch (error) {
    console.error('Error creating educator:', error);
  }
}

// Get educator by ID
export async function getEducatorById(id) {
  try {
    const educator = await Educator.findById(id).populate('students adventures');
    return educator;
  } catch (error) {
    console.error('Error fetching educator:', error);
  }
}

// Update an educator
export async function updateEducator(id, data) {
  try {
    const educator = await Educator.findByIdAndUpdate(id, data, { new: true });
    return educator;
  } catch (error) {
    console.error('Error updating educator:', error);
  }
}

// Delete an educator
export async function deleteEducator(id) {
  try {
    await Educator.findByIdAndDelete(id);
    console.log('Educator deleted successfully.');
  } catch (error) {
    console.error('Error deleting educator:', error);
  }
}
