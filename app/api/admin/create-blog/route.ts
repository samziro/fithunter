import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await request.json();

  const { data, error } = await supabase
    .from('blogs')
    .insert([{
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      featured_image: body.featured_image,
    }]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true, data });
}