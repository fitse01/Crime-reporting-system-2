import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Clock, MapPin, AlertTriangle, FileText } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { ApiService } from '../../services/mockApi';
import { Notice, BlogSummary } from '../../types';

const Home: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesData, blogsData] = await Promise.all([
          ApiService.getNotices(),
          ApiService.getBlogs()
        ]);
        setNotices(noticesData);
        setBlogs(blogsData);
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-authBlue py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1453873419266-ec651728e632?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Building a Safer <span className="text-cyan-500">Adama City</span> <br /> Together
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Report incidents anonymously, track real-time progress, and stay informed about public safety in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/report/new">
              <Button variant="primary" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-cyan-500/25">
                Report a Crime Now
              </Button>
            </Link>
            <Link to="/track">
              <Button variant="outline" className="h-14 px-8 text-lg rounded-full text-white border-white hover:bg-white/10 hover:text-white">
                Track Existing Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 -mt-20 relative z-20">
          <Card className="p-8 shadow-lg border-t-4 border-t-cyan-500 hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Anonymous</h3>
            <p className="text-gray-600 leading-relaxed">
              Your safety is our priority. Submit reports without revealing your identity if you choose. We use advanced encryption to protect your data.
            </p>
          </Card>
          <Card className="p-8 shadow-lg border-t-4 border-t-authBlue hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 bg-blue-100 text-authBlue rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Get a unique case number to track the status of your report from submission to resolution. Receive updates as officers investigate.
            </p>
          </Card>
          <Card className="p-8 shadow-lg border-t-4 border-t-cyan-500 hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-6">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Geo-Routing</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI-enhanced system automatically routes your report to the nearest available officer based on location for the fastest response time.
            </p>
          </Card>
        </div>
      </section>

      {/* Public Notices */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-charcoal">Public Safety Notices</h2>
            <p className="text-gray-500 mt-2">Latest alerts, wanted persons, and missing reports.</p>
          </div>
          <Link to="/notices" className="text-cyan-600 font-medium hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {notices.slice(0, 3).map(notice => (
              <Card key={notice.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img src={notice.imageUrl} alt={notice.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${notice.type === 'WANTED' ? 'bg-red-600' : notice.type === 'MISSING' ? 'bg-yellow-500' : 'bg-blue-600'}`}>
                    {notice.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-charcoal group-hover:text-cyan-600 transition-colors">{notice.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{notice.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{notice.date}</span>
                    <span className="flex items-center text-cyan-600 cursor-pointer">Details <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Stats Banner */}
      <section className="bg-charcoal text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-2">1.2k</div>
              <div className="text-gray-400 font-medium">Reports Solved</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-2">15min</div>
              <div className="text-gray-400 font-medium">Avg. Response</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Active Monitoring</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-2">50+</div>
              <div className="text-gray-400 font-medium">Dedicated Officers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-bold text-charcoal">From the Blog</h2>
           <Link to="/blog" className="text-cyan-600 font-medium hover:underline flex items-center">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
             <div className="col-span-2 h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          ) : (
            blogs.map(blog => (
              <div key={blog.id} className="flex gap-6 items-start group cursor-pointer">
                <div className="w-1/3 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-xs text-cyan-600 font-bold mb-1 uppercase tracking-wider">Safety Tip</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-cyan-600 transition-colors">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{blog.summary}</p>
                  <span className="text-xs text-gray-400">{blog.date} • By {blog.author}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center py-12">
        <div className="bg-gradient-to-r from-authBlue to-blue-800 rounded-2xl p-10 md:p-16 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Something? Say Something.</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">Your report can save a life. It takes less than 2 minutes to file a report, and you can remain completely anonymous.</p>
          <Link to="/report/new">
            <Button className="bg-white text-authBlue hover:bg-gray-100 h-12 px-8 text-base font-bold">Start Report</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;