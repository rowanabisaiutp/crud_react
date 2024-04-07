import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pcs from "./components/pc";
import Add from "./components/Add";
import Update from "./components/Update"

function App() {
  return (
    <div className="app">
      <h1>CRUD api rest backend/frontend</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<Add />} />
          <Route path="/" element={<Pcs />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}
 
export default App;