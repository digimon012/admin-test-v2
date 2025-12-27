
import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  LayoutDashboard, 
  Menu, 
  X, 
  Search, 
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/AllUsers';
import NormalUsers from './pages/NormalUsers';
import PaymentUsers from './pages/PaymentUsers';

// Fixed: Added optional marker '?' to children prop to resolve TypeScript error where JSX children were not being mapped to the required children prop.
const SidebarLink = ({ to, children, icon: Icon }: { to: string, children?: React.ReactNode, icon: any }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    {children}
  </NavLink>
);

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">AdminPro</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
              <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
              <SidebarLink to="/all-users" icon={Users}>All Users</SidebarLink>
              <SidebarLink to="/normal-users" icon={UserCheck}>Normal Users</SidebarLink>
              <SidebarLink to="/payment-users" icon={CreditCard}>Payment Users</SidebarLink>
            </nav>

            <div className="p-4 border-t border-slate-200">
              <div className="bg-slate-50 rounded-xl p-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://picsum.photos/40/40" alt="Admin" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-slate-900 leading-none">Admin User</p>
                  <p className="text-xs text-slate-500 mt-1">Super Admin</p>
                </div>
                <button className="ml-auto p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg md:hidden"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Global search..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/normal-users" element={<NormalUsers />} />
              <Route path="/payment-users" element={<PaymentUsers />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
