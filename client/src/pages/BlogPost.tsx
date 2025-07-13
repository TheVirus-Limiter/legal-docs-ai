import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/AdBanner";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, Eye, ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "wouter";
import { SEOHead, createBlogPostSEO } from "@/components/SEOHead";
// Simple markdown-like content renderer

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  views: number;
  tags: string[];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const post = blogPosts?.find(p => p.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Article Not Found</h1>
          <p className="text-neutral-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {post && <SEOHead {...createBlogPostSEO(post)} />}
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AdBanner size="skyscraper" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b">
                <div className="flex items-center space-x-4 mb-6">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime || 5} min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-neutral-800 mb-4 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-neutral-500">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">By {post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views} views
                  </div>
                </div>
              </div>

              {/* In-Content Ad */}
              <div className="p-8 border-b">
                <AdBanner size="rectangle" />
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-neutral-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-neutral-800 mb-6 mt-8">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-neutral-800 mb-4 mt-8">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-neutral-800 mb-3 mt-6">$1</h3>')
                        .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-semibold text-neutral-800 mb-2 mt-4">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-800">$1</strong>')
                        .replace(/^\- (.*$)/gm, '<li class="leading-relaxed mb-2">$1</li>')
                        .replace(/(<li.*?>.*?<\/li>)/gms, '<ul class="list-disc list-inside mb-4 space-y-2 text-neutral-700">$1</ul>')
                        .replace(/\n\n/g, '</p><p class="text-neutral-700 mb-4 leading-relaxed">')
                        .replace(/^(?!<[h|u|l])/gm, '<p class="text-neutral-700 mb-4 leading-relaxed">')
                        .replace(/$(?![<\/])/gm, '</p>')
                    }}
                  />
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-12 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Notice</h4>
                  <p className="text-yellow-700 text-sm">
                    This article is provided for educational and informational purposes only and does not constitute legal advice. 
                    Laws vary by jurisdiction and change frequently. Always consult with a qualified attorney for legal advice 
                    specific to your situation before making any legal decisions or taking any legal actions.
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-lg font-semibold text-neutral-800 mb-3">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Bottom Ad */}
            <div className="mt-8">
              <AdBanner size="rectangle" />
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  ?.filter(p => p.slug !== slug && p.category === post.category)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 w-fit">
                          {relatedPost.category}
                        </Badge>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <CardTitle className="hover:text-blue-600 cursor-pointer line-clamp-2">
                            {relatedPost.title}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600 mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-neutral-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {relatedPost.author}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {relatedPost.views}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}