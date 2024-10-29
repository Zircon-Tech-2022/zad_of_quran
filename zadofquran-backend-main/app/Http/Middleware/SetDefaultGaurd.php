<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetDefaultGaurd
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->acceptsHtml()):
            config(['auth.defaults.guard' => 'web']);
        else:
            config(['auth.defaults.guard' => 'sanctum']);
        endif;
        return $next($request);
    }
}