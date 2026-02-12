import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
const index585e55b967c0b7aad1e18c8f6e147493 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'get',
})

index585e55b967c0b7aad1e18c8f6e147493.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index585e55b967c0b7aad1e18c8f6e147493.url = (options?: RouteQueryOptions) => {




    return index585e55b967c0b7aad1e18c8f6e147493.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index585e55b967c0b7aad1e18c8f6e147493.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index585e55b967c0b7aad1e18c8f6e147493.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
const index585e55b967c0b7aad1e18c8f6e147493Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index585e55b967c0b7aad1e18c8f6e147493Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/ucp/wiki'
*/
index585e55b967c0b7aad1e18c8f6e147493Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index585e55b967c0b7aad1e18c8f6e147493.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index585e55b967c0b7aad1e18c8f6e147493.form = index585e55b967c0b7aad1e18c8f6e147493Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
const indexc4b777b2a269177226608838d2c5c54b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc4b777b2a269177226608838d2c5c54b.url(options),
    method: 'get',
})

indexc4b777b2a269177226608838d2c5c54b.definition = {
    methods: ["get","head"],
    url: '/wiki/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexc4b777b2a269177226608838d2c5c54b.url = (options?: RouteQueryOptions) => {




    return indexc4b777b2a269177226608838d2c5c54b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexc4b777b2a269177226608838d2c5c54b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc4b777b2a269177226608838d2c5c54b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexc4b777b2a269177226608838d2c5c54b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexc4b777b2a269177226608838d2c5c54b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
const indexc4b777b2a269177226608838d2c5c54bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc4b777b2a269177226608838d2c5c54b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexc4b777b2a269177226608838d2c5c54bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc4b777b2a269177226608838d2c5c54b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::index
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:14
* @route '/wiki/admin'
*/
indexc4b777b2a269177226608838d2c5c54bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc4b777b2a269177226608838d2c5c54b.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexc4b777b2a269177226608838d2c5c54b.form = indexc4b777b2a269177226608838d2c5c54bForm

export const index = {
    '/ucp/wiki': index585e55b967c0b7aad1e18c8f6e147493,
    '/wiki/admin': indexc4b777b2a269177226608838d2c5c54b,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
const create091f1b051e591318f53a8e08fc55e33c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create091f1b051e591318f53a8e08fc55e33c.url(options),
    method: 'get',
})

create091f1b051e591318f53a8e08fc55e33c.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
create091f1b051e591318f53a8e08fc55e33c.url = (options?: RouteQueryOptions) => {




    return create091f1b051e591318f53a8e08fc55e33c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
create091f1b051e591318f53a8e08fc55e33c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create091f1b051e591318f53a8e08fc55e33c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
create091f1b051e591318f53a8e08fc55e33c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create091f1b051e591318f53a8e08fc55e33c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
const create091f1b051e591318f53a8e08fc55e33cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create091f1b051e591318f53a8e08fc55e33c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
create091f1b051e591318f53a8e08fc55e33cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create091f1b051e591318f53a8e08fc55e33c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/ucp/wiki/create'
*/
create091f1b051e591318f53a8e08fc55e33cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create091f1b051e591318f53a8e08fc55e33c.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create091f1b051e591318f53a8e08fc55e33c.form = create091f1b051e591318f53a8e08fc55e33cForm
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
const create7c8460235944f19fb9e37d29dd63ee93 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create7c8460235944f19fb9e37d29dd63ee93.url(options),
    method: 'get',
})

create7c8460235944f19fb9e37d29dd63ee93.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
create7c8460235944f19fb9e37d29dd63ee93.url = (options?: RouteQueryOptions) => {




    return create7c8460235944f19fb9e37d29dd63ee93.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
create7c8460235944f19fb9e37d29dd63ee93.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create7c8460235944f19fb9e37d29dd63ee93.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
create7c8460235944f19fb9e37d29dd63ee93.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create7c8460235944f19fb9e37d29dd63ee93.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
const create7c8460235944f19fb9e37d29dd63ee93Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create7c8460235944f19fb9e37d29dd63ee93.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
create7c8460235944f19fb9e37d29dd63ee93Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create7c8460235944f19fb9e37d29dd63ee93.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::create
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:117
* @route '/wiki/admin/create'
*/
create7c8460235944f19fb9e37d29dd63ee93Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create7c8460235944f19fb9e37d29dd63ee93.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create7c8460235944f19fb9e37d29dd63ee93.form = create7c8460235944f19fb9e37d29dd63ee93Form

export const create = {
    '/ucp/wiki/create': create091f1b051e591318f53a8e08fc55e33c,
    '/wiki/admin/create': create7c8460235944f19fb9e37d29dd63ee93,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/ucp/wiki'
*/
const store585e55b967c0b7aad1e18c8f6e147493 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'post',
})

store585e55b967c0b7aad1e18c8f6e147493.definition = {
    methods: ["post"],
    url: '/ucp/wiki',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/ucp/wiki'
*/
store585e55b967c0b7aad1e18c8f6e147493.url = (options?: RouteQueryOptions) => {




    return store585e55b967c0b7aad1e18c8f6e147493.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/ucp/wiki'
*/
store585e55b967c0b7aad1e18c8f6e147493.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/ucp/wiki'
*/
const store585e55b967c0b7aad1e18c8f6e147493Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/ucp/wiki'
*/
store585e55b967c0b7aad1e18c8f6e147493Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store585e55b967c0b7aad1e18c8f6e147493.url(options),
    method: 'post',
})

store585e55b967c0b7aad1e18c8f6e147493.form = store585e55b967c0b7aad1e18c8f6e147493Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/wiki/admin'
*/
const storec4b777b2a269177226608838d2c5c54b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec4b777b2a269177226608838d2c5c54b.url(options),
    method: 'post',
})

storec4b777b2a269177226608838d2c5c54b.definition = {
    methods: ["post"],
    url: '/wiki/admin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/wiki/admin'
*/
storec4b777b2a269177226608838d2c5c54b.url = (options?: RouteQueryOptions) => {




    return storec4b777b2a269177226608838d2c5c54b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/wiki/admin'
*/
storec4b777b2a269177226608838d2c5c54b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec4b777b2a269177226608838d2c5c54b.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/wiki/admin'
*/
const storec4b777b2a269177226608838d2c5c54bForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storec4b777b2a269177226608838d2c5c54b.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::store
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:124
* @route '/wiki/admin'
*/
storec4b777b2a269177226608838d2c5c54bForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storec4b777b2a269177226608838d2c5c54b.url(options),
    method: 'post',
})

storec4b777b2a269177226608838d2c5c54b.form = storec4b777b2a269177226608838d2c5c54bForm

export const store = {
    '/ucp/wiki': store585e55b967c0b7aad1e18c8f6e147493,
    '/wiki/admin': storec4b777b2a269177226608838d2c5c54b,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
const editf6e1de58ffbcea11e2da98bb0dfaed65 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, options),
    method: 'get',
})

editf6e1de58ffbcea11e2da98bb0dfaed65.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/{article}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
editf6e1de58ffbcea11e2da98bb0dfaed65.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return editf6e1de58ffbcea11e2da98bb0dfaed65.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
editf6e1de58ffbcea11e2da98bb0dfaed65.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
editf6e1de58ffbcea11e2da98bb0dfaed65.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
const editf6e1de58ffbcea11e2da98bb0dfaed65Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
editf6e1de58ffbcea11e2da98bb0dfaed65Form.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/ucp/wiki/{article}/edit'
*/
editf6e1de58ffbcea11e2da98bb0dfaed65Form.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editf6e1de58ffbcea11e2da98bb0dfaed65.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editf6e1de58ffbcea11e2da98bb0dfaed65.form = editf6e1de58ffbcea11e2da98bb0dfaed65Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
const editfe8f19a1c8493064b8ae61c0b391ff21 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, options),
    method: 'get',
})

editfe8f19a1c8493064b8ae61c0b391ff21.definition = {
    methods: ["get","head"],
    url: '/wiki/admin/{article}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
editfe8f19a1c8493064b8ae61c0b391ff21.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return editfe8f19a1c8493064b8ae61c0b391ff21.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
editfe8f19a1c8493064b8ae61c0b391ff21.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
editfe8f19a1c8493064b8ae61c0b391ff21.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
const editfe8f19a1c8493064b8ae61c0b391ff21Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
editfe8f19a1c8493064b8ae61c0b391ff21Form.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::edit
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:194
* @route '/wiki/admin/{article}/edit'
*/
editfe8f19a1c8493064b8ae61c0b391ff21Form.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editfe8f19a1c8493064b8ae61c0b391ff21.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editfe8f19a1c8493064b8ae61c0b391ff21.form = editfe8f19a1c8493064b8ae61c0b391ff21Form

export const edit = {
    '/ucp/wiki/{article}/edit': editf6e1de58ffbcea11e2da98bb0dfaed65,
    '/wiki/admin/{article}/edit': editfe8f19a1c8493064b8ae61c0b391ff21,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/ucp/wiki/{article}'
*/
const update4b79dd0ffbf8928938952545e9f6d946 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4b79dd0ffbf8928938952545e9f6d946.url(args, options),
    method: 'put',
})

update4b79dd0ffbf8928938952545e9f6d946.definition = {
    methods: ["put"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/ucp/wiki/{article}'
*/
update4b79dd0ffbf8928938952545e9f6d946.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update4b79dd0ffbf8928938952545e9f6d946.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/ucp/wiki/{article}'
*/
update4b79dd0ffbf8928938952545e9f6d946.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4b79dd0ffbf8928938952545e9f6d946.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/ucp/wiki/{article}'
*/
const update4b79dd0ffbf8928938952545e9f6d946Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update4b79dd0ffbf8928938952545e9f6d946.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/ucp/wiki/{article}'
*/
update4b79dd0ffbf8928938952545e9f6d946Form.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update4b79dd0ffbf8928938952545e9f6d946.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update4b79dd0ffbf8928938952545e9f6d946.form = update4b79dd0ffbf8928938952545e9f6d946Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/wiki/admin/{article}'
*/
const update78a205b59ce4b261c486ee7804db7730 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update78a205b59ce4b261c486ee7804db7730.url(args, options),
    method: 'put',
})

update78a205b59ce4b261c486ee7804db7730.definition = {
    methods: ["put"],
    url: '/wiki/admin/{article}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/wiki/admin/{article}'
*/
update78a205b59ce4b261c486ee7804db7730.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update78a205b59ce4b261c486ee7804db7730.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/wiki/admin/{article}'
*/
update78a205b59ce4b261c486ee7804db7730.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update78a205b59ce4b261c486ee7804db7730.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/wiki/admin/{article}'
*/
const update78a205b59ce4b261c486ee7804db7730Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update78a205b59ce4b261c486ee7804db7730.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::update
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:230
* @route '/wiki/admin/{article}'
*/
update78a205b59ce4b261c486ee7804db7730Form.put = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update78a205b59ce4b261c486ee7804db7730.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update78a205b59ce4b261c486ee7804db7730.form = update78a205b59ce4b261c486ee7804db7730Form

export const update = {
    '/ucp/wiki/{article}': update4b79dd0ffbf8928938952545e9f6d946,
    '/wiki/admin/{article}': update78a205b59ce4b261c486ee7804db7730,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/ucp/wiki/{article}'
*/
const destroy4b79dd0ffbf8928938952545e9f6d946 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4b79dd0ffbf8928938952545e9f6d946.url(args, options),
    method: 'delete',
})

destroy4b79dd0ffbf8928938952545e9f6d946.definition = {
    methods: ["delete"],
    url: '/ucp/wiki/{article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/ucp/wiki/{article}'
*/
destroy4b79dd0ffbf8928938952545e9f6d946.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy4b79dd0ffbf8928938952545e9f6d946.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/ucp/wiki/{article}'
*/
destroy4b79dd0ffbf8928938952545e9f6d946.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy4b79dd0ffbf8928938952545e9f6d946.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/ucp/wiki/{article}'
*/
const destroy4b79dd0ffbf8928938952545e9f6d946Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy4b79dd0ffbf8928938952545e9f6d946.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/ucp/wiki/{article}'
*/
destroy4b79dd0ffbf8928938952545e9f6d946Form.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy4b79dd0ffbf8928938952545e9f6d946.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy4b79dd0ffbf8928938952545e9f6d946.form = destroy4b79dd0ffbf8928938952545e9f6d946Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/wiki/admin/{article}'
*/
const destroy78a205b59ce4b261c486ee7804db7730 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy78a205b59ce4b261c486ee7804db7730.url(args, options),
    method: 'delete',
})

destroy78a205b59ce4b261c486ee7804db7730.definition = {
    methods: ["delete"],
    url: '/wiki/admin/{article}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/wiki/admin/{article}'
*/
destroy78a205b59ce4b261c486ee7804db7730.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy78a205b59ce4b261c486ee7804db7730.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/wiki/admin/{article}'
*/
destroy78a205b59ce4b261c486ee7804db7730.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy78a205b59ce4b261c486ee7804db7730.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/wiki/admin/{article}'
*/
const destroy78a205b59ce4b261c486ee7804db7730Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy78a205b59ce4b261c486ee7804db7730.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::destroy
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:275
* @route '/wiki/admin/{article}'
*/
destroy78a205b59ce4b261c486ee7804db7730Form.delete = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy78a205b59ce4b261c486ee7804db7730.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy78a205b59ce4b261c486ee7804db7730.form = destroy78a205b59ce4b261c486ee7804db7730Form

export const destroy = {
    '/ucp/wiki/{article}': destroy4b79dd0ffbf8928938952545e9f6d946,
    '/wiki/admin/{article}': destroy78a205b59ce4b261c486ee7804db7730,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/ucp/wiki/{article}/toggle-publish'
*/
const togglePublish132d8e7dec2777267ec5eb412da99ae1 = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish132d8e7dec2777267ec5eb412da99ae1.url(args, options),
    method: 'post',
})

togglePublish132d8e7dec2777267ec5eb412da99ae1.definition = {
    methods: ["post"],
    url: '/ucp/wiki/{article}/toggle-publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/ucp/wiki/{article}/toggle-publish'
*/
togglePublish132d8e7dec2777267ec5eb412da99ae1.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return togglePublish132d8e7dec2777267ec5eb412da99ae1.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/ucp/wiki/{article}/toggle-publish'
*/
togglePublish132d8e7dec2777267ec5eb412da99ae1.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish132d8e7dec2777267ec5eb412da99ae1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/ucp/wiki/{article}/toggle-publish'
*/
const togglePublish132d8e7dec2777267ec5eb412da99ae1Form = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish132d8e7dec2777267ec5eb412da99ae1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/ucp/wiki/{article}/toggle-publish'
*/
togglePublish132d8e7dec2777267ec5eb412da99ae1Form.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish132d8e7dec2777267ec5eb412da99ae1.url(args, options),
    method: 'post',
})

togglePublish132d8e7dec2777267ec5eb412da99ae1.form = togglePublish132d8e7dec2777267ec5eb412da99ae1Form
/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/wiki/admin/{article}/toggle-publish'
*/
const togglePublish86c47a83f0c16c6bdb368e522166c29b = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish86c47a83f0c16c6bdb368e522166c29b.url(args, options),
    method: 'post',
})

togglePublish86c47a83f0c16c6bdb368e522166c29b.definition = {
    methods: ["post"],
    url: '/wiki/admin/{article}/toggle-publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublish86c47a83f0c16c6bdb368e522166c29b.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return togglePublish86c47a83f0c16c6bdb368e522166c29b.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublish86c47a83f0c16c6bdb368e522166c29b.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePublish86c47a83f0c16c6bdb368e522166c29b.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/wiki/admin/{article}/toggle-publish'
*/
const togglePublish86c47a83f0c16c6bdb368e522166c29bForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish86c47a83f0c16c6bdb368e522166c29b.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::togglePublish
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:283
* @route '/wiki/admin/{article}/toggle-publish'
*/
togglePublish86c47a83f0c16c6bdb368e522166c29bForm.post = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: togglePublish86c47a83f0c16c6bdb368e522166c29b.url(args, options),
    method: 'post',
})

togglePublish86c47a83f0c16c6bdb368e522166c29b.form = togglePublish86c47a83f0c16c6bdb368e522166c29bForm

export const togglePublish = {
    '/ucp/wiki/{article}/toggle-publish': togglePublish132d8e7dec2777267ec5eb412da99ae1,
    '/wiki/admin/{article}/toggle-publish': togglePublish86c47a83f0c16c6bdb368e522166c29b,
}


/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
export const getLikes = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLikes.url(args, options),
    method: 'get',
})

getLikes.definition = {
    methods: ["get","head"],
    url: '/ucp/wiki/{article}/likes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
getLikes.url = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getLikes.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
getLikes.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getLikes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
getLikes.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getLikes.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
const getLikesForm = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getLikes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
getLikesForm.get = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getLikes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wiki\Admin\WikiAdminController::getLikes
* @see app/Http/Controllers/Wiki/Admin/WikiAdminController.php:56
* @route '/ucp/wiki/{article}/likes'
*/
getLikesForm.head = (args: { article: number | { id: number } } | [article: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getLikes.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getLikes.form = getLikesForm

const WikiAdminController = { index, create, store, edit, update, destroy, togglePublish, getLikes }

export default WikiAdminController