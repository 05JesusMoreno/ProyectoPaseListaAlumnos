import { useState } from "react";
<<<<<<< HEAD
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./views/inicio";




function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
    </BrowserRouter>
=======
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-blue-400 text-3xl font-semibold text-center">
        hola mundo
      </div>
    </>
>>>>>>> ab0ad0f29b655945d5703bc4b6470cc32b6c6136
  );
}

export default App;
