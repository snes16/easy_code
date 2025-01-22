import { createRouter, createWebHistory } from 'vue-router';

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad('HomeView'),
  },
  {
    path: "/character/:id",
    name: 'character',
    component: lazyLoad('CharacterInfoView')
  },
  {
    path: '/episodes',
    name: 'episodes',
    component: lazyLoad('EpisodesView')
  },
  {
    path: "/episode/:id",
    name: 'episode',
    component: lazyLoad('EpisodeInfoView')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
