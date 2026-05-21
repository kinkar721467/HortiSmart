<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $apiKey = env('GROQ_API_KEY');
        if (!$apiKey) {
            return response()->json(['reply' => 'Groq API key is not set in the server environment.'], 500);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'Content-Type' => 'application/json',
            ])->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama-3.3-70b-versatile',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are HortiSmart AI, a helpful agricultural assistant for farmers and buyers in India. Please be concise.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $request->message
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['choices'][0]['message']['content'] ?? "Sorry, I couldn't understand that.";
                return response()->json(['reply' => $reply]);
            }

            return response()->json(['reply' => 'Failed to connect to AI service. Please try again later.'], 500);
        } catch (\Exception $e) {
            return response()->json(['reply' => 'An error occurred while connecting to the AI.'], 500);
        }
    }
}
