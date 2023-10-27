import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import UserCommonView from '../views/UserCommonView.vue'
import UserHomePage from '../views/UserView/UserHomePage.vue'
import UserTradingPage from '../views/UserView/UserTradingPage.vue'
import UserShoppingCartPage from '../views/UserView/UserShoppingCartPage.vue'
import UserRequestPage from '../views/UserView/UserRequestPage.vue'
import UserMessagePage from '../views/UserView/UserMessagePage.vue'
import UserProfilePage from '../views/UserView/UserProfilePage.vue'
import ItemDetailPage from '../views/UserView/ItemDetailPage.vue'
import PublishIdlePage from "@/views/UserView/PublishIdlePage";
import SeekTradeItem from "@/views/UserView/SeekTradeItem";
import TransactionPage from "@/views/UserView/TransactionPage";
import TransactionEndPage from "@/views/UserView/TransactionEndPage";
import SearchResultPage from "@/views/UserView/SearchResultPage";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },  
  {
    path: '/loginregister',
    name: 'loginregister',
    component: LoginRegisterView
  },
  {
    path: '/userhome',
    name: 'userhome',
    component: UserCommonView,
    children: [
      {
        path: 'userhomepage',
        component: UserHomePage
      },
      {
        path: 'usertradingpage',
        component: UserTradingPage
      },
      {
        path: 'usershoppingcartpage',
        component: UserShoppingCartPage
      },
      {
        path: 'userrequestpage',
        component: UserRequestPage
      },
      {
        path: 'usermessagepage/:id?',
        component: UserMessagePage,
      },
      {
        path: 'userprofilepage',
        component: UserProfilePage
      },
      {
        path: 'itemdetailpage/:id',
        component: ItemDetailPage,
        props: true
      },
      {
        path: "search/:search",
        component: SearchResultPage,
        props: true
      },
      {
        path: 'publishidlepage',
        component: PublishIdlePage
      },
      {
        path: 'seektradepage',
        component: SeekTradeItem
      },
      {
        path: 'transactionpage/:id?',
        component: TransactionPage
      },
      {
        path: 'transactionendpage',
        component: TransactionEndPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
