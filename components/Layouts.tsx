import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, Bell, LogOut, LayoutDashboard, FileText, Users, MapPin, Search } from 'lucide-react';
import { Button } from './ui';

interface LayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-linen font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-authBlue/95 backdrop-blur text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold tracking-tight">Adama CRS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className={`hover:text-cyan-400 transition-colors ${isActive('/') ? 'text-cyan-500' : ''}`}>Home</Link>
            <Link to="/notices" className={`hover:text-cyan-400 transition-colors ${isActive('/notices') ? 'text-cyan-500' : ''}`}>Notices</Link>
            <Link to="/track" className={`hover:text-cyan-400 transition-colors ${isActive('/track') ? 'text-cyan-500' : ''}`}>Track Report</Link>
            <Link to="/blog" className={`hover:text-cyan-400 transition-colors ${isActive('/blog') ? 'text-cyan-500' : ''}`}>Safety Blog</Link>
            <Link to="/login" className="hover:text-cyan-400 transition-colors">Staff Login</Link>
            <Link to="/report/new">
              <Button variant="primary" className="shadow-lg shadow-cyan-500/20">Report Crime</Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-800 bg-authBlue p-4 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium hover:text-cyan-400">Home</Link>
            <Link to="/notices" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium hover:text-cyan-400">Notices</Link>
            <Link to="/track" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium hover:text-cyan-400">Track Report</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium hover:text-cyan-400">Safety Blog</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium hover:text-cyan-400">Staff Login</Link>
            <Link to="/report/new" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button className="w-full">Report Crime</Button>
            </Link>
          </div>
        )}
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-charcoal text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-bold text-white">Adama CRS</span>
            </div>
            <p className="text-sm text-gray-400">Ensuring safety and rapid response for the citizens of Adama City through technology and community cooperation.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/report/new" className="hover:text-cyan-500">Report Incident</Link></li>
              <li><Link to="/track" className="hover:text-cyan-500">Track Status</Link></li>
              <li><Link to="/notices" className="hover:text-cyan-500">Public Notices</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-500">Emergency Contacts</a></li>
              <li><a href="#" className="hover:text-cyan-500">Police Stations</a></li>
              <li><a href="#" className="hover:text-cyan-500">Legal Aid</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Emergency</h3>
            <div className="text-2xl font-bold text-red-500">911</div>
            <p className="text-sm text-gray-400 mt-1">For immediate life-threatening emergencies.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Adama City Police Department. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className={`bg-authBlue text-white fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 lg:w-20 lg:translate-x-0'} flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-blue-800 px-4">
          <Shield className="h-8 w-8 text-cyan-500" />
          {sidebarOpen && <span className="ml-2 font-bold text-lg">Officer Portal</span>}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
            { path: '/dashboard/reports', label: 'Reports', icon: FileText },
            { path: '/dashboard/officers', label: 'Officers', icon: Users },
            { path: '/dashboard/map', label: 'Live Map', icon: MapPin },
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive(item.path) ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
           <button 
             onClick={() => navigate('/')} 
             className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors`}
           >
             <LogOut className="h-5 w-5 flex-shrink-0" />
             {sidebarOpen && <span>Logout</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-8 lg:block hidden">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search case numbers, officers..." 
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all" 
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-8 bg-authBlue rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};