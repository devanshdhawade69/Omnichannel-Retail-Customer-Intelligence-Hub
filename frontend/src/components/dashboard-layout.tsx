import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DashboardSidebar } from './capitalio/sidebar'
import { DashboardTopbar } from './capitalio/topbar'
import { useDashboardNavigation } from './capitalio/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import './dashboard.css'

type DashboardLayoutProps = {
  children: ReactNode
}

function getBreadcrumb(pathname: string) {
  switch (pathname) {
    case '/analytics':
      return { section: 'Intelligence Core', page: 'Executive Analytics & Trajectory' }
    case '/net-worth':
      return { section: 'Intelligence Core', page: 'Gross Revenue & Valuation' }
    case '/regression':
      return { section: 'Data Mining Engines', page: 'Revenue Predictor Engine' }
    case '/clustering':
      return { section: 'Data Mining Engines', page: 'Customer RFM Segmentation' }
    case '/classification':
      return { section: 'Data Mining Engines', page: 'Loyalty Retention Classifier' }
    case '/association':
      return { section: 'Data Mining Engines', page: 'Market Basket Association' }
    case '/products':
      return { section: 'E-Commerce Operations', page: 'Product Catalog Management' }
    default:
      return { section: 'Intelligence Core', page: 'Dashboard Overview' }
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { pathname } = useDashboardNavigation()
  const breadcrumb = getBreadcrumb(pathname)

  return (
    <SidebarProvider
      defaultOpen
      className="capitalio-dashboard h-svh overflow-hidden no-scrollbar bg-background text-foreground"
      style={
        {
          '--sidebar-width': '16rem',
        } as CSSProperties
      }
    >
      <DashboardSidebar />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-1 pl-0">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background/95 rounded-xl border border-border/60 shadow-2xl overflow-hidden backdrop-blur-md">
          <DashboardTopbar />

          {/* Sub-header Breadcrumb & System Health Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 bg-secondary/20 px-4 py-2 text-xs md:px-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium text-muted-foreground/80">{breadcrumb.section}</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="font-semibold text-foreground">{breadcrumb.page}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Star Schema OLAP Active</span>
              </div>

              <Link
                to="/shop"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition-colors"
                title="Open customer-facing storefront in new tab"
              >
                <span>Storefront View</span>
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  )
}
