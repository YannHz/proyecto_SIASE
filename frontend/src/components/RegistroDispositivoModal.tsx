import { useState, useEffect } from 'react';
import { X, Laptop } from 'lucide-react';
import { API_BASE } from '../services/api';

interface Instructor {
  id: number;
  nombre_completo: string;
}

interface Props {
  alumnoId: number;
  instructorIdDefault?: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistroDispositivoModal({
  alumnoId,
  instructorIdDefault,
  onClose,
  onSuccess,
}: Props) {
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    instructor_id: instructorIdDefault?.toString() ?? '',
    tipo: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    descripcion: '',
    observacion: '',
  });

  useEffect(() => {
    // 1. Recuperamos el token para autorizar la carga de instructores
    const token = localStorage.getItem("auth_token");

    fetch(`${API_BASE}/api/instructor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Encabezado de seguridad añadido
      }
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`Error en el servidor: ${r.status}`);
        }
        return r.json();
      })
      .then(setInstructores)
      .catch(error => {
        console.error("Error al cargar los instructores:", error);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tipo || !formData.marca || !formData.modelo) {
      alert('Completa los campos obligatorios: Tipo, Marca y Modelo.');
      return;
    }
    if (!formData.instructor_id) {
      alert('Selecciona un instructor.');
      return;
    }

    setLoading(true);

    // 2. Recuperamos el token para autorizar la inserción del dispositivo
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(`${API_BASE}/api/registro_dispositivo`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Encabezado de seguridad añadido
        },
        body: JSON.stringify({
          alumno_id: alumnoId,
          instructor_id: Number(formData.instructor_id),
          guardia_id: 1, // placeholder, se asigna en flujo de ingreso
          tipo: formData.tipo,
          marca: formData.marca,
          modelo: formData.modelo,
          numero_serie: formData.numero_serie,
          descripcion: formData.descripcion,
          observacion: formData.observacion,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onSuccess();
      } else {
        alert(data.error || 'Error al registrar dispositivo');
      }
    } catch {
      alert('Error de conexión al registrar el dispositivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Laptop size={22} color="var(--color-nav-bg)" />
            <h2 className="modal-title">Registro de Dispositivo</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Cerrar">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Datos del dispositivo */}
          <div className="modal-form-grid">
            <div className="modal-form-group">
              <label className="modal-label">Tipo *</label>
              <input
                className="modal-input"
                name="tipo"
                placeholder="Ej: Laptop, Tablet…"
                value={formData.tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Marca *</label>
              <input
                className="modal-input"
                name="marca"
                placeholder="Ej: Dell, HP…"
                value={formData.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Modelo *</label>
              <input
                className="modal-input"
                name="modelo"
                placeholder="Ej: Inspiron 15"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-form-group">
              <label className="modal-label">Número de Serie</label>
              <input
                className="modal-input"
                name="numero_serie"
                placeholder="Ej: SN1234567"
                value={formData.numero_serie}
                onChange={handleChange}
              />
            </div>

            <div className="modal-form-group full-width">
              <label className="modal-label">Descripción</label>
              <textarea
                className="modal-textarea"
                name="descripcion"
                placeholder="Descripción del dispositivo…"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="modal-form-group full-width">
              <label className="modal-label">Observación</label>
              <textarea
                className="modal-textarea"
                name="observacion"
                placeholder="Observaciones adicionales…"
                value={formData.observacion}
                onChange={handleChange}
              />
            </div>

            <div className="modal-form-group full-width">
              <label className="modal-label">Instructor *</label>
              <select
                className="modal-select"
                name="instructor_id"
                value={formData.instructor_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un instructor</option>
                {instructores.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-modal-submit" disabled={loading}>
              {loading ? 'Registrando…' : 'Registrar Dispositivo'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}