import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import ChecklistNav from './ChecklistNav';
import TaskItem from './TaskItem';
import QuickAdd from './QuickAdd';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const ChecklistApp = () => {
  const [checklists, setChecklists] = useLocalStorage('checklists', [
    { id: uuidv4(), name: 'My Tasks', tasks: [] }
  ]);
  const [activeChecklistId, setActiveChecklistId] = useLocalStorage('activeChecklistId', checklists[0]?.id);

  const activeChecklist = checklists.find(cl => cl.id === activeChecklistId) || checklists[0];
  const activeTasks = activeChecklist?.tasks || [];
  const incompleteTasks = activeTasks.filter(task => !task.completed);
  const completedTasks = activeTasks.filter(task => task.completed);

  const addChecklist = () => {
    const newChecklist = {
      id: uuidv4(),
      name: `List ${checklists.length + 1}`,
      tasks: []
    };
    setChecklists([...checklists, newChecklist]);
    setActiveChecklistId(newChecklist.id);
  };

  const deleteChecklist = (id) => {
    if (checklists.length <= 1) return;
    const filtered = checklists.filter(cl => cl.id !== id);
    setChecklists(filtered);
    if (activeChecklistId === id) {
      setActiveChecklistId(filtered[0].id);
    }
  };

  const renameChecklist = (id, newName) => {
    setChecklists(checklists.map(cl =>
      cl.id === id ? { ...cl, name: newName } : cl
    ));
  };

  const addTask = (text, priority = 'medium', dueDate = null) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString()
    };

    setChecklists(checklists.map(cl =>
      cl.id === activeChecklistId
        ? { ...cl, tasks: [...cl.tasks, newTask] }
        : cl
    ));
  };

  const toggleTask = (taskId) => {
    setChecklists(checklists.map(cl =>
      cl.id === activeChecklistId
        ? {
            ...cl,
            tasks: cl.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : cl
    ));
  };

  const deleteTask = (taskId) => {
    setChecklists(checklists.map(cl =>
      cl.id === activeChecklistId
        ? { ...cl, tasks: cl.tasks.filter(task => task.id !== taskId) }
        : cl
    ));
  };

  const updateTask = (taskId, updates) => {
    setChecklists(checklists.map(cl =>
      cl.id === activeChecklistId
        ? {
            ...cl,
            tasks: cl.tasks.map(task =>
              task.id === taskId ? { ...task, ...updates } : task
            )
          }
        : cl
    ));
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] flex flex-col relative bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 bg-slate-50">
        <h1 className="text-3xl sm:text-4xl tracking-tight font-light text-slate-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Quick Tasks
        </h1>
      </div>

      {/* Checklist Navigation */}
      <ChecklistNav
        checklists={checklists}
        activeChecklistId={activeChecklistId}
        setActiveChecklistId={setActiveChecklistId}
        addChecklist={addChecklist}
        deleteChecklist={deleteChecklist}
        renameChecklist={renameChecklist}
      />

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Active Tasks */}
        <AnimatePresence mode="popLayout">
          {incompleteTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </AnimatePresence>

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <div className="mt-8">
            <div className="text-xs tracking-[0.05em] text-slate-500 uppercase font-medium mb-3 px-1">
              Completed ({completedTasks.length})
            </div>
            <AnimatePresence mode="popLayout">
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  isCompleted
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {activeTasks.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No tasks yet</p>
            <p className="text-sm mt-2">Add your first task below</p>
          </div>
        )}
      </div>

      {/* Quick Add */}
      <QuickAdd onAdd={addTask} />
    </div>
  );
};

export default ChecklistApp;
