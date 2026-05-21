<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CropPriceController;
use App\Http\Controllers\AuthController;

Route::get('/crop-prices', [CropPriceController::class, 'index']);

// Translations endpoint
Route::get('/translations/{locale}', function ($locale) {
    if (!in_array($locale, ['en', 'hi', 'pa', 'bn'])) {
        $locale = 'en';
    }
    
    Illuminate\Support\Facades\App::setLocale($locale);
    
    return response()->json([
        'messages' => __('messages'),
    ]);
});

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Product routes
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
    Route::delete('/products/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);
    
    // Chatbot route
    Route::post('/chat', [\App\Http\Controllers\ChatbotController::class, 'chat']);
});
