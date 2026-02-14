import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::index
 * @route '/ucp/wiki/change-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/change-requests',
} satisfies RouteDefinition<["get","head"]>

index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

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
 * @route '/ucp/wiki/change-requests/{changeRequest}'
 */
export const show = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(changeRequest, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/change-requests/{changeRequest}',
} satisfies RouteDefinition<["get","head"]>

show.url = (changeRequest: string | number, options?: RouteQueryOptions) => {
    return show.definition.url.replace('{changeRequest}', String(changeRequest)) + queryParams(options)
}

show.get = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(changeRequest, options),
    method: 'get',
})

show.head = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(changeRequest, options),
    method: 'head',
})

const showForm = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(changeRequest, options),
    method: 'get',
})

showForm.get = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(changeRequest, options),
    method: 'get',
})

showForm.head = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(changeRequest, {
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
 * @route '/ucp/wiki/change-requests/{changeRequest}/approve'
 */
export const approve = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(changeRequest, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/ucp/wiki/change-requests/{changeRequest}/approve',
} satisfies RouteDefinition<["post"]>

approve.url = (changeRequest: string | number, options?: RouteQueryOptions) => {
    return approve.definition.url.replace('{changeRequest}', String(changeRequest)) + queryParams(options)
}

approve.post = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(changeRequest, options),
    method: 'post',
})

const approveForm = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(changeRequest, options),
    method: 'post',
})

approveForm.post = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(changeRequest, options),
    method: 'post',
})

approve.form = approveForm

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiChangeRequestController::reject
 * @route '/ucp/wiki/change-requests/{changeRequest}/reject'
 */
export const reject = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(changeRequest, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/ucp/wiki/change-requests/{changeRequest}/reject',
} satisfies RouteDefinition<["post"]>

reject.url = (changeRequest: string | number, options?: RouteQueryOptions) => {
    return reject.definition.url.replace('{changeRequest}', String(changeRequest)) + queryParams(options)
}

reject.post = (changeRequest: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(changeRequest, options),
    method: 'post',
})

const rejectForm = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(changeRequest, options),
    method: 'post',
})

rejectForm.post = (changeRequest: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(changeRequest, options),
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
