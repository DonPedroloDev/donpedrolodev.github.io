<template>
    <div class="rounded-md border-2 p-5">
        <p class="text-sm font-bold">{{ trip.trip_type }}</p>
        <h3 class="text-lg font-semibold mt-1">{{ trip.title }}</h3>
        <p>Partiendo de: {{ trip.origin }}</p>
        <p>Por: {{ trip.user.name }}</p>

        <p
            class="bg-neutral-200 rounded-md p-1 font-semibold inline-block my-4"
        >
            {{ trip.destination }}
        </p>

        <p><span class="font-semibold">Notas:</span> {{ trip.notes }}</p>

        <p class="font-semibold my-2">Duración del viaje</p>
        <p class="mb-2">{{ trip.start_date }} - {{ trip.end_date }}</p>

        <img
            v-if="trip.activities.length && trip.activities[0].images.length"
            class="w-full h-40 rounded-md object-cover"
            :src="trip.activities[0].images[0].image_url"
            alt="Imagen del viaje"
        />

        <div v-else>
            <div
                class="w-full h-40 rounded-md bg-neutral-400 flex items-center justify-center"
            >
                <p class="text-center p-10 text-white">Sin imagen disponible</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// define props correctamente
defineProps({
    trip: Object,
});
</script>
