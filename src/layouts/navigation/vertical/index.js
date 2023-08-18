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
      permission: 'catalogos',
      visible: true,
      children: [
        {
          title: 'Dimensiones',
          path: '/catalogs/dimensions'
        },
        {
          title: 'Variables',
          path: '/catalogs/variables'
        },
        {
          title: 'Conceptos',
          path: '/catalogs/concepts'
        },
        {
          title: 'Mantenimientos',
          path: '/catalogs/maintenance'
        },
        {
          title: 'Materiales',
          path: '/catalogs/materials'
        },
        {
          title: 'Requerimientos',
          path: '/catalogs/requirements'
        },
        {
          title: 'Siniestros',
          path: '/catalogs/claims'
        },
        {
          title: 'Zonas',
          path: '/catalogs/zones'
        },
        {
          title: 'Usuarios',
          path: '/catalogs/users'
        },
        {
          title: 'Sucursales',
          path: '/catalogs/branches'
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
