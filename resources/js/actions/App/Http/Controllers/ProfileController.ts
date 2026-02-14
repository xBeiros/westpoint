import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ucp/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::index
* @see app/Http/Controllers/ProfileController.php:17
* @route '/ucp/profile'
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
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:78
* @route '/ucp/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/ucp/profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:78
* @route '/ucp/profile'
*/
update.url = (options?: RouteQueryOptions) => {




    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:78
* @route '/ucp/profile'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:78
* @route '/ucp/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:78
* @route '/ucp/profile'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\ProfileController::logoutOtherDevices
* @see app/Http/Controllers/ProfileController.php:205
* @route '/ucp/profile/logout-other-devices'
*/
export const logoutOtherDevices = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logoutOtherDevices.url(options),
    method: 'post',
})

logoutOtherDevices.definition = {
    methods: ["post"],
    url: '/ucp/profile/logout-other-devices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::logoutOtherDevices
* @see app/Http/Controllers/ProfileController.php:205
* @route '/ucp/profile/logout-other-devices'
*/
logoutOtherDevices.url = (options?: RouteQueryOptions) => {




    return logoutOtherDevices.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::logoutOtherDevices
* @see app/Http/Controllers/ProfileController.php:205
* @route '/ucp/profile/logout-other-devices'
*/
logoutOtherDevices.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logoutOtherDevices.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::logoutOtherDevices
* @see app/Http/Controllers/ProfileController.php:205
* @route '/ucp/profile/logout-other-devices'
*/
const logoutOtherDevicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logoutOtherDevices.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::logoutOtherDevices
* @see app/Http/Controllers/ProfileController.php:205
* @route '/ucp/profile/logout-other-devices'
*/
logoutOtherDevicesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logoutOtherDevices.url(options),
    method: 'post',
})

logoutOtherDevices.form = logoutOtherDevicesForm

const ProfileController = { index, update, logoutOtherDevices }

export default ProfileController