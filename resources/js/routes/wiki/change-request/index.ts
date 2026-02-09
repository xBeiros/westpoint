import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/wiki/change-request/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::create
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
export const createEdit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createEdit.url(args, options),
    method: 'get',
})

createEdit.definition = {
    methods: ["get","head"],
    url: '/wiki/change-request/create/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
createEdit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return createEdit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
createEdit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createEdit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
createEdit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createEdit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
const createEditForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createEdit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
createEditForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createEdit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\WikiChangeRequestUserController::createEdit
* @see app/Http/Controllers/Wiki/WikiChangeRequestUserController.php:15
* @route '/wiki/change-request/create/{slug}'
*/
createEditForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createEdit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createEdit.form = createEditForm

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



const changeRequest = {
    create: Object.assign(create, create),
    createEdit: Object.assign(createEdit, createEdit),
    store: Object.assign(store, store),
}

export default changeRequest