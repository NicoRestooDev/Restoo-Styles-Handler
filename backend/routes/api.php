<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StyleController;

Route::get('ping', function () {
    return response()->json(['ok' => true]);
});

Route::get('/styles', [StyleController::class, 'show']);
Route::post('/styles', [StyleController::class, 'upsert']);