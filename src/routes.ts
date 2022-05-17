const Home = () => import('./views/Home.vue')

const ExampleOne = () => import('./views/ExampleOne/index.vue')
const ExampleOneId = () => import('./views/ExampleOne/[id].vue')

const ExampleTwo = () => import('./views/ExampleTwo/index.vue')
const ExampleTwoId = () => import('./views/ExampleTwo/[id].vue')

const ExampleThree = () => import('./views/ExampleThree/index.vue')
const ExampleThreeId = () => import('./views/ExampleThree/[id].vue')

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/example-1',
    name: 'example-1',
    component: ExampleOne,
  },
  {
    path: '/example-1/:id',
    name: 'example-1-id',
    component: ExampleOneId,
  },
  {
    path: '/example-2',
    name: 'example-2',
    component: ExampleTwo,
  },
  {
    path: '/example-2/:id',
    name: 'example-2-id',
    component: ExampleTwoId,
  },
  {
    path: '/example-3',
    name: 'example-3',
    component: ExampleThree,
  },
  {
    path: '/example-3/:id',
    name: 'example-3-id',
    component: ExampleThreeId,
  },
]
