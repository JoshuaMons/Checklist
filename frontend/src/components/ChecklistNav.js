import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChecklistNav = ({
  checklists,
  activeChecklistId,
  setActiveChecklistId,
  addChecklist,
  deleteChecklist,
  renameChecklist
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);

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
              {checklist.name}
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
    </div>
  );
};

export default ChecklistNav;
