<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activities;
use App\Models\Reminders;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        $activity = Activities::first();

        Reminders::create([
            'activity_id' => $activity->id,
            'reminder_text' => 'Empacar traje de baño.',
            'remind_at' => '2025-06-09 20:00:00',
        ]);

        Reminders::create([
            'activity_id' => $activity->id,
            'reminder_text' => 'Confirmar reservación.',
            'remind_at' => '2025-06-09 18:00:00',
        ]);
    }
}
