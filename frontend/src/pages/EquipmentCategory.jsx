import React, { useState } from 'react';
import { 
  Layers, Plus, X, User, Building, 
  ShieldCheck, Edit2, Trash2, Search, Filter,
  Monitor, Cpu, Truck, Settings, Printer,
  HardDrive, Wrench, Zap, Camera
} from 'lucide-react';

const EquipmentCategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: "Computers & Laptops", 
      responsible: "IT Support Team", 
      company: "My Company (San Francisco)",
      icon: <Cpu className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      equipmentCount: 24,
      description: "Desktop computers, laptops, and workstations"
    },
    { 
      id: 2, 
      name: "Monitors & Displays", 
      responsible: "IT Support Team", 
      company: "My Company (San Francisco)",
      icon: <Monitor className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      equipmentCount: 18,
      description: "Computer monitors and display equipment"
    },
    { 
      id: 3, 
      name: "Production Machinery", 
      responsible: "Mechanics Team", 
      company: "My Company (San Francisco)",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-700 border-orange-200",
      equipmentCount: 12,
      description: "CNC machines, assembly lines, production equipment"
    },
    { 
      id: 4, 
      name: "Vehicles & Transport", 
      responsible: "Facilities Team", 
      company: "My Company (San Francisco)",
      icon: <Truck className="h-5 w-5" />,
      color: "bg-red-100 text-red-700 border-red-200",
      equipmentCount: 8,
      description: "Company vehicles, forklifts, transport equipment"
    },
    { 
      id: 5, 
      name: "Printers & Scanners", 
      responsible: "IT Support Team", 
      company: "My Company (San Francisco)",
      icon: <Printer className="h-5 w-5" />,
      color: "bg-teal-100 text-teal-700 border-teal-200",
      equipmentCount: 15,
      description: "Printers, scanners, and multifunction devices"
    },
    { 
      id: 6, 
      name: "Electrical Equipment", 
      responsible: "Electricians Team", 
      company: "My Company (San Francisco)",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      equipmentCount: 9,
      description: "Electrical panels, wiring, power systems"
    }
  ]);

  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    responsible: 'IT Support Team', 
    company: 'My Company (San Francisco)',
    description: '',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  });

  const teamOptions = [
    'IT Support Team',
    'Mechanics Team', 
    'Electricians Team',
    'Facilities Team',
    'Production Support'
  ];

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Blue' },
    { value: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Purple' },
    { value: 'bg-orange-100 text-orange-700 border-orange-200', label: 'Orange' },
    { value: 'bg-red-100 text-red-700 border-red-200', label: 'Red' },
    { value: 'bg-teal-100 text-teal-700 border-teal-200', label: 'Teal' },
    { value: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Yellow' },
    { value: 'bg-green-100 text-green-700 border-green-200', label: 'Green' },
  ];

  const iconOptions = [
    { icon: <Monitor className="h-5 w-5" />, label: 'Monitor' },
    { icon: <Cpu className="h-5 w-5" />, label: 'Computer' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { icon: <Truck className="h-5 w-5" />, label: 'Truck' },
    { icon: <Printer className="h-5 w-5" />, label: 'Printer' },
    { icon: <Zap className="h-5 w-5" />, label: 'Electrical' },
    { icon: <Wrench className="h-5 w-5" />, label: 'Tools' },
    { icon: <Camera className="h-5 w-5" />, label: 'Camera' },
    { icon: <HardDrive className="h-5 w-5" />, label: 'Storage' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (editingId) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...newCategory, id: editingId } : cat
      ));
      setEditingId(null);
    } else {
      setCategories([...categories, { 
        ...newCategory, 
        id: Date.now(),
        icon: iconOptions[0].icon,
        equipmentCount: 0
      }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditCategory = (category) => {
    setNewCategory({
      name: category.name,
      responsible: category.responsible,
      company: category.company,
      description: category.description,
      color: category.color
    });
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const resetForm = () => {
    setNewCategory({ 
      name: '', 
      responsible: 'IT Support Team', 
      company: 'My Company (San Francisco)',
      description: '',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-nunito p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2">
            <span className="text-[#3B82F6]">Equipment</span> Categories
          </h1>
          <p className="text-[#BFBFBF] text-lg">Manage asset classifications and maintenance teams</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Total Categories</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">{categories.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Layers className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Equipment Items</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">
                  {categories.reduce((sum, cat) => sum + cat.equipmentCount, 0)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFBFBF] font-medium">Teams Involved</p>
                <p className="text-2xl font-bold text-[#0D0D0D] mt-1">
                  {new Set(categories.map(cat => cat.responsible)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
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
                  placeholder="Search categories by name, team, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#0D0D0D] hover:bg-gray-50 transition-all">
                <Filter className="h-4 w-4" />
                Filter by Team
              </button>
              <button 
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                  setEditingId(null);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
              >
                <Plus className="h-4 w-4" />
                New Category
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="p-6">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500">No categories found</h3>
                <p className="text-gray-400 mt-1">Try adjusting your search or create a new category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((cat) => (
                  <div key={cat.id} className="bg-gray-50 border border-gray-100 rounded-lg p-5 hover:border-gray-200 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${cat.color.split(' ')[0]} ${cat.color.split(' ')[1]}`}>
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#0D0D0D]">{cat.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cat.color}`}>
                              {cat.equipmentCount} items
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditCategory(cat)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#BFBFBF] mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 text-[#BFBFBF] mr-2" />
                        <span className="text-[#0D0D0D] font-medium">{cat.responsible}</span>
                      </div>
                      <div className="text-xs text-[#BFBFBF]">
                        <Building className="h-3 w-3 inline mr-1" />
                        {cat.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Category Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-[#0D0D0D] text-lg">
                  {editingId ? 'Edit Category' : 'New Equipment Category'}
                </h3>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                    setEditingId(null);
                  }} 
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleAddCategory} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                      Category Name *
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                      placeholder="e.g., Heavy Machinery, IT Equipment"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                      Responsible Maintenance Team *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-[#BFBFBF]" />
                      <select
                        required
                        className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none appearance-none bg-white"
                        value={newCategory.responsible}
                        onChange={(e) => setNewCategory({...newCategory, responsible: e.target.value})}
                      >
                        {teamOptions.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all min-h-[100px] resize-none"
                      placeholder="Describe this equipment category..."
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                      Category Color
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {colorOptions.map((colorOpt) => (
                        <label
                          key={colorOpt.value}
                          className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                            newCategory.color === colorOpt.value
                              ? 'ring-2 ring-[#3B82F6]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="color"
                            value={colorOpt.value}
                            checked={newCategory.color === colorOpt.value}
                            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`w-6 h-6 rounded ${colorOpt.value.split(' ')[0]}`}></div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-[#BFBFBF]" />
                      <input 
                        readOnly
                        type="text"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg text-[#BFBFBF]"
                        value={newCategory.company}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    onClick={handleAddCategory}
                    className="flex-1 bg-[#3B82F6] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    {editingId ? 'Update Category' : 'Create Category'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                      setEditingId(null);
                    }}
                    className="flex-1 bg-gray-100 text-[#0D0D0D] font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentCategoryPage;