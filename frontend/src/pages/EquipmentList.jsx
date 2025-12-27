import React from 'react';
import { 
  Plus, Search, Filter, Monitor, Laptop, 
  Settings, Wrench, Truck, Server, Printer,
  Eye, Edit, Trash2, Building, User
} from 'lucide-react';

const EquipmentListView = () => {
  // Dummy data based on project requirements
  const equipmentList = [
    {
      id: 1,
      name: "Samsung Monitor 24\"",
      employee: "Vipul Modh",
      department: "Admin",
      serialNumber: "MT/22/22/00557",
      technician: "Mitchell Admin",
      category: "Monitor",
      company: "My Company (San Francisco)",
      status: "Active",
      location: "Floor 3, Office 302",
      lastMaintenance: "2024-01-15",
      warranty: "2024-12-31"
    },
    {
      id: 2,
      name: "Acer Laptop",
      employee: "Bhaumik P",
      department: "Technician",
      serialNumber: "AT/22/77/22222",
      technician: "Marc Demo",
      category: "Computer",
      company: "My Company (San Francisco)",
      status: "Active",
      location: "Maintenance Office",
      lastMaintenance: "2024-01-20",
      warranty: "2025-06-30"
    },
    {
      id: 3,
      name: "CNC Machine 04",
      employee: "N/A",
      department: "Production",
      serialNumber: "CNC/PRD/9981",
      technician: "John Doe",
      category: "Machinery",
      company: "My Company (San Francisco)",
      status: "Maintenance",
      location: "Production Hall A",
      lastMaintenance: "2024-01-10",
      warranty: "2026-03-15"
    },
    {
      id: 4,
      name: "Printer HP LaserJet",
      employee: "Sarah Johnson",
      department: "HR",
      serialNumber: "PRT/HR/4456",
      technician: "Mike Wilson",
      category: "Printer",
      company: "My Company (San Francisco)",
      status: "Active",
      location: "HR Department",
      lastMaintenance: "2024-01-25",
      warranty: "2024-09-30"
    },
    {
      id: 5,
      name: "Company Vehicle - Ford Transit",
      employee: "Delivery Team",
      department: "Logistics",
      serialNumber: "VH/LG/7789",
      technician: "Auto Service Center",
      category: "Vehicle",
      company: "My Company (San Francisco)",
      status: "Active",
      location: "Parking Lot B",
      lastMaintenance: "2024-01-05",
      warranty: "2025-01-15"
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'monitor':
        return <Monitor className="w-5 h-5" />;
      case 'computer':
        return <Laptop className="w-5 h-5" />;
      case 'machinery':
        return <Settings className="w-5 h-5" />;
      case 'printer':
        return <Printer className="w-5 h-5" />;
      case 'vehicle':
        return <Truck className="w-5 h-5" />;
      case 'server':
        return <Server className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'monitor':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'computer':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'machinery':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'printer':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'vehicle':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-nunito p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2">
                <span className="text-[#3B82F6]">Equipment</span> List
              </h1>
              <p className="text-[#BFBFBF] text-lg">Track and manage all company assets</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
              <Plus className="h-4 w-4" />
              Add New Equipment
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#BFBFBF] font-medium">Total Equipment</p>
                  <p className="text-2xl font-bold text-[#0D0D0D] mt-1">5</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#BFBFBF] font-medium">Active Assets</p>
                  <p className="text-2xl font-bold text-[#0D0D0D] mt-1">4</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#BFBFBF] font-medium">Under Maintenance</p>
                  <p className="text-2xl font-bold text-[#0D0D0D] mt-1">1</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#BFBFBF] font-medium">Departments</p>
                  <p className="text-2xl font-bold text-[#0D0D0D] mt-1">5</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#BFBFBF]" />
                </div>
                <input
                  type="text"
                  placeholder="Search equipment by name, serial number, or employee..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#0D0D0D] hover:bg-gray-50 transition-all">
                <Filter className="h-4 w-4" />
                Filter by Department
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#0D0D0D] hover:bg-gray-50 transition-all">
                <Wrench className="h-4 w-4" />
                Maintenance View
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Equipment Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Maintenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {equipmentList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(item.category).split(' ')[0]} ${getCategoryColor(item.category).split(' ')[1]}`}>
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0D0D0D]">{item.name}</div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                            <span className="text-xs text-[#BFBFBF] font-mono">
                              SN: {item.serialNumber}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-[#BFBFBF] flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {item.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-[#BFBFBF] mr-2" />
                          <span className="text-sm text-[#0D0D0D]">{item.employee}</span>
                        </div>
                        <div className="text-xs text-[#BFBFBF]">
                          {item.department} Department
                        </div>
                        <div className="text-xs text-[#BFBFBF] flex items-center mt-1">
                          <Wrench className="h-3 w-3 mr-1" />
                          Tech: {item.technician}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#0D0D0D]">{item.location}</div>
                      <div className="text-xs text-[#BFBFBF] mt-1">
                        Floor/Area
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-[#0D0D0D]">
                          Last: {item.lastMaintenance}
                        </div>
                        <div className="text-xs text-[#BFBFBF]">
                          Warranty: {item.warranty}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-[#0D0D0D] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          Request
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[#BFBFBF] mb-4 md:mb-0">
              Showing {equipmentList.length} of {equipmentList.length} equipment records
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#3B82F6] text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Key Requirements Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-800">Key Requirements</h3>
              <p className="text-sm text-blue-700 mt-1">
                • Each equipment must have a dedicated Maintenance Team and a technician assigned to it by default.
                • Track equipment by Department and Employee.
                • Include fields: Equipment Name, Serial Number, Purchase Date, Warranty Information, and Physical Location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentListView;