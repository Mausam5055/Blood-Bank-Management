
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoUpdated: (newPhotoUrl: string) => void;
}

const ProfilePhotoUpload = ({ currentPhotoUrl, onPhotoUpdated }: ProfilePhotoUploadProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // Delete old avatar if it exists
      if (currentPhotoUrl) {
        const oldFileName = currentPhotoUrl.split('/').pop();
        if (oldFileName && oldFileName.includes(user.id)) {
          await supabase.storage
            .from('user-uploads')
            .remove([`avatars/${oldFileName}`]);
        }
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Update user profile
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }

      onPhotoUpdated(publicUrl);
      toast({
        title: "Success!",
        description: "Profile photo updated successfully",
      });
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="relative group">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden shadow-lg">
          {currentPhotoUrl ? (
            <img 
              src={currentPhotoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image load error:', e);
                // Fallback to initials if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            user?.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() ||
            user?.email?.substring(0, 2).toUpperCase() ||
            'U'
          )}
        </div>
        
        <Button
          onClick={handleButtonClick}
          disabled={uploading}
          size="sm"
          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 p-0 shadow-lg"
        >
          {uploading ? (
            <Loader className="w-3 h-3 animate-spin" />
          ) : (
            <Camera className="w-3 h-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
