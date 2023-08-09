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
          path: '/catalogs/conceptos'
        },
        {
          title: 'Mantenimientos',
          path: '/catalogs/mantenimientos'
        },
        {
          title: 'Materiales',
          path: '/catalogs/materiales'
        },
        {
          title: 'Requerimientos',
          path: '/catalogs/requerimientos'
        },
        {
          title: 'Siniestros',
          path: '/catalogs/siniestros'
        },
        {
          title: 'Zonas',
          path: '/catalogs/zonas'
        },
        {
          title: 'Usuarios',
          path: '/catalogs/usuarios'
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
