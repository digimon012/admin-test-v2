
import React, { useState, useMemo } from 'react';
import { Search, Filter, Mail, Phone, ExternalLink } from 'lucide-react';
import { mockUsers } from '../mockData';
import { User } from '../types';

const AllUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => 
      user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Users</h2>
          <p className="text-slate-500">Overview of every user in the database system.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by UID, name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type / Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Inviter / Guest</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">UTM</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {user.first_name[0]}{user.last_name[0]}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-semibold text-slate-900">{user.title} {user.first_name} {user.last_name}</div>
                        <div className="text-xs text-slate-500">{user.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {user.user_type.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${user.user_status === 'registered' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                        <span className="text-xs text-slate-600">{user.user_status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center text-slate-600">
                        <span className={`w-3 h-3 rounded mr-2 ${user.bf === 'true' ? 'bg-indigo-500' : 'bg-slate-200'}`}></span>
                        Beauty Fitting: {user.bf === 'true' ? 'Yes' : 'No'}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <span className={`w-3 h-3 rounded mr-2 ${user.cafe === 'true' ? 'bg-orange-500' : 'bg-slate-200'}`}></span>
                        Cafe: {user.cafe === 'true' ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs space-y-1">
                      <div className="text-slate-600">Inviter: {user.inviter_uid || 'N/A'}</div>
                      <div className="text-slate-600">With Guest: {user.with_guest === 'false' ? 'No' : user.with_guest}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-slate-500 truncate block max-w-[120px]">
                      {user.utm || 'None'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-blue-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-semibold">No users found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
