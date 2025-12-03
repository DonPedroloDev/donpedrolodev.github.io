<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activities;
use App\Models\ActivityImages;


class ActivityImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $activity = Activities::first();

        ActivityImages::create([
            'activity_id' => $activity->id,
            'image_url' => '/uploads/foto.jpg',
        ]);

        ActivityImages::create([
            'activity_id' => $activity->id,
            'image_url' => '/uploads/foto.jpg',
        ]);
    }
}
