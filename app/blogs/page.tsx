import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';


interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured_image?: string | null;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // fallback hardcoded posts
    return [
      {
        slug: 'beach-workouts-watamu',
        title: '5 Essential Beach Workouts for Watamu Fitness Enthusiasts',
        excerpt:
          "Make the most of Watamu's stunning shores with these effective beach workouts. As your personal trainer Watamu, learn sand resistance exercises that build strength naturally.",
        date: 'December 20, 2025',
        readTime: '5 min read',
        featured_image: '/mike.jpg',
      },
      {
        slug: 'nutrition-kenya-heat',
        title: "Nutrition Tips for Training in Kenya's Tropical Climate",
        excerpt:
          "Stay energized and hydrated during your fitness coaching Kenya sessions. Discover local foods and strategies to perform at your best in the heat.",
        date: 'December 15, 2025',
        readTime: '7 min read',
        featured_image: '/mike.jpg',
      },
    ];
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.from('blogs').select('slug,title,excerpt,created_at,read_time,featured_image');

  if (error || !data) return [];

  return data.map((row: any) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: new Date(row.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: row.read_time || '5 min read',
    featured_image: row.featured_image || '/mike.jpg',
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Fit Hunter Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, workout guides, and motivation from your personal trainer Watamu. Discover coastal fitness insights for your transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="aspect-video relative">
                  <Image src={post.featured_image || '/mike.jpg'} alt={post.title} fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm">{post.date} • {post.readTime}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Read More →</span>
                </div>
              </Link>
              <div className="p-4 border-t flex justify-end gap-2">
                <DeletePostButton slug={post.slug} />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">More posts coming soon...</p>
        </div>
      </div>
    </div>
  );
}
