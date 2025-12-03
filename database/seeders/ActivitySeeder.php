<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activities;
use App\Models\Trips;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trip1 = Trips::first();
        $trip2 = Trips::skip(1)->first();

        Activities::create([
            'trip_id' => $trip1->id,
            'title' => 'Llegada al hotel',
            'description' => 'Check-in y descanso.',
            'activity_time' => '2025-06-10 14:00:00',
            'order_index' => 1,
        ]);

        Activities::create([
            'trip_id' => $trip1->id,
            'title' => 'Ir a la playa',
            'description' => 'Nadar y tomar el sol.',
            'activity_time' => '2025-06-11 10:00:00',
            'order_index' => 2,
        ]);

        Activities::create([
            'trip_id' => $trip2->id,
            'title' => 'Registro en el evento',
            'description' => 'Obtener gafete.',
            'activity_time' => '2025-08-01 09:00:00',
            'order_index' => 1,
        ]);
    }
}
