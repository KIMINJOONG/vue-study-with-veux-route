import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    //이미 로그인 된 유저니까 막아야함.
    alert("이미 로그인되었습니다");
    next("/");
  } else {
    next();
  }
};

const onlyAuth = (to, from, next) => {
  if (store.state.isLogin === false) {
    alert("로그인을 하여주세요");
    next("/");
  } else {
    next();
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: rejectAuthUser,
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuth,
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Mypage.vue")
    }
  ]
});
