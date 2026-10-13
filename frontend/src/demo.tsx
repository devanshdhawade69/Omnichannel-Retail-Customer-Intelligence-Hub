import type { ReactNode } from 'react'
import DashboardLayout from './dashboard-layout'
import { AnalyticsPage } from './components/capitalio/analytics-page'
import { DashboardPage } from './components/capitalio/dashboard-page'
import RegressionEngine from './pages/RegressionEngine'
import ClusteringEngine from './pages/ClusteringEngine'
import ClassificationEngine from './pages/ClassificationEngine'
import AssociationEngine from './pages/AssociationEngine'
import AdminProducts from './pages/AdminProducts'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/capitalio/navigation'

const blankRoutes = new Set([
  '/net-worth',
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
  } else if (pathname === '/regression') {
    content = (
      <div className="p-6">
        <RegressionEngine />
      </div>
    )
  } else if (pathname === '/clustering') {
    content = (
      <div className="p-6">
        <ClusteringEngine />
      </div>
    )
  } else if (pathname === '/classification') {
    content = (
      <div className="p-6">
        <ClassificationEngine />
      </div>
    )
  } else if (pathname === '/association') {
    content = (
      <div className="p-6">
        <AssociationEngine />
      </div>
    )
  } else if (pathname === '/products') {
    content = (
      <div className="p-6">
        <AdminProducts />
      </div>
    )
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
