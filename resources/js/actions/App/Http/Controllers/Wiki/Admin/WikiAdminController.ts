import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wiki/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
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
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/wiki/admin/create'
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
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/wiki/admin'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wiki/admin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/wiki/admin'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/wiki/admin'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/wiki/admin'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/wiki/admin'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
export const edit = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/{article}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
edit.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { article: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            article: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        article: typeof args.article === 'object'
        ? args.article.id
        : args.article,
    }

    return edit.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
edit.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
edit.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
const editForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
editForm.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/wiki/admin/{article}/edit'
*/
editForm.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/wiki/admin/{article}'
*/
export const update = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/wiki/admin/{article}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/wiki/admin/{article}'
*/
update.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { article: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            article: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        article: typeof args.article === 'object'
        ? args.article.id
        : args.article,
    }

    return update.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/wiki/admin/{article}'
*/
update.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/wiki/admin/{article}'
*/
const updateForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/wiki/admin/{article}'
*/
updateForm.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/wiki/admin/{article}'
*/
export const destroy = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wiki/admin/{article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/wiki/admin/{article}'
*/
destroy.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { article: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            article: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        article: typeof args.article === 'object'
        ? args.article.id
        : args.article,
    }

    return destroy.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/wiki/admin/{article}'
*/
destroy.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/wiki/admin/{article}'
*/
const destroyForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/wiki/admin/{article}'
*/
destroyForm.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/wiki/admin/{article}/toggle-publish'
*/
export const togglePublish = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(args, options),
    method: 'post',
})

togglePublish.definition = {
    methods: ["post"],
    url: '/wiki/admin/{article}/toggle-publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublish.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { article: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            article: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        article: typeof args.article === 'object'
        ? args.article.id
        : args.article,
    }

    return togglePublish.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublish.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/wiki/admin/{article}/toggle-publish'
*/
const togglePublishForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublishForm.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(args, options),
    method: 'post',
})

togglePublish.form = togglePublishForm

const WikiAdminController = { index, create, store, edit, update, destroy, togglePublish }

export default WikiAdminController