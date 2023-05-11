// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

import { PROFILES } from 'src/configs/profiles'
import { useMemo } from 'react'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  return item.children ? VerticalNavGroup : VerticalNavLink
}

const VerticalNavItems = props => {
  const { verticalNavItems } = props
  // ** Props

  const RenderMenuItems = verticalNavItems.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
