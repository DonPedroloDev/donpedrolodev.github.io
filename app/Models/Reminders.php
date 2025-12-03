<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Activities;

class Reminders extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activities::class, 'activity_id');
    }
}
