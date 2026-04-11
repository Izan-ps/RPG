import { useState } from 'react';

const MAX_RECORDS = 16;

export default function MetricasConfigList({
  registros,
  filtroEstado,
  onCambiarEstado,
  onCrear,
  onSalir,
  onSeleccionar,
  onModificar,
  onCopiar,
  onEliminar,
  onProcesar,
  onReactivar,
}) {
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroHost,    setFiltroHost]    = useState('');
  const [filtroServ,    setFiltroServ]    = useState('');
  const [pagina,        setPagina]        = useState(0);

  const POR_PAGINA = 15;

  /* ── Opciones en cascada ── */
  const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();

  const optsCliente = uniq(registros.map((r) => r.cliente));
  const porCliente  = registros.filter((r) => !filtroCliente || r.cliente  === filtroCliente);
  const optsHost    = uniq(porCliente.map((r) => r.hostname));
  const porHost     = porCliente.filter((r) => !filtroHost   || r.hostname === filtroHost);
  const optsServ    = uniq(porHost.map((r) => r.servicio));
  const filtrados   = porHost.filter((r) => !filtroServ || r.servicio === filtroServ);

  const maxAlcanzado = filtrados.length >= MAX_RECORDS;
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas - 1);
  const visibles     = filtrados.slice(paginaActual * POR_PAGINA, (paginaActual + 1) * POR_PAGINA);
  const hayMas       = paginaActual < totalPaginas - 1;

  function handleCliente(v) { setFiltroCliente(v); setFiltroHost(''); setFiltroServ(''); setPagina(0); }
  function handleHost(v)    { setFiltroHost(v);    setFiltroServ(''); setPagina(0); }
  function handleServ(v)    { setFiltroServ(v);    setPagina(0); }

  function resetFiltros() {
    setFiltroCliente('');
    setFiltroHost('');
    setFiltroServ('');
    setPagina(0);
  }

  const etiquetaEstado = { activos: 'Activos', inactivos: 'Inactivos', todos: 'Todos' };

  return (
    <main className="page">

      {/* ── CABECERA ── */}
      <header className="page-header">
        <span className="page-header__user" aria-label="Usuario actual">USER</span>
        <h1 className="page-header__title">Mantenimiento Configuraciones Métricas</h1>
        <time className="page-header__datetime" aria-label="Fecha y hora actual">
          {new Date().toLocaleString('es-ES')}
        </time>
      </header>

      {/* ── FILTROS ── */}
      <section
        className="filter-bar"
        role="search"
        aria-label="Filtrar registros"
      >
        <div className="filter-bar__field">
          <label htmlFor="f-cliente">Cliente</label>
          <select
            id="f-cliente"
            value={filtroCliente}
            onChange={(e) => handleCliente(e.target.value)}
          >
            <option value="">— Todos —</option>
            {optsCliente.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="filter-bar__field">
          <label htmlFor="f-host">Hostname IBM i</label>
          <select
            id="f-host"
            value={filtroHost}
            onChange={(e) => handleHost(e.target.value)}
          >
            <option value="">— Todos —</option>
            {optsHost.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="filter-bar__field">
          <label htmlFor="f-serv">Servicio InfluxDB</label>
          <select
            id="f-serv"
            value={filtroServ}
            onChange={(e) => handleServ(e.target.value)}
          >
            <option value="">— Todos —</option>
            {optsServ.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <button className="btn btn-secondary" onClick={resetFiltros} type="button">
          Limpiar filtros
        </button>
      </section>

      {/* ── AVISO MÁXIMO ── */}
      {maxAlcanzado && (
        <p role="alert" className="alert alert--danger">
          Número de registros máximo alcanzado
        </p>
      )}

      {/* ── TABLA ── */}
      <div className="table-wrapper">

        {/* Control de estado: dentro del recuadro, fila de cabecera */}
        <div className="table-controls" role="toolbar" aria-label="Vista de registros">
          <span className="table-controls__label" aria-hidden="true">Mostrar</span>
          <select
            aria-label={`Estado de registros: actualmente ${etiquetaEstado[filtroEstado]}`}
            className="th-estado-select"
            value={filtroEstado}
            onChange={(e) => onCambiarEstado(e.target.value)}
          >
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
            <option value="todos">Todos</option>
          </select>
          <span className="table-controls__count" aria-live="polite" aria-atomic="true">
            {filtrados.length} registro{filtrados.length !== 1 ? 's' : ''}
          </span>
        </div>

        <table
          className="data-table"
          aria-label="Listado de configuraciones de métricas"
          aria-rowcount={filtrados.length}
        >
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Hostname IBM i</th>
              <th scope="col">Servicio InfluxDB</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 && (
              <tr>
                <td colSpan={4} className="table-empty">
                  No hay registros que coincidan con los filtros aplicados.
                </td>
              </tr>
            )}
            {visibles.map((reg) => {
              const esBaja = reg.baja === 'S';
              return (
                <tr
                  key={reg.id}
                  className={esBaja ? 'row--baja' : ''}
                  aria-label={`${reg.cliente}${esBaja ? ', dado de baja' : ''}`}
                >
                  <td className={esBaja ? 'cell--baja' : ''}>{reg.cliente}</td>
                  <td className={esBaja ? 'cell--baja' : ''}>{reg.hostname}</td>
                  <td className={esBaja ? 'cell--baja' : ''}>{reg.servicio}</td>
                  <td className="row-actions">
                    {esBaja ? (
                      <button
                        type="button"
                        className="btn-action btn-action--reactivate"
                        aria-label={`Reactivar registro de ${reg.cliente}`}
                        onClick={() => onReactivar(reg)}
                      >
                        ↺ Reactivar
                      </button>
                    ) : (
                      <>
                        <button type="button" className="btn-action btn-action--select"
                          aria-label={`Ver detalle de ${reg.cliente}`}
                          onClick={() => onSeleccionar(reg)}>
                          ✓ Ver
                        </button>
                        <button type="button" className="btn-action btn-action--edit"
                          aria-label={`Editar ${reg.cliente}`}
                          onClick={() => onModificar(reg)}>
                          ✎ Editar
                        </button>
                        <button type="button" className="btn-action btn-action--copy"
                          aria-label={`Copiar ${reg.cliente}`}
                          onClick={() => onCopiar(reg)}>
                          ⧉ Copiar
                        </button>
                        <button type="button" className="btn-action btn-action--delete"
                          aria-label={`Dar de baja ${reg.cliente}`}
                          onClick={() => onEliminar(reg)}>
                          ✕ Baja
                        </button>
                        <button type="button" className="btn-action btn-action--process"
                          aria-label={`Procesar ${reg.cliente}`}
                          onClick={() => onProcesar(reg)}>
                          ▶ Procesar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── PAGINACIÓN ── */}
      {totalPaginas > 1 && (
        <nav className="pagination" aria-label="Paginación de resultados">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={paginaActual === 0}
            aria-label="Página anterior"
            onClick={() => setPagina((p) => p - 1)}
          >
            ← Anterior
          </button>
          <span aria-current="page" aria-live="polite">
            Página {paginaActual + 1} de {totalPaginas}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={!hayMas}
            aria-label="Página siguiente"
            onClick={() => setPagina((p) => p + 1)}
          >
            Siguiente →
          </button>
        </nav>
      )}

      {/* ── PIE ── */}
      <footer className="page-footer">
        <button type="button" className="btn btn-success" onClick={onCrear}>
          + Crear nuevo registro
        </button>
        <button type="button" className="btn btn-danger" onClick={onSalir}>
          Salir
        </button>
      </footer>

    </main>
  );
}
