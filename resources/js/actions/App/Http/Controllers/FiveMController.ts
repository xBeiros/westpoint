import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
export const showPlayer = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPlayer.url(args, options),
    method: 'get',
})

showPlayer.definition = {
    methods: ["get","head"],
    url: '/players/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
showPlayer.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return showPlayer.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
showPlayer.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPlayer.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
showPlayer.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPlayer.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
    const showPlayerForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showPlayer.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
        showPlayerForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showPlayer.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FiveMController::showPlayer
 * @see app/Http/Controllers/FiveMController.php:410
 * @route '/players/{id}'
 */
        showPlayerForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showPlayer.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showPlayer.form = showPlayerForm
/**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
export const getPlayers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPlayers.url(options),
    method: 'get',
})

getPlayers.definition = {
    methods: ["get","head"],
    url: '/api/berlincity/players',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
getPlayers.url = (options?: RouteQueryOptions) => {
    return getPlayers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
getPlayers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPlayers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
getPlayers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPlayers.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
    const getPlayersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getPlayers.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
        getPlayersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPlayers.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FiveMController::getPlayers
 * @see app/Http/Controllers/FiveMController.php:119
 * @route '/api/berlincity/players'
 */
        getPlayersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPlayers.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getPlayers.form = getPlayersForm
const FiveMController = { showPlayer, getPlayers }

export default FiveMController