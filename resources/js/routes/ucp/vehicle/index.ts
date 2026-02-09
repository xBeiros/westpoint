import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
export const info = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: info.url(options),
    method: 'get',
})

info.definition = {
    methods: ["get","head"],
    url: '/ucp/vehicle-info',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
info.url = (options?: RouteQueryOptions) => {




    return info.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
info.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: info.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
info.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: info.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
const infoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: info.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
infoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: info.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VehicleInfoController::info
* @see app/Http/Controllers/VehicleInfoController.php:17
* @route '/ucp/vehicle-info'
*/
infoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: info.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

info.form = infoForm



const vehicle = {
    info: Object.assign(info, info),
}

export default vehicle