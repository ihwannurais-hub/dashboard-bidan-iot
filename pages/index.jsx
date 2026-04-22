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
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-800 text-white flex flex-col hidden md:flex">
        <div className="p-6 bg-teal-900 border-b border-teal-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-400" /> FetalCare
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-teal-900 rounded-lg text-sm">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6">
          <h2 className="font-bold text-lg">Dashboard Pemantauan Janin</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Pasien
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-4">Pasien</th>
                  <th className="p-4">ID Alat</th>
                  <th className="p-4 text-center">Tendangan</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.map(p => (
                  <tr key={p.id} onClick={() => setSelectedPatient(p)} className="hover:bg-slate-50 cursor-pointer">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-sm font-mono text-teal-600">{p.deviceId}</td>
                    <td className="p-4 text-center font-bold text-lg">{p.kicksToday}</td>
                    <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Pop-up */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-lg">Registrasi Pasien & Alat</h3>
                <button onClick={() => setIsAddModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <input required placeholder="Nama Ibu Hamil" className="w-full p-2 border rounded-lg" onChange={e => setNewPatientForm({...newPatientForm, name: e.target.value})} />
                <input required placeholder="Usia Kandungan (Minggu)" className="w-full p-2 border rounded-lg" onChange={e => setNewPatientForm({...newPatientForm, gestation: e.target.value + ' Minggu'})} />
                <div className="bg-teal-50 p-4 rounded-lg">
                  <label className="text-xs font-bold text-teal-800">KODE ALAT (DEVICE ID)</label>
                  <input required placeholder="Contoh: SABUK-001" className="w-full p-2 mt-1 border border-teal-200 rounded-lg uppercase" onChange={e => setNewPatientForm({...newPatientForm, deviceId: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded-lg font-bold">Simpan</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}