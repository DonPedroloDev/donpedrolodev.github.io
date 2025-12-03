<template>
    <div class="relative">
        <img
            class="w-full h-96 object-cover"
            src="/img/banner-lista.jpg"
            alt="Logo"
        />
        <div
            class="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-[#43380F]/60 text-white"
        >
            <h1 class="font-bold text-7xl text-center max-w-screen-md mx-auto">
                Cuentos de viajes para almas aventureras
            </h1>
        </div>
    </div>

    <!-- Wrapper -->
    <div class="max-w-screen-xl mx-auto mt-8">
        <h2 class="text-4xl font-bold text-neutral-600">
            Animate a compartir tus experiencias con nosotros
        </h2>
        <div class="grid grid-cols-4 gap-4 mt-5">
            <FichaViajeLista
                v-for="trip in trips"
                :key="trip.id"
                :trip="trip"
            />
        </div>
    </div>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

import FichaViajeLista from "@/Components/FichaViajeLista.vue";

const trips = ref([]);

onMounted(async () => {
    trips.value = (await axios.get("/api/trips")).data;
});
</script>
