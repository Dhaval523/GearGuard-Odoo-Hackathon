import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  AlertCircle,
  Settings,
  Filter,
  Download,
  Plus,
  Search,
  MoreVertical
} from "lucide-react";

const MaintenanceCalendar = () => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 19)); // December 2025

  // Sample maintenance events
  const maintenanceEvents = [
    {
      id: 1,
      title: "Server Maintenance",
      date: "2025-12-17",
      time: "09:00",
      duration: 2,
      type: "preventive",
      priority: "high",
      team: "Network Team",
      status: "scheduled"
    },
    {
      id: 2,
      title: "HVAC System Check",
      date: "2025-12-18",
      time: "10:00",
      duration: 1.5,
      type: "preventive",
      priority: "medium",
      team: "Facilities",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Generator Inspection",
      date: "2025-12-19",
      time: "08:00",
      duration: 3,
      type: "corrective",
      priority: "high",
      team: "Electrical",
      status: "in-progress"
    },
    {
      id: 4,
      title: "Fire Safety Test",
      date: "2025-12-19",
      time: "14:00",
      duration: 2,
      type: "preventive",
      priority: "medium",
      team: "Safety",
      status: "pending"
    },
    {
      id: 5,
      title: "Elevator Maintenance",
      date: "2025-12-20",
      time: "11:00",
      duration: 4,
      type: "scheduled",
      priority: "low",
      team: "Facilities",
      status: "planned"
    }
  ];

  // Week days
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // Time slots
  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  // Get current week dates
  const getWeekDates = () => {
    const current = new Date(currentDate);
    const weekStart = new Date(current);
    weekStart.setDate(current.getDate() - current.getDay());
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  // Get events for specific day and time
  const getEventsForSlot = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return maintenanceEvents.filter(event => 
      event.date === dateStr && 
      event.time === time
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Maintenance Calendar</h1>
                  <p className="text-gray-600">Schedule and track all maintenance activities</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
                  <span className="font-semibold">Week {getWeekNumber(currentDate)}</span>
                  <span className="mx-2">•</span>
                  <span>Today</span>
                </div>
                
                <div className="text-gray-700 font-semibold">
                  {formatDate(currentDate)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Schedule
              </button>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="flex space-x-2">
              {["day", "week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    viewMode === mode
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Today
              </button>
              
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 border-r border-gray-200">
              <div className="text-sm text-gray-500 font-medium">Time</div>
            </div>
            {weekDates.map((date, index) => (
              <div 
                key={index} 
                className={`p-4 border-r border-gray-200 text-center ${date.getDate() === new Date().getDate() ? "bg-blue-50" : ""}`}
              >
                <div className="text-sm text-gray-500 font-medium mb-1">{weekDays[index]}</div>
                <div className={`text-lg font-bold ${date.getDate() === new Date().getDate() ? "text-blue-600" : "text-gray-900"}`}>
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="max-h-[600px] overflow-y-auto">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
                {/* Time Column */}
                <div className="p-4 border-r border-gray-200 flex items-center justify-center">
                  <div className="text-sm font-medium text-gray-700">{time}</div>
                </div>
                
                {/* Day Columns */}
                {weekDates.map((date, dayIndex) => {
                  const events = getEventsForSlot(date, time);
                  return (
                    <div 
                      key={dayIndex} 
                      className="min-h-[80px] p-2 border-r border-gray-100 relative"
                    >
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className={`absolute left-1 right-1 rounded-lg p-2 text-xs cursor-pointer transition-transform hover:scale-[1.02] shadow-sm ${
                            event.priority === "high" 
                              ? "bg-red-50 border border-red-200" 
                              : event.priority === "medium"
                              ? "bg-amber-50 border border-amber-200"
                              : "bg-blue-50 border border-blue-200"
                          }`}
                          style={{
                            top: '4px',
                            bottom: '4px',
                          }}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <span className={`font-semibold ${
                              event.priority === "high" ? "text-red-700" : 
                              event.priority === "medium" ? "text-amber-700" : "text-blue-700"
                            }`}>
                              {event.title}
                            </span>
                            {event.priority === "high" && (
                              <AlertCircle className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{event.time} • {event.duration}h</span>
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{event.team}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Month Calendar */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">December 2025</h3>
            <div className="flex space-x-2">
              <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
              <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="text-center text-sm text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
            
            {/* Placeholder for previous month */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`prev-${i}`} className="text-center py-2 text-gray-300">
                {30 + i}
              </div>
            ))}
            
            {/* Current month days */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div 
                key={day} 
                className={`text-center py-2 rounded-lg cursor-pointer ${
                  day === new Date().getDate()
                    ? "bg-blue-600 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </div>
            ))}
            
            {/* Placeholder for next month */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`next-${i}`} className="text-center py-2 text-gray-300">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Legend & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Legend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Priority Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700">High Priority</span>
                <span className="ml-auto text-gray-500 text-sm">3 tasks</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Medium Priority</span>
                <span className="ml-auto text-gray-500 text-sm">5 tasks</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Low Priority</span>
                <span className="ml-auto text-gray-500 text-sm">2 tasks</span>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Maintenance Tasks</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {maintenanceEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-10 rounded-full mr-4 ${
                    event.priority === "high" ? "bg-red-500" :
                    event.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{event.date} • {event.time}</span>
                      <span className="mx-2">•</span>
                      <Users className="w-3 h-3 mr-1" />
                      <span>{event.team}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                    event.status === "in-progress" ? "bg-amber-100 text-amber-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;