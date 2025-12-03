<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Trips;
use App\Models\ActivityImages;
use App\Models\Reminders;

class Activities extends Model
{
    public function trip()
{
    return $this->belongsTo(Trips::class, 'trip_id');
}

    public function images()
    {
        return $this->hasMany(ActivityImages::class, 'activity_id');
    }

    public function reminders()
    {
        return $this->hasMany(Reminders::class, 'activity_id');
    }
}
