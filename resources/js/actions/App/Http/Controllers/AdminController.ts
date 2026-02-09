import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ucp/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:17
* @route '/ucp/admin'
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
* @route '/ucp/admin/refresh'
*/
export const refresh = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

refresh.definition = {
    methods: ["post"],
    url: '/ucp/admin/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::refresh
* @see app/Http/Controllers/AdminController.php:75
* @route '/ucp/admin/refresh'
*/
refresh.url = (options?: RouteQueryOptions) => {




    return refresh.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::refresh
* @see app/Http/Controllers/AdminController.php:75
* @route '/ucp/admin/refresh'
*/
refresh.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::refresh
* @see app/Http/Controllers/AdminController.php:75
* @route '/ucp/admin/refresh'
*/
const refreshForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refresh.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::refresh
* @see app/Http/Controllers/AdminController.php:75
* @route '/ucp/admin/refresh'
*/
refreshForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refresh.url(options),
    method: 'post',
})

refresh.form = refreshForm

/**
* @see \App\Http\Controllers\AdminController::getPlayerDetails
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
export const getPlayerDetails = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getPlayerDetails.url(options),
    method: 'post',
})

getPlayerDetails.definition = {
    methods: ["post"],
    url: '/ucp/admin/player/details',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::getPlayerDetails
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
getPlayerDetails.url = (options?: RouteQueryOptions) => {




    return getPlayerDetails.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getPlayerDetails
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
getPlayerDetails.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getPlayerDetails.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::getPlayerDetails
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
const getPlayerDetailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getPlayerDetails.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::getPlayerDetails
* @see app/Http/Controllers/AdminController.php:121
* @route '/ucp/admin/player/details'
*/
getPlayerDetailsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: getPlayerDetails.url(options),
    method: 'post',
})

getPlayerDetails.form = getPlayerDetailsForm

/**
* @see \App\Http\Controllers\AdminController::performPlayerAction
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
export const performPlayerAction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: performPlayerAction.url(options),
    method: 'post',
})

performPlayerAction.definition = {
    methods: ["post"],
    url: '/ucp/admin/player/action',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::performPlayerAction
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
performPlayerAction.url = (options?: RouteQueryOptions) => {




    return performPlayerAction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::performPlayerAction
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
performPlayerAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: performPlayerAction.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::performPlayerAction
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
const performPlayerActionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: performPlayerAction.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::performPlayerAction
* @see app/Http/Controllers/AdminController.php:203
* @route '/ucp/admin/player/action'
*/
performPlayerActionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: performPlayerAction.url(options),
    method: 'post',
})

performPlayerAction.form = performPlayerActionForm

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
export const getItems = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getItems.url(options),
    method: 'get',
})

getItems.definition = {
    methods: ["get","head"],
    url: '/ucp/admin/items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
getItems.url = (options?: RouteQueryOptions) => {




    return getItems.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
getItems.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getItems.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
getItems.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getItems.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
const getItemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getItems.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
getItemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getItems.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::getItems
* @see app/Http/Controllers/AdminController.php:737
* @route '/ucp/admin/items'
*/
getItemsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getItems.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getItems.form = getItemsForm

/**
* @see \App\Http\Controllers\AdminController::bulkGive
* @see app/Http/Controllers/AdminController.php:0
* @route '/ucp/admin/bulk-give'
*/
export const bulkGive = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkGive.url(options),
    method: 'post',
})

bulkGive.definition = {
    methods: ["post"],
    url: '/ucp/admin/bulk-give',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::bulkGive
* @see app/Http/Controllers/AdminController.php:0
* @route '/ucp/admin/bulk-give'
*/
bulkGive.url = (options?: RouteQueryOptions) => {




    return bulkGive.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bulkGive
* @see app/Http/Controllers/AdminController.php:0
* @route '/ucp/admin/bulk-give'
*/
bulkGive.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkGive.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::bulkGive
* @see app/Http/Controllers/AdminController.php:0
* @route '/ucp/admin/bulk-give'
*/
const bulkGiveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkGive.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::bulkGive
* @see app/Http/Controllers/AdminController.php:0
* @route '/ucp/admin/bulk-give'
*/
bulkGiveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkGive.url(options),
    method: 'post',
})

bulkGive.form = bulkGiveForm

/**
* @see \App\Http\Controllers\AdminController::bulkAssign
* @see app/Http/Controllers/AdminController.php:297
* @route '/ucp/admin/bulk-assign'
*/
export const bulkAssign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

bulkAssign.definition = {
    methods: ["post"],
    url: '/ucp/admin/bulk-assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::bulkAssign
* @see app/Http/Controllers/AdminController.php:297
* @route '/ucp/admin/bulk-assign'
*/
bulkAssign.url = (options?: RouteQueryOptions) => {




    return bulkAssign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bulkAssign
* @see app/Http/Controllers/AdminController.php:297
* @route '/ucp/admin/bulk-assign'
*/
bulkAssign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::bulkAssign
* @see app/Http/Controllers/AdminController.php:297
* @route '/ucp/admin/bulk-assign'
*/
const bulkAssignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkAssign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::bulkAssign
* @see app/Http/Controllers/AdminController.php:297
* @route '/ucp/admin/bulk-assign'
*/
bulkAssignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkAssign.url(options),
    method: 'post',
})

bulkAssign.form = bulkAssignForm

const AdminController = { index, refresh, getPlayerDetails, performPlayerAction, getItems, bulkGive, bulkAssign }

export default AdminController