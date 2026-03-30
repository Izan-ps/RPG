import { useState, useEffect } from "react";
import React from "react";
import './Mant.css';
import Footer from '../components/footer';
import Reloj from '../components/Reloj';

export default function Mant() {
    const [opc, setOpc] = useState(0);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function fetchClientes() {
            const res = await fetch("/clientes.json");
            const data = await res.json();
            setClientes(data);
        }
        fetchClientes();
    }, []);

    function editarCliente(index) {
        // Mostrar un formulario para editar el cliente seleccionado
    }

    function crearCliente() {
        // Mostrar un formulario para crear un nuevo cliente
    }

    function borrarCliente(index) {
        // Eliminar el cliente seleccionado de la lista
        let clientesActualizados = [...clientes];
        clientesActualizados.splice(index, 1);
        setClientes(clientesActualizados);
    }

    function mostrarCliente(index) {
        // Mostrar detalles del cliente seleccionado
    }

    function procesarCliente(index) {
        // Procesar el cliente
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>Usuario</li>
                    <li><u>Mantenimiento Configuraciones Métricas</u></li>
                    <li><Reloj /></li>
                </ul>


            </nav>
            <div className="contenedor">
                <div id="barra-acciones">
                    <button id="crear" onClick={crearCliente}>Nuevo Cliente +</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>HostName_IBMI</th>
                            <th>Servicio_INFLUXDB</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={index}>
                                <td onClick={() => mostrarCliente(index)}>
                                    {cliente.Nombre} {cliente.Apellidos}
                                </td>
                                <td>{cliente.Hostname_Ibmi}</td>
                                <td>{cliente.Servicio_InfluxDB}</td>
                                <td>
                                    <div className="acciones">
                                        <button id="editar" onClick={() => editarCliente(index)}>Editar</button>
                                        <button id="borrar" onClick={() => borrarCliente(index)}>Borrar</button>
                                        <button id="procesar" onClick={() => procesarCliente(index)}>Procesar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Footer />
            </div>


        </div>
    )
}
