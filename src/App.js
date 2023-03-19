import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
