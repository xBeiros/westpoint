import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/auth/discord',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
login.url = (options?: RouteQueryOptions) => {




    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DiscordLoginController::login
* @see app/Http/Controllers/DiscordLoginController.php:17
* @route '/auth/discord'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

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



const discord = {
    login: Object.assign(login, login),
    callback: Object.assign(callback, callback),
}

export default discord