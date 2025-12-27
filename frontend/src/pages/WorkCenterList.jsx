import React from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

const WorkCenterList = () => {
  // Dummy data based on the GearGuard project mockup
  const workCenters = [
    {
      id: 1,
      name: "Assembly Line 1",
      code: "ASY-01",
      tag: "Manual",
      alternative: "Assembly Line 2",
      costPerHour: 50.00,
      capacityEfficiency: 100.00,
      oeeTarget: 34.59,
      status: "Active",
      department: "Production"
    },
    {
      id: 2,
      name: "CNC Machine 1",
      code: "CNC-01",
      tag: "Automated",
      alternative: "CNC Machine 2",
      costPerHour: 75.00,
      capacityEfficiency: 100.00,
      oeeTarget: 90.00,
      status: "Active",
      department: "Production"
    },
    {
      id: 3,
      name: "Hydraulic Press",
      code: "HDP-03",
      tag: "Heavy Duty",
      alternative: "Press B",
      costPerHour: 120.00,
      capacityEfficiency: 95.00,
      oeeTarget: 85.50,
      status: "Maintenance",
      department: "Mechanical"
    },
    {
      id: 4,
      name: "Electrical Panel",
      code: "ELP-07",
      tag: "Electrical",
      alternative: "Panel B",
      costPerHour: 65.00,
      capacityEfficiency: 98.50,
      oeeTarget: 92.30,
      status: "Active",
      department: "Electrical"
    },
    {
      id: 5,
      name: "IT Server Rack",
      code: "IT-01",
      tag: "IT Equipment",
      alternative: "Server Rack 2",
      costPerHour: 45.00,
      capacityEfficiency: 99.00,
      oeeTarget: 88.75,
      status: "Active",
      department: "IT Support"
    }
  ];

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

  const getTagColor = (tag) => {
    switch (tag.toLowerCase()) {
      case 'automated':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'manual':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'heavy duty':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'electrical':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'it equipment':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-nunito p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2">
            <span className="text-[#3B82F6]">Work</span> Centers
          </h1>
          <p className="text-[#BFBFBF] text-lg">Manage and track all production work centers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Total Centers</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">5</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">WC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Active</p>
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
                <p className="text-sm text-[#BFBFBF] font-medium">Avg OEE</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">78.23%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Avg Cost/Hour</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">$71.00</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">$</span>
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
                  placeholder="Search work centers..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#0D0D0D] hover:bg-gray-50 transition-all">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
                <Plus className="h-4 w-4" />
                New Work Center
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Work Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Cost/Hour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Capacity Efficiency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    OEE Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workCenters.map((wc) => (
                  <tr key={wc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-[#0D0D0D]">{wc.name}</div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTagColor(wc.tag)}`}>
                            {wc.tag}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm font-mono text-[#0D0D0D] bg-gray-50 px-2 py-1 rounded">
                        {wc.code}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(wc.status)}`}>
                        {wc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#0D0D0D]">
                      {wc.department}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-[#0D0D0D]">
                        ${wc.costPerHour.toFixed(2)}
                        <div className="text-xs text-[#BFBFBF]">/hour</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-100 rounded-full h-2 mr-3">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(wc.capacityEfficiency, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-[#0D0D0D]">
                          {wc.capacityEfficiency.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-100 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(wc.oeeTarget, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                          {wc.oeeTarget.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-[#0D0D0D] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          View
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
              Showing {workCenters.length} of {workCenters.length} work centers
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#3B82F6] text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-[#0D0D0D] hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Note from Mockup */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">!</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-yellow-800">Important Note</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Must create a work center proper form view with respective fields that are needed in work center for maintenance request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCenterList;