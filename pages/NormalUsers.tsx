
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Calendar
} from 'lucide-react';
import { mockUsers, mockReservations } from '../mockData';
import { NormalUserWithReservation } from '../types';

const Modal = ({ isOpen, onClose, title, children, footer }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

const NormalUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<NormalUserWithReservation | null>(null);
  const [modalType, setModalType] = useState<'sms' | 'timeslot' | null>(null);
  const [newTimeslot, setNewTimeslot] = useState('');

  const normalUsers = useMemo(() => {
    return mockUsers
      .filter(u => u.user_type.includes('normal'))
      .map(user => ({
        ...user,
        reservation: mockReservations.find(r => r.uid === user.uid)
      }))
      .filter(u => 
        u.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  const handleExportCSV = () => {
    const headers = "ID,UID,Title,First Name,Last Name,Country Code,Phone,Email,Status,BF,Cafe,With Guest,Inviter,Reg Time,UTM,Reserve Date,Timeslot\n";
    const rows = normalUsers.map(u => [
      u.id, u.uid, u.title, u.first_name, u.last_name, u.country_code, u.phone, u.email,
      u.user_status, u.bf, u.cafe, u.with_guest, u.inviter_uid || '', u.reg_time, u.utm || '',
      u.reservation?.reserve_date || '', u.reservation?.time_slot || ''
    ].join(",")).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `normal_users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleResendSMS = () => {
    // Simulated SMS API call
    console.log(`Resending SMS to ${selectedUser?.phone}`);
    setModalType(null);
    setSelectedUser(null);
    alert('SMS resend triggered successfully!');
  };

  const handleChangeTimeslot = () => {
    console.log(`Changing timeslot for ${selectedUser?.uid} to ${newTimeslot}`);
    setModalType(null);
    setSelectedUser(null);
    alert('Timeslot updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Normal Users</h2>
          <p className="text-slate-500">Manage standard user accounts and reservations.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Data (CSV)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter normal users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Profile</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Reservation</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {normalUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">{user.title} {user.first_name} {user.last_name}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">UID: {user.uid}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs text-slate-600">
                        <MessageSquare className="w-3 h-3 mr-1.5 opacity-50" />
                        {user.phone}
                      </div>
                      <div className="flex items-center text-xs text-slate-600">
                        <CheckCircle2 className="w-3 h-3 mr-1.5 opacity-50" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.reservation ? (
                      <div className="bg-blue-50/50 border border-blue-100 p-2 rounded-lg inline-block">
                        <div className="flex items-center text-xs font-medium text-blue-700">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          {user.reservation.reserve_date}
                        </div>
                        <div className="flex items-center text-[10px] text-blue-500 mt-0.5">
                          <Clock className="w-2.5 h-2.5 mr-1" />
                          {user.reservation.time_slot}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No Booking</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      user.user_status === 'registered' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {user.user_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => { setSelectedUser(user); setModalType('timeslot'); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        title="Change Timeslot"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedUser(user); setModalType('sms'); }}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                        title="Resend SMS"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resend SMS Modal */}
      <Modal
        isOpen={modalType === 'sms'}
        onClose={() => setModalType(null)}
        title="Confirm SMS Resend"
        footer={
          <>
            <button onClick={() => setModalType(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button onClick={handleResendSMS} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-500/20 transition-all">Confirm & Send</button>
          </>
        }
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-100 rounded-full shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to resend the confirmation SMS to <span className="font-bold text-slate-900">{selectedUser?.first_name} {selectedUser?.last_name}</span> at <span className="font-bold text-slate-900">{selectedUser?.phone}</span>?
            </p>
            <p className="text-xs text-slate-400 mt-2 italic">Standard carrier rates may apply.</p>
          </div>
        </div>
      </Modal>

      {/* Change Timeslot Modal */}
      <Modal
        isOpen={modalType === 'timeslot'}
        onClose={() => setModalType(null)}
        title="Update Timeslot"
        footer={
          <>
            <button onClick={() => setModalType(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button onClick={handleChangeTimeslot} className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-lg shadow-emerald-500/20">Update Reservation</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Select New Timeslot</label>
            <select 
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={newTimeslot}
              onChange={(e) => setNewTimeslot(e.target.value)}
            >
              <option value="">Choose a slot...</option>
              <option value="10:00 - 11:00">10:00 AM - 11:00 AM</option>
              <option value="11:30 - 12:30">11:30 AM - 12:30 PM</option>
              <option value="14:00 - 15:00">02:00 PM - 03:00 PM</option>
              <option value="15:30 - 16:30">03:30 PM - 04:30 PM</option>
            </select>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 flex items-center">
              <Clock className="w-3 h-3 mr-2 shrink-0" />
              Current: {selectedUser?.reservation?.time_slot || 'No slot assigned'}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NormalUsers;
