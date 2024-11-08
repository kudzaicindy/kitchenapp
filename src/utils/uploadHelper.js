import { supabase } from '../supabaseClient';

const logError = (error, context) => {
  console.error(`Error in ${context}:`, error);
  if (error.message) console.error('Message:', error.message);
  if (error.statusCode) console.error('Status:', error.statusCode);
  if (error.details) console.error('Details:', error.details);
};

export const uploadExistingImageToSupabase = async (imageUrl, filename) => {
  try {
    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) throw authError;
    if (!session) throw new Error('No active session');

    // Import the image as a module
    const imageModule = await import(
      /* @vite-ignore */
      imageUrl
    );

    // Convert image to base64
    const response = await fetch(imageModule.default);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const blob = await response.blob();

    // Upload to Supabase
    const { data, error: uploadError } = await supabase.storage
      .from('items')
      .upload(filename, blob, {
        cacheControl: '3600',
        upsert: true,
        contentType: blob.type
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('items')
      .getPublicUrl(filename);

    console.log('Successfully uploaded:', publicUrl);
    return publicUrl;

  } catch (error) {
    logError(error, 'uploadExistingImageToSupabase');
    return null;
  }
}; 