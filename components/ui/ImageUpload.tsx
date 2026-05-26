// components/ui/ImageUpload.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  multiple?: boolean;
  maxImages?: number;
  existingImages?: string[];
  folder?: string;
  label?: string;
}

export default function ImageUpload({ 
  onImagesUploaded, 
  multiple = true, 
  maxImages = 5,
  existingImages = [],
  folder = 'general',
  label = 'Images'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(existingImages);

  useEffect(() => {
    setImages(existingImages);
  }, [existingImages]);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Erreur lors de l\'upload');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images autorisées`);
      return;
    }

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error('Seules les images sont autorisées');
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      toast.error('Les images ne doivent pas dépasser 5MB');
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
        toast.success(`${file.name} uploadé avec succès`);
      } catch (error) {
        toast.error(`Erreur lors de l'upload de ${file.name}`);
      }
    }

    const newImages = [...images, ...uploadedUrls];
    setImages(newImages);
    onImagesUploaded(newImages);
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex items-center gap-4 flex-wrap">
        <label className={`cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 inline-flex items-center gap-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <span>{uploading ? '⏳' : '📸'}</span>
          <span>{uploading ? 'Upload en cours...' : 'Choisir des images'}</span>
          <input
            type="file"
            multiple={multiple}
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploading && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-500">Upload en cours...</span>
          </div>
        )}
        <p className="text-sm text-gray-500">
          {images.length}/{maxImages} images
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-3">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={img} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Formats acceptés : JPG, PNG, GIF. Taille max : 5MB par image
      </p>
    </div>
  );
}