// ** Icon imports
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
/* TODO

  nav with menus and subMenus
*/
const navigation = () => {
  const navItems = [
    {
      title: 'Catalogos',
      icon: ViewDashboard,
      permission: 'catalogs',
      visible: true,
      children: [
        {
          title: 'Sucursales',
          path: '/dashboards/sucursales'
        },
        {
          title: 'Proveedores',
          path: '/dashboards/users'
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
