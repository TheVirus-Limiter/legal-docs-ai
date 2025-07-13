import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/AdBanner";
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog', slug],
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-sm text-gray-600 mb-4">
              The requested article could not be found.
            </p>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const related = relatedPosts?.filter(p => 
    p.id !== post.id && 
    (p.category === post.category || p.tags?.some(tag => post.tags?.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-last lg:order-first">
            <div className="sticky top-24 space-y-6">
              <AdBanner size="skyscraper" />
              
              {/* Article Actions */}
              <Card>
                <CardContent className="p-4">
                  <Button variant="outline" className="w-full mb-2">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </Button>
                  <div className="text-center text-sm text-neutral-600">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views || 0} views
                    </div>
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {related && related.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Related Articles</h3>
                    <div className="space-y-3">
                      {related.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                          <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-sm line-clamp-2">{relatedPost.title}</h4>
                            <p className="text-xs text-neutral-600 mt-1">{relatedPost.readTime} min read</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/blog">
                <Button variant="ghost" className="pl-0">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Featured Image */}
              {post.featuredImage && (
                <img 
                  src={`${post.featuredImage}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600`}
                  alt={post.title}
                  className="w-full h-80 object-cover"
                />
              )}

              <div className="p-8">
                {/* Article Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-blue-600">{post.category}</Badge>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
                    {post.title}
                  </h1>

                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* In-Content Ad */}
                <div className="my-8">
                  <AdBanner size="rectangle" />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </div>

                {/* Bottom Ad */}
                <div className="mt-8">
                  <AdBanner size="rectangle" />
                </div>

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-600">
                      Published on {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
