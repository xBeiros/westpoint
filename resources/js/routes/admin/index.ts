import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import news from './news'
import player from './player'
import bulk from './bulk'
import roles from './roles'
/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::index
 * @see app/Http/Controllers/AdminController.php:17
 * @route '/admin'
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
/**
* @see \App\Http\Controllers\AdminController::refresh
 * @see app/Http/Controllers/AdminController.php:75
 * @route '/admin/refresh'
 */
export const refresh = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

refresh.definition = {
    methods: ["post"],
    url: '/admin/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::refresh
 * @see app/Http/Controllers/AdminController.php:75
 * @route '/admin/refresh'
 */
refresh.url = (options?: RouteQueryOptions) => {
    return refresh.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::refresh
 * @see app/Http/Controllers/AdminController.php:75
 * @route '/admin/refresh'
 */
refresh.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::refresh
 * @see app/Http/Controllers/AdminController.php:75
 * @route '/admin/refresh'
 */
    const refreshForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: refresh.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::refresh
 * @see app/Http/Controllers/AdminController.php:75
 * @route '/admin/refresh'
 */
        refreshForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: refresh.url(options),
            method: 'post',
        })
    
    refresh.form = refreshForm
/**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
export const items = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})

items.definition = {
    methods: ["get","head"],
    url: '/admin/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
items.url = (options?: RouteQueryOptions) => {
    return items.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
items.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: items.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
items.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: items.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
    const itemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: items.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
        itemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: items.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::items
 * @see app/Http/Controllers/AdminController.php:737
 * @route '/admin/items'
 */
        itemsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: items.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    items.form = itemsForm
const admin = {
    news: Object.assign(news, news),
index: Object.assign(index, index),
refresh: Object.assign(refresh, refresh),
player: Object.assign(player, player),
items: Object.assign(items, items),
bulk: Object.assign(bulk, bulk),
roles: Object.assign(roles, roles),
}

export default admin