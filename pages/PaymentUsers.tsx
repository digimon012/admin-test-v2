
import React, { useState, useMemo } from 'react';
import { Search, CreditCard, DollarSign, Calendar, MapPin, Tag, CheckCircle } from 'lucide-react';
import { mockPayments, mockUsers } from '../mockData';
import { PaymentUserWithDetails } from '../types';

const PaymentUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const paymentRecords = useMemo(() => {
    return mockPayments.map(payment => ({
      ...payment,
      user_details: mockUsers.find(u => u.uid === payment.uid)
    })).filter(p => 
      p.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.rid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Payment Records</h2>
        <p className="text-slate-500">Track and manage financial transactions across the platform.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by UID, RID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {paymentRecords.map((pay) => (
            <div key={pay.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
              <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm mr-3">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-wider">{pay.rid}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  pay.payment_status === 'authorised' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {pay.payment_status}
                </span>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{pay.first_name} {pay.last_name}</h4>
                    <p className="text-xs text-slate-400 font-medium">UID: {pay.uid}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">${pay.amount}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Amount (HKD)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      <Tag className="w-3 h-3 mr-1" /> Target
                    </div>
                    <div className="text-xs font-semibold text-slate-700 uppercase">{pay.target}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      <Calendar className="w-3 h-3 mr-1" /> Date
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{new Date(pay.reg_time).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-xs text-slate-500 font-medium">
                    <MapPin className="w-3 h-3 mr-1.5 opacity-40" />
                    {pay.city}, {pay.country}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center transition-colors">
                    Details
                    <CheckCircle className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                </div>
              </div>

              {pay.user_details && (
                <div className="px-5 py-3 bg-blue-50/50 border-t border-blue-100">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-blue-600 font-bold uppercase">Account Linked</span>
                    <span className="text-blue-400 font-medium">{pay.user_details.email}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {paymentRecords.length === 0 && (
          <div className="py-24 text-center">
            <DollarSign className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-slate-900 font-bold">No payment records found</h3>
            <p className="text-slate-500 text-sm">Clear your filters or search for another record.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentUsers;
