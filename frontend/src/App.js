import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChecklistApp from '@/components/ChecklistApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChecklistApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
