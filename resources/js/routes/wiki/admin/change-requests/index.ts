import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/change-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
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
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
export const show = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/change-requests/{changeRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { changeRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { changeRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            changeRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        changeRequest: typeof args.changeRequest === 'object'
        ? args.changeRequest.id
        : args.changeRequest,
    }

    return show.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
const showForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
showForm.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:61
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
showForm.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:109
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
export const approve = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/wiki/admin/change-requests/{changeRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:109
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approve.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { changeRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { changeRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            changeRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        changeRequest: typeof args.changeRequest === 'object'
        ? args.changeRequest.id
        : args.changeRequest,
    }

    return approve.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:109
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approve.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:109
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
const approveForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:109
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approveForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:191
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
export const reject = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/wiki/admin/change-requests/{changeRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:191
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
reject.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { changeRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { changeRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            changeRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        changeRequest: typeof args.changeRequest === 'object'
        ? args.changeRequest.id
        : args.changeRequest,
    }

    return reject.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:191
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
reject.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:191
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
const rejectForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:191
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
rejectForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm



const changeRequests = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    approve: Object.assign(approve, approve),
    reject: Object.assign(reject, reject),
}

export default changeRequests