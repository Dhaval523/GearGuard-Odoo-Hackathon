import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  ChevronRight,
  Bell,
  Settings,
  User,
  Calendar,
  FileText,
  CreditCard,
  Truck,
  PieChart,
  Activity,
  Users,
  AlertTriangle,
  HardDrive,
  Building,
  Menu,
  X,
  Home,
  ChevronDown,
  Download,
  Filter,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  Wifi,
  Cpu,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import MaintenanceCalendar from "././Calender";
import WorksheetCommentSection from "././WorksheetCommentSection"
import Equipment from "././EquipmentList";
import MaintenanceTeamPage from "././Team";

const MaintenanceDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Menu items with icons
  const menuItems = [
    { id: "Dashboard", icon: <PieChart size={20} />, component: "Dashboard" },
    { id: "Maintenance Calendar", icon: <Calendar size={20} />, component: "Calendar" },
    { id: "Equipment", icon: <FileText size={20} />, component: "Equipment" },
    { id: "Reporting", icon: <BarChart3 size={20} />, component: "Reporting" },
    { id: "Teams", icon: <Users size={20} />, component: "Teams" },
    { id: "Worksheet", icon: <FileText size={20} />, component: "Worksheet" },
  ];

  // Dashboard stats
  const stats = [
    {
      title: "Critical Equipment",
      value: "5 Units",
      subtitle: "Health < 30%",
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-red-200",
      icon: <AlertTriangle className="text-red-500" size={24} />,
      progress: 25,
      trend: -3.5
    },
    {
      title: "Technician Load",
      value: "85% Utilized",
      subtitle: "Assign Carefully",
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      icon: <Users className="text-amber-500" size={24} />,
      progress: 85,
      trend: +2.1
    },
    {
      title: "Open Requests",
      value: "12 Pending",
      subtitle: "3 Overdue",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      icon: <Clock className="text-blue-500" size={24} />,
      progress: 40,
      trend: -8.3
    },
    {
      title: "Completed Tasks",
      value: "156 Tasks",
      subtitle: "This Month",
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      icon: <CheckCircle className="text-green-500" size={24} />,
      progress: 92,
      trend: +12.5
    }
  ];

  // Critical equipment list
  const criticalEquipment = [
    { id: 1, name: "Compressor Unit A", health: 25, icon: <Cpu size={20} /> },
    { id: 2, name: "Cooling Tower B", health: 15, icon: <HardDrive size={20} /> },
    { id: 3, name: "Generator X", health: 20, icon: <Activity size={20} /> },
    { id: 4, name: "Control System", health: 28, icon: <Wifi size={20} /> },
  ];

  // Table data
  const tableData = [
    {
      id: 1,
      subject: "Test activity",
      employee: "Attabell Admin",
      technician: "Alba Foster",
      category: "Computer",
      stage: "New Request",
      company: "My Company",
      priority: "high",
      date: "2024-01-15",
      duration: "2h"
    },
    {
      id: 2,
      subject: "Server Maintenance",
      employee: "John Smith",
      technician: "Mike Johnson",
      category: "Server",
      stage: "In Progress",
      company: "Tech Corp",
      priority: "medium",
      date: "2024-01-14",
      duration: "4h"
    },
    {
      id: 3,
      subject: "HVAC Inspection",
      employee: "Sarah Miller",
      technician: "Robert Brown",
      category: "HVAC",
      stage: "Pending",
      company: "Office Inc",
      priority: "low",
      date: "2024-01-13",
      duration: "3h"
    },
    {
      id: 4,
      subject: "Network Setup",
      employee: "David Wilson",
      technician: "Emma Davis",
      category: "Network",
      stage: "Completed",
      company: "Networks Ltd",
      priority: "medium",
      date: "2024-01-12",
      duration: "5h"
    }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, action: "Maintenance request approved", user: "Admin", time: "10:30 AM", status: "completed" },
    { id: 2, action: "New equipment registered", user: "Technician", time: "09:15 AM", status: "in-progress" },
    { id: 3, action: "Monthly report generated", user: "System", time: "Yesterday", status: "completed" },
    { id: 4, action: "Emergency maintenance needed", user: "Alert System", time: "2 days ago", status: "pending" },
  ];

  const renderComponent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative overflow-hidden border rounded-2xl p-6 ${stat.bgColor} ${stat.borderColor} shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-8 -mt-8" 
                    style={{ backgroundColor: stat.color.replace('text-', '').replace('-600', '-500') }}
                  ></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl bg-white/50 backdrop-blur-sm border ${stat.borderColor} mr-4`}>
                        {stat.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${stat.color} text-sm uppercase tracking-wider`}>
                          {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp size={14} className={stat.trend > 0 ? '' : 'transform rotate-180'} />
                      <span className="text-sm font-semibold ml-1">{stat.trend > 0 ? '+' : ''}{stat.trend}%</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${stat.color} mb-3`}>{stat.subtitle}</p>
                  
                  <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Recent Maintenance Activities</h2>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Filter size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Subject", "Employee", "Technician", "Category", "Stage", "Company", "Date"].map((header) => (
                            <th key={header} className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {tableData.map((row) => (
                          <motion.tr 
                            key={row.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                            className="group"
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-3 ${
                                  row.priority === 'high' ? 'bg-red-500' :
                                  row.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                }`}></div>
                                <span className="font-medium text-gray-900">{row.subject}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-700">{row.employee}</td>
                            <td className="py-4 px-6 text-gray-700">{row.technician}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                row.category === 'Computer' ? 'bg-blue-100 text-blue-700' :
                                row.category === 'Server' ? 'bg-purple-100 text-purple-700' :
                                row.category === 'HVAC' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {row.category}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                row.stage === 'New Request' ? 'bg-blue-100 text-blue-700' :
                                row.stage === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                                row.stage === 'Completed' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {row.stage}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-700">{row.company}</td>
                            <td className="py-4 px-6 text-gray-500 text-sm">{row.date}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column - Critical Equipment & Activities */}
              <div className="space-y-8">
                {/* Critical Equipment */}
                <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Critical Equipment</h2>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      4 Units
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {criticalEquipment.map((equipment) => (
                      <motion.div 
                        key={equipment.id}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 border border-red-100 rounded-xl bg-red-50/50"
                      >
                        <div className="p-2 bg-white rounded-lg mr-3 border border-red-200">
                          <span className="text-red-600">{equipment.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{equipment.name}</h4>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-red-200 rounded-full h-2 mr-3">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${equipment.health}%` }}
                                transition={{ duration: 1 }}
                                className={`h-2 rounded-full ${
                                  equipment.health < 20 ? 'bg-red-600' : 'bg-red-400'
                                }`}
                              ></motion.div>
                            </div>
                            <span className="text-sm font-bold text-red-700">{equipment.health}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div className={`p-2 rounded-lg mr-3 ${
                          activity.status === 'completed' ? 'bg-green-100' :
                          activity.status === 'in-progress' ? 'bg-amber-100' : 'bg-red-100'
                        }`}>
                          <Activity size={16} className={
                            activity.status === 'completed' ? 'text-green-600' :
                            activity.status === 'in-progress' ? 'text-amber-600' : 'text-red-600'
                          } />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            By {activity.user} • {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "Maintenance Calendar":
        return <MaintenanceCalendar />;
      case "Worksheet":
        return <WorksheetCommentSection />;

        case "Equipment":
        return <Equipment />;
        case "Teams":
        return <MaintenanceTeamPage />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-96"
          >
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {menuItems.find(item => item.id === activeMenu)?.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeMenu}</h2>
              <p className="text-gray-600">This section is under development</p>
              <p className="text-sm text-gray-500 mt-2">Coming soon with advanced features</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Maintenance Pro</h1>
                <p className="text-sm text-gray-500">Enterprise Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search maintenance, equipment, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500 hidden md:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Animated Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-76px)] fixed lg:static z-50 lg:z-auto"
            >
              <div className="p-6 h-full">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveMenu(item.id);
                        if (window.innerWidth < 1024) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center group ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-semibold border border-blue-200 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                      }`}
                    >
                      <div className={`p-2 rounded-lg mr-3 ${activeMenu === item.id ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.id}</span>
                      <ChevronRight className={`ml-auto transition-transform ${
                        activeMenu === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`} size={16} />
                    </motion.button>
                  ))}
                </nav>

                {/* Sidebar Footer */}
             
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{activeMenu}</h1>
                <p className="text-gray-600 mt-2">
                  {activeMenu === "Dashboard" && "Real-time maintenance overview and analytics"}
                  {activeMenu === "Maintenance Calendar" && "Schedule and track maintenance activities"}
                  {activeMenu === "Worksheet" && "Document maintenance activities and comments"}
                  {activeMenu === "Request" && "Create and manage maintenance requests"}
                  {activeMenu === "Reporting" && "Generate detailed maintenance reports"}
                  {activeMenu === "Teams" && "Manage technicians and team assignments"}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filter
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium flex items-center shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Task
                </motion.button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mt-4">
              <Home size={16} className="mr-2" />
              <ChevronRight size={16} className="mx-1" />
              <span className="text-gray-700 font-medium">Maintenance</span>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-600 font-semibold">{activeMenu}</span>
            </div>
          </motion.div>

          {/* Render Active Component */}
          <AnimatePresence mode="wait">
            {renderComponent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;