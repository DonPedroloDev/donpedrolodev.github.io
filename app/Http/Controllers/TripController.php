<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trips;

class TripController extends Controller
{
    public function index()
    {
        return Trips::with([
            'user',
            'activities',
            'activities.images',
            'activities.reminders'
        ])->get();
    }
}
