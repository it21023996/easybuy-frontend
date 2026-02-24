import React, { useState, useRef, useEffect } from 'react'
import { uploadMultipleToCloudinary } from '../api/cloudinaryApi'
import './ProductImages.css'

function ProductImages({ onImageChange, acceptedTypes = "image/*", className, existingImages = [] }) {
  const [imageUrls, setImageUrls] = useState([])
  const [uploading, setUploading] = useState(false)
  const onImageChangeRef = useRef(onImageChange);

  // Initialize with existing images when component mounts
  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setImageUrls(existingImages);
      if (onImageChange) {
        onImageChange(existingImages);
      }
    }
  }, [existingImages]); // Only run when existingImages changes

  useEffect(() => {
    onImageChangeRef.current = onImageChange;
  }, [onImageChange]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    
    if (imageUrls.length + files.length > 5) {
      alert(`You can only upload maximum 5 images. Currently you have ${imageUrls.length} images.`)
      return
    }
    
    setUploading(true)

    try {
      // Upload to Cloudinary
      const newUrls = await uploadMultipleToCloudinary(files)
      
      setImageUrls(prevUrls => {
        const updatedUrls = [...prevUrls, ...newUrls].slice(0, 5)
        if (onImageChangeRef.current) {
          onImageChangeRef.current(updatedUrls)
        }
        return updatedUrls
      })
    } catch (error) {
      console.error('Upload failed:', error)
      alert(error.message || 'Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
      e.target.value = null
    }
  }

  const removeImage = (indexToRemove) => {
    setImageUrls(prevUrls => {
      const updatedUrls = prevUrls.filter((_, index) => index !== indexToRemove)
      
      if (onImageChangeRef.current) {
         onImageChangeRef.current(updatedUrls);
      }
      
      return updatedUrls
    })
  }

  return (
    <div className="product-images">
      {/* Image preview grid */}
      {imageUrls.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {imageUrls.map((url, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img 
                src={url} 
                alt={`Product ${index + 1}`}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload section */}
      {imageUrls.length < 5 && (
        <div>
          <input
            type="file"
            className={className} 
            accept={acceptedTypes}
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            style={{
              padding: '10px',
              border: '1px dashed #ccc',
              borderRadius: '4px',
              width: '100%',
              cursor: uploading ? 'not-allowed' : 'pointer'
            }}
          />
          
          {uploading && (
            <div style={{ marginTop: '10px', color: '#666' }}>
              Uploading to Cloudinary... Please wait
            </div>
          )}
          
          <p style={{ fontSize: '14px', color: '#888', marginTop: '8px' }}>
            {imageUrls.length} of 5 images uploaded
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductImages