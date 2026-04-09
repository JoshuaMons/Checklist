import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Repeat } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ChecklistNav = ({
  checklists,
  activeChecklistId,
  setActiveChecklistId,
  addChecklist,
  deleteChecklist,
  renameChecklist,
  updateChecklistRepeat
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [repeatType, setRepeatType] = useState('none');
  const [repeatCount, setRepeatCount] = useState(1);

  const activeChecklist = checklists.find(cl => cl.id === activeChecklistId);

  const handleEdit = (checklist) => {
    setEditingId(checklist.id);
    setEditName(checklist.name);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editName.trim() && editingId) {
      renameChecklist(editingId, editName.trim());
      setIsEditOpen(false);
      setEditingId(null);
    }
  };

  const handleOpenRepeat = () => {
    if (activeChecklist) {
      setRepeatType(activeChecklist.repeatType || 'none');
      setRepeatCount(activeChecklist.repeatCount || 1);
      setIsRepeatOpen(true);
    }
  };

  const handleSaveRepeat = () => {
    if (activeChecklistId) {
      updateChecklistRepeat(activeChecklistId, repeatType, repeatCount);
      setIsRepeatOpen(false);
    }
  };

  const getRepeatLabel = (checklist) => {
    if (checklist.repeatType === 'daily') return 'Daily';
    if (checklist.repeatType === 'custom' && checklist.repeatCount > 0) 
      return `${checklist.repeatCount}x`;
    return null;
  };

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {checklists.map(checklist => (
          <motion.div
            key={checklist.id}
            layout
            className="flex-shrink-0"
          >
            <button
              data-testid={`checklist-tab-${checklist.id}`}
              onClick={() => setActiveChecklistId(checklist.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeChecklistId === checklist.id
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-500 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {checklist.name}
                {getRepeatLabel(checklist) && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/20">
                    {getRepeatLabel(checklist)}
                  </span>
                )}
              </div>
            </button>
            {activeChecklistId === checklist.id && (
              <div className="flex gap-1 mt-1 justify-center">
                <button
                  data-testid="edit-checklist-btn"
                  onClick={() => handleEdit(checklist)}
                  className="p-1 hover:bg-slate-200 rounded transition-colors"
                >
                  <Pencil className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  data-testid="repeat-checklist-btn"
                  onClick={handleOpenRepeat}
                  className="p-1 hover:bg-slate-200 rounded transition-colors"
                >
                  <Repeat className="w-3 h-3 text-slate-400" />
                </button>
                {checklists.length > 1 && (
                  <button
                    data-testid="delete-checklist-btn"
                    onClick={() => deleteChecklist(checklist.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        ))}
        
        <button
          data-testid="add-checklist-btn"
          onClick={addChecklist}
          className="flex-shrink-0 px-3 py-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Rename Checklist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              data-testid="rename-checklist-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
              placeholder="Checklist name"
              className="border-slate-200 focus:border-slate-400"
            />
            <div className="flex gap-2 justify-end">
              <Button
                data-testid="cancel-rename-btn"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                data-testid="save-rename-btn"
                onClick={handleSaveEdit}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Repeat Dialog */}
      <Dialog open={isRepeatOpen} onOpenChange={setIsRepeatOpen}>
        <DialogContent className="bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Repeat Checklist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Repeat Type</label>
              <Select value={repeatType} onValueChange={setRepeatType}>
                <SelectTrigger data-testid="repeat-type-select" className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="none">No Repeat</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="custom">Custom Count</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {repeatType === 'custom' && (
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Number of Times</label>
                <Input
                  data-testid="repeat-count-input"
                  type="number"
                  min="1"
                  max="100"
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(parseInt(e.target.value) || 1)}
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end pt-2">
              <Button
                data-testid="cancel-repeat-btn"
                variant="outline"
                onClick={() => setIsRepeatOpen(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                data-testid="save-repeat-btn"
                onClick={handleSaveRepeat}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChecklistNav;
