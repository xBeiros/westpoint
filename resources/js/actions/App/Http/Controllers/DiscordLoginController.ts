import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/auth/discord',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
show.url = (options?: RouteQueryOptions) => {




    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::show
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/auth/discord/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
callback.url = (options?: RouteQueryOptions) => {




    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::callback
* @see app/Http/Controllers/DiscordLoginController.php:50
* @route '/auth/discord/callback'
*/
callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: callback.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

callback.form = callbackForm

const DiscordLoginController = { show, callback }

export default DiscordLoginController