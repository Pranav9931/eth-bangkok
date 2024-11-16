import './App.css';
import { Routes, Route } from "react-router-dom";
import NavbarComponent from './components/navbar.component';
import Homepage from './pages/home';
import TicketComponent from './components/ticket.component';
import SelectNFT from './pages/selectnft/selectnft.page';
import { useStateContext } from './context';
import { useEffect } from 'react';
import SuccessTransaction from './pages/success.transaction';
function App() {

  const { setActivePage } = useStateContext();
  useEffect(() => {
    setActivePage("home");
  }, [])
  
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tickets/:id" element={<SelectNFT />} />
        <Route path="/bookticket/:id/:id" element={
          <div className="wrapper">
            <TicketComponent />
          </div>
        } />

        <Route path="/success" element={<SuccessTransaction />} />

        <Route path="*" element={<Homepage />} />
      </Routes>

    </div>
  );
}

export default App;
