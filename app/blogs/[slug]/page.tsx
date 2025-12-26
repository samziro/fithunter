import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'beach-workouts-watamu',
    title: '5 Essential Beach Workouts for Watamu Fitness Enthusiasts',
    excerpt:
      "Make the most of Watamu's stunning shores with these effective beach workouts. As your personal trainer Watamu, learn sand resistance exercises that build strength naturally.",
    date: 'December 20, 2025',
    readTime: '5 min read',
    content: `
      <h2>Introduction</h2>
      <p>Living in Watamu or visiting this coastal paradise? The beach is your ultimate gym. As your personal trainer Watamu, I've designed these 5 workouts that use natural elements like sand and waves to build strength, endurance, and core power.</p>

      <h2>1. Sand Squats & Lunges</h2>
      <p>Squats and lunges in soft sand provide 2-3x more resistance than on solid ground. Do 3 sets of 12-15 reps per leg. Focus on form to maximize glute and quad activation.</p>

      <h2>2. Ocean Sprints</h2>
      <p>Run along the shoreline in ankle-deep water for high-intensity cardio. Start with 20-second sprints, recover 40 seconds. Repeat 8-10 times. Burns fat and builds explosive power.</p>

      <h2>3. Push-Up Variations on Sand</h2>
      <p>Standard push-ups, diamond, or wide-grip on unstable sand. 3 sets to failure. Engages core and shoulders deeply while reducing joint impact.</p>

      <h2>4. Plank with Hip Dips</h2>
      <p>Hold plank position and alternate dipping hips side to side. 3 sets of 20 dips per side. Targets obliques and deep core muscles.</p>

      <h2>5. Wave Burpees</h2>
      <p>Perform burpees timing the jump with incoming waves. 4 sets of 10-12 reps. Combines cardio, strength, and fun coastal energy.</p>

      <p>Book a session with your personal trainer Watamu to learn proper form and progressions. Stay hydrated and enjoy Kenya's beautiful coast!</p>
    `,
  },
  {
    slug: 'nutrition-kenya-heat',
    title: "Nutrition Tips for Training in Kenya's Tropical Climate",
    excerpt:
      "Stay energized and hydrated during your fitness coaching Kenya sessions. Discover local foods and strategies to perform at your best in the heat.",
    date: 'December 15, 2025',
    readTime: '7 min read',
    content: `
      <h2>Why Heat Matters for Training</h2>
      <p>Watamu's tropical climate increases sweat loss and energy demands. Proper nutrition prevents dehydration, fatigue, and poor recovery during your beach workouts Watamu.</p>

      <h2>Hydration Strategy</h2>
      <p>Drink 500ml water 2 hours before training, sip 200-300ml every 15-20 minutes during sessions, and rehydrate post-workout. Add coconut water or fresh fruit for electrolytes.</p>

      <h2>Pre-Workout Fuel</h2>
      <p>1-2 hours before: Banana with peanut butter, ugali with vegetables, or chapati with eggs. Focus on carbs for energy and protein for muscle protection.</p>

      <h2>Post-Workout Recovery</h2>
      <p>Within 30-60 minutes: Mango or pineapple with yogurt, or grilled fish with rice. Aim for 20-30g protein and carbs to replenish glycogen and repair muscles.</p>

      <h2>Daily Nutrition Tips</h2>
      <ul>
        <li>Include local superfoods: Avocado, mango, passion fruit, beans, and fish</li>
        <li>Eat small frequent meals to maintain energy</li>
        <li>Limit heavy fried foods before training</li>
        <li>Supplement with electrolytes if sweating heavily</li>
      </ul>

      <p>Your personal trainer Watamu can customize a nutrition plan to complement your KES 2000 training program. Stay strong in Kenya's heat!</p>
    `,
  },
  {
    slug: 'beginner-personal-training',
    title: "Beginner's Guide to Starting Personal Training in Watamu",
    excerpt:
      "New to fitness? Your personal trainer Watamu shares how to begin your journey with affordable programs at KES 2000, from goal setting to first sessions.",
    date: 'December 10, 2025',
    readTime: '6 min read',
    content: `
      <h2>Step 1: Set Clear Goals</h2>
      <p>Whether losing weight, building muscle, or improving energy, define specific, measurable goals. Your personal trainer Watamu will help refine them.</p>

      <h2>Step 2: Choose the Right Program</h2>
      <p>At KES 2000 per session or package, start with one-on-one personal training or defined abs routines. Beach workouts Watamu make learning fun.</p>

      <h2>Step 3: Prepare for Your First Session</h2>
      <p>Wear comfortable clothes, bring water, and arrive 10 minutes early. Share health history and goals with your trainer.</p>

      <h2>Step 4: What to Expect</h2>
      <p>Assessment, warm-up, main workout, cool-down. Focus on form and breathing. You'll feel challenged but supported.</p>

      <h2>Step 5: Stay Consistent</h2>
      <p>Commit to 2-3 sessions weekly. Track progress and adjust with your trainer. Results come from consistency.</p>

      <p>Ready to start? Book a free consultation with Fit Hunter today. Your transformation begins with that first step!</p>
    `,
  },
];

export default function Page({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blogs" className="text-blue-600 mb-6 inline-block">
          ← Back to Blog
        </Link>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500">{post.date} • {post.readTime}</p>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </div>
    </div>
  );
}