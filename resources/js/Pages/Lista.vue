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
            <div v-for="trip in trips" class="rounded-md border-2 p-5">
                <p class="text-sm font-bold">{{ trip.trip_type }}</p>
                <h3 class="text-lg font-semibold mt-1">{{ trip.title }}</h3>
                <p>Partiendo de: {{ trip.origin }}</p>
                <p>Por: {{ trip.user.name }}</p>

                <p
                    class="bg-neutral-200 rounded-md p-1 font-semibold inline-block my-4"
                >
                    {{ trip.destination }}
                </p>

                <p>
                    <span class="font-semibold">Notas:</span> {{ trip.notes }}
                </p>

                <p class="font-semibold my-2">Duración del viaje</p>
                <p class="mb-2">
                    {{ trip.start_date }} -
                    {{ trip.end_date }}
                </p>

                <img
                    v-if="
                        trip.activities.length &&
                        trip.activities[0].images.length
                    "
                    class="w-full h-40 rounded-md object-cover"
                    :src="
                        trip.activities.length
                            ? trip.activities[0].images.length
                                ? trip.activities[0].images[0].image_url
                                : ''
                            : ''
                    "
                    alt=""
                />

                <div v-if="trip.activities[0].images[0] == undefined">
                    <div class="w-full h-40 rounded-md bg-neutral-400">
                        <p class="text-center p-10 text-white">
                            Sin imagen disponible
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- {{ trips }} -->
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

const trips = ref([]);

onMounted(async () => {
    trips.value = (await axios.get("/api/trips")).data;
});
</script>
