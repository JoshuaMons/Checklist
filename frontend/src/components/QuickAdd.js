import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const QuickAdd = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim(), priority, dueDate ? dueDate.toISOString() : null);
      setText('');
      setPriority('medium');
      setDueDate(null);
      setShowOptions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/70 border-t border-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.02)]">
      <div className="max-w-md mx-auto p-4">
        {/* Options */}
        {showOptions && (
          <div className="flex gap-2 mb-3">
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger data-testid="quick-add-priority" className="flex-1 border-slate-200 bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>

            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  data-testid="quick-add-due-date"
                  variant="outline"
                  className="border-slate-200 bg-white/80"
                >
                  <Calendar className="h-4 w-4" />
                  {dueDate && (
                    <span className="ml-2 text-xs">
                      {format(dueDate, 'MMM d')}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="end">
                <CalendarComponent
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                  className="bg-white"
                />
                {dueDate && (
                  <div className="p-2 border-t border-slate-200">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setDueDate(null);
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
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            data-testid="quick-add-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowOptions(true)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
          />
          <button
            data-testid="quick-add-btn"
            onClick={handleAdd}
            className="flex-shrink-0 w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl flex items-center justify-center transition-colors active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAdd;
