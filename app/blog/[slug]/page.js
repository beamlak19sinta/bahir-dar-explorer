import { blogPosts } from '@/lib/data';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();
  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  return <BlogPostClient post={post} related={related} />;
}
