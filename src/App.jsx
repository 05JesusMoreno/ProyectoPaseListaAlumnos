import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./views/inicio";




function App() {


  return (
<<<<<<< HEAD
    <>
<<<<<<< HEAD
      <div>
        <button onClick={goToPaseLista}>Pasar lista</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
      <div className="text-blue-400 text-3xl font-semibold text-center">
        hola mundo
      </div>
>>>>>>> ab0ad0f29b655945d5703bc4b6470cc32b6c6136
    </>
=======
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
    </BrowserRouter>
>>>>>>> 6eafea779a3f904de43c30c98143743532244564
  );
}

export default App;
