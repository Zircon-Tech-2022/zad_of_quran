<?php

namespace App\Traits;

trait StoreImage
{
  public function storeImage($request): string
  {
    $file = $request->file('image');
    $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
    $extension = $file->getClientOriginalExtension();
    $timestamp = now()->format('YmdHis');
    $filename = "{$originalName}_{$timestamp}.{$extension}";
    $path = $file->storeAs('staff', $filename, 'public');

    return $path;
  }
}
