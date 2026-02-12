import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/news',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::index
* @see app/Http/Controllers/NewsController.php:12
* @route '/news'
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
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/news/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }


    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        slug: args.slug,
    }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
const showForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
showForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsController::show
* @see app/Http/Controllers/NewsController.php:23
* @route '/news/{slug}'
*/
showForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
export const serverrelease = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serverrelease.url(options),
    method: 'get',
})

serverrelease.definition = {
    methods: ["get","head"],
    url: '/news/serverrelease',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
serverrelease.url = (options?: RouteQueryOptions) => {




    return serverrelease.definition.url + queryParams(options)
}

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
serverrelease.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serverrelease.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
serverrelease.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: serverrelease.url(options),
    method: 'head',
})

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
const serverreleaseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serverrelease.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
serverreleaseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serverrelease.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/news/serverrelease'
*/
serverreleaseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: serverrelease.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

serverrelease.form = serverreleaseForm



const news = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    serverrelease: Object.assign(serverrelease, serverrelease),
}

export default news