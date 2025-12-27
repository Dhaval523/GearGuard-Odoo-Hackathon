import React, { useState } from "react";
import { MessageSquare, User, Calendar, Folder, Settings, ChevronRight, Clock, MapPin, FileText, CheckCircle, Circle, AlertCircle } from "lucide-react";

const WorksheetCommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState("In Progress");

  const maintenanceSteps = [
    { id: "new", label: "New Request", icon: <FileText size={16} /> },
    { id: "progress", label: "In Progress", icon: <Settings size={16} /> },
    { id: "received", label: "Received", icon: <CheckCircle size={16} /> },
    { id: "scrap", label: "Scrap", icon: <AlertCircle size={16} /> },
  ];

  const maintenanceTypes = ["Corrective", "Preventive"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Smart Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg mr-4">
              <MessageSquare size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold">Smart Worksheet Button</h2>
              <p className="text-blue-100 opacity-90">Click to open the worksheet comment section</p>
            </div>
          </div>
          <ChevronRight size={24} className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Worksheet Comment Section */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Text activity</h1>
                <p className="text-gray-600 mt-1">Created By Maintenance For Equipment</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Work Order #</p>
                <p className="text-lg font-semibold text-gray-900">WO-203-19281928</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Equipment Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Equipment Information */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="mr-2" size={20} />
                    Equipment Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Attchell Admin Equipment</label>
                        <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                          <Folder className="text-blue-600 mr-2" size={18} />
                          <span className="font-medium">Accr Laptop/LP/203/19281928</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Category</label>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <span className="font-medium">Computers</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Request Date</label>
                        <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                          <Calendar className="text-blue-600 mr-2" size={18} />
                          <span className="font-medium">12/19/2025</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Maintenance Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {maintenanceTypes.map((type) => (
                            <button
                              key={type}
                              className={`p-3 rounded-lg border text-center font-medium ${type === "Corrective" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-amber-900 mb-4">Notes</h2>
                  <div className="space-y-4">
                    <div className="bg-white border border-amber-200 rounded-lg p-4">
                      <h3 className="font-semibold text-amber-800 mb-2">Instructions</h3>
                      <ul className="text-amber-700 space-y-2">
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
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Maintenance Steps & Info */}
              <div className="space-y-8">
                {/* Maintenance Steps */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Steps of maintenance</h2>
                  
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200 z-0"></div>
                    <div 
                      className="absolute left-0 top-5 h-1 bg-blue-600 z-10 transition-all duration-500"
                      style={{ width: "66%" }}
                    ></div>
                    
                    {/* Steps */}
                    <div className="relative flex justify-between mb-8">
                      {maintenanceSteps.map((step, index) => {
                        const isActive = step.id === "progress";
                        const isCompleted = index < 2;
                        
                        return (
                          <div key={step.id} className="flex flex-col items-center">
                            <button
                              onClick={() => setActiveStep(step.label)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center z-20 mb-2 ${isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                            >
                              {step.icon}
                            </button>
                            <span className={`text-sm font-medium ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Maintenance Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-blue-900 mb-6">Internal Maintenance</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-blue-100 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <User className="text-blue-600 mr-2" size={18} />
                        <span className="font-semibold text-blue-900">After Foster</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="mr-2" size={16} />
                        <span>12/29/2025 14:30:00</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-4 mr-2"></div>
                        <span className="font-medium">00:00 hours</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white border border-blue-100 rounded-lg">
                      <MapPin className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="font-semibold text-blue-900">My Company</p>
                        <p className="text-sm text-gray-600">San Francisco</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Add Comment</h3>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Enter your comments here..."
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Submit Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Save Draft
              </button>
              <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                Complete Maintenance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksheetCommentSection;