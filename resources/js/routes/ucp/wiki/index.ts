import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
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
 * @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
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

create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

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

store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
 * @route '/ucp/wiki/{article}/edit'
 */
export const edit = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(article, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/{article}/edit',
} satisfies RouteDefinition<["get","head"]>

edit.url = (article: string | number, options?: RouteQueryOptions) => {
    return edit.definition.url.replace('{article}', String(article)) + queryParams(options)
}

edit.get = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(article, options),
    method: 'get',
})

edit.head = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(article, options),
    method: 'head',
})

const editForm = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(article, options),
    method: 'get',
})

editForm.get = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(article, options),
    method: 'get',
})

editForm.head = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(article, {
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
 * @route '/ucp/wiki/{article}'
 */
export const update = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(article, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["put","patch"]>

update.url = (article: string | number, options?: RouteQueryOptions) => {
    return update.definition.url.replace('{article}', String(article)) + queryParams(options)
}

update.put = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(article, options),
    method: 'put',
})

update.patch = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(article, options),
    method: 'patch',
})

const updateForm = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'put'> => ({
    action: update.url(article, options),
    method: 'put',
})

updateForm.put = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'put'> => ({
    action: update.url(article, options),
    method: 'put',
})

updateForm.patch = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'patch'> => ({
    action: update.url(article, options),
    method: 'patch',
})

update.form = updateForm

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
 * @route '/ucp/wiki/{article}'
 */
export const destroy = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(article, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["delete"]>

destroy.url = (article: string | number, options?: RouteQueryOptions) => {
    return destroy.definition.url.replace('{article}', String(article)) + queryParams(options)
}

destroy.delete = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(article, options),
    method: 'delete',
})

const destroyForm = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'delete'> => ({
    action: destroy.url(article, options),
    method: 'delete',
})

destroyForm.delete = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'delete'> => ({
    action: destroy.url(article, options),
    method: 'delete',
})

destroy.form = destroyForm

/**
 * @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
 * @route '/ucp/wiki/{article}/toggle-publish'
 */
export const togglePublish = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(article, options),
    method: 'post',
})

togglePublish.definition = {
    methods: ["post"],
    url: '/ucp/wiki/{article}/toggle-publish',
} satisfies RouteDefinition<["post"]>

togglePublish.url = (article: string | number, options?: RouteQueryOptions) => {
    return togglePublish.definition.url.replace('{article}', String(article)) + queryParams(options)
}

togglePublish.post = (article: string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish.url(article, options),
    method: 'post',
})

const togglePublishForm = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(article, options),
    method: 'post',
})

togglePublishForm.post = (article: string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish.url(article, options),
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
}

export default wiki
