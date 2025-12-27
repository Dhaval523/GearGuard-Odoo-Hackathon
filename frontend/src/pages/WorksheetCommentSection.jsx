import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import {
  MessageSquare,
  User,
  Calendar,
  Folder,
  Settings,
  ChevronRight,
  Clock,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  Save,
  Send,
  Edit,
  Trash2,
  Upload,
  Paperclip,
  X,
  Loader,
  Check,
  MoreVertical,
  Download,
  Printer,
  Share2,
  Eye,
  Lock,
  Unlock,
  Bell
} from "lucide-react";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const WorksheetCommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    subject: "Test activity",
    description: "Created By Maintenance For Equipment",
    equipment: "Accr Laptop/LP/203/19281928",
    category: "Computers",
    requestDate: "12/19/2025",
    maintenanceType: "Corrective",
    technician: "After Foster",
    scheduledTime: "12/29/2025 14:30:00",
    duration: "00:00 hours",
    location: "San Francisco",
    company: "My Company",
    workOrderNumber: "WO-203-19281928",
    status: "In Progress",
    priority: "Medium",
    notes: "",
    comments: [],
  });

  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [activeStep, setActiveStep] = useState("In Progress");

  // Maintenance steps with status
  const maintenanceSteps = [
    { id: "new", label: "New Request", icon: <FileText size={16} />, status: "completed" },
    { id: "progress", label: "In Progress", icon: <Settings size={16} />, status: "active" },
    { id: "review", label: "Under Review", icon: <Eye size={16} />, status: "pending" },
    { id: "completed", label: "Completed", icon: <CheckCircle size={16} />, status: "pending" },
    { id: "closed", label: "Closed", icon: <AlertCircle size={16} />, status: "pending" },
  ];

  const maintenanceTypes = ["Corrective", "Preventive", "Predictive", "Emergency"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const categories = ["Computers", "Servers", "HVAC", "Electrical", "Mechanical", "Network"];

  // Fetch worksheet data on component mount
  useEffect(() => {
    if (isOpen) {
      fetchWorksheetData();
    }
  }, [isOpen]);

  const fetchWorksheetData = async () => {
    setLoading(true);
    try {
      // In real app, you would fetch actual data
      // const response = await axiosInstance.get(`/worksheets/${worksheetId}`);
      // setFormData(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          comments: [
            { id: 1, user: "Admin User", text: "Initial assessment completed", timestamp: "2024-01-15 10:30 AM", role: "Admin" },
            { id: 2, user: "Tech Lead", text: "Parts ordered. Expected delivery tomorrow.", timestamp: "2024-01-15 02:15 PM", role: "Technician" },
          ],
          attachments: [
            { id: 1, name: "diagnostic_report.pdf", size: "2.4 MB", type: "pdf" },
            { id: 2, name: "equipment_photo.jpg", size: "1.8 MB", type: "image" },
          ]
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Failed to load worksheet data");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app:
      // await axiosInstance.put(`/worksheets/${worksheetId}`, formData);
      
      toast.success("Worksheet saved successfully!");
      setSaving(false);
      setEditing(false);
    } catch (error) {
      toast.error("Failed to save worksheet");
      setSaving(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const commentData = {
      text: newComment,
      userId: "currentUserId", // In real app, get from auth context
      userName: "Current User",
      userRole: "Admin",
      timestamp: new Date().toISOString(),
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app:
      // await axiosInstance.post(`/worksheets/${worksheetId}/comments`, commentData);
      
      const updatedComments = [
        ...formData.comments,
        {
          id: formData.comments.length + 1,
          ...commentData,
          timestamp: new Date().toLocaleString(),
        },
      ];
      
      setFormData(prev => ({ ...prev, comments: updatedComments }));
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formDataObj = new FormData();
    formDataObj.append("file", file);
    formDataObj.append("worksheetId", "currentWorksheetId");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In real app:
      // const response = await axiosInstance.post(`/worksheets/upload`, formDataObj);
      
      const newAttachment = {
        id: attachments.length + 1,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.split("/")[1] || "file",
      };
      
      setAttachments(prev => [...prev, newAttachment]);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file");
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app:
      // await axiosInstance.delete(`/worksheets/attachments/${attachmentId}`);
      
      setAttachments(prev => prev.filter(att => att.id !== attachmentId));
      toast.success("Attachment deleted!");
    } catch (error) {
      toast.error("Failed to delete attachment");
    }
  };

  const handleExportPDF = async () => {
    try {
      // In real app:
      // const response = await axiosInstance.get(`/worksheets/${worksheetId}/export`, {
      //   responseType: 'blob'
      // });
      
      toast.success("PDF export started...");
      // Handle blob download
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMaintenanceTypeSelect = (type) => {
    handleInputChange("maintenanceType", type);
  };

  const handlePrioritySelect = (priority) => {
    handleInputChange("priority", priority);
  };

  const handleStepClick = (step) => {
    setActiveStep(step.label);
    if (editing) {
      handleInputChange("status", step.label);
    }
  };

  const calculateProgress = () => {
    const completedSteps = maintenanceSteps.filter(step => step.status === "completed").length;
    return (completedSteps / maintenanceSteps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <Toaster position="top-right" />
      
      {/* Smart Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="flex items-center relative z-10">
            <div className="p-4 bg-white/20 rounded-2xl mr-6 backdrop-blur-sm">
              <MessageSquare size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-bold">Smart Worksheet</h2>
              <p className="text-blue-100 opacity-90 mt-1">Click to open the worksheet comment section</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 relative z-10">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span className="text-sm">Editing</span>
              </motion.div>
            )}
            <ChevronRight 
              size={28} 
              className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
            />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {/* Worksheet Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header with Actions */}
              <div className="border-b border-gray-200 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      {editing ? (
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          className="text-2xl font-bold text-gray-900 bg-transparent border-b border-blue-500 focus:outline-none w-full"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900">{formData.subject}</h1>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          formData.priority === "Critical" ? "bg-red-100 text-red-700" :
                          formData.priority === "High" ? "bg-orange-100 text-orange-700" :
                          formData.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {formData.priority} Priority
                        </span>
                      </div>
                    </div>
                    
                    {editing ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="text-gray-600 bg-transparent border-b border-blue-500 focus:outline-none w-full resize-none"
                        rows="2"
                      />
                    ) : (
                      <p className="text-gray-600">{formData.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-gray-500">Work Order #</p>
                      <p className="text-lg font-semibold text-gray-900">{formData.workOrderNumber}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditing(!editing)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={editing ? "Cancel Editing" : "Edit Worksheet"}
                      >
                        {editing ? <X size={20} /> : <Edit size={20} />}
                      </button>
                      
                      <button
                        onClick={handleSave}
                        disabled={saving || !editing}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Save Changes"
                      >
                        {saving ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
                      </button>
                      
                      <button
                        onClick={handleExportPDF}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Export PDF"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader size={32} className="animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Equipment Details */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Equipment Information Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <User className="mr-2" size={20} />
                            Equipment Details
                          </h2>
                          <Bell size={18} className="text-gray-400" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-5">
                            <div>
                              <label className="text-sm text-gray-500 font-medium block mb-2">
                                Equipment Name
                              </label>
                              {editing ? (
                                <input
                                  type="text"
                                  value={formData.equipment}
                                  onChange={(e) => handleInputChange("equipment", e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                              ) : (
                                <div className="flex items-center p-3 bg-white rounded-xl border border-gray-200">
                                  <Folder className="text-blue-600 mr-3" size={18} />
                                  <span className="font-medium">{formData.equipment}</span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-500 font-medium block mb-2">
                                Category
                              </label>
                              {editing ? (
                                <select
                                  value={formData.category}
                                  onChange={(e) => handleInputChange("category", e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                >
                                  {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              ) : (
                                <div className="p-3 bg-white rounded-xl border border-gray-200">
                                  <span className="font-medium">{formData.category}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-5">
                            <div>
                              <label className="text-sm text-gray-500 font-medium block mb-2">
                                Request Date
                              </label>
                              {editing ? (
                                <input
                                  type="date"
                                  value={formData.requestDate}
                                  onChange={(e) => handleInputChange("requestDate", e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                              ) : (
                                <div className="flex items-center p-3 bg-white rounded-xl border border-gray-200">
                                  <Calendar className="text-blue-600 mr-3" size={18} />
                                  <span className="font-medium">{formData.requestDate}</span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-500 font-medium block mb-2">
                                Maintenance Type
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                {maintenanceTypes.map((type) => (
                                  <button
                                    key={type}
                                    onClick={() => editing && handleMaintenanceTypeSelect(type)}
                                    className={`p-3 rounded-xl border text-center font-medium transition-all ${
                                      formData.maintenanceType === type
                                        ? "bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200"
                                        : editing
                                        ? "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                                        : "bg-gray-50 border-gray-200 text-gray-700"
                                    }`}
                                    disabled={!editing}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Notes Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-amber-50/50 to-amber-100/20 rounded-2xl p-6 border border-amber-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-amber-900">Notes & Instructions</h2>
                          <Paperclip size={18} className="text-amber-500" />
                        </div>
                        
                        <div className="space-y-4">
                          {editing ? (
                            <textarea
                              value={formData.notes}
                              onChange={(e) => handleInputChange("notes", e.target.value)}
                              className="w-full p-4 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white/50"
                              rows="5"
                              placeholder="Add notes and instructions here..."
                            />
                          ) : (
                            <div className="bg-white/50 border border-amber-200 rounded-xl p-6">
                              <h3 className="font-semibold text-amber-800 mb-4">Instructions</h3>
                              <ul className="text-amber-700 space-y-3">
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                  <span>Check all hardware components for wear and tear</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                  <span>Update all software to latest versions</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                  <span>Run diagnostic tests on all systems</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                  <span>Document all findings in the report section</span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Attachments Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-gray-900">Attachments</h2>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              onChange={handleFileUpload}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                              <Upload size={18} />
                              <span>Upload</span>
                            </div>
                          </label>
                        </div>
                        
                        <div className="space-y-3">
                          {attachments.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <FileText size={18} className="text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{file.name}</p>
                                  <p className="text-sm text-gray-500">{file.size}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteAttachment(file.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} className="text-red-500" />
                              </button>
                            </div>
                          ))}
                          
                          {attachments.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <Paperclip size={32} className="mx-auto mb-3 opacity-50" />
                              <p>No attachments yet</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      {/* Maintenance Steps */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                      >
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Maintenance Progress</h2>
                        
                        <div className="relative mb-8">
                          {/* Progress Line */}
                          <div className="absolute left-0 right-0 top-5 h-1.5 bg-gray-200 rounded-full z-0"></div>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress()}%` }}
                            transition={{ duration: 1 }}
                            className="absolute left-0 top-5 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-10"
                          ></motion.div>
                          
                          {/* Steps */}
                          <div className="relative flex justify-between">
                            {maintenanceSteps.map((step, index) => (
                              <div key={step.id} className="flex flex-col items-center">
                                <button
                                  onClick={() => editing && handleStepClick(step)}
                                  disabled={!editing}
                                  className={`w-12 h-12 rounded-full flex items-center justify-center z-20 mb-3 transition-all ${
                                    step.status === "completed"
                                      ? "bg-green-100 text-green-600 border-2 border-green-300"
                                      : step.status === "active"
                                      ? "bg-blue-600 text-white border-2 border-blue-300 shadow-lg"
                                      : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                                  } ${editing ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
                                >
                                  {step.status === "completed" ? <Check size={20} /> : step.icon}
                                </button>
                                <span className={`text-sm font-medium ${
                                  step.status === "completed"
                                    ? "text-green-600"
                                    : step.status === "active"
                                    ? "text-blue-600"
                                    : "text-gray-500"
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Maintenance Details */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-50/50 to-blue-100/20 rounded-2xl p-6 border border-blue-200 shadow-sm"
                      >
                        <h2 className="text-xl font-bold text-blue-900 mb-6">Maintenance Details</h2>
                        
                        <div className="space-y-5">
                          <div className="bg-white/50 border border-blue-100 rounded-xl p-4">
                            <div className="flex items-center mb-4">
                              <User className="text-blue-600 mr-3" size={20} />
                              <div>
                                <p className="font-semibold text-blue-900">Assigned Technician</p>
                                {editing ? (
                                  <input
                                    type="text"
                                    value={formData.technician}
                                    onChange={(e) => handleInputChange("technician", e.target.value)}
                                    className="mt-1 px-3 py-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                ) : (
                                  <p className="text-gray-900">{formData.technician}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-2" size={16} />
                                <span>Scheduled: </span>
                                {editing ? (
                                  <input
                                    type="datetime-local"
                                    value={formData.scheduledTime}
                                    onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                                    className="ml-2 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                ) : (
                                  <span className="ml-2 font-medium">{formData.scheduledTime}</span>
                                )}
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-2" size={16} />
                                <span>Duration: </span>
                                {editing ? (
                                  <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange("duration", e.target.value)}
                                    className="ml-2 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g., 02:30 hours"
                                  />
                                ) : (
                                  <span className="ml-2 font-medium">{formData.duration}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4 bg-white/50 border border-blue-100 rounded-xl">
                            <MapPin className="text-blue-600 mr-3" size={20} />
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900">Location</p>
                              {editing ? (
                                <input
                                  type="text"
                                  value={formData.location}
                                  onChange={(e) => handleInputChange("location", e.target.value)}
                                  className="mt-1 w-full px-3 py-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              ) : (
                                <div>
                                  <p className="text-gray-900">{formData.company}</p>
                                  <p className="text-sm text-gray-600">{formData.location}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Comments Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                      >
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Comments</h2>
                        
                        {/* Comments List */}
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                          {formData.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="p-3 bg-white border border-gray-200 rounded-xl"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                    <User size={14} className="text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{comment.user}</p>
                                    <p className="text-xs text-gray-500">{comment.role} • {comment.timestamp}</p>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700">{comment.text}</p>
                            </div>
                          ))}
                          
                          {formData.comments.length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                              <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                              <p>No comments yet</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Add Comment */}
                        <div className="space-y-3">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                            rows="3"
                            placeholder="Add your comment here..."
                          />
                          <div className="flex justify-between">
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                              <div className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                                <Paperclip size={18} />
                                <span>Attach File</span>
                              </div>
                            </label>
                            <button
                              onClick={handleSubmitComment}
                              disabled={!newComment.trim()}
                              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                            >
                              <Send size={18} />
                              <span>Post Comment</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Auto-save enabled
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setEditing(true)}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2"
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => toast.success("Maintenance completed!")}
                      className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle size={18} />
                      <span>Complete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorksheetCommentSection;