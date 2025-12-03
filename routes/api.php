<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TripController;

Route::get('/trips', [TripController::class, 'index']);

Route::delete('/trips/{id}', [TripController::class, 'destroy']);
