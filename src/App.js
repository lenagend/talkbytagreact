import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";
import Read from "./components/page/Read";
import Search from "./components/page/Search";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/search/:word" element={<Search/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
