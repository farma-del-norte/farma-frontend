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
  // Nature,
  ShoppingCart,
  Settings,
  Label,
  AspectRatio,
  Warning
} from '@mui/icons-material'
import {PERMISSIONS} from 'src/configs/profiles'
/* TODO
  nav with menus and subMenu
*/
const navigation = () => {
  const navItems = [
    {
      title: i18n.t('users_title'),
      path: '/users',
      icon: AccountCircle,
      visible: true,

      permission: PERMISSIONS.users
    },
    {
      title: i18n.t('zones_title'),
      path: '/zones',
      icon: Dashboard,
      visible: true,
      permission: PERMISSIONS.zones
    },
    {
      title: i18n.t('branches_title'),
      path: '/branches',
      icon: Business,
      visible: true,
      permission: PERMISSIONS.branches
    },
    {
      title: i18n.t('budgets_title'),
      path: '/budgets',
      icon: ListAlt,
      visible: true,
      permission: PERMISSIONS.budgets
    },
    {
      title: 'Simple',
      path: '/simple',
      icon: ListAlt,
      visible: false,
      permission: PERMISSIONS.home
    },
    {
      title: i18n.t('maintenances_title'),
      path: '/maintenances',
      icon: Storage,
      visible: true,
      permission: PERMISSIONS.maintenances,
      children: [
        {
          title: i18n.t('correctives_title'),
          path: '/maintenances/correctives',
          icon: FormatListBulleted,

          permission: PERMISSIONS.correctivesMaintenances
        },
        {
          title: i18n.t('damages_cat_title'),
          path: '/maintenances/damages',
          icon: Warning,

          permission: PERMISSIONS.damagesMaintenances
        }
      ]
    },
    {
      title: i18n.t('resources_title'),
      icon: Storage,
      visible: true,
      permission: PERMISSIONS.resources,
      children: [
        {
          title: i18n.t('concepts_cat_title'),
          path: '/resources/concepts',
          icon: Label,

          permission: PERMISSIONS.conceptsResources
        },
        {
          title: i18n.t('dimensions_cat_title'),
          path: '/resources/dimensions',
          icon: AspectRatio,

          permission: PERMISSIONS.dimensionsResources
        },
        {
          title: i18n.t('materials_cat_title'),
          path: '/resources/materials',
          icon: ShoppingCart,

          permission: PERMISSIONS.materialsResources
        },
        // {
        //   title: i18n.t('requirements_cat_title'),
        //   path: '/resources/requirements',
        //   icon: Nature,

        //   permission: PERMISSIONS.requirementsResources
        // },
        {
          title: i18n.t('services_cat_title'),
          path: '/resources/services',
          icon: Build,

          permission: PERMISSIONS.servicesResources
        },
        {
          title: i18n.t('suppliers_title'),
          path: '/resources/suppliers',
          icon: Business,

          permission: PERMISSIONS.suppliersResources
        },
        {
          title: i18n.t('variables_cat_title'),
          path: '/resources/variables',
          icon: Settings,

          permission: PERMISSIONS.variablesResources
        },
        {
          title: i18n.t('damages_cat_title'),
          path: '/resources/damages',
          icon: Warning,

          permission: PERMISSIONS.damagesResources
        }
      ]
    }
  ]

  return navItems.filter(item => item.visible)
}

export default navigation
