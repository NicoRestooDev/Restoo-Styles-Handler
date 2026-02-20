<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Style;
use Illuminate\Support\Facades\Storage;



class StyleController extends Controller
{
    public function show()
    {
        $style = Style::first();

        if (!$style){
            return response()->json([
                'exists' => false,
                'color' => '#ffffff',
                'font' => 'Roboto',
                'image_url' => null,
            ]);
        }

        return response()->json([
            'exists' => true,
            'color' => $style->color,
            'font' => $style->font,
            'image_url' => $style->image_path 
            ? asset('storage/' . $style->image_path) 
            : null,
        ]);
    }

    public function upsert(Request $request)
    {

            $style = Style::first();
            $isCreate = !$style;

            $rules = [
                'color' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
                'font' => ['required', 'string', 'max:255'],
                'image' => $isCreate 
                ? ['required', 'file', 'image', 'max:512'] 
                : ['nullable', 'file', 'image', 'max:512'],
            ];

            $messages = [
                'color.required' => 'El color es obligatorio',
                'color.regex' => 'El color debe tener formato hex, como #ffffff.',
                'font.required' => 'La fuente es obligatoria',
                'font.max' => 'Nombre invalidado por longitud',
                'image.required' => 'La imagen es obligatoria para dar de alta el libro de reservas',
                'image.image' => 'El archivo debe ser una imágen válida (jpg, png, webp, etc)',
                'image.max' => 'La imagen no puede superar los 512kB',
            ];

            $data = $request->validate($rules, $messages);

            $newImagePath = null;
            if($request ->hasFile('image')) {
                $newImagePath = $request -> file('image')->store('styles', 'public');
            }

            if ($isCreate){
                $style = Style::create([
                    'color' => $data['color'],
                    'font' => $data['font'],
                    'image_path' => $newImagePath,
                ]);

                return response() -> json([
                    'message' => 'Estilos creados correctamente',
                    'exists' => true,
                    'created' => true,
                    'color' => $style->color,
                    'font' => $style->font,
                    'image_url' => $style->image_path 
                                            ? asset ('storage/' . $style -> image_path )
                                            : null,
                ], 201);
            }

            if ($newImagePath) {
                if($style->image_path && Storage::disk('public')->exists($style->image_path)){
                    Storage::disk('public')->delete($style->image_path);
                }
                $style->image_path = $newImagePath;
            }

            $style->color = $data['color'];
            $style->font  = $data['font'];
            $style->save();

            return response()->json([
                'message' => 'Estilos actualizado correctamente.',
                'exists' => true,
                'updated' => true,
                'color' => $style->color,
                'font'  => $style->font,
                'image_url' => $style->image_path ? asset('storage/' . $style->image_path) : null,
            ]);
        }
    
}
