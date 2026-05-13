const API = '/api'

export const obtenerAlumno = async (id: string) => {

    const response = await fetch(`${API}/alumnos/${id}`)

    return await response.json()
}

export const obtenerInstructores = async () => {

    const response = await fetch(`${API}/instructores`)

    return await response.json()
}

export const registrarDispositivo = async (data: any) => {

    const response = await fetch(`${API}/registro-dispositivo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}
