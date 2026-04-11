import { useState, useEffect, useId } from 'react';

const TIPO_ESTADISTICA_OPTS = [
  { value: 'A', label: 'A – Promedio' },
  { value: 'S', label: 'S – Suma'     },
  { value: 'M', label: 'M – Máximo'   },
  { value: 'N', label: 'N – Mínimo'   },
];

const FRECUENCIA_OPTS = [
  { value: '1', label: '1 – Cada minuto'   },
  { value: '5', label: '5 – Cada 5 minutos' },
  { value: 'H', label: 'H – Cada hora'     },
  { value: 'D', label: 'D – Diaria'        },
];

export default function MetricasConfigForm({
  registro,
  modo,           // 'crear' | 'modificar' | 'copiar' | 'ver'
  onGuardar,
  onVolver,
  onSeleccionar,
}) {
  const uid       = useId();
  const esLectura = modo === 'ver';

  const tituloModo = {
    crear:     'Nuevo registro',
    modificar: 'Modificar registro',
    copiar:    'Copiar registro',
    ver:       'Ver registro',
  }[modo] ?? '';

  const vacío = {
    codigoCliente: '', maquinaCliente: '', versionMaquina: '',
    endpointUrl: '', endpointPuerto: '', host: '', servicio: '',
    etiquetaPerf: '', descripcionMetrica: '', tipoEstadistica: '', frecuenciaEnvio: '',
  };

  const [form,          setForm]    = useState(vacío);
  const [errores,       setErrores] = useState({});
  const [clienteNombre, setCN]      = useState('');

  useEffect(() => {
    if (registro) {
      setForm({
        codigoCliente:      registro.codigoCliente      ?? '',
        maquinaCliente:     registro.maquinaCliente     ?? '',
        versionMaquina:     registro.versionMaquina     ?? '',
        endpointUrl:        registro.endpointUrl        ?? '',
        endpointPuerto:     registro.endpointPuerto     ?? '',
        host:               registro.host               ?? '',
        servicio:           registro.servicio           ?? '',
        etiquetaPerf:       registro.etiquetaPerf       ?? '',
        descripcionMetrica: registro.descripcionMetrica ?? '',
        tipoEstadistica:    registro.tipoEstadistica    ?? '',
        frecuenciaEnvio:    registro.frecuenciaEnvio    ?? '',
      });
      setCN(registro.cliente ?? '');
    } else {
      setForm(vacío);
      setCN('');
    }
    setErrores({});
  }, [registro, modo]);

  function ch(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrores((p) => ({ ...p, [k]: undefined }));
  }

  function validar() {
    const e = {};
    if (!form.codigoCliente)   e.codigoCliente   = 'El código de cliente es obligatorio';
    if (!form.maquinaCliente)  e.maquinaCliente  = 'La máquina cliente es obligatoria';
    if (!form.host)            e.host            = 'El host es obligatorio';
    if (!form.servicio)        e.servicio        = 'El servicio es obligatorio';
    if (!form.tipoEstadistica) e.tipoEstadistica = 'El tipo de estadística es obligatorio';
    if (!form.frecuenciaEnvio) e.frecuenciaEnvio = 'La frecuencia de envío es obligatoria';
    if (form.endpointPuerto && isNaN(Number(form.endpointPuerto)))
      e.endpointPuerto = 'El puerto debe ser un número';
    setErrores(e);
    if (Object.keys(e).length > 0) {
      // Llevar el foco al primer campo con error
      const primerCampo = document.getElementById(`${uid}-${Object.keys(e)[0]}`);
      primerCampo?.focus();
    }
    return Object.keys(e).length === 0;
  }

  /* Componente de campo reutilizable */
  function Campo({ name, label, type = 'text', maxLength, required, children }) {
    const id      = `${uid}-${name}`;
    const errId   = `${uid}-${name}-err`;
    const tieneError = !!errores[name];
    return (
      <div className={`form-field${tieneError ? ' form-field--error' : ''}`}>
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="form-required" aria-hidden="true"> *</span>}
        </label>
        <div className="form-input-wrap">
          {children ?? (
            <input
              id={id}
              type={type}
              value={form[name]}
              onChange={(e) => ch(name, e.target.value)}
              maxLength={maxLength}
              readOnly={esLectura}
              required={required}
              aria-required={required}
              aria-invalid={tieneError}
              aria-describedby={tieneError ? errId : undefined}
              className={`form-input${tieneError ? ' form-input--error' : ''}${esLectura ? ' form-input--readonly' : ''}`}
            />
          )}
        </div>
        {tieneError && (
          <p id={errId} role="alert" className="form-error">
            {errores[name]}
          </p>
        )}
      </div>
    );
  }

  function CampoSelect({ name, label, opts, required }) {
    const id      = `${uid}-${name}`;
    const errId   = `${uid}-${name}-err`;
    const tieneError = !!errores[name];
    return (
      <div className={`form-field${tieneError ? ' form-field--error' : ''}`}>
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="form-required" aria-hidden="true"> *</span>}
        </label>
        <div className="form-input-wrap">
          {esLectura ? (
            <input
              id={id}
              type="text"
              value={form[name]}
              readOnly
              className="form-input form-input--readonly"
            />
          ) : (
            <select
              id={id}
              value={form[name]}
              onChange={(e) => ch(name, e.target.value)}
              required={required}
              aria-required={required}
              aria-invalid={tieneError}
              aria-describedby={tieneError ? errId : undefined}
              className={`form-select${tieneError ? ' form-input--error' : ''}`}
            >
              <option value="">— Selecciona —</option>
              {opts.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          )}
        </div>
        {tieneError && (
          <p id={errId} role="alert" className="form-error">
            {errores[name]}
          </p>
        )}
      </div>
    );
  }

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

      {/* ── FORMULARIO ── */}
      <form
        className="form-container"
        aria-label={tituloModo}
        onSubmit={(e) => { e.preventDefault(); if (!esLectura && validar()) onGuardar({ ...form, cliente: clienteNombre }); }}
        noValidate
      >
        <h2 className="form-section-title">{tituloModo}</h2>

        {!esLectura && (
          <p className="form-hint-global">
            Los campos marcados con <span aria-hidden="true">*</span>
            <span className="sr-only">asterisco</span> son obligatorios.
          </p>
        )}

        {/* Código cliente */}
        <div className={`form-field${errores.codigoCliente ? ' form-field--error' : ''}`}>
          <label htmlFor={`${uid}-codigoCliente`} className="form-label">
            Código de cliente
            {!esLectura && <span className="form-required" aria-hidden="true"> *</span>}
          </label>
          <div className="form-input-wrap form-input-wrap--with-btn">
            <input
              id={`${uid}-codigoCliente`}
              type="number"
              value={form.codigoCliente}
              onChange={(e) => ch('codigoCliente', e.target.value)}
              readOnly={esLectura}
              required={!esLectura}
              aria-required={!esLectura}
              aria-invalid={!!errores.codigoCliente}
              aria-describedby={
                [errores.codigoCliente ? `${uid}-codigoCliente-err` : '',
                 clienteNombre        ? `${uid}-codigoCliente-hint` : '']
                  .filter(Boolean).join(' ') || undefined
              }
              className={`form-input${errores.codigoCliente ? ' form-input--error' : ''}${esLectura ? ' form-input--readonly' : ''}`}
            />
            {!esLectura && (
              <button
                type="button"
                className="btn btn-secondary btn--inline"
                onClick={onSeleccionar}
                aria-label="Abrir selector de clientes"
              >
                Seleccionar
              </button>
            )}
          </div>
          {clienteNombre && (
            <p id={`${uid}-codigoCliente-hint`} className="form-hint">{clienteNombre}</p>
          )}
          {errores.codigoCliente && (
            <p id={`${uid}-codigoCliente-err`} role="alert" className="form-error">
              {errores.codigoCliente}
            </p>
          )}
        </div>

        <Campo name="maquinaCliente"     label="Máquina cliente"      maxLength={35} required={!esLectura} />
        <Campo name="versionMaquina"     label="Versión de máquina"   maxLength={10} />

        {/* Endpoint / Puerto */}
        <div className="form-field">
          <label className="form-label" id={`${uid}-endpoint-label`}>
            Endpoint / Puerto
          </label>
          <div
            className="form-input-wrap form-input-wrap--endpoint"
            role="group"
            aria-labelledby={`${uid}-endpoint-label`}
          >
            <span className="form-prefix" aria-hidden="true">http://</span>
            <input
              id={`${uid}-endpointUrl`}
              type="text"
              value={form.endpointUrl}
              onChange={(e) => ch('endpointUrl', e.target.value)}
              readOnly={esLectura}
              maxLength={15}
              placeholder="dirección"
              aria-label="Dirección del endpoint"
              className={`form-input${esLectura ? ' form-input--readonly' : ''}`}
            />
            <span className="form-prefix" aria-hidden="true">:</span>
            <input
              id={`${uid}-endpointPuerto`}
              type="number"
              value={form.endpointPuerto}
              onChange={(e) => ch('endpointPuerto', e.target.value)}
              readOnly={esLectura}
              maxLength={5}
              placeholder="puerto"
              aria-label="Puerto del endpoint"
              aria-invalid={!!errores.endpointPuerto}
              aria-describedby={errores.endpointPuerto ? `${uid}-endpointPuerto-err` : undefined}
              className={`form-input form-input--port${errores.endpointPuerto ? ' form-input--error' : ''}${esLectura ? ' form-input--readonly' : ''}`}
            />
          </div>
          {errores.endpointPuerto && (
            <p id={`${uid}-endpointPuerto-err`} role="alert" className="form-error">
              {errores.endpointPuerto}
            </p>
          )}
        </div>

        <Campo name="host"               label="Host"                  maxLength={50} required={!esLectura} />
        <Campo name="servicio"           label="Servicio"              maxLength={50} required={!esLectura} />
        <Campo name="etiquetaPerf"       label="Etiqueta performance"  maxLength={35} />
        <Campo name="descripcionMetrica" label="Descripción métrica"   maxLength={35} />

        <CampoSelect name="tipoEstadistica" label="Tipo de estadística" opts={TIPO_ESTADISTICA_OPTS} required={!esLectura} />
        <CampoSelect name="frecuenciaEnvio" label="Frecuencia de envío" opts={FRECUENCIA_OPTS}       required={!esLectura} />

        {/* Acciones del formulario */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onVolver}>
            ← Volver
          </button>
          {!esLectura && (
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          )}
        </div>
      </form>

    </main>
  );
}
