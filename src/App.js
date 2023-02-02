import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Days from './pages/Days';
import Hourly from './pages/Hourly';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Days/> } />
          <Route path='/:day' element={<Hourly />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
