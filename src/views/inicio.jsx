import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import ExcelJS from "exceljs";
import { useNavigate } from "react-router-dom";

const PaseLista = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const scannerRef = useRef(null); // Referencia para el contenedor del escáner
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
    if (!scannerRef.current) {
      setError("Contenedor del escáner no encontrado.");
      return;
    }
  
    try {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      await html5QrCode.start(
        { facingMode: "environment" }, // Usar cámara trasera
        { fps: 10, qrbox: { width: 250, height: 250 } }, // Configuración del escáner
        (decodedText) => {
          const cleanedText = decodedText.trim(); // Limpia el texto escaneado
          console.log("Texto escaneado:", cleanedText); // Registro de depuración
  
          // Verificar si el código escaneado es un enlace
          let estudiante = null;
  
          // Buscar por código de matrícula si es un número
          if (estudiantes[cleanedText]) {
            estudiante = estudiantes[cleanedText];
          } else {
            // Buscar por enlace si es una URL
            for (let matricula in estudiantes) {
              if (
                typeof estudiantes[matricula] === "object" &&
                estudiantes[matricula].enlace === cleanedText
              ) {
                estudiante = estudiantes[matricula];
                break;
              }
            }
          }
  
          if (estudiante) {
            console.log("Estudiante encontrado:", estudiante); // Registro de depuración
            setScannedCode(cleanedText);
  
            if (typeof estudiante === "object") {
              setStudentData(
                <div>
                  <p>Matricula: {estudiante.matricula}</p>
                  <p>Nombre: {estudiante.nombre}</p>
                  <p>Grupo: {estudiante.grupo}</p>
                  <p>Semestre: {estudiante.semestre}</p>
                  <a
                    href={estudiante.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                matricula: estudiante.matricula || cleanedText,
                nombreCompleto: estudiante.nombre || estudiante,
                grupo: estudiante.grupo || "N/A",
                semestre: estudiante.semestre || "N/A",
                asistencia: "Presente",
                fecha: new Date().toLocaleDateString(),
              },
            ]);
  
            setError(null); // Limpiar errores si todo fue bien
          } else {
            console.warn("Código no encontrado en la lista:", cleanedText);
            setError(`Código escaneado (${cleanedText}) no encontrado.`);
            setStudentData(<p>Estudiante no encontrado</p>);
          }
        },
        (error) => {
          console.warn(`Error al escanear: ${error}`);
        }
      );
    } catch (err) {
      setError("Error al iniciar el escáner.");
    }
  };
  

  const stopScan = async () => {
    try {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      await html5QrCode.stop();
    } catch (err) {
      console.error("Error al detener el escáner:", err);
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
<div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
  <header className="text-3xl font-bold text-gray-800 mt-12">Pase Lista</header>
  <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mt-8 text-center">
    <p className="text-lg text-gray-600 mb-6">Escanear código</p>

    <button onClick={startScan} className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-blue-600 transition duration-300">
      Escanear código
    </button>

    <button onClick={stopScan} className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-red-600 transition duration-300">
      Detener escáner
    </button>

    <div id="scanner-container" ref={scannerRef} className="w-full bg-gray-200 rounded-lg h-64 mb-6"></div>

    {studentData && <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md mb-4">{studentData}</div>}
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    <button onClick={guardarAsistencia} className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-yellow-600 transition duration-300">
      Guardar Asistencia
    </button>

    <button onClick={descargarAsistencia} className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-green-600 transition duration-300">
      Descargar Asistencia
    </button>

    <button onClick={inicio} className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
      Inicio
    </button>
  </main>
</div>
  );
};

export default PaseLista;