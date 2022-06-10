<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        //Auth returns the authenticated user (or admin) if it exists
        $user = Auth::user();
        //check if the user is authenticated and if the user is an admin
        if($user && $user->type == 1 ){
            return $next($request);
        }

        return redirect(route("not-found"));
    }
}
