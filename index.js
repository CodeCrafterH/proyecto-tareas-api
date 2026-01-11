const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ** SIMULACIÓN DE DATOS (Estado inicial) **
let listaDeTareas = [
    { id: 1, titulo: "Configurar API 201", completada: true, prioridad: "Alta" },
    { id: 2, titulo: "Crear endpoint GET para Tareas", completada: false, prioridad: "Alta" },
    { id: 3, titulo: "Probar con Postman", completada: false, prioridad: "Media" },
    { id: 4, titulo: "Generar informe PDF", completada: false, prioridad: "Baja" }
];

// 1. ENDPOINT PARA LEER DATOS (GET /api/tareas)
app.get('/api/tareas', (req, res) => {
    console.log('✅ Solicitud GET recibida: Enviando lista de tareas');
    res.status(200).json(listaDeTareas);
});

// 2. ENDPOINT POST MEJORADO (Agrega el dato y devuelve 201)
app.post('/api/datos', (req, res) => {
    const nuevaTarea = req.body;

    // Agregamos la tarea que viene de la App Expo a nuestra lista local
    listaDeTareas.push({
        id: listaDeTareas.length + 1,
        titulo: nuevaTarea.titulo || "Tarea Nueva",
        completada: false,
        prioridad: nuevaTarea.prioridad || "Media"
    });

    console.log('➕ Recurso creado mediante POST');
    res.status(201).json({
        mensaje: 'Recurso creado exitosamente.',
        data: nuevaTarea
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Node.js escuchando en http://localhost:${PORT}`);
});