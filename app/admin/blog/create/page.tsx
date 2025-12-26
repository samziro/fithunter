'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>Start writing your blog post...</p>',
  });

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageFile);

    if (error) {
      alert('Image upload failed');
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    setImageUrl(publicUrl.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!editor || !title || !slug) return;

    const content = editor.getHTML();

    // Use server action or API route with service role for insert
    const res = await fetch('/api/admin/create-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        content,
        featured_image: imageUrl,
      }),
    });

    if (res.ok) {
      router.push('/admin/blogs'); // or dashboard
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Create New Blog Post</h1>

        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Slug (e.g., beach-workouts-watamu)"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <textarea
            placeholder="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl h-32"
          />

          <div>
            <label>Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            />
            <button onClick={handleImageUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {imageUrl && <p>Uploaded: {imageUrl}</p>}
          </div>

          <div className="border rounded-xl p-4">
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}