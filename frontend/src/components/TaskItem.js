import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Calendar, Pencil, Check, Trash2 } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const SWIPE_THRESHOLD = 80;

const TaskItem = ({ task, onToggle, onDelete, onUpdate, isCompleted = false }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    ['#FECACA', '#FFFFFF', '#D1FAE5']
  );
  const iconScale = useTransform(
    x,
    [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    [1.2, 0, 1.2]
  );

  const handleDragEnd = (event, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onToggle(task.id);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onDelete(task.id);
    }
  };

  const handleEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ? new Date(task.dueDate) : null);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(task.id, {
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate ? editDueDate.toISOString() : null
      });
      setIsEditOpen(false);
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-600';
      case 'medium':
        return 'bg-sky-50 text-sky-600';
      case 'low':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <>
      <div className="relative" data-testid={`task-item-${task.id}`}>
        {/* Background Action Layer */}
        <motion.div
          style={{ backgroundColor }}
          className="absolute inset-0 flex items-center justify-between px-6 rounded-lg"
        >
          <motion.div style={{ scale: iconScale }}>
            <Trash2 className="w-5 h-5 text-red-500" />
          </motion.div>
          <motion.div style={{ scale: iconScale }}>
            <Check className="w-5 h-5 text-green-600" />
          </motion.div>
        </motion.div>

        {/* Task Item */}
        <motion.div
          layout
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          style={{ x }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: x.get() > 0 ? 100 : -100 }}
          className={`relative bg-white py-4 px-1 border-b border-slate-100 cursor-grab active:cursor-grabbing ${
            isCompleted ? 'bg-slate-50/50' : ''
          }`}
          data-testid={`task-swipe-area-${task.id}`}
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              data-testid={`task-checkbox-${task.id}`}
              onClick={() => onToggle(task.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-1 transition-colors ${
                task.completed
                  ? 'bg-slate-400 border-slate-400'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-lg ${
                  task.completed
                    ? 'text-slate-400 line-through'
                    : 'text-slate-800'
                }`}
              >
                {task.text}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {task.priority && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                    data-testid={`task-priority-${task.id}`}
                  >
                    {task.priority}
                  </span>
                )}
                {task.dueDate && (
                  <span
                    className={`text-xs flex items-center gap-1 ${
                      isPast(new Date(task.dueDate)) && !task.completed
                        ? 'text-red-500'
                        : 'text-slate-400'
                    }`}
                    data-testid={`task-due-date-${task.id}`}
                  >
                    <Calendar className="w-3 h-3" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              data-testid={`task-edit-btn-${task.id}`}
              onClick={handleEdit}
              className="flex-shrink-0 p-2 hover:bg-slate-100 rounded transition-colors active:scale-95"
            >
              <Pencil className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Task</label>
              <Input
                data-testid="edit-task-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Task name"
                className="border-slate-200 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-1 block">Priority</label>
              <Select value={editPriority} onValueChange={setEditPriority}>
                <SelectTrigger data-testid="edit-task-priority" className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-600 mb-1 block">Due Date</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    data-testid="edit-task-due-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-slate-200"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {editDueDate ? format(editDueDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={editDueDate}
                    onSelect={(date) => {
                      setEditDueDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                    className="bg-white"
                  />
                  {editDueDate && (
                    <div className="p-2 border-t border-slate-200">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditDueDate(null);
                          setIsCalendarOpen(false);
                        }}
                        className="w-full text-slate-600 hover:bg-slate-50"
                      >
                        Clear date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                data-testid="cancel-edit-task-btn"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                data-testid="save-edit-task-btn"
                onClick={handleSaveEdit}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskItem;
