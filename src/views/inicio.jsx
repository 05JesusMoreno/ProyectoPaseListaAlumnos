import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import ExcelJS from "exceljs";
import { useNavigate } from "react-router-dom";

const PaseLista = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  const estudiantes = {
    22413070090141: "AMADOR BAUTISTA JORGE ALEJANDRO",
    22413070090209: "AMADOR SAN JUAN IRIS YELEINE",
    22413070090199: {
      matricula: "22413070090199",
      nombre: "CRUZ BAUTISTA YUSMAR",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=ZlE5ckdvRGJZdDhmdi84MEYrOW1Xdz09",
    },
    22413070090281: {
      matricula: "22413070090281",
      nombre: "CORTEZ DE LA CRUZ JORGE EDUARDO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=TElHaE1NZ1daYnN6OWZQVjFGY2VJZz09",
    },
  };

  const startScan = async () => {
    if (!scannerRef.current) {
      setError("Contenedor del escáner no encontrado.");
      return;
    }

    if (isScanning) {
      return;
    }

    setIsScanning(true);

    try {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 300, height: 300 } },
        (decodedText) => {
          const cleanedText = decodedText.trim();
          console.log("Texto escaneado:", cleanedText);

          let estudiante = null;

          if (estudiantes[cleanedText]) {
            estudiante = estudiantes[cleanedText];
          } else {
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
            setScannedCode(cleanedText);

            const hora = new Date().toLocaleTimeString(); // Obtener la hora actual

            if (typeof estudiante === "object") {
              setStudentData(
                <div>
                  <p>Matricula: {estudiante.matricula}</p>
                  <p>Nombre: {estudiante.nombre}</p>
                  <p>Grupo: {estudiante.grupo}</p>
                  <p>Semestre: {estudiante.semestre}</p>
                  <p>Hora: {hora}</p> {/* Mostrar la hora */}
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
                hora: hora, // Guardar la hora de la asistencia
              },
            ]);

            setError(null);
            html5QrCode.stop();
            setIsScanning(false);
          } else {
            setError(`Código escaneado (${cleanedText}) no encontrado.`);
            setStudentData(<p>Estudiante no encontrado</p>);
            html5QrCode.stop();
            setIsScanning(false);
          }
        },
        (error) => {
          console.warn(`Error al escanear: ${error}`);
        }
      );
    } catch (err) {
      setError("Error al iniciar el escáner.");
      setIsScanning(false);
    }
  };

  const stopScan = async () => {
    try {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      await html5QrCode.stop();
      setIsScanning(false);
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
        { header: "Hora", key: "hora" }, // Añadir columna de hora
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
      <main className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg mt-8 text-center relative">
        <p className="text-lg text-gray-600 mb-6">Escanear código</p>

        <button
          onClick={startScan}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-blue-600 transition duration-300"
          disabled={isScanning}
        >
          Escanear código
        </button>

        <div
          id="scanner-container"
          ref={scannerRef}
          className="w-full bg-gray-200 rounded-lg h-96 mb-6 mt-8"
        ></div>

        {studentData && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md mt-4">
            {studentData}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md mt-4">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-6 mt-8">
          <button
            onClick={guardarAsistencia}
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300 mb-4 sm:mb-0"
          >
            Guardar Asistencia
          </button>

          <button
            onClick={descargarAsistencia}
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 mb-4 sm:mb-0"
          >
            Descargar Asistencia
          </button>

          <button
            onClick={inicio}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Ir al Inicio
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaseLista;
