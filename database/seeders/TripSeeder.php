<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trips;
use App\Models\User;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        Trips::create([
            'user_id' => $user->id,
            'origin' => 'Ciudad de México',
            'destination' => 'Cancún',
            'title' => 'Vacaciones de Verano',
            'trip_type' => 'Playa',
            'start_date' => '2025-06-10',
            'end_date' => '2025-06-15',
            'notes' => 'Viaje para relajarme.',
        ]);

        Trips::create([
            'user_id' => $user->id,
            'origin' => 'Guadalajara',
            'destination' => 'Ciudad de México',
            'title' => 'Conferencia de Tecnología',
            'trip_type' => 'Trabajo',
            'start_date' => '2025-08-01',
            'end_date' => '2025-08-05',
            'notes' => 'Conferencia de tecnología.',
        ]);
    }
}
