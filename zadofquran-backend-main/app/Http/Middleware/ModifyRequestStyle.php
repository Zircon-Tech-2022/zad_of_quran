<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ModifyRequestStyle
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->acceptsJson()):
            $response->header('Content-Type', 'application/json');
            $success = $response->isSuccessful();
            $content = json_decode($response->getContent(), true);
            return apiResponse(
                $success,
                @$content['message'],
                $content['data'] ?? $content['errors'] ?? null,
                $response->getStatusCode()
            );
        endif;

        return $response;
    }
}
