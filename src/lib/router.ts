import { createRouter, createWebHistory, Router } from "vue-router"
import login from "@/pages/login.vue"
import chat from "@/pages/mainApp.vue"

const routes = [

  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: chat,
    meta: {
      title: "Chat",
      requiresAuth: true,
    },

  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token en el localStorage
  // si la routa es "/" o "/login" y el usuario esta logueado redirige a chat
  if (to.path === '/' || to.path === '/login') {
    if (isLoggedIn) {
      next({ name: 'chat' });
    } else {
      next();
    }
  } else
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // Si la ruta requiere autenticación y no hay token, redirige a login
    next({ name: 'login' });
  } else {
    // Si el usuario está logueado o la ruta no requiere autenticación, continúa
    next();
  }
});


export default router
