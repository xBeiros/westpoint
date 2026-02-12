import PlayerInfoController from './PlayerInfoController'
import VehicleInfoController from './VehicleInfoController'
import AdminController from './AdminController'
import Wiki from './Wiki'
import Admin from './Admin'
import NewsController from './NewsController'
import WikiController from './WikiController'
import DiscordLoginController from './DiscordLoginController'


const Controllers = {
    PlayerInfoController: Object.assign(PlayerInfoController, PlayerInfoController),
    VehicleInfoController: Object.assign(VehicleInfoController, VehicleInfoController),
    AdminController: Object.assign(AdminController, AdminController),
    Wiki: Object.assign(Wiki, Wiki),
    Admin: Object.assign(Admin, Admin),
    NewsController: Object.assign(NewsController, NewsController),
    WikiController: Object.assign(WikiController, WikiController),
    DiscordLoginController: Object.assign(DiscordLoginController, DiscordLoginController),
}

export default Controllers