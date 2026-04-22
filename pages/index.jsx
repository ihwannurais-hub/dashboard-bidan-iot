import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, Bell, Search, AlertCircle, 
  CheckCircle2, Clock, HeartPulse, LayoutDashboard, 
  Settings, ChevronRight, UserCircle2, Plus, X
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_PATIENTS = [
  { id: 1, name: 'Ny. Siti Aminah', age: 28, gestation: '32 Minggu', kicksToday: 12, lastUpdate: 'Baru saja', status: 'Normal', deviceId: 'SABUK-001', history: [2, 1, 3, 2, 0, 1, 3] },
  { id: 2, name: 'Ny. Rina Marlina', age: 31, gestation: '35 Minggu', kicksToday: 4, lastUpdate: '2 jam lalu', status: 'Waspada', deviceId: 'SABUK-002', history: [0, 1, 0, 1, 1, 0, 1] },
];

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(INITIAL_PATIENTS[1]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPatientForm, setNewPatientForm] = useState({ name: '', age: '', gestation: '', deviceId: '' });

  // Fungsi Tambah Pasien
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      ...newPatientForm,
      kicksToday: 0,
      lastUpdate: 'Menunggu Alat...',
      status: 'Waspada',
      history: [0, 0, 0, 0, 0, 0, 0]
    };
    setPatients([newPatient, ...patients]);
    setIsAddModalOpen(false);
    setNewPatientForm({ name: '', age: '', gestation: '', deviceId: '' });
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden leading-relaxed">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-teal-800 text-white flex flex-col hidden md:flex">
        <div className="p-6 bg-teal-900 border-b border-teal-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-400" /> FetalCare
          </h1>
          <p className="text-teal-300 text-[10px] mt-1 tracking-widest uppercase font-bold">Tele-Monitoring Bidan</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-teal-900 rounded-lg text-sm font-medium shadow-inner border border-teal-700/50">
            <LayoutDashboard className="w-4 h-4 text-teal-300" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-teal-100 hover:bg-teal-900/50 rounded-lg text-sm transition-all">
            <Users className="w-4 h-4" /> Daftar Pasien
          </button>
        </nav>
        <div className="p-4 border-t border-teal-700">
           <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-xs uppercase">B</div>
              <div>
                <p className="text-xs font-bold">Bdn. Rahmawati</p>
                <p className="text-[10px] text-teal-400">Klinik Kasih Ibu</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 z-10">
          <h2 className="font-bold text-slate-700">Dashboard Pemantauan Janin</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Tambah Pasien Baru
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pemantauan Pasien Aktif</span>
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live Data
               </span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="p-4">Identitas Pasien</th>
                  <th className="p-4">ID Alat (Sabuk)</th>
                  <th className="p-4 text-center">Tendangan (12 Jam)</th>
                  <th className="p-4">Kondisi Saat Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map(p => (
                  <tr key={p.id} onClick={() => setSelectedPatient(p)} className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedPatient.id === p.id ? 'bg-teal-50/50' : ''}`}>
                    <td className="p-4">
                      <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.age} thn • {p.gestation}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-100">
                        {p.deviceId}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-black text-xl tracking-tighter ${p.kicksToday < 10 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {p.kicksToday}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1">/10</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        p.status === 'Normal' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Pop-up Registrasi */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <UserCircle2 className="w-5 h-5 text-teal-600" /> Registrasi Pasien & Alat
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Nama Pasien</label>
                  <input required placeholder="Ny. Ayu Pertiwi" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" onChange={e => setNewPatientForm({...newPatientForm, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Usia Ibu</label>
                    <input type="number" required placeholder="28" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" onChange={e => setNewPatientForm({...newPatientForm, age: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Kandungan</label>
                    <input required placeholder="30 Minggu" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" onChange={e => setNewPatientForm({...newPatientForm, gestation: e.target.value + ' Minggu'})} />
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                  <label className="text-[10px] font-black text-teal-800 uppercase block mb-1">KODE ALAT (DEVICE ID)</label>
                  <p className="text-[10px] text-teal-600 mb-2 italic">Samakan dengan kode yang ada di sabuk fisik pasien.</p>
                  <input required placeholder="Contoh: SABUK-001" className="w-full p-2.5 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-600 outline-none text-sm font-mono uppercase font-bold" onChange={e => setNewPatientForm({...newPatientForm, deviceId: e.target.value})} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-2.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 shadow-md transition-all active:scale-95">Simpan Data</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}