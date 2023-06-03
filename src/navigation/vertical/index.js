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
          path: '/catalogs/dimensions/dimensions'
        },
        {
          title: 'Variables',
          path: '/catalogs/variables/variables'
        },
        {
          title: 'Conceptos',
          path: '/catalogs/conceptos/conceptos'
        },
        {
          title: 'Mantenimientos',
          path: '/catalogs/mantenimientos/mantenimientos'
        },
        {
          title: 'Materiales',
          path: '/catalogs/materiales/materiales'
        },
        {
          title: 'Requerimientos',
          path: '/catalogs/requerimientos/requerimientos'
        },
        {
          title: 'Siniestros',
          path: '/catalogs/siniestros/siniestros'
        },
        {
          title: 'Usuarios',
          path: '/catalogs/usuarios/usuarios'
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
