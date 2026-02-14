import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import player from './player'
import vehicle from './vehicle'
import profile from './profile'
import admin from './admin'
import wiki from './wiki'
/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/ucp/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {




    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:50
* @route '/ucp/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm



const ucp = {
    dashboard: Object.assign(dashboard, dashboard),
    player: Object.assign(player, player),
    vehicle: Object.assign(vehicle, vehicle),
    profile: Object.assign(profile, profile),
    admin: Object.assign(admin, admin),
    wiki: Object.assign(wiki, wiki),
}

export default ucp