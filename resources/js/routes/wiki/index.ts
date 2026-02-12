import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import changeRequest from './change-request'
import admin from './admin'
/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wiki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::index
* @see app/Http/Controllers/WikiController.php:12
* @route '/wiki'
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
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/wiki/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
search.url = (options?: RouteQueryOptions) => {




    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::search
* @see app/Http/Controllers/WikiController.php:175
* @route '/wiki/search'
*/
searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: search.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

search.form = searchForm

/**
* @see \App\Http\Controllers\WikiController::like
* @see app/Http/Controllers/WikiController.php:219
* @route '/wiki/{slug}/like'
*/
export const like = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

like.definition = {
    methods: ["post"],
    url: '/wiki/{slug}/like',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WikiController::like
* @see app/Http/Controllers/WikiController.php:219
* @route '/wiki/{slug}/like'
*/
like.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return like.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WikiController::like
* @see app/Http/Controllers/WikiController.php:219
* @route '/wiki/{slug}/like'
*/
like.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WikiController::like
* @see app/Http/Controllers/WikiController.php:219
* @route '/wiki/{slug}/like'
*/
const likeForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: like.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WikiController::like
* @see app/Http/Controllers/WikiController.php:219
* @route '/wiki/{slug}/like'
*/
likeForm.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: like.url(args, options),
    method: 'post',
})

like.form = likeForm

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
*/
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/wiki/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
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

    // Apply URL defaults if function is available
    let finalArgs = args;
    if (typeof applyUrlDefaults !== 'undefined' && typeof applyUrlDefaults === 'function') {
        finalArgs = applyUrlDefaults(args)
    }

    const parsedArgs = {
        slug: finalArgs.slug,
    }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
*/
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
*/
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
*/
const showForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
*/
showForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\WikiController::show
* @see app/Http/Controllers/WikiController.php:78
* @route '/wiki/{slug}'
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



const wiki = {
    index: Object.assign(index, index),
    search: Object.assign(search, search),
    changeRequest: Object.assign(changeRequest, changeRequest),
    admin: Object.assign(admin, admin),
    like: Object.assign(like, like),
    show: Object.assign(show, show),
}

export default wiki