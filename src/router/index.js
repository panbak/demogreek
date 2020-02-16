import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import GeneralPopulationChart from '../components/GeneralPopulationChart'
import ChildrenDemographicsChart from '../components/ChildrenDemographicsChart'
import StartComponent from '../components/StartComponent'
//import VueFrappe from 'vue2-frappe';
import HighchartsVue from 'highcharts-vue'

Vue.use(VueRouter)
Vue.use(HighchartsVue)

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartComponent
  },
  {
    path: '/population',
    name: 'population',
    component: GeneralPopulationChart
  },
  {
    path: '/children',
    name: 'children',
    component: ChildrenDemographicsChart
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
