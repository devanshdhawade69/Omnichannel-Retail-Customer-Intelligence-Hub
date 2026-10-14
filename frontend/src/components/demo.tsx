import type { ReactNode } from 'react'
import DashboardLayout from './dashboard-layout'
import RegressionEngine from '../pages/RegressionEngine'
import ClusteringEngine from '../pages/ClusteringEngine'
import ClassificationEngine from '../pages/ClassificationEngine'
import AssociationEngine from '../pages/AssociationEngine'
import AdminProducts from '../pages/AdminProducts'
import { AnalyticsPage } from './capitalio/analytics-page'
import { DashboardPage } from './capitalio/dashboard-page'
import { NetWorthPage } from './capitalio/net-worth-page'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './capitalio/navigation'

const blankRoutes = new Set([
  '/stocks',
  '/crypto',
  '/real-estate',
  '/fixed-income',
  '/settings',
  '/notifications',
])

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()

  let content: ReactNode = <DashboardPage />

  if (pathname === '/analytics') {
    content = <AnalyticsPage />
  } else if (pathname === '/net-worth') {
    content = <NetWorthPage />
  } else if (pathname === '/regression') {
    content = <RegressionEngine />
  } else if (pathname === '/clustering') {
    content = <ClusteringEngine />
  } else if (pathname === '/classification') {
    content = <ClassificationEngine />
  } else if (pathname === '/association') {
    content = <AssociationEngine />
  } else if (pathname === '/products') {
    content = <AdminProducts />
  } else if (blankRoutes.has(pathname)) {
    content = null
  }

  return <DashboardLayout>{content}</DashboardLayout>
}

export default function CapitalioDashboardDemo() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  )
}
