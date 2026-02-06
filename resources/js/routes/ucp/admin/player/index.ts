import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::details
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
export const details = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: details.url(options),
    method: 'post',
})

details.definition = {
    methods: ["post"],
    url: '/ucp/admin/player/details',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::details
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
details.url = (options?: RouteQueryOptions) => {




    return details.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::details
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
details.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: details.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::details
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
const detailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: details.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::details
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
detailsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: details.url(options),
    method: 'post',
})

details.form = detailsForm

/**
* @see \App\Http\Controllers\AdminController::action
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
export const action = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})

action.definition = {
    methods: ["post"],
    url: '/ucp/admin/player/action',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::action
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
action.url = (options?: RouteQueryOptions) => {




    return action.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::action
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
action.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::action
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
const actionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: action.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::action
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
actionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: action.url(options),
    method: 'post',
})

action.form = actionForm



const player = {
    details: Object.assign(details, details),
    action: Object.assign(action, action),
}

export default player