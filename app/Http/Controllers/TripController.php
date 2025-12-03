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

    public function destroy($id)
    {
        $trip = Trips::find($id);

        if (!$trip) {
            return response()->json(['message' => 'Trip not found'], 404);
        }

        $trip->delete();

        return response()->json(['message' => 'Trip deleted successfully'], 200);
    }
}
