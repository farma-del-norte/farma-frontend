// ** Icon imports
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import i18n from 'src/configs/i18n'
/* TODO
  nav with menus and subMenus
*/
const navigation = () => {
  const navItems = [
    {
      title: i18n.t('catalogs_title'),
      icon: ViewDashboard,
      permission: 'catalogos',
      visible: true,
      children: [
        {
          title: i18n.t('branches_title'),
          path: '/catalogs/branches'
        },
        {
          title: i18n.t('concepts_cat_title'),
          path: '/catalogs/concepts'
        },
        {
          title: i18n.t('damages_cat_title'),
          path: '/catalogs/damages'
        },
        {
          title: i18n.t('dimensions_cat_title'),
          path: '/catalogs/dimensions'
        },
        {
          title: i18n.t('materials_cat_title'),
          path: '/catalogs/materials'
        },
        {
          title: i18n.t('requirements_cat_title'),
          path: '/catalogs/requirements'
        },
        {
          title: i18n.t('services_cat_title'),
          path: '/catalogs/services'
        },
        {
          title: i18n.t('suppliers_title'),
          path: '/catalogs/suppliers'
        },
        {
          title: i18n.t('users_title'),
          path: '/catalogs/users'
        },
        {
          title: i18n.t('variables_cat_title'),
          path: '/catalogs/variables'
        },
        {
          title: i18n.t('zones_title'),
          path: '/catalogs/zones'
        },
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
