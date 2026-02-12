import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
const indexa50cbac7aebc8b9ec6219b2cb2dc95ce = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url(options),
    method: 'get',
})

indexa50cbac7aebc8b9ec6219b2cb2dc95ce.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/change-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url = (options?: RouteQueryOptions) => {




    return indexa50cbac7aebc8b9ec6219b2cb2dc95ce.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
indexa50cbac7aebc8b9ec6219b2cb2dc95ce.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
indexa50cbac7aebc8b9ec6219b2cb2dc95ce.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
const indexa50cbac7aebc8b9ec6219b2cb2dc95ceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
indexa50cbac7aebc8b9ec6219b2cb2dc95ceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/ucp/wiki/change-requests'
*/
indexa50cbac7aebc8b9ec6219b2cb2dc95ceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa50cbac7aebc8b9ec6219b2cb2dc95ce.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexa50cbac7aebc8b9ec6219b2cb2dc95ce.form = indexa50cbac7aebc8b9ec6219b2cb2dc95ceForm
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
const index857dde84143623fd7669f8810406fcd0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index857dde84143623fd7669f8810406fcd0.url(options),
    method: 'get',
})

index857dde84143623fd7669f8810406fcd0.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/change-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index857dde84143623fd7669f8810406fcd0.url = (options?: RouteQueryOptions) => {




    return index857dde84143623fd7669f8810406fcd0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index857dde84143623fd7669f8810406fcd0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index857dde84143623fd7669f8810406fcd0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index857dde84143623fd7669f8810406fcd0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index857dde84143623fd7669f8810406fcd0.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
const index857dde84143623fd7669f8810406fcd0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index857dde84143623fd7669f8810406fcd0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index857dde84143623fd7669f8810406fcd0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index857dde84143623fd7669f8810406fcd0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:15
* @route '/wiki/admin/change-requests'
*/
index857dde84143623fd7669f8810406fcd0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index857dde84143623fd7669f8810406fcd0.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index857dde84143623fd7669f8810406fcd0.form = index857dde84143623fd7669f8810406fcd0Form

export const index = {
    '/ucp/wiki/change-requests': indexa50cbac7aebc8b9ec6219b2cb2dc95ce,
    '/wiki/admin/change-requests': index857dde84143623fd7669f8810406fcd0,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
const show1c94e820fe69f7a5ff4b9074a245088b = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1c94e820fe69f7a5ff4b9074a245088b.url(args, options),
    method: 'get',
})

show1c94e820fe69f7a5ff4b9074a245088b.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/change-requests/{changeRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
show1c94e820fe69f7a5ff4b9074a245088b.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show1c94e820fe69f7a5ff4b9074a245088b.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
show1c94e820fe69f7a5ff4b9074a245088b.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1c94e820fe69f7a5ff4b9074a245088b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
show1c94e820fe69f7a5ff4b9074a245088b.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1c94e820fe69f7a5ff4b9074a245088b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
const show1c94e820fe69f7a5ff4b9074a245088bForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c94e820fe69f7a5ff4b9074a245088b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
show1c94e820fe69f7a5ff4b9074a245088bForm.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c94e820fe69f7a5ff4b9074a245088b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/ucp/wiki/change-requests/{changeRequest}'
*/
show1c94e820fe69f7a5ff4b9074a245088bForm.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c94e820fe69f7a5ff4b9074a245088b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show1c94e820fe69f7a5ff4b9074a245088b.form = show1c94e820fe69f7a5ff4b9074a245088bForm
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
const show8e5a5f6ced5ce6aed68b3900d868d95f = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, options),
    method: 'get',
})

show8e5a5f6ced5ce6aed68b3900d868d95f.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/change-requests/{changeRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show8e5a5f6ced5ce6aed68b3900d868d95f.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show8e5a5f6ced5ce6aed68b3900d868d95f.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show8e5a5f6ced5ce6aed68b3900d868d95f.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show8e5a5f6ced5ce6aed68b3900d868d95f.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
const show8e5a5f6ced5ce6aed68b3900d868d95fForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show8e5a5f6ced5ce6aed68b3900d868d95fForm.get = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::show
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:53
* @route '/wiki/admin/change-requests/{changeRequest}'
*/
show8e5a5f6ced5ce6aed68b3900d868d95fForm.head = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8e5a5f6ced5ce6aed68b3900d868d95f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show8e5a5f6ced5ce6aed68b3900d868d95f.form = show8e5a5f6ced5ce6aed68b3900d868d95fForm

export const show = {
    '/ucp/wiki/change-requests/{changeRequest}': show1c94e820fe69f7a5ff4b9074a245088b,
    '/wiki/admin/change-requests/{changeRequest}': show8e5a5f6ced5ce6aed68b3900d868d95f,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/ucp/wiki/change-requests/{changeRequest}/approve'
*/
const approvefc02928a77ba4db78b752ac55f0fa1af = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approvefc02928a77ba4db78b752ac55f0fa1af.url(args, options),
    method: 'post',
})

approvefc02928a77ba4db78b752ac55f0fa1af.definition = {
    methods: ["post"],
    url: '/ucp/wiki/change-requests/{changeRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/ucp/wiki/change-requests/{changeRequest}/approve'
*/
approvefc02928a77ba4db78b752ac55f0fa1af.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approvefc02928a77ba4db78b752ac55f0fa1af.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/ucp/wiki/change-requests/{changeRequest}/approve'
*/
approvefc02928a77ba4db78b752ac55f0fa1af.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approvefc02928a77ba4db78b752ac55f0fa1af.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/ucp/wiki/change-requests/{changeRequest}/approve'
*/
const approvefc02928a77ba4db78b752ac55f0fa1afForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approvefc02928a77ba4db78b752ac55f0fa1af.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/ucp/wiki/change-requests/{changeRequest}/approve'
*/
approvefc02928a77ba4db78b752ac55f0fa1afForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approvefc02928a77ba4db78b752ac55f0fa1af.url(args, options),
    method: 'post',
})

approvefc02928a77ba4db78b752ac55f0fa1af.form = approvefc02928a77ba4db78b752ac55f0fa1afForm
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
const approve061b9913861897591deefdb521012980 = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve061b9913861897591deefdb521012980.url(args, options),
    method: 'post',
})

approve061b9913861897591deefdb521012980.definition = {
    methods: ["post"],
    url: '/wiki/admin/change-requests/{changeRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approve061b9913861897591deefdb521012980.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approve061b9913861897591deefdb521012980.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approve061b9913861897591deefdb521012980.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve061b9913861897591deefdb521012980.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
const approve061b9913861897591deefdb521012980Form = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve061b9913861897591deefdb521012980.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::approve
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:88
* @route '/wiki/admin/change-requests/{changeRequest}/approve'
*/
approve061b9913861897591deefdb521012980Form.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve061b9913861897591deefdb521012980.url(args, options),
    method: 'post',
})

approve061b9913861897591deefdb521012980.form = approve061b9913861897591deefdb521012980Form

export const approve = {
    '/ucp/wiki/change-requests/{changeRequest}/approve': approvefc02928a77ba4db78b752ac55f0fa1af,
    '/wiki/admin/change-requests/{changeRequest}/approve': approve061b9913861897591deefdb521012980,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/ucp/wiki/change-requests/{changeRequest}/reject'
*/
const reject4534abb9366a604b8fd87c1d586d5b0c = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject4534abb9366a604b8fd87c1d586d5b0c.url(args, options),
    method: 'post',
})

reject4534abb9366a604b8fd87c1d586d5b0c.definition = {
    methods: ["post"],
    url: '/ucp/wiki/change-requests/{changeRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/ucp/wiki/change-requests/{changeRequest}/reject'
*/
reject4534abb9366a604b8fd87c1d586d5b0c.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject4534abb9366a604b8fd87c1d586d5b0c.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/ucp/wiki/change-requests/{changeRequest}/reject'
*/
reject4534abb9366a604b8fd87c1d586d5b0c.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject4534abb9366a604b8fd87c1d586d5b0c.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/ucp/wiki/change-requests/{changeRequest}/reject'
*/
const reject4534abb9366a604b8fd87c1d586d5b0cForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject4534abb9366a604b8fd87c1d586d5b0c.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/ucp/wiki/change-requests/{changeRequest}/reject'
*/
reject4534abb9366a604b8fd87c1d586d5b0cForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject4534abb9366a604b8fd87c1d586d5b0c.url(args, options),
    method: 'post',
})

reject4534abb9366a604b8fd87c1d586d5b0c.form = reject4534abb9366a604b8fd87c1d586d5b0cForm
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
const reject4abba023fd320974fe2bf11680a77051 = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject4abba023fd320974fe2bf11680a77051.url(args, options),
    method: 'post',
})

reject4abba023fd320974fe2bf11680a77051.definition = {
    methods: ["post"],
    url: '/wiki/admin/change-requests/{changeRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
reject4abba023fd320974fe2bf11680a77051.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject4abba023fd320974fe2bf11680a77051.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
reject4abba023fd320974fe2bf11680a77051.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject4abba023fd320974fe2bf11680a77051.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
const reject4abba023fd320974fe2bf11680a77051Form = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject4abba023fd320974fe2bf11680a77051.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
* @see app/Http/Controllers/Wiki/Admin/WikiChangeRequestController.php:170
* @route '/wiki/admin/change-requests/{changeRequest}/reject'
*/
reject4abba023fd320974fe2bf11680a77051Form.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject4abba023fd320974fe2bf11680a77051.url(args, options),
    method: 'post',
})

reject4abba023fd320974fe2bf11680a77051.form = reject4abba023fd320974fe2bf11680a77051Form

export const reject = {
    '/ucp/wiki/change-requests/{changeRequest}/reject': reject4534abb9366a604b8fd87c1d586d5b0c,
    '/wiki/admin/change-requests/{changeRequest}/reject': reject4abba023fd320974fe2bf11680a77051,
}


const WikiChangeRequestController = { index, show, approve, reject }

export default WikiChangeRequestController