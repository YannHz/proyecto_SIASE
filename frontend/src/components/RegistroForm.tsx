import { useEffect, useState } from 'react'

import {
    obtenerAlumno,
    obtenerInstructores,
    registrarDispositivo
} from '../services/registroService'

import '../styles/registro.css'

const RegistroForm = () => {

    const [studentId, setStudentId] = useState('')

    const [alumno, setAlumno] = useState({
        nombre_completo: '',
        carrera: '',
        semestre: ''
    })

    const [instructores, setInstructores] = useState<any[]>([])

    const [formData, setFormData] = useState({
        alumno_id: '',
        instructor_id: '',
        tipo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: '',
        observacion: '',
        estado: 1,
        usuario_creacion: 'mark'
    })

    useEffect(() => {

        if (studentId) {

            obtenerAlumno(studentId)
                .then(data => {

                    setAlumno(data)

                    setFormData(prev => ({
                        ...prev,
                        alumno_id: data.id
                    }))
                })
                .catch(console.error)
        }

    }, [studentId])

    useEffect(() => {

        obtenerInstructores()
            .then(setInstructores)
            .catch(console.error)

    }, [])

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        try {

            const response = await registrarDispositivo(formData)

            alert(response.mensaje)

        } catch (error) {

            console.error(error)

            alert('Error al registrar')
        }
    }

    return (

        <div className='container'>

            <div className='card'>

                <h1>
                    Registro de Dispositivos
                </h1>

                <form onSubmit={handleSubmit}>

                    <div className='grid'>

                        <div className='form-group'>

                            <label>ID Alumno</label>

                            <input
                                type='number'
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />

                        </div>

                        <div className='form-group'>

                            <label>Nombre Completo</label>

                            <input
                                type='text'
                                value={alumno.nombre_completo}
                                disabled
                            />

                        </div>

                        <div className='form-group'>

                            <label>Carrera</label>

                            <input
                                type='text'
                                value={alumno.carrera}
                                disabled
                            />

                        </div>

                        <div className='form-group'>

                            <label>Semestre</label>

                            <input
                                type='text'
                                value={alumno.semestre}
                                disabled
                            />

                        </div>

                        <div className='form-group'>

                            <label>Tipo</label>

                            <input
                                type='text'
                                name='tipo'
                                onChange={handleChange}
                            />

                        </div>

                        <div className='form-group'>

                            <label>Marca</label>

                            <input
                                type='text'
                                name='marca'
                                onChange={handleChange}
                            />

                        </div>

                        <div className='form-group'>

                            <label>Modelo</label>

                            <input
                                type='text'
                                name='modelo'
                                onChange={handleChange}
                            />

                        </div>

                        <div className='form-group'>

                            <label>Número Serie</label>

                            <input
                                type='text'
                                name='numero_serie'
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className='form-group'>

                        <label>Descripción</label>

                        <textarea
                            name='descripcion'
                            onChange={handleChange}
                        />

                    </div>

                    <div className='form-group'>

                        <label>Observación</label>

                        <textarea
                            name='observacion'
                            onChange={handleChange}
                        />

                    </div>

                    <div className='form-group'>

                        <label>Instructor</label>

                        <select
                            name='instructor_id'
                            onChange={handleChange}
                        >

                            <option value=''>
                                Seleccione
                            </option>

                            {
                                instructores.map((inst: any) => (
                                    <option
                                        key={inst.id}
                                        value={inst.id}
                                    >
                                        {inst.nombre_completo}
                                    </option>
                                ))
                            }

                        </select>

                    </div>

                    <button type='submit'>
                        Registrar
                    </button>

                </form>

            </div>

        </div>
    )
}

export default RegistroForm