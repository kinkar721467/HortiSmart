<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CropPriceController;

Route::get('/crop-prices', [CropPriceController::class, 'index']);
