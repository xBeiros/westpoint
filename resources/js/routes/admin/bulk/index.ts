import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::give
* @see app/Http/Controllers/AdminController.php:0
* @route '/admin/bulk-give'
*/
export const give = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: give.url(options),
    method: 'post',
})

give.definition = {
    methods: ["post"],
    url: '/admin/bulk-give',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::give
* @see app/Http/Controllers/AdminController.php:0
* @route '/admin/bulk-give'
*/
give.url = (options?: RouteQueryOptions) => {




    return give.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::give
* @see app/Http/Controllers/AdminController.php:0
* @route '/admin/bulk-give'
*/
give.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: give.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::give
* @see app/Http/Controllers/AdminController.php:0
* @route '/admin/bulk-give'
*/
const giveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: give.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::give
* @see app/Http/Controllers/AdminController.php:0
* @route '/admin/bulk-give'
*/
giveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: give.url(options),
    method: 'post',
})

give.form = giveForm

/**
* @see \App\Http\Controllers\AdminController::assign
* @see app/Http/Controllers/AdminController.php:297
* @route '/admin/bulk-assign'
*/
export const assign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/admin/bulk-assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::assign
* @see app/Http/Controllers/AdminController.php:297
* @route '/admin/bulk-assign'
*/
assign.url = (options?: RouteQueryOptions) => {




    return assign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::assign
* @see app/Http/Controllers/AdminController.php:297
* @route '/admin/bulk-assign'
*/
assign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::assign
* @see app/Http/Controllers/AdminController.php:297
* @route '/admin/bulk-assign'
*/
const assignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::assign
* @see app/Http/Controllers/AdminController.php:297
* @route '/admin/bulk-assign'
*/
assignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assign.url(options),
    method: 'post',
})

assign.form = assignForm



const bulk = {
    give: Object.assign(give, give),
    assign: Object.assign(assign, assign),
}

export default bulk