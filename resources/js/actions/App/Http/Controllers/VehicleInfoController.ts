import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ucp/vehicle-info',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::index
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const VehicleInfoController = { index }

export default VehicleInfoController