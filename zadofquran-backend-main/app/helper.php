<?php

if (!function_exists('apiResponse')):
    function apiResponse($success, $message = null, $data = null, $statusCode = 200)
    {
        $response = [
            'success' => $success,
            'data' => $data,
            'message' => $message,
        ];

        return response()->json($response, $statusCode);
    }
endif;

if (!function_exists('apiErrorResponse')):
    function apiErrorResponse($message = null, $data = null, $statusCode = 400)
    {
        return apiResponse(false, $message, $data, $statusCode);
    }
endif;

if (!function_exists('apiSuccessResponse')):
    function apiSuccessResponse($message = null, $data = null, $statusCode = 200)
    {
        return apiResponse(true, $message, $data, $statusCode);
    }
endif;

if (!function_exists('uploadFile')):
    function uploadFile($fileName, $folder = 'files', $old = null, $default = null)
    {
        if (request()->hasFile($fileName)):
            $img = request()->file($fileName)->store('blogs', 'public');
            $path = Storage::url($img);
            $image = asset($path);
            if ($old && $path):
                $oldImage = str_replace(asset('storage'), 'public', $old);
                Storage::delete($oldImage);
            endif;
            return $image;
        endif;
        return $old ?? $default;
    }
endif;

if (!function_exists('deleteFile')):
    function deleteFile($file)
    {
        if ($file):
            $file = str_replace(asset('storage'), 'public', $file);
            Storage::delete($file);
        endif;
    }
endif;
