import React from 'react'
import {
  SidebarHomeActiveIcon,
  SidebarAnalyticsIcon,
  SidebarNetWorthIcon,
  SidebarFolderIcon,
  SidebarLinkIcon,
  SidebarAiIcon,
  SidebarRealEstateIcon,
  SidebarFixedIncomeIcon,
  SidebarSettingsIcon,
  SidebarNotificationsIcon,
} from './components/capitalio/icons'

export type PeriodValue = '7d' | '30d' | '90d' | '1y' | 'all'

export const dashboardPeriods: { label: string; value: PeriodValue }[] = [
  { label: 'Past 7 days', value: '7d' },
  { label: 'Past 30 days', value: '30d' },
  { label: 'Past 90 days', value: '90d' },
  { label: 'Past year', value: '1y' },
  { label: 'All time', value: 'all' },
]

export const defaultDashboardPeriod: PeriodValue = '30d'

export const dashboardTopbarData = {
  lastUpdated: 'Today at 12:30 PM',
  currency: 'USD ($)',
  dateRange: 'Sep 13, 2026 - Oct 13, 2026',
}

export function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Retail Customer Intelligence Hub'
    case '/analytics':
      return 'Executive Analytics & Performance'
    case '/net-worth':
      return 'Gross Revenue & Valuation'
    case '/stocks':
      return 'Inventory Turn Rates'
    case '/crypto':
      return 'Loyalty Points & Rewards'
    case '/real-estate':
      return 'Retail Stores & Fulfillment Centers'
    case '/fixed-income':
      return 'Subscriptions & B2B Contracts'
    case '/settings':
      return 'System Configurations'
    case '/notifications':
      return 'Intelligence Notifications'
    case '/regression':
      return 'Revenue Predictor Engine'
    case '/clustering':
      return 'Customer Segmentation (RFM)'
    case '/classification':
      return 'Customer Loyalty Classifier'
    case '/association':
      return 'Market Basket Analysis'
    case '/products':
      return 'Admin Product Management'
    default:
      return 'Omnichannel Intelligence Hub'
  }
}

export const currentUser = {
  name: 'Devansh Dhawade',
  initials: 'DD',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
}

export type NavigationItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export type NavigationSection = {
  label?: string
  collapsible?: boolean
  defaultOpen?: boolean
  items: NavigationItem[]
}

export const sidebarSections = {
  main: [
    {
      label: 'Intelligence Core',
      collapsible: false,
      items: [
        {
          name: 'Dashboard Overview',
          href: '/',
          icon: SidebarHomeActiveIcon,
        },
        {
          name: 'Executive Analytics',
          href: '/analytics',
          icon: SidebarAnalyticsIcon,
        },
        {
          name: 'Gross Revenue',
          href: '/net-worth',
          icon: SidebarNetWorthIcon,
        },
      ],
    },
    {
      label: 'Data Mining Engines',
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          name: 'Revenue Predictor',
          href: '/regression',
          icon: SidebarAiIcon,
        },
        {
          name: 'Customer Segments',
          href: '/clustering',
          icon: SidebarFolderIcon,
        },
        {
          name: 'Loyalty Classifier',
          href: '/classification',
          icon: SidebarLinkIcon,
        },
        {
          name: 'Market Basket Rules',
          href: '/association',
          icon: SidebarFixedIncomeIcon,
        },
        {
          name: 'Products Inventory',
          href: '/products',
          icon: SidebarRealEstateIcon,
        },
      ],
    },
  ] as NavigationSection[],
  footer: {
    items: [
      {
        name: 'Notifications',
        href: '/notifications',
        icon: SidebarNotificationsIcon,
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: SidebarSettingsIcon,
      },
    ],
  },
}

// Generate periods data
function generateSummaryCards(mult: number) {
  return [
    {
      id: 'net-worth' as const,
      title: 'Net Retail Revenue',
      value: `$${Math.round(842590 * mult).toLocaleString()}`,
      icon: 'wallet' as const,
      color: '#10b981',
      change: {
        value: '+14.8%',
        label: 'vs last cycle',
        tone: 'positive' as const,
      },
      chart: {
        points: [
          { label: 'W1', x: 0, y: 35 },
          { label: 'W2', x: 1, y: 30 },
          { label: 'W3', x: 2, y: 22 },
          { label: 'W4', x: 3, y: 15 },
          { label: 'W5', x: 4, y: 8 },
        ],
      },
    },
    {
      id: 'portfolio-return' as const,
      title: 'Sales Target Quota',
      value: `${(88.4 * (mult > 1 ? 1.05 : 0.98)).toFixed(1)}%`,
      icon: 'trend' as const,
      target: {
        progress: 88,
        gained: `$${Math.round(742 * mult)}K`,
        goal: `$${Math.round(840 * mult)}K target`,
        current: `${(88.4 * (mult > 1 ? 1.05 : 0.98)).toFixed(1)}%`,
        label: 'achieved',
      },
      bars: [
        { label: 'W1', value: 18 },
        { label: 'W2', value: 24 },
        { label: 'W3', value: 27 },
        { label: 'W4', value: 31 },
      ],
    },
    {
      id: 'risk-score' as const,
      title: 'Customer Churn Risk',
      value: `${Math.round(24 / mult)}`,
      suffix: '/ 100',
      icon: 'shield' as const,
      color: '#3b82f6',
      change: {
        value: '-4.2 pts',
        label: 'healthy risk profile',
        tone: 'positive' as const,
      },
      chart: {
        points: [
          { label: 'W1', x: 0, y: 18 },
          { label: 'W2', x: 1, y: 24 },
          { label: 'W3', x: 2, y: 20 },
          { label: 'W4', x: 3, y: 28 },
          { label: 'W5', x: 4, y: 32 },
        ],
      },
    },
    {
      id: 'asset-classes' as const,
      title: 'Omnichannel Channel Split',
      value: '3',
      suffix: 'Channels',
      icon: 'pie' as const,
      allocations: [
        {
          label: 'E-Commerce Web',
          share: 52,
          value: `$${Math.round(438 * mult)}K`,
          color: '#3b82f6',
        },
        {
          label: 'Mobile App',
          share: 30,
          value: `$${Math.round(253 * mult)}K`,
          color: '#10b981',
        },
        {
          label: 'Marketplace B2B',
          share: 18,
          value: `$${Math.round(151 * mult)}K`,
          color: '#8b5cf6',
        },
      ],
    },
  ]
}

export const dashboardSummaryCardsByPeriod = {
  '7d': generateSummaryCards(0.25),
  '30d': generateSummaryCards(1.0),
  '90d': generateSummaryCards(2.8),
  '1y': generateSummaryCards(11.4),
  all: generateSummaryCards(18.2),
}

function generateDetail(mult: number) {
  return {
    performance: {
      title: 'Actual Revenue vs Star Schema Forecast',
      trend: '+23.4% YoY',
      actionLabel: 'Revenue Model',
      legend: [
        { label: 'Actual Sales Volume', color: 'var(--chart-4)' },
        { label: 'Regression Target', color: 'var(--chart-1)' },
      ],
      metrics: [
        {
          label: 'Total Orders',
          value: `${Math.round(18420 * mult).toLocaleString()}`,
          change: '+14.2%',
          tone: 'positive' as 'positive' | 'negative',
        },
        {
          label: 'Average Order Value',
          value: `$${(84.5 * (mult > 1 ? 1.02 : 0.98)).toFixed(2)}`,
          change: '+6.1%',
          tone: 'positive' as 'positive' | 'negative',
        },
        {
          label: 'Customer Lifetime Value',
          value: `$${Math.round(1420 * mult)}`,
          change: '+18.5%',
          tone: 'positive' as 'positive' | 'negative',
        },
        {
          label: 'Return / Refund Rate',
          value: '1.8%',
          change: '-0.7%',
          tone: 'positive' as 'positive' | 'negative',
        },
      ],
      data: [
        { label: 'Sep 15', portfolio: 280, benchmark: 260, axisLabel: 'Week 1' },
        { label: 'Sep 18', portfolio: 320, benchmark: 290 },
        { label: 'Sep 22', portfolio: 410, benchmark: 340, axisLabel: 'Week 2' },
        { label: 'Sep 26', portfolio: 480, benchmark: 390 },
        { label: 'Oct 01', portfolio: 540, benchmark: 430, axisLabel: 'Week 3' },
        { label: 'Oct 06', portfolio: 590, benchmark: 480 },
        { label: 'Oct 10', portfolio: 660, benchmark: 520, axisLabel: 'Week 4' },
      ],
    },
    allocation: {
      title: 'Retail Category Distribution',
      status: 'Star Schema Active',
      centerValue: `$${Math.round(842 * mult)}K`,
      centerLabel: 'Gross GMV',
      items: [
        { label: 'Electronics & Audio', value: `$${Math.round(345 * mult)}K`, percent: 41, color: '#3b82f6' },
        { label: 'Home & Kitchen Decor', value: `$${Math.round(244 * mult)}K`, percent: 29, color: '#10b981' },
        { label: 'Fashion & Apparel', value: `$${Math.round(152 * mult)}K`, percent: 18, color: '#8b5cf6' },
        { label: 'Beauty & Lifestyle', value: `$${Math.round(101 * mult)}K`, percent: 12, color: '#f59e0b' },
      ],
    },
  }
}

export const dashboardDetailByPeriod = {
  '7d': generateDetail(0.25),
  '30d': generateDetail(1.0),
  '90d': generateDetail(2.8),
  '1y': generateDetail(11.4),
  all: generateDetail(18.2),
}

function generateBottom(mult: number) {
  return {
    holdings: {
      title: 'Top Performing E-Commerce SKUs',
      actionLabel: 'Inventory Catalog',
      columns: ['#', 'Product Item', 'Revenue', 'Share', 'Growth', '24H'],
      rows: [
        {
          no: '01',
          asset: 'Sony WH-1000XM5 Wireless Headphones',
          type: 'Electronics • SKU-8921',
          logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=80',
          value: `$${Math.round(148200 * mult).toLocaleString()}`,
          allocation: '17.6%',
          return: '+28.4%',
          tone: 'positive' as const,
          day: '+3.8%',
          dayTone: 'positive' as const,
        },
        {
          no: '02',
          asset: 'Apple MacBook Air M2 13.6"',
          type: 'Computing • SKU-4412',
          logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=80&q=80',
          value: `$${Math.round(124900 * mult).toLocaleString()}`,
          allocation: '14.8%',
          return: '+19.2%',
          tone: 'positive' as const,
          day: '+1.5%',
          dayTone: 'positive' as const,
        },
        {
          no: '03',
          asset: 'White Hanging Heart T-Light Holder',
          type: 'Home Decor • SKU-85123A',
          logo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=80&q=80',
          value: `$${Math.round(98400 * mult).toLocaleString()}`,
          allocation: '11.7%',
          return: '+34.1%',
          tone: 'positive' as const,
          day: '+6.2%',
          dayTone: 'positive' as const,
        },
        {
          no: '04',
          asset: 'Regency Cakestand 3 Tier',
          type: 'Kitchenware • SKU-22423',
          logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=80&q=80',
          value: `$${Math.round(82600 * mult).toLocaleString()}`,
          allocation: '9.8%',
          return: '+12.7%',
          tone: 'positive' as const,
          day: '-0.8%',
          dayTone: 'negative' as const,
        },
        {
          no: '05',
          asset: 'Jumbo Bag Red Retrospot',
          type: 'Storage • SKU-85099B',
          logo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=80&q=80',
          value: `$${Math.round(67300 * mult).toLocaleString()}`,
          allocation: '8.0%',
          return: '+8.3%',
          tone: 'positive' as const,
          day: '+2.1%',
          dayTone: 'positive' as const,
        },
      ],
    },
    insights: {
      title: 'Customer Intelligence Alerts',
      status: '3 Live Insights',
      items: [
        {
          icon: 'scale' as const,
          title: 'High-Value RFM Segment Spike',
          description:
            'K-Means clustering indicates "Champions" & "Loyal" segments grew by 18.2% after recent promotional outreach.',
          action: 'View Segments',
        },
        {
          icon: 'taxes' as const,
          title: 'Strong Market Basket Affinity Detected',
          description:
            'Apriori identified Lift factor 4.82 between Cake Stand and Tea Set purchases. Recommendation banner configured.',
          action: 'View Rules',
        },
        {
          icon: 'reload' as const,
          title: 'Predictive Revenue Convergence',
          description:
            'Multiple Linear Regression model retrained on 541,909 retail rows with R² score of 0.894 and low Mean Absolute Error.',
          action: 'Run Predictor',
        },
      ],
    },
  }
}

export const dashboardBottomByPeriod = {
  '7d': generateBottom(0.25),
  '30d': generateBottom(1.0),
  '90d': generateBottom(2.8),
  '1y': generateBottom(11.4),
  all: generateBottom(18.2),
}

function generateAnalytics(mult: number) {
  return {
    performance: {
      title: 'Comprehensive Revenue & Prediction Trajectory',
      subtitle: 'Predicted vs Actual Sales across omnichannel retail channels',
      trend: '+24.6% YoY',
      compareLabel: 'Export Data Warehouse Logs',
      legend: [
        { dataKey: 'portfolio', label: 'Actual Online Retail Volume', color: 'var(--chart-4)' },
        { dataKey: 'benchmark', label: 'Linear Regression Forecast', color: 'var(--chart-1)' },
        { dataKey: 'balanced', label: 'Conservative Target Base', color: 'var(--chart-2)' },
      ],
      data: [
        { label: 'Week 1', portfolio: 290, benchmark: 270, balanced: 250, axisLabel: 'Week 1' },
        { label: 'Week 2', portfolio: 380, benchmark: 340, balanced: 300, axisLabel: 'Week 2' },
        { label: 'Week 3', portfolio: 490, benchmark: 420, balanced: 370, axisLabel: 'Week 3' },
        { label: 'Week 4', portfolio: 640, benchmark: 530, balanced: 460, axisLabel: 'Week 4' },
      ],
    },
    metrics: [
      {
        id: 'clv',
        title: 'Avg Customer Lifetime Value (CLV)',
        value: `$${Math.round(1480 * mult)}`,
        description: 'Up 12.3% across high RFM clusters',
        color: 'var(--chart-4)',
        type: 'area' as const,
        data: [
          { label: '1', x: 0, y: 35 },
          { label: '2', x: 1, y: 28 },
          { label: '3', x: 2, y: 20 },
          { label: '4', x: 3, y: 12 },
          { label: '5', x: 4, y: 6 },
        ],
      },
      {
        id: 'retention',
        title: 'Customer Loyalty & Retention',
        value: '84.2%',
        description: 'Classification model accuracy: 89.1%',
        color: 'var(--chart-1)',
        type: 'bars' as const,
        data: [
          { label: 'M1', value: 16 },
          { label: 'M2', value: 20 },
          { label: 'M3', value: 24 },
          { label: 'M4', value: 28 },
        ],
      },
      {
        id: 'conversion',
        title: 'Cross-Sell Basket Conversion',
        value: '5.8%',
        description: 'Boosted by Apriori recommendation rules',
        color: 'var(--chart-2)',
        type: 'area' as const,
        data: [
          { label: '1', x: 0, y: 30 },
          { label: '2', x: 1, y: 25 },
          { label: '3', x: 2, y: 18 },
          { label: '4', x: 3, y: 12 },
          { label: '5', x: 4, y: 7 },
        ],
      },
    ],
    returns: {
      title: 'Quarterly Sales vs Budget Quota',
      subtitle: 'Star Schema Time Dimension aggregate performance',
      status: '+19.8% Outperformed',
      series: [
        { dataKey: 'currentYear', label: '2026 Actual ($K)', color: 'var(--chart-4)' },
        { dataKey: 'target', label: '2026 Quota ($K)', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Q1', currentYear: 180, target: 160 },
        { label: 'Q2', currentYear: 230, target: 200 },
        { label: 'Q3', currentYear: 290, target: 250 },
        { label: 'Q4', currentYear: 380, target: 310 },
      ],
    },
    income: {
      title: 'Omnichannel Channel Sales Mix',
      subtitle: 'Stacked revenue generated across web store, mobile app, and wholesale',
      status: '3 Channels Active',
      series: [
        { dataKey: 'online', label: 'Web Store', color: 'var(--chart-4)' },
        { dataKey: 'app', label: 'Mobile App', color: 'var(--chart-1)' },
        { dataKey: 'b2b', label: 'Wholesale B2B', color: 'var(--chart-2)' },
      ],
      data: [
        { label: 'Jul', online: 2.8, app: 1.4, b2b: 1.8 },
        { label: 'Aug', online: 3.2, app: 1.7, b2b: 2.0 },
        { label: 'Sep', online: 3.9, app: 2.1, b2b: 2.4 },
        { label: 'Oct', online: 4.8, app: 2.6, b2b: 2.9 },
      ],
    },
  }
}

export const analyticsDataByPeriod = {
  '7d': generateAnalytics(0.25),
  '30d': generateAnalytics(1.0),
  '90d': generateAnalytics(2.8),
  '1y': generateAnalytics(11.4),
  all: generateAnalytics(18.2),
}
