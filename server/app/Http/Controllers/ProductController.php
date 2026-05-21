<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = \App\Models\Product::with('user')->latest()->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'available_qty' => 'required|string',
            'category' => 'nullable|string',
            'icon' => 'nullable|string',
        ]);

        $product = $request->user()->products()->create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'unit' => $request->unit ?? 'kg',
            'available_qty' => $request->available_qty,
            'category' => $request->category,
            'icon' => $request->icon ?? '🛒',
        ]);

        return response()->json($product, 201);
    }

    public function destroy(Request $request, $id)
    {
        $product = clone $request->user()->products()->findOrFail($id);
        $request->user()->products()->findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
