import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";
import Read from "./components/page/Read";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/read/:id" element={<Read />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
