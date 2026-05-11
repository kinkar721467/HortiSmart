<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CropPriceController extends Controller
{
    public function index(Request $request)
    {
        $apiKey = "579b464db66ec23bdd0000013f044175ddca4c034861771de9b7dec8";

        $params = array_filter([
            'api-key' => $apiKey,
            'format' => 'json',
            'limit' => 20,
            'filters[commodity]' => $request->commodity,
            'filters[state]' => $request->state,
        ]);

        $response = Http::get("https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070", $params);

        return response()->json($response->json());
    }
}

