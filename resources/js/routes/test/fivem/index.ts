import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
export const connection = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connection.url(options),
    method: 'get',
})

connection.definition = {
    methods: ["get","head"],
    url: '/test/fivem-connection',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
connection.url = (options?: RouteQueryOptions) => {




    return connection.definition.url + queryParams(options)
}

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
connection.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connection.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
connection.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connection.url(options),
    method: 'head',
})

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
const connectionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connection.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
connectionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connection.url(options),
    method: 'get',
})

/**
* @see routes/web.php:169
* @route '/test/fivem-connection'
*/
connectionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: connection.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

connection.form = connectionForm



const fivem = {
    connection: Object.assign(connection, connection),
}

export default fivem