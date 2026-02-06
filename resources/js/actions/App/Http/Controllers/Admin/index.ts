import NewsController from './NewsController'
import RoleController from './RoleController'


const Admin = {
    NewsController: Object.assign(NewsController, NewsController),
    RoleController: Object.assign(RoleController, RoleController),
}

export default Admin