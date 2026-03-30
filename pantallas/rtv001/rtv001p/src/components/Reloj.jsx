import React, { useState, useEffect } from 'react';

const Reloj = () => {
  // 1. Inicializamos el estado con la fecha actual
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    // 2. Creamos un intervalo que actualiza el estado cada 1000ms (1 segundo)
    const timer = setInterval(() => {
      setFecha(new Date());
    }, 1000);

    // 3. Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>{fecha.toLocaleDateString()} - {fecha.toLocaleTimeString()}</p>
    </div>
  );
};

export default Reloj;