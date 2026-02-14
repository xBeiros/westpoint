import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
import { destroy } from '@/actions/Laravel/Fortify/Http/Controllers/AuthenticatedSessionController'

// Export logout als Alias für destroy (funktioniert sowohl als Funktion als auch als Objekt mit .url())
export const logout = destroy
