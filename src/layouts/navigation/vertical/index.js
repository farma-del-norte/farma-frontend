import i18n from 'src/configs/i18n'
// ** Icon imports
import {
  Business,
  AccountCircle,
  Dashboard,
  ListAlt,
  Build,
  Storage,
  FormatListBulleted,
  Nature,
  ShoppingCart,
  Settings,
  Label,
  AspectRatio,
  Warning
} from '@mui/icons-material'
/* TODO
  nav with menus and subMenus
*/
const navigation = () => {
  const navItems = [
    {
      title: i18n.t('users_title'),
      path: '/users',
      icon: AccountCircle,
      visible: true
    },
    {
      title: i18n.t('zones_title'),
      path: '/zones',
      icon: Dashboard,
      visible: true
    },
    {
      title: i18n.t('branches_title'),
      path: '/branches',
      icon: Business,
      visible: true
    },
    {
      title: i18n.t('budgets_title'),
      path: '/budgets',
      icon: ListAlt,
      visible: true
    },
    {
      title: 'Simple',
      path: '/simple',
      icon: ListAlt,
      visible: true
    },
    {
      title: i18n.t('maintenances_title'),
      path: '/maintenances',
      icon: Storage,
      visible: true,
      children: [
        {
          title: i18n.t('correctives_title'),
          path: '/maintenances/correctives',
          icon: FormatListBulleted,
          visible: true
        },
        {
          title: i18n.t('services_title'),
          path: '/maintenances/services',
          icon: FormatListBulleted,
          visible: true
        },
        {
          title: i18n.t('preventives_title'),
          path: '/maintenances/preventives',
          icon: FormatListBulleted,
          visible: true
        },
        {
          title: i18n.t('damages_cat_title'),
          path: '/maintenances/damages',
          icon: Warning,
          visible: true
        }
      ]
    },
    {
      title: i18n.t('resources_title'),
      icon: Storage,
      permission: 'recursos',
      visible: true,
      children: [
        {
          title: i18n.t('concepts_cat_title'),
          path: '/resources/concepts',
          icon: Label
        },
        {
          title: i18n.t('dimensions_cat_title'),
          path: '/resources/dimensions',
          icon: AspectRatio
        },

        {
          title: i18n.t('materials_cat_title'),
          path: '/resources/materials',
          icon: ShoppingCart
        },
        {
          title: i18n.t('requirements_cat_title'),
          path: '/resources/requirements',
          icon: Nature
        },
        {
          title: i18n.t('services_cat_title'),
          path: '/resources/services',
          icon: Build
        },
        {
          title: i18n.t('suppliers_title'),
          path: '/resources/suppliers',
          icon: Business
        },
        {
          title: i18n.t('variables_cat_title'),
          path: '/resources/variables',
          icon: Settings
        },
        {
          title: i18n.t('damages_cat_title'),
          path: '/resources/damages',
          icon: Warning,
          visible: true
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
