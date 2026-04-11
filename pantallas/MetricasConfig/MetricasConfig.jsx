import { useState } from 'react';
import MetricasConfigList from './MetricasConfigList';
import MetricasConfigForm from './MetricasConfigForm';
import MessageModal       from './MessageModal';
import './MetricasConfig.css';

/* ── DATOS DE EJEMPLO ─────────────────────────────────────────── */
const DATOS_INICIALES = [
  {
    id: 1, baja: 'N',
    cliente: 'ACME CORP',         codigoCliente: 100,
    hostname: 'AS400-PROD',       host:          'influx.acme.com',
    servicio: 'metrics-prod',
    maquinaCliente: 'IBM-7300',   versionMaquina: 'V7R5',
    endpointUrl: '192.168.1.10',  endpointPuerto: 8086,
    etiquetaPerf:       'cpu_usage',
    descripcionMetrica: 'Uso de CPU producción',
    tipoEstadistica:    'A',
    frecuenciaEnvio:    '5',
  },
  {
    id: 2, baja: 'N',
    cliente: 'GLOBEX SOLUTIONS',  codigoCliente: 200,
    hostname: 'AS400-DEV',        host:          'influx.globex.io',
    servicio: 'metrics-dev',
    maquinaCliente: 'IBM-7200',   versionMaquina: 'V7R4',
    endpointUrl: '10.0.0.5',      endpointPuerto: 8086,
    etiquetaPerf:       'mem_usage',
    descripcionMetrica: 'Uso de memoria desarrollo',
    tipoEstadistica:    'S',
    frecuenciaEnvio:    '1',
  },
  {
    id: 3, baja: 'S',
    cliente: 'INITECH INC',       codigoCliente: 300,
    hostname: 'AS400-BACKUP',     host:          'influx.initech.net',
    servicio: 'metrics-backup',
    maquinaCliente: 'IBM-7100',   versionMaquina: 'V7R3',
    endpointUrl: '172.16.0.20',   endpointPuerto: 9999,
    etiquetaPerf:       'disk_io',
    descripcionMetrica: 'E/S de disco backup',
    tipoEstadistica:    'M',
    frecuenciaEnvio:    'H',
  },
];

let nextId = DATOS_INICIALES.length + 1;

/* ── COMPONENTE PRINCIPAL ─────────────────────────────────────── */
export default function MetricasConfig() {
  const [registros, setRegistros]     = useState(DATOS_INICIALES);
  const [vista, setVista]             = useState('lista');   // 'lista' | 'formulario'
  const [modo, setModo]               = useState(null);      // 'crear' | 'modificar' | 'copiar' | 'ver'
  const [registroActual, setRegistroActual] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('activos'); // 'activos' | 'inactivos' | 'todos'
  const [modal, setModal]             = useState(null);      // { title, lines, isError }

  /* Registros filtrados por estado */
  const listaVisible =
    filtroEstado === 'activos'   ? registros.filter((r) => r.baja !== 'S') :
    filtroEstado === 'inactivos' ? registros.filter((r) => r.baja === 'S') :
    registros;

  /* ── ACCIONES LISTA ── */
  function handleCrear() {
    setRegistroActual(null);
    setModo('crear');
    setVista('formulario');
  }

  function handleSeleccionar(reg) {
    setRegistroActual(reg);
    setModo('ver');
    setVista('formulario');
  }

  function handleModificar(reg) {
    setRegistroActual(reg);
    setModo('modificar');
    setVista('formulario');
  }

  function handleCopiar(reg) {
    setRegistroActual({ ...reg, id: undefined });
    setModo('copiar');
    setVista('formulario');
  }

  function handleEliminar(reg) {
    setModal({
      title: 'Confirmar eliminación',
      lines: [
        `¿Desea eliminar el registro del cliente "${reg.cliente}"?`,
        'Esta acción marcará el registro como dado de baja.',
      ],
      isError: true,
      onConfirm: () => {
        setRegistros((prev) =>
          prev.map((r) => r.id === reg.id ? { ...r, baja: 'S' } : r)
        );
        setModal(null);
        mostrarInfo('Registro eliminado correctamente.', []);
      },
    });
  }

  function handleReactivar(reg) {
    setModal({
      title: 'Confirmar reactivación',
      lines: [
        `¿Desea reactivar el registro del cliente "${reg.cliente}"?`,
        'El registro volverá a estar activo.',
      ],
      isError: false,
      onConfirm: () => {
        setRegistros((prev) =>
          prev.map((r) => r.id === reg.id ? { ...r, baja: 'N' } : r)
        );
        setModal(null);
        mostrarInfo('Registro reactivado', ['El registro está activo de nuevo.']);
      },
    });
  }

  function handleProcesar(reg) {
    mostrarInfo('Procesando registro…', [
      `Cliente: ${reg.cliente}`,
      `Servicio: ${reg.servicio}`,
      'El procesamiento se ha enviado a la cola.',
    ]);
  }

  /* ── ACCIONES FORMULARIO ── */
  function handleGuardar(datos) {
    if (modo === 'crear' || modo === 'copiar') {
      const nuevo = { ...datos, id: nextId++, baja: 'N' };
      setRegistros((prev) => [...prev, nuevo]);
    } else if (modo === 'modificar') {
      setRegistros((prev) =>
        prev.map((r) => r.id === registroActual.id ? { ...r, ...datos } : r)
      );
    }
    setVista('lista');
    mostrarInfo('Registro guardado correctamente.', []);
  }

  function handleVolver() {
    setVista('lista');
    setRegistroActual(null);
    setModo(null);
  }

  /* ── MODAL HELPER ── */
  function mostrarInfo(title, lines) {
    setModal({ title, lines, isError: false, onConfirm: null });
  }

  function handleModalContinuar() {
    if (modal?.onConfirm) modal.onConfirm();
    else setModal(null);
  }

  /* ── RENDER ── */
  return (
    <>
      {vista === 'lista' && (
        <MetricasConfigList
          registros={listaVisible}
          filtroEstado={filtroEstado}
          onCambiarEstado={setFiltroEstado}
          onCrear={handleCrear}
          onSalir={() => mostrarInfo('Saliendo de la aplicación…', ['Hasta luego.'])}
          onSeleccionar={handleSeleccionar}
          onModificar={handleModificar}
          onCopiar={handleCopiar}
          onEliminar={handleEliminar}
          onProcesar={handleProcesar}
          onReactivar={handleReactivar}
        />
      )}

      {vista === 'formulario' && (
        <MetricasConfigForm
          registro={registroActual}
          modo={modo}
          onGuardar={handleGuardar}
          onVolver={handleVolver}
          onSeleccionar={() =>
            mostrarInfo('Selector de clientes', [
              'Aquí se abriría el selector de clientes del sistema.',
            ])
          }
        />
      )}

      {modal && (
        <MessageModal
          title={modal.title}
          lines={modal.lines}
          isError={modal.isError}
          onContinue={handleModalContinuar}
        />
      )}
    </>
  );
}
