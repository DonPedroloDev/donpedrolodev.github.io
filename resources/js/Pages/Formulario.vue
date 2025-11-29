<template>
    <div class="page" :style="{ backgroundImage: `url(${bg})` }">
        <!-- NAVBAR SUPERIOR -->
        <header class="nav-bar">
            <div class="nav-inner">
                <div class="logo-area">
                    <img :src="logo" alt="Logo Cuentos de Viaje" />
                    <span class="logo-text">Cuentos de Viaje</span>
                </div>

                <button class="help-btn" type="button">
                    <span>Ayuda</span>
                </button>
            </div>
        </header>

        <!-- CONTENIDO (FORMULARIO) -->
        <main class="inner">
            <section class="form-card">
                <!-- Breadcrumb -->
                <div class="breadcrumb">
                    <a href="#">Iniciar sesión</a>
                    <span class="separator">›</span>
                    <span class="current">Formulario de Viaje</span>
                </div>

                <h2 class="section-title">Formulario de Viaje</h2>

                <!-- Título -->
                <div class="field-group">
                    <label for="titulo">Título</label>
                    <input
                        id="titulo"
                        class="text-input"
                        v-model="titulo"
                        placeholder="Mi viaje a Costa Rica"
                    />
                </div>

                <!-- Destino / Origen -->
                <div class="field-group">
                    <label>Destino</label>

                    <div class="destino-row">
                        <div class="segment-control">
                            <input
                                type="radio"
                                id="origen"
                                value="origen"
                                v-model="tipoDestino"
                            />
                            <label class="segment left" for="origen"
                                >Origen</label
                            >

                            <button
                                class="swap-btn"
                                type="button"
                                @click="swap"
                            >
                                ⇄
                            </button>

                            <input
                                type="radio"
                                id="destino"
                                value="destino"
                                v-model="tipoDestino"
                            />
                            <label class="segment" for="destino">Destino</label>
                        </div>
                    </div>

                    <!-- Campo que cambia según Origen/Destino -->
                    <div class="autocomplete">
                        <input
                            class="text-input"
                            v-model="lugarActual"
                            :placeholder="placeholderLugar"
                            autocomplete="off"
                        />

                        <ul v-if="sugerencias.length" class="suggestions">
                            <li
                                v-for="(s, i) in sugerencias"
                                :key="i"
                                @click="seleccionarSugerencia(s)"
                            >
                                {{ s }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Fecha -->
                <div class="field-group">
                    <label>Fecha</label>

                    <div class="date-row">
                        <div class="date-input">
                            <span>Inicio</span>
                            <input type="date" v-model="fechaInicio" />
                        </div>

                        <div class="date-input">
                            <span>Final</span>
                            <input type="date" v-model="fechaFinal" />
                        </div>
                    </div>
                </div>

                <!-- Actividades -->
                <div class="field-group">
                    <div class="activities-header">
                        <span>Actividades</span>
                        <button
                            class="new-activity-btn"
                            type="button"
                            @click="agregarActividad"
                        >
                            Nueva Actividad
                        </button>
                    </div>

                    <div
                        v-for="(act, i) in actividades"
                        :key="i"
                        class="activity-card"
                    >
                        <div class="activity-time">
                            <div>{{ act.hora }}</div>
                        </div>

                        <div class="activity-content">
                            <div class="activity-top-row">
                                <input
                                    class="activity-title-input"
                                    v-model="act.titulo"
                                    placeholder="Visita a la playa de Teulada"
                                />
                                <div class="activity-actions">
                                    <button
                                        class="delete-activity-btn"
                                        type="button"
                                        @click="eliminarActividad(i)"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>

                            <textarea
                                class="activity-desc"
                                v-model="act.descripcion"
                                placeholder="Añade una breve descripción de la actividad..."
                            ></textarea>

                            <!-- Preview de imagen + botón para quitar -->
                            <div
                                v-if="act.imagenUrl"
                                class="activity-image-wrapper"
                            >
                                <img
                                    :src="act.imagenUrl"
                                    alt="Imagen actividad"
                                    class="activity-image"
                                />
                                <button
                                    type="button"
                                    class="remove-image-btn"
                                    @click="quitarImagen(i)"
                                >
                                    ✕
                                </button>
                            </div>

                            <label class="upload-label">
                                Agregar imagen
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="subirImagen(i, $event)"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Tipo de viaje -->
                <div class="field-group">
                    <label for="tipoViaje">Tipo de viaje</label>
                    <input
                        id="tipoViaje"
                        class="text-input"
                        v-model="tipoViaje"
                        placeholder="Negocios, turismo, trabajo..."
                    />
                </div>

                <!-- Notas -->
                <div class="field-group">
                    <label for="notas">Notas de viaje</label>
                    <textarea
                        id="notas"
                        class="text-area"
                        v-model="notas"
                        placeholder="Escribe tus notas de viaje..."
                    ></textarea>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import logo from "./assets/logo.png";
import bg from "./assets/BGFormulario.png";

/* Estado básico */
const titulo = ref("");
const tipoDestino = ref("origen");

const origenTexto = ref("");
const destinoTexto = ref("");

const fechaInicio = ref("");
const fechaFinal = ref("");
const tipoViaje = ref("");
const notas = ref("");

/* Sugerencias simples para autocompletar */
const destinos = [
    "Costa Rica",
    "Teulada",
    "Madrid",
    "Barcelona",
    "París",
    "Londres",
    "Tokio",
    "Roma",
    "Berlín",
    "Nueva York",
    "Seúl",
    "Bangkok",
    "Ciudad de México",
    "Mérida",
    "Buenos Aires",
    "Santiago de Chile",
];

const sugerencias = ref([]);

/* Actividades */
const actividades = ref([
    {
        hora: "10:00 AM",
        titulo: "Visita a la playa de Teulada",
        descripcion: "",
        imagen: null,
        imagenUrl: null,
    },
]);

/* Campo que cambia entre Origen/Destino */
const lugarActual = computed({
    get() {
        return tipoDestino.value === "origen"
            ? origenTexto.value
            : destinoTexto.value;
    },
    set(val) {
        if (tipoDestino.value === "origen") {
            origenTexto.value = val;
        } else {
            destinoTexto.value = val;
        }

        const buscado = val.toLowerCase().trim();
        if (!buscado) {
            sugerencias.value = [];
            return;
        }
        sugerencias.value = destinos.filter((d) =>
            d.toLowerCase().includes(buscado)
        );
    },
});

const placeholderLugar = computed(() =>
    tipoDestino.value === "origen"
        ? "Escribe tu lugar de origen..."
        : "Escribe tu destino..."
);

const seleccionarSugerencia = (s) => {
    lugarActual.value = s;
    sugerencias.value = [];
};

const swap = () => {
    tipoDestino.value = tipoDestino.value === "origen" ? "destino" : "origen";
};

/* Actividades */
const agregarActividad = () => {
    actividades.value.push({
        hora: "10:00 AM",
        titulo: "",
        descripcion: "",
        imagen: null,
        imagenUrl: null,
    });
};

const eliminarActividad = (index) => {
    const act = actividades.value[index];
    if (act?.imagenUrl) {
        URL.revokeObjectURL(act.imagenUrl);
    }
    actividades.value.splice(index, 1);
};

const subirImagen = (index, event) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
        input.value = "";
        return;
    }

    const url = URL.createObjectURL(file);
    const act = actividades.value[index];

    if (act.imagenUrl) {
        URL.revokeObjectURL(act.imagenUrl);
    }

    act.imagen = file;
    act.imagenUrl = url;

    // 🔥 importante: resetear el input para poder volver a elegir la MISMA imagen
    input.value = "";
};

const quitarImagen = (index) => {
    const act = actividades.value[index];
    if (!act) return;

    if (act.imagenUrl) {
        URL.revokeObjectURL(act.imagenUrl);
    }

    act.imagen = null;
    act.imagenUrl = null;
};
</script>

<style scoped>
/* RESET */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
}

/* --- FONDO --- */
.page {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* --- NAVBAR --- */
.nav-bar {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 4px;
}

.logo-area img {
    height: 50px;
    width: auto;
}

.logo-text {
    font-size: 20px;
    font-weight: 600;
    color: #d4af37;
}

.help-btn {
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid #111827;
    background: transparent;
    cursor: pointer;
}

/* --- CONTENIDO --- */
.inner {
    max-width: 1200px;
    margin: 32px auto;
    padding: 0 24px;
}

/* TARJETA FORMULARIO */
.form-card {
    background: #f7f7f7;
    border-radius: 14px;
    padding: 26px 32px 32px;
    max-width: 660px;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

/* BREADCRUMB */
.breadcrumb {
    display: flex;
    gap: 6px;
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 6px;
}

/* TÍTULO SECCIÓN */
.section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 18px;
    color: #374151;
}

/* CAMPOS */
.field-group {
    margin-bottom: 18px;
}

.field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #6b7280;
}

.text-input,
.text-area {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 11px 13px;
    font-size: 14px;
    background: #ffffff;
}

.text-area {
    resize: vertical;
    min-height: 70px;
}

/* DESTINO */
.destino-row {
    margin-bottom: 8px;
}

.segment-control {
    display: flex;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    position: relative;
    overflow: hidden;
}

.segment-control input {
    display: none;
}

.segment {
    flex: 1;
    text-align: center;
    padding: 8px 16px;
    font-size: 13px;
    color: #9ca3af;
}

.segment.left {
    border-right: 1px solid #e5e7eb;
}

.segment-control input:checked + .segment {
    background: #ffffff;
    color: #4b5563;
    font-weight: 600;
}

/* BOLITA DORADA */
.swap-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: #d4af37;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}

/* AUTOCOMPLETE */
.autocomplete {
    position: relative;
}

.suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    list-style: none;
    padding: 4px 0;
    margin-top: 4px;
    z-index: 10;
}

.suggestions li {
    padding: 6px 10px;
    cursor: pointer;
}

/* FECHAS */
.date-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.date-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 11px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
}

.date-input span {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
}

/* ACTIVIDADES */
.activities-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
}

.new-activity-btn {
    background: #d4af37;
    border-radius: 6px;
    border: none;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 600;
    color: #4b5563;
    cursor: pointer;
}

.activity-card {
    display: grid;
    grid-template-columns: 90px 1fr;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    margin-bottom: 12px;
}

.activity-time {
    background: #d4af37;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
}

.activity-content {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.activity-top-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.activity-title-input {
    flex: 1;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    padding: 7px 9px;
    font-size: 13px;
}

.activity-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Botón rojo de eliminar actividad (para que se vea bien) */
.delete-activity-btn {
    border-radius: 6px;
    border: 1px solid #fecaca;
    background: #fee2e2;
    color: #b91c1c;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}

/* Descripción */
.activity-desc {
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    padding: 7px 9px;
    font-size: 12px;
    min-height: 42px;
}

/* PREVIEW IMAGEN */
.activity-image-wrapper {
    position: relative;
    display: inline-block;
    margin-top: 4px;
}

.activity-image {
    max-width: 190px;
    max-height: 110px;
    border-radius: 6px;
    object-fit: cover;
    border: 1px solid #e5e7eb;
}

/* Botón quitar imagen */
.remove-image-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    border: none;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    cursor: pointer;
}

/* Upload */
.upload-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border-radius: 6px;
    border: 1px dashed #cbd5e1;
    background: #f9fafb;
    font-size: 12px;
    color: #6b7280;
    cursor: pointer;
}

.upload-label input {
    display: none;
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .inner {
        margin: 24px auto;
        padding: 0 12px;
    }

    .form-card {
        padding: 20px 18px 24px;
    }

    .date-row {
        grid-template-columns: 1fr;
    }

    .activity-card {
        grid-template-columns: 76px 1fr;
    }
}
</style>
