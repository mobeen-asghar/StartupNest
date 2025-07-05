import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Circle, 
  Edit3, 
  Trash2,
  Download,
  Share2
} from 'lucide-react';
import jsPDF from 'jspdf';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const RoadmapTab = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Market Research & Validation',
      description: 'Conduct comprehensive market research and validate the business idea',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Business Plan Development',
      description: 'Create detailed business plan with financial projections',
      dueDate: '2024-02-28',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '3',
      title: 'MVP Development',
      description: 'Build minimum viable product for initial testing',
      dueDate: '2024-03-15',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Team Building',
      description: 'Recruit key team members and advisors',
      dueDate: '2024-03-01',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Funding Strategy',
      description: 'Develop funding strategy and prepare pitch deck',
      dueDate: '2024-03-30',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '6',
      title: 'Legal Setup',
      description: 'Incorporate business and handle legal requirements',
      dueDate: '2024-04-15',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '7',
      title: 'Beta Testing',
      description: 'Launch beta version and gather user feedback',
      dueDate: '2024-04-30',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '8',
      title: 'Marketing Strategy',
      description: 'Develop comprehensive marketing and go-to-market strategy',
      dueDate: '2024-05-15',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '9',
      title: 'Product Launch',
      description: 'Official product launch and public announcement',
      dueDate: '2024-06-01',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '10',
      title: 'Scale & Growth',
      description: 'Focus on scaling operations and user acquisition',
      dueDate: '2024-07-01',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(milestones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMilestones(items);
  };

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.dueDate) return;

    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      description: newMilestone.description,
      dueDate: newMilestone.dueDate,
      status: 'pending',
      priority: newMilestone.priority
    };

    setMilestones([...milestones, milestone]);
    setNewMilestone({ title: '', description: '', dueDate: '', priority: 'medium' });
    setShowAddModal(false);
  };

  const updateMilestoneStatus = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, status } : m
    ));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(30, 58, 138);
    pdf.text('StartupNest Roadmap', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Milestones
    let yPosition = 60;
    
    milestones.forEach((milestone, index) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 30;
      }
      
      // Status indicator
      pdf.setFillColor(
        milestone.status === 'completed' ? 34 : 
        milestone.status === 'in-progress' ? 251 : 156,
        milestone.status === 'completed' ? 197 : 
        milestone.status === 'in-progress' ? 191 : 163,
        milestone.status === 'completed' ? 94 : 
        milestone.status === 'in-progress' ? 36 : 175
      );
      pdf.circle(25, yPosition, 3, 'F');
      
      // Title
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${index + 1}. ${milestone.title}`, 35, yPosition);
      
      // Description
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const splitDescription = pdf.splitTextToSize(milestone.description, 150);
      pdf.text(splitDescription, 35, yPosition + 8);
      
      // Due date
      pdf.text(`Due: ${milestone.dueDate}`, 35, yPosition + 20);
      
      yPosition += 35;
    });
    
    pdf.save('startup-roadmap.pdf');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400';
      case 'medium':
        return 'border-l-yellow-400';
      default:
        return 'border-l-green-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">
            Startup <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-blue-100">
            Plan and track your startup journey with drag-and-drop milestones
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 glassmorphism text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {milestones.filter(m => m.status === 'completed').length}
              </p>
              <p className="text-blue-100">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {milestones.filter(m => m.status === 'in-progress').length}
              </p>
              <p className="text-blue-100">In Progress</p>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500 p-3 rounded-xl">
              <Circle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {milestones.filter(m => m.status === 'pending').length}
              </p>
              <p className="text-blue-100">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="glassmorphism p-6 rounded-2xl">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="milestones">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {milestones.map((milestone, index) => (
                  <Draggable key={milestone.id} draggableId={milestone.id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`glassmorphism-dark p-6 rounded-xl border-l-4 ${getPriorityColor(milestone.priority)} ${
                          snapshot.isDragging ? 'shadow-2xl scale-105' : ''
                        } transition-all duration-200`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex flex-col items-center gap-2">
                              {getStatusIcon(milestone.status)}
                              <div className="text-blue-300 text-sm font-semibold">
                                #{index + 1}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-blue-100 mb-4 leading-relaxed">
                                {milestone.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2 text-blue-300">
                                  <Calendar className="w-4 h-4" />
                                  {milestone.dueDate}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  milestone.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                  milestone.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {milestone.priority} priority
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <select
                              value={milestone.status}
                              onChange={(e) => updateMilestoneStatus(milestone.id, e.target.value as any)}
                              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="pending" className="bg-slate-800">Pending</option>
                              <option value="in-progress" className="bg-slate-800">In Progress</option>
                              <option value="completed" className="bg-slate-800">Completed</option>
                            </select>
                            
                            <button
                              onClick={() => deleteMilestone(milestone.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glassmorphism p-6 rounded-2xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-6">Add New Milestone</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Milestone title"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea
                placeholder="Description"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="date"
                value={newMilestone.dueDate}
                onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={newMilestone.priority}
                onChange={(e) => setNewMilestone({ ...newMilestone, priority: e.target.value as any })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low" className="bg-slate-800">Low Priority</option>
                <option value="medium" className="bg-slate-800">Medium Priority</option>
                <option value="high" className="bg-slate-800">High Priority</option>
              </select>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addMilestone}
                className="flex-1 py-2 px-4 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Add Milestone
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RoadmapTab;