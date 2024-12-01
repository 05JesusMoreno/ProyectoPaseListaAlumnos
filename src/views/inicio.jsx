import React, { useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import ExcelJS from "exceljs";
import { useNavigate } from "react-router-dom";

const PaseLista = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const navigate = useNavigate();

  const estudiantes = {
    "22413070090141": "AMADOR BAUTISTA JORGE ALEJANDRO",
    "22413070090209": "AMADOR SAN JUAN IRIS YELEINE",
    "22413070090199": {
      matricula: "22413070090199",
      nombre: "CRUZ BAUTISTA YUSMAR",
      semestre: "5",
      grupo: "I",
      enlace: "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=ZlE5ckdvRGJZdDhmdi84MEYrOW1Xdz09",
    },
    "22413070090281": {
      matricula: "22413070090281",
      nombre: "CORTEZ DE LA CRUZ JORGE EDUARDO",
      semestre: "5",
      grupo: "I",
      enlace: "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=TElHaE1NZ1daYnN6OWZQVjFGY2VJZz09",
    },
  };

  const startScan = async () => {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      const result = await BarcodeScanner.startScan();
      if (result.hasContent && estudiantes[result.content]) {
        setScannedCode(result.content);
        const estudiante = estudiantes[result.content];
        if (typeof estudiante === "object" && estudiante.enlace) {
          setStudentData(
            <div>
              <p>Matricula: {estudiante.matricula}</p>
              <p>Nombre: {estudiante.nombre}</p>
              <p>Grupo: {estudiante.grupo}</p>
              <p>Semestre: {estudiante.semestre}</p>
              <a href={estudiante.enlace} target="_blank" rel="noopener noreferrer">
                Ver más detalles
              </a>
            </div>
          );
        } else {
          setStudentData(<p>{estudiante}</p>);
        }
        setScannedData((prevData) => [
          ...prevData,
          {
            matricula: estudiante.matricula || estudiante,
            nombreCompleto: estudiante.nombre || estudiante,
            grupo: estudiante.grupo || estudiante,
            semestre: estudiante.semestre || estudiante,
            asistencia: "Presente",
            fecha: new Date().toLocaleDateString(),
          },
        ]);
      } else {
        setStudentData(<p>Estudiante no encontrado</p>);
      }
    } catch (err) {
      setError("Error al escanear el código");
    } finally {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  };

  const guardarAsistencia = () => {
    if (scannedData.length === 0) {
      setError("No hay datos para guardar.");
      return;
    }
    setError("Datos guardados en memoria con éxito.");
    setScannedCode(null);
    setStudentData(null);
  };

  const descargarAsistencia = async () => {
    if (scannedData.length === 0) {
      setError("No hay datos para descargar.");
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Asistencia");

      worksheet.columns = [
        { header: "Matricula", key: "matricula" },
        { header: "Nombre Completo", key: "nombreCompleto" },
        { header: "Grupo", key: "grupo" },
        { header: "Semestre", key: "semestre" },
        { header: "Asistencia", key: "asistencia" },
        { header: "Fecha", key: "fecha" },
      ];

      scannedData.forEach((item) => {
        worksheet.addRow(item);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "asistencia.xlsx";
      link.click();
      URL.revokeObjectURL(url);

      setError("Archivo Excel descargado con éxito.");
    } catch (error) {
      setError("Error al guardar el archivo Excel.");
      console.error(error);
    }
  };

  const inicio = () => {
    navigate("/");
  };

  return (
<div className="pase-lista-page bg-gray-100 min-h-screen flex flex-col items-center justify-center">
  <header className="header text-3xl font-semibold text-gray-800 mb-6">
    Pase Lista
  </header>
  <main className="content bg-white p-6 rounded-lg shadow-lg w-96">
    <p className="text-lg text-gray-700 mb-4">Escanear código</p>
    <button 
      onClick={startScan} 
      className="btn w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 mb-4"
    >
      Escanear código
    </button>
    
    {studentData && (
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
        {studentData}
      </div>
    )}
    
    {error && <p className="error text-red-500 text-center mb-4">{error}</p>}

    <button 
      onClick={guardarAsistencia} 
      className="btn w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 mb-4"
    >
      Guardar Asistencia
    </button>

    <button 
      onClick={descargarAsistencia} 
      className="btn w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 mb-4"
    >
      Descargar Asistencia
    </button>

    <button 
      onClick={inicio} 
      className="btn w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Inicio
    </button>
  </main>
</div>
  );
};

export default PaseLista;