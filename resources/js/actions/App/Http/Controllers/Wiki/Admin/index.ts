import WikiAdminController from './WikiAdminController'
import WikiChangeRequestController from './WikiChangeRequestController'


const Admin = {
    WikiAdminController: Object.assign(WikiAdminController, WikiAdminController),
    WikiChangeRequestController: Object.assign(WikiChangeRequestController, WikiChangeRequestController),
}

export default Admin