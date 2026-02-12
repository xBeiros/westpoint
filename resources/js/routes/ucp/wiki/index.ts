import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import changeRequests from './change-requests'
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
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
* @route '/ucp/wiki/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:44
* @route '/ucp/wiki/create'
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
* @route '/ucp/wiki'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ucp/wiki',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/ucp/wiki'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/ucp/wiki'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/ucp/wiki'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:51
* @route '/ucp/wiki'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
*/
export const edit = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/{article}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
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
* @route '/ucp/wiki/{article}/edit'
*/
edit.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
*/
edit.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
*/
const editForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
*/
editForm.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:121
* @route '/ucp/wiki/{article}/edit'
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
* @route '/ucp/wiki/{article}'
*/
export const update = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}'
*/
update.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:139
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}'
*/
export const destroy = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}'
*/
destroy.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:184
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}'
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
* @route '/ucp/wiki/{article}/toggle-publish'
*/
export const togglePublish = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(args, options),
    method: 'post',
})

togglePublish.definition = {
    methods: ["post"],
    url: '/ucp/wiki/{article}/toggle-publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/ucp/wiki/{article}/toggle-publish'
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
* @route '/ucp/wiki/{article}/toggle-publish'
*/
togglePublish.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/ucp/wiki/{article}/toggle-publish'
*/
const togglePublishForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:192
* @route '/ucp/wiki/{article}/toggle-publish'
*/
togglePublishForm.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(args, options),
    method: 'post',
})

togglePublish.form = togglePublishForm



const wiki = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    togglePublish: Object.assign(togglePublish, togglePublish),
    changeRequests: Object.assign(changeRequests, changeRequests),
}

export default wiki