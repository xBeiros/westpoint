import Admin from './Admin'
import FiveMController from './FiveMController'
import NewsController from './NewsController'
import WikiController from './WikiController'
import DiscordLoginController from './DiscordLoginController'
import PlayerInfoController from './PlayerInfoController'
import VehicleInfoController from './VehicleInfoController'
import AdminController from './AdminController'


const Controllers = {
    Admin: Object.assign(Admin, Admin),
    FiveMController: Object.assign(FiveMController, FiveMController),
    NewsController: Object.assign(NewsController, NewsController),
    WikiController: Object.assign(WikiController, WikiController),
    DiscordLoginController: Object.assign(DiscordLoginController, DiscordLoginController),
    PlayerInfoController: Object.assign(PlayerInfoController, PlayerInfoController),
    VehicleInfoController: Object.assign(VehicleInfoController, VehicleInfoController),
    AdminController: Object.assign(AdminController, AdminController),
}

export default Controllers