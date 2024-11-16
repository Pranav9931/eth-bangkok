import './App.css';
import { Routes, Route } from "react-router-dom";
import NavbarComponent from './components/navbar.component';
import Homepage from './pages/home';
function App() {

  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>

    </div>
  );
}

export default App;
