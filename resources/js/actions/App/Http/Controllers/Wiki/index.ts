import Admin from './Admin'
import WikiChangeRequestUserController from './WikiChangeRequestUserController'


const Wiki = {
    Admin: Object.assign(Admin, Admin),
    WikiChangeRequestUserController: Object.assign(WikiChangeRequestUserController, WikiChangeRequestUserController),
}

export default Wiki