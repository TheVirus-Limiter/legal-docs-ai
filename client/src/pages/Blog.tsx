import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdBanner } from "@/components/AdBanner";
import { useQuery } from "@tanstack/react-query";
import { SEOHead, SEOConfigs } from "@/components/SEOHead";
import { Search, Calendar, User, Eye, BookOpen } from "lucide-react";
import { Link } from "wouter";

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

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const categories = blogPosts ? [...new Set(blogPosts.map(post => post.category))] : [];
  const popularPosts = blogPosts ? [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading legal insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHead {...SEOConfigs.blog} />
      {/* Header Ad */}
      <AdBanner size="leaderboard" className="max-w-7xl mx-auto px-4 py-2" />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Legal Insights & Resources
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Stay informed with expert legal analysis, business formation guides, and compliance insights 
              to help your business succeed while staying legally protected.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input 
                placeholder="Search legal topics, business guides, compliance..."
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              <AdBanner size="skyscraper" />
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-neutral-700 hover:text-blue-600 cursor-pointer">
                        {category}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {blogPosts?.filter(post => post.category === category).length}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Most Popular
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="text-sm font-medium text-neutral-800 group-hover:text-blue-600 line-clamp-2 cursor-pointer">
                          {post.title}
                        </h4>
                      </Link>
                      <div className="flex items-center text-xs text-neutral-500 mt-1">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views} views
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {blogPosts && blogPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Featured Article</h2>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {blogPosts[0].category}
                      </Badge>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(blogPosts[0].publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-neutral-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {blogPosts[0].views} views
                      </div>
                    </div>
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                      <h3 className="text-2xl font-bold text-neutral-800 mb-3 hover:text-blue-600 cursor-pointer">
                        {blogPosts[0].title}
                      </h3>
                    </Link>
                    <p className="text-neutral-600 mb-4 text-lg">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-500">
                        <User className="w-4 h-4 mr-1" />
                        {blogPosts[0].author}
                      </div>
                      <Link href={`/blog/${blogPosts[0].slug}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* In-Content Ad */}
            <AdBanner size="rectangle" className="mb-12" />

            {/* All Posts Grid */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Latest Legal Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts?.slice(1).map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-neutral-500">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <CardTitle className="hover:text-blue-600 cursor-pointer line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link href={`/blog/${post.slug}`}>
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Read Full Article
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Legal Disclaimer */}
            <section className="mt-12 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Notice</h3>
              <p className="text-yellow-700 text-sm">
                The information provided in these articles is for educational purposes only and does not constitute legal advice. 
                Laws vary by jurisdiction and change frequently. Always consult with a qualified attorney for legal advice 
                specific to your situation before making any legal decisions.
              </p>
            </section>

            {/* Bottom Ad */}
            <div className="mt-12">
              <AdBanner size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}