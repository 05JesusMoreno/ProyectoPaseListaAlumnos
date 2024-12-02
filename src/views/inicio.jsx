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
    22413070090141: {
      matricula: "22413070090141",
      nombre: "AMADOR BAUTISTA JORGE ALEJANDRO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=V09YSndWR242MFVFanNxbzBpMEcyQT09",
    },
    22413070090209: {
      matricula: "22413070090209",
      nombre: "AMADOR SAN JUAN IRIS YELEINE",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=b3pjTWJnWGdkZkZBZm1RRHUvTlE2Zz09",
    },
    22413070090172: {
      matricula: "22413070090172",
      nombre: "BAUTISTA BAUTISTA IKER",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=N2VQUG45OTdJcjcyZ2dvZnJjelp6Zz09",
    },
    22413070090151: {
      matricula: "22413070090151",
      nombre: "BAUTISTA MERIDA EMMANUEL",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=dDVTWDlvaEFXaHlDUHhEcFlCOFNDZz09",
    },
    22413070090176: {
      matricula: "22413070090176",
      nombre: "BAUTISTA NOCHEBUENA DEYSI GUADALUPE",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=WDR5V1cxUlEyb3kvTHlhZHFRME9pQT09",
    },
    22413070090201: {
      matricula: "22413070090201",
      nombre: "BAUTISTA SANTIAGO HIVAN",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=K0pwSmxGRm9mak5vMkdvZHU0aWg2UT09",
    },
    22413070090002: {
      matricula: "22413070090002",
      nombre: "CASTELLANOS NARANJO SAMANTHA YOULETEE",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=NHdVeW5JU3dkQWEwNHU2UVZQWmZpUT09",
    },
    22413070090281: {
      matricula: "22413070090281",
      nombre: "CORTEZ DE LA CRUZ JORGE EDUARDO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=TElHaE1NZ1daYnN6OWZQVjFGY2VJZz09",
    },
    22413070090199: {
      matricula: "22413070090199",
      nombre: "CRUZ BAUTISTA YUSMAR",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=ZlE5ckdvRGJZdDhmdi84MEYrOW1Xdz09",
    },
    22413070090088: {
      matricula: " 22413070090334",
      nombre: " FERNANDEZ FERNANDEZ FERNANDA JOANNA",
      semestre: "5",
      grupo: "I",
      enlace:
      " http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=Uk5rWWhkS3IyOVc5elZER2tjdjZyZz09",
    },
    22413070090317: {
      matricula: "22413070090317",
      nombre: "FLORES MANILLA ALBERTO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=L0dMTG5JMGppNEhWSWt5SWcxcUR6Zz09",
    },
    22413070090042: {
      matricula: "22413070090042",
      nombre: "FLORES VELAZQUEZ JIMMY",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=VW1NaUVKV084MUpVQlFKc1ZRNHhOQT09",
    },
    224130700900868: {
      matricula: "22413070090368",
      nombre: "HERNANDEZ BALTAZAR MISAEL",
      semestre: "5",
      grupo: "I",
      enlace:
     "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=a1c5cWVZSzRiOFUyQ3FScVdFblp6UT09",
    },
    22413070090080: {
      matricula: "22413070090080",
      nombre: "HERNANDEZ DE LA CRUZ RONALDO",
      semestre: "5",
      grupo: "I",
      enlace:
     "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=azZKaFBZc1VmOUpMc2JjcHd1RVNlQT09",
    },
    22413070090343: {
      matricula: "22413070090343 ",
      nombre: "HERNANDEZ DIEGO YARELI GUADALUPE",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=cmNvT0c2d1BXRzRnazdJSWhJcEg4QT09",
    },
    22413070090403: {
      matricula: "22413070090403",
      nombre: "HERNANDEZ HERNANDEZ OSCAR",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=SWQwYXgyR3IxQTJ4UlBuY2EwV2VRUT09",
    },
    22413070090162: {
      matricula: "22413070090162",
      nombre: "HERNANDEZ HERNANDEZ YAHIR",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=SWtOVnVyeHNVQ3RialBQTm11T2h1UT09",
    },
    20413070090206: {
      matricula: "22413070090206",
      nombre: " HERNANDEZ LOPEZ DIANA",
      semestre: "5",
      grupo: "I",
      enlace:
      "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=UHNyOUE3RzQwV09sNmpxajF0M20vZz09",
  },
    19413070090138: {
      matricula: "19413070090138",
      nombre: "MARTINEZ HERNANDEZ ELI JARED",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=aVVSRDY5andna3JLQVVCb2hDN2lDQT09",
    },     
    21413070090103: {
      matricula: "21413070090103",
      nombre: "ORDAZ HERNANDEZ VALENTIN",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=UkJaZzEzKzNUUXNPUGJOZnZ5b1BSdz09",
    },
    22413070090344: {
      matricula: "22413070090344",
      nombre: "RAMON DIEGO JUAN DE JESUS ",
      semestre: "5",
      grupo: "I",
      enlace:
      "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=ZTd6eStMTmxCSmF0QmhjejJnRFRCQT09",
    },
    22413070090207: {
      matricula: "22413070090207",
      nombre: "REYEZ HERNADEZ JOEL ARMANDO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=aWFwdzZzcy96WUIrbDZBUzV2bHI0QT09",
    },
    22413070090232: {
      matricula: "22413070090232",
      nombre: "RIVERA HERNANDEZ ZAIRA",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=ZDdOcHVXMTVWWVMvek5LSVNIVzVsdz09",
    },
    22413070090125: {
      matricula: "22413070090125",
      nombre: "RODRIGUEZ CASTELLANOS YAEL JUSTINO",
      semestre: "5",
      grupo: "I",
      enlace:
      "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=QjFPYVJQWFNnZENFNkRyenpvdEJ1QT09",
    },
    22413070090261: {
      matricula: "22413070090261",
      nombre: "SAN JUAN HERNANDEZ CARLOS DANIEL",
      semestre: "5",
      grupo: "I",
      enlace:
        "https://www.cecyteh.edu.mx/consulta_alumno/index.php?id=WkpUaDNGdUNwNjZPdkZhYk5TZ1NVZz09",
    },
    22413070090088: {
      matricula: "22413070090088",
      nombre: "SANCHEZ FLORES JESUS ALBERTO",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=bi82ZDhRQjhWTDJZbGhkSzdrUHUrdz09",
    },
    22413070090295: {
      matricula: "22413070090295",
      nombre: "SAN JUAN RUIZ MARELY",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=a0NPQ3hqckR4Qk5tSGRnS2dWMmN6Zz09",
    },
    21413070090417: {
      matricula: "21413070090417",
      nombre: "TORRES CRUZ ABRAHAM",
      semestre: "5",
      grupo: "I",
      enlace:
      "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=UWJRbVdleE1oNHV0dk1ISTlEeGthZz09",
    },
    22413070090356: {
      matricula: "22413070090356",
      nombre: "ZAVALA ZAVALA ALVARO JESUS",
      semestre: "5",
      grupo: "I",
      enlace:
        "http://www.cecyteh.edu.mx/consulta_alumno/index.php?id=SWhlTWJCWjh4SXZhN2VJdzdOVWxaZz09",
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

        </div>
      </main>
    </div>
  );
};

export default PaseLista;
