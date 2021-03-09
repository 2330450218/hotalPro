import Vue from 'vue'
import VueRouter from 'vue-router'


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'index',
      component: ()=>import("../views/index/overviewindex.vue")
    },
  {
    path: '/goodsShop',
    name: 'goodsShop',
    component: ()=>import("../views//floor/overviewGoods.vue")
  },

  //陈霞
  {
    path: '/floor',
    name: 'floor',
    component: ()=>import("../views/floor/overviewFloor.vue")
  },

  
  {
    path: '/roomtype',
    name: 'roomtype',
    component: ()=>import("../views/roomtype/overviewRoomType.vue")
  },

  {
    path: '/room',
    name: 'room',
    component: ()=>import("../views/room/overviewRoom.vue")
  },

  {
    path: '/bookorder',
    name: 'bookorder',
    component: ()=>import("../views/book_order/overviewBookOrder.vue")
  },

  {
    path: '/checkin',
    name: 'checkin',
    component: ()=>import("../views/checkin/overviewCheckin.vue")
  },
  //
  
  {
    path: '/usersOrder',
    name: 'usersOrder',
    component: ()=>import("../views/users/overviewOrder.vue")
  },
  {
    path: '/usersCont',
    name: 'usersCont',
    component: ()=>import("../views/users/overviewUsers.vue")
  },
  {
    path: '/rootCont',
    name: 'rootCont',
    component: ()=>import("../views/users/overviewRoot.vue")
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: ()=>import("../views/swiper/overviewswiper.vue")
  },
  {
    path: '/lable',
    name: 'lable',
    component: ()=>import("../views/lable/overviewlable.vue")
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
