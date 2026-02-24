// cloudinaryApi.js

// Your Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dyauplbkz'; // Get from Cloudinary Dashboard
const CLOUDINARY_UPLOAD_PRESET = 'product_images'; // Create this in Cloudinary Settings

/**
 * Upload a single image to Cloudinary
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data.secure_url; // This is the URL you'll store
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {File[]} files - Array of files to upload
 * @returns {Promise<string[]>} - Array of secure URLs
 */
export const uploadMultipleToCloudinary = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadToCloudinary(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary (if needed)
 * @param {string} publicId - The public ID of the image
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFromCloudinary = async (publicId) => {
  // Note: Deletion usually requires a backend for security
  // This is a placeholder - you'll need a backend endpoint
  console.warn('Delete from Cloudinary requires backend implementation');
  return false;
};