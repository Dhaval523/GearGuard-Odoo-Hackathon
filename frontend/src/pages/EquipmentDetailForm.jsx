import React, { useState } from 'react';
import { 
  Settings, Calendar, User, MapPin, 
  Edit2, Save, X, Activity, Monitor, Building,
  Wrench, Briefcase, Tag, Clock, Shield,
  AlertCircle, CheckCircle, FileText, HardDrive,
  ToolCase
} from 'lucide-react';

const EquipmentDetailForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [equipment, setEquipment] = useState({
    name: "Samsung Monitor 24\" Pro Display",
    category: "Monitor",
    company: "My Company (San Francisco)",
    usedBy: "Employee",
    maintenanceTeam: "IT Support Team",
    assignedDate: "2023-12-24",
    technician: "Mitchell Admin",
    employee: "Abigail Peterson",
    scrapDate: "",
    location: "Floor 2, Room 204 - Design Department",
    workCenter: "Assembly 1",
    serialNumber: "MT/22/22/00557",
    model: "S24F350FH",
    manufacturer: "Samsung",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2025-01-15",
    purchasePrice: "$299.99",
    status: "Active",
    department: "Design",
    description: "High-resolution 24-inch professional display monitor used for graphic design work. Features IPS panel with 99% sRGB color accuracy."
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipment(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simulate save action
    setIsEditing(false);
    console.log('Equipment saved:', equipment);
  };

  const handleScrap = () => {
    const confirm = window.confirm('Are you sure you want to mark this equipment as scrap? This action cannot be undone.');
    if (confirm) {
      setEquipment(prev => ({ ...prev, scrapDate: new Date().toISOString().split('T')[0], status: 'Scrapped' }));
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700';
      case 'scrapped':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-nunito p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-[#BFBFBF] text-sm mb-2">
            <span>Equipment</span>
            <span>›</span>
            <span className="text-[#0D0D0D] font-medium">Details</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0D0D0D]">
            Equipment Details
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Top Action Bar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50">
            <div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Monitor className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0D0D0D]">{equipment.name}</h2>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-[#BFBFBF] font-mono">SN: {equipment.serialNumber}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                      {equipment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Smart Button - Maintenance Count [cite: 69, 71, 73] */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all">
                <Activity className="h-4 w-4" />
                <span className="font-semibold">3 Maintenance Requests</span>
              </button>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isEditing ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-[#3B82F6] text-white hover:bg-blue-700'
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Equipment</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Equipment Details Card */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wider mb-4 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Equipment Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField 
                      label="Equipment Name" 
                      name="name" 
                      value={equipment.name} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      icon={<Tag className="h-4 w-4" />
                    }/>
                    
                    <FormField 
                      label="Category" 
                      name="category" 
                      value={equipment.category} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="select" 
                      options={["Monitor", "Computer", "Machinery", "Vehicle", "Printer", "Server"]}
                      icon={<Settings className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Serial Number" 
                      name="serialNumber" 
                      value={equipment.serialNumber} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      icon={<HardDrive className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Model" 
                      name="model" 
                      value={equipment.model} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      label="Manufacturer" 
                      name="manufacturer" 
                      value={equipment.manufacturer} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                    />
                    
                    <FormField 
                      label="Purchase Price" 
                      name="purchasePrice" 
                      value={equipment.purchasePrice} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Ownership & Assignment Card */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wider mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Ownership & Assignment
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField 
                      label="Assigned To" 
                      name="employee" 
                      value={equipment.employee} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      icon={<User className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Department" 
                      name="department" 
                      value={equipment.department} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="select"
                      options={["Design", "Production", "Maintenance", "IT", "HR", "Finance"]}
                      icon={<Building className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Used By" 
                      name="usedBy" 
                      value={equipment.usedBy} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="select"
                      options={["Employee", "Department", "Team", "Shared"]}
                    />
                    
                    <FormField 
                      label="Assigned Date" 
                      name="assignedDate" 
                      value={equipment.assignedDate} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="date"
                      icon={<Calendar className="h-4 w-4" />}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Description
                  </label>
                  {isEditing ? (
                    <textarea 
                      name="description"
                      value={equipment.description}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent min-h-[120px] resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {equipment.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Maintenance & Location */}
              <div className="space-y-6">
                {/* Maintenance Team Card */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wider mb-4 flex items-center">
                    <Wrench className="h-4 w-4 mr-2" />
                    Maintenance Details
                  </h3>
                  
                  <div className="space-y-4">
                    <FormField 
                      label="Maintenance Team" 
                      name="maintenanceTeam" 
                      value={equipment.maintenanceTeam} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="select"
                      options={["IT Support Team", "Mechanical Team", "Electrical Team", "Production Support"]}
                      icon={<ToolCase className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Assigned Technician" 
                      name="technician" 
                      value={equipment.technician} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      icon={<User className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Work Center" 
                      name="workCenter" 
                      value={equipment.workCenter} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="select"
                      options={["Assembly 1", "Assembly 2", "CNC Room", "Testing Area"]}
                      icon={<Briefcase className="h-4 w-4" />}
                    />
                  </div>
                </div>

                {/* Location & Warranty Card */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wider mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location & Warranty
                  </h3>
                  
                  <div className="space-y-4">
                    <FormField 
                      label="Physical Location" 
                      name="location" 
                      value={equipment.location} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      icon={<MapPin className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Purchase Date" 
                      name="purchaseDate" 
                      value={equipment.purchaseDate} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="date"
                      icon={<Calendar className="h-4 w-4" />}
                    />
                    
                    <FormField 
                      label="Warranty Expiry" 
                      name="warrantyExpiry" 
                      value={equipment.warrantyExpiry} 
                      isEditing={isEditing} 
                      onChange={handleChange}
                      type="date"
                      icon={<Shield className="h-4 w-4" />}
                    />
                    
                    {equipment.scrapDate && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Scrapped on {equipment.scrapDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wider mb-4">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                      <Activity className="h-4 w-4" />
                      <span>Create Maintenance Request</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-200 text-[#0D0D0D] rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      <span>Schedule Preventive Maintenance</span>
                    </button>
                    
                    {!equipment.scrapDate && (
                      <button 
                        onClick={handleScrap}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all text-sm font-medium"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span>Mark as Scrap</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Footer */}
          {isEditing && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-[#BFBFBF]">
                Make changes and save to update equipment details
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-200 text-[#0D0D0D] rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Updated FormField Component with GearGuard styling
const FormField = ({ label, name, value, isEditing, onChange, type = "text", options = [], icon }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-[#BFBFBF] flex items-center">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </label>
    {isEditing ? (
      type === "select" ? (
        <select 
          name={name} 
          value={value} 
          onChange={onChange} 
          className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white text-sm text-[#0D0D0D]"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          name={name} 
          type={type} 
          value={value} 
          onChange={onChange} 
          className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-sm text-[#0D0D0D]"
        />
      )
    ) : (
      <div className="p-2.5 bg-white border border-gray-100 rounded-lg min-h-[42px] flex items-center">
        <span className="text-sm font-medium text-[#0D0D0D]">{value || "—"}</span>
      </div>
    )}
  </div>
);

export default EquipmentDetailForm;