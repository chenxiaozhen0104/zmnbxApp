// import Vue from 'vue'
import Router from 'vue-router'
import Foo from './views/foo.vue'
import Register from './views/register.vue'
import Password from './views/password.vue'
import Forget from './views/forgetpwd.vue'
import Device from './views/device.vue'
import Homepage from './views/homepage.vue'
import My from './views/my.vue'
import BasicInformation from './views/basicInformation.vue'
import Company from './views/company.vue'
import Connect from './views/connect.vue'
import ChangePwd from './views/changePwd.vue'
// import DeviceDetail from "./views/DeviceDetail.vue"
import CompanyType from "./views/companyType.vue"
import AddCompany from "./views/addCompany.vue"
import Repair from "./views/repair.vue"
import WorkOrder from "./views/workOrder.vue"
import OrderDetail from "./views/orderDetail.vue"
import CompanyPerMag from "./views/companyPerMag.vue"
import AddEquipment from "./views/AddEquipment.vue"
import TestPage from "./views/test.vue"
import Report from "./views/report.vue"
Vue.use(Router)

export default new Router({
    routes: [
        { path: '/login', component: Foo },
        { path: '/register', component: Register },
        { path: '/password', component: Password },
        { path: '/forgetpwd', component: Forget },
        // { path: '/homepage', component: Homepage }, // 暂时注释，待orderDetail页面写完时，清掉注释；
        // { path: '/device', component: Device },
        {
            path: '/device', component: Device,
            children: [
                { path: 'detail/:id', component: AddEquipment },
                // { path: 'repairId/:id', component: Repair }
            ]
            
        },
        {
            path: '/my', component: My,
            children: [
                { path: 'basicInformation', component: BasicInformation},
                { path: 'companyPerMag', component: CompanyPerMag },
                { path: 'connect', component: Connect },
                { path: 'changePwd', component: ChangePwd },
                { path: 'report', component: Report }
            ]
        },
        // { path: '/my', component: My },
        // { path: '/basicInformation', component: BasicInformation },
        { path: '/company', component: Company },
        // { path: '/connect', component: Connect },
        // { path: '/changePwd', component: ChangePwd },
        // { path: '/deviceDetail/:id', component: DeviceDetail },

        {
            path: '/workOrder', component: WorkOrder,
            children: [
                { path: 'orderDetail/:id', component: OrderDetail }
            ]
            
        },

        { path: '/repair/:qrcode', component: Repair },
        { path: '/repairId/:id', component: Repair },
        { path: '/companyType', component: CompanyType },
        { path: '/addCompany', component: AddCompany },
        // { path: '/companyPerMag', component: CompanyPerMag },
        // { path: '/addEquipment/:id', component: AddEquipment },
        { path: '/homepage', component: Homepage },  // 暂时跳转，待orderDetail 页面写完后删除；
        { path: '/test', component: TestPage },
        // { path: '/report', component: Report },
        // { path: '/workOrder', component: WorkOrder }
    ]
})