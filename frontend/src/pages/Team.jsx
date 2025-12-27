import React, { useState } from 'react';
import { 
  Users, Plus, X, User, Building, 
  ToolCase, Zap, Monitor, MapPin, ChevronRight,
  Search, Briefcase
} from 'lucide-react';

const MaintenanceTeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dummy data for company selection
  const companies = [
    "My Company (San Francisco)",
    "GearGuard Tech (New York)",
    "Industrial Solutions (Chicago)"
  ];

  const [teams, setTeams] = useState([
    { 
      id: 1, 
      name: "Internal Maintenance", 
      members: ["Mitchell Admin", "Abigail Peterson"],
      company: "My Company (San Francisco)",
      location: "Main Plant",
      icon: <ToolCase className="h-5 w-5" />,
      color: "blue"
    },
    { 
      id: 2, 
      name: "IT Support", 
      members: ["Vipul Modh", "Marc Demo"], 
      company: "My Company (San Francisco)",
      location: "Tech Hub",
      icon: <Monitor className="h-5 w-5" />,
      color: "purple"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    company: companies[0],
    members: ''
  });

  const handleCreateTeam = (e) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: formData.name,
      company: formData.company,
      members: formData.members.split(',').map(m => m.trim()),
      location: "New Office", // Default placeholder
      icon: <Users className="h-5 w-5" />,
      color: "indigo"
    };
    setTeams([...teams, newTeam]);
    setIsModalOpen(false);
    setFormData({ name: '', company: companies[0], members: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Teams</h1>
            <p className="text-slate-500 font-medium mt-1">Manage specialized technician groups and their company assignments[cite: 20].</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
          >
            <Plus className="h-5 w-5" /> Add Team
          </button>
        </div>

        {/* Teams Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all overflow-hidden group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-blue-50 text-blue-600`}>
                    {team.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    {team.company}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">{team.name}</h3>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-blue-600">Team Members [cite: 23]</p>
                  <div className="space-y-2">
                    {team.members.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-slate-200 text-xs font-bold text-slate-600">
                            {member[0]}
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{member}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        
        </div>

        {/* Create Team Modal  */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-xl">New Maintenance Team</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateTeam} className="p-8 space-y-6">
                {/* Team Name [cite: 22] */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Team Name</label>
                  <input 
                    required
                    type="text"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="e.g. Mechanical Response Team"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Company Dropdown */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Company</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-slate-700"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    >
                      {companies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Team Members [cite: 23] */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Add Technicians (Comma separated)</label>
                  <textarea 
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] font-medium"
                    placeholder="Mitchell Admin, Abigail Peterson..."
                    value={formData.members}
                    onChange={(e) => setFormData({...formData, members: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button type="submit" className="bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Create Team
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceTeamPage;