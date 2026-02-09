import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
const createc159d594f3d16e104f2a13b8cb2f114f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createc159d594f3d16e104f2a13b8cb2f114f.url(options),
    method: 'get',
})

createc159d594f3d16e104f2a13b8cb2f114f.definition = {
    methods: ["get","head"],
    url: '/wiki/change-request/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createc159d594f3d16e104f2a13b8cb2f114f.url = (options?: RouteQueryOptions) => {




    return createc159d594f3d16e104f2a13b8cb2f114f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createc159d594f3d16e104f2a13b8cb2f114f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createc159d594f3d16e104f2a13b8cb2f114f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createc159d594f3d16e104f2a13b8cb2f114f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createc159d594f3d16e104f2a13b8cb2f114f.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
const createc159d594f3d16e104f2a13b8cb2f114fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createc159d594f3d16e104f2a13b8cb2f114f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createc159d594f3d16e104f2a13b8cb2f114fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createc159d594f3d16e104f2a13b8cb2f114f.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createc159d594f3d16e104f2a13b8cb2f114fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createc159d594f3d16e104f2a13b8cb2f114f.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createc159d594f3d16e104f2a13b8cb2f114f.form = createc159d594f3d16e104f2a13b8cb2f114fForm
/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
const create74d0181752a61f5e965b39831d583bce = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create74d0181752a61f5e965b39831d583bce.url(args, options),
    method: 'get',
})

create74d0181752a61f5e965b39831d583bce.definition = {
    methods: ["get","head"],
    url: '/wiki/change-request/create/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
create74d0181752a61f5e965b39831d583bce.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return create74d0181752a61f5e965b39831d583bce.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
create74d0181752a61f5e965b39831d583bce.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create74d0181752a61f5e965b39831d583bce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
create74d0181752a61f5e965b39831d583bce.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create74d0181752a61f5e965b39831d583bce.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
const create74d0181752a61f5e965b39831d583bceForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create74d0181752a61f5e965b39831d583bce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
create74d0181752a61f5e965b39831d583bceForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create74d0181752a61f5e965b39831d583bce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
create74d0181752a61f5e965b39831d583bceForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create74d0181752a61f5e965b39831d583bce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create74d0181752a61f5e965b39831d583bce.form = create74d0181752a61f5e965b39831d583bceForm

export const create = {
    '/wiki/change-request/create': createc159d594f3d16e104f2a13b8cb2f114f,
    '/wiki/change-request/create/{slug}': create74d0181752a61f5e965b39831d583bce,
}


/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::store
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:37
* @route '/wiki/change-request'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wiki/change-request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::store
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:37
* @route '/wiki/change-request'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::store
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:37
* @route '/wiki/change-request'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::store
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:37
* @route '/wiki/change-request'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::store
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:37
* @route '/wiki/change-request'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const WikiChangeRequestUserController = { create, store }

export default WikiChangeRequestUserController