/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/pages', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: '用户审核', // name that appear in Sidebar
    exact: true,
  },
  {
    path: '/pages/products',
    icon: 'FormsIcon',
    name: '产品管理',
  },
  // {
  //   path: '/pages/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/pages/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/pages/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/pages/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/pages/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/pages/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/pages/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/pages/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/pages/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/pages/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export type { IRoute }
export default routes
