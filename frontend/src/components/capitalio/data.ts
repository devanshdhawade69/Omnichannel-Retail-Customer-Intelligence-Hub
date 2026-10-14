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
} from './icons'

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
      status: '4 ML Engines Active',
      items: [
        {
          icon: 'scale' as const,
          title: 'High-Value RFM Segment Spike',
          description:
            'K-Means clustering indicates "Champions" & "Loyal" segments grew by 18.2% after recent promotional outreach.',
          action: 'View Segments',
          modelTag: 'K-Means (k=3)',
          engineRoute: '/clustering',
          comparisonId: 'rfm-segmentation',
        },
        {
          icon: 'taxes' as const,
          title: 'Strong Market Basket Affinity Detected',
          description:
            'Apriori identified Lift factor 4.82 between Cake Stand and Tea Set purchases. Recommendation banner configured.',
          action: 'View Rules',
          modelTag: 'Apriori (Lift 4.82x)',
          engineRoute: '/association',
          comparisonId: 'basket-association',
        },
        {
          icon: 'reload' as const,
          title: 'Predictive Revenue Convergence',
          description:
            'Multiple Linear Regression model retrained on 541,909 retail rows with R² score of 0.894 and low Mean Absolute Error.',
          action: 'Run Predictor',
          modelTag: 'Multiple Linear Reg (R² 0.89)',
          engineRoute: '/regression',
          comparisonId: 'revenue-regression',
        },
        {
          icon: 'scale' as const,
          title: 'Loyalty Retention Classifier Precision',
          description:
            'Decision Tree achieved 94.6% accuracy predicting repeat buyers (> 2 purchases), preventing costly churn misclassifications.',
          action: 'View Classifier',
          modelTag: 'Decision Tree (94.6% Acc)',
          engineRoute: '/classification',
          comparisonId: 'loyalty-classification',
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

export type ModelComparisonItem = {
  id: string
  engine: string
  category: 'classification' | 'clustering' | 'regression' | 'association'
  route: string
  task: string
  status: string
  selectedModel: {
    name: string
    algorithmType: string
    badge: string
    metrics: { label: string; value: string; isHighlight?: boolean }[]
    strengths: string[]
  }
  alternativeModel: {
    name: string
    algorithmType: string
    badge: string
    metrics: { label: string; value: string }[]
    weaknesses: string[]
  }
  delta: string
  rationale: {
    theoretical: string
    operational: string
    business: string
  }
}

export const modelComparisons: ModelComparisonItem[] = [
  {
    id: 'loyalty-classification',
    engine: 'Customer Loyalty Classifier',
    category: 'classification',
    route: '/classification',
    task: 'Predict customer retention & return probability based on monetary spend and basket volume',
    status: 'Production Active',
    selectedModel: {
      name: 'Decision Tree Classifier',
      algorithmType: 'Non-Parametric Tree Partitioning',
      badge: 'Production Selected',
      metrics: [
        { label: 'Accuracy', value: '94.6%', isHighlight: true },
        { label: 'Precision', value: '95.8%', isHighlight: true },
        { label: 'Recall', value: '93.5%' },
        { label: 'F1 Score', value: '0.94', isHighlight: true },
      ],
      strengths: [
        'Handles highly collinear features (spend vs item volume) without independence assumptions',
        'Produces transparent, human-auditable boolean splits for automated store campaigns',
        'Zero false-positive VIP churn alarms on the 30% holdout test dataset',
      ],
    },
    alternativeModel: {
      name: 'Gaussian Naïve Bayes',
      algorithmType: 'Probabilistic Generative Classifier',
      badge: 'Evaluated Baseline',
      metrics: [
        { label: 'Accuracy', value: '82.4%' },
        { label: 'Precision', value: '83.1%' },
        { label: 'Recall', value: '79.2%' },
        { label: 'F1 Score', value: '0.81' },
      ],
      weaknesses: [
        'Fundamental violation of conditional independence assumption: P(spend, items | Y) ≠ P(spend|Y)·P(items|Y)',
        'Collinearity (r = 0.88) causes double-counting of volume evidence and deflates precision',
        'Continuous Gaussian assumption poorly models skewed heavy-tailed retail transaction distributions',
      ],
    },
    delta: '+12.2% Accuracy / +0.13 F1-Score',
    rationale: {
      theoretical:
        'Naïve Bayes mathematically presumes feature independence. In retail transaction records, total spend and item count exhibit high correlation (r > 0.88). Naïve Bayes double-counts evidence and fails on borderline customers. Decision Trees partition feature space orthogonally without distribution or covariance assumptions.',
      operational:
        'Decision Tree fits in <10ms on the Star Schema test slice and performs inference in sub-millisecond nested conditional branches, perfectly suited for the live /api/predict-loyalty endpoint.',
      business:
        'Store managers require interpretable business rules (e.g., Spend > $450 & Items > 12 -> Loyal Tier). Decision Tree leaf nodes directly translate to rule triggers in marketing automation software, whereas Naïve Bayes likelihood curves provide no tangible thresholds.',
    },
  },
  {
    id: 'rfm-segmentation',
    engine: 'Customer RFM Segmentation',
    category: 'clustering',
    route: '/clustering',
    task: 'Unsupervised segmentation into Champions, Loyal, and At-Risk tiers via Recency, Frequency, and Monetary metrics',
    status: 'Production Active',
    selectedModel: {
      name: 'K-Means Clustering (k=3)',
      algorithmType: 'Centroid-Based Partitioning',
      badge: 'Production Selected',
      metrics: [
        { label: 'Runtime', value: '0.12s', isHighlight: true },
        { label: 'Complexity', value: 'O(n·k·t)', isHighlight: true },
        { label: 'Silhouette', value: '0.68' },
        { label: 'Clusters', value: '3 Stable Tiers', isHighlight: true },
      ],
      strengths: [
        'Linear complexity scales effortlessly across 541,000+ transaction lines and 4,300+ customer profiles',
        'Generates distinct 3D RFM centroids that cleanly define business marketing tiers',
        'Guaranteed deterministic convergence with n_init=10 and fixed random seeds',
      ],
    },
    alternativeModel: {
      name: 'Hierarchical Agglomerative & DBSCAN',
      algorithmType: 'Hierarchical & Density-Based Clustering',
      badge: 'Evaluated Baselines',
      metrics: [
        { label: 'Complexity', value: 'O(n²)' },
        { label: 'Memory', value: 'OOM / Crash' },
        { label: 'Noise Points', value: '18.4% Unlabeled' },
        { label: 'Clusters', value: 'Arbitrary' },
      ],
      weaknesses: [
        'Hierarchical Agglomerative clustering suffers O(n²) memory bottleneck, crashing on the 500k-row warehouse dataset',
        'DBSCAN classifies moderate-spend retail customers as unassigned noise rather than actionable segments',
        'Varying density across RFM axes causes DBSCAN to merge disparate customer behavior profiles',
      ],
    },
    delta: 'Linear O(n) Scalability vs O(n²) Memory Crash',
    rationale: {
      theoretical:
        'K-Means partitions normalized 3D RFM vectors by minimizing within-cluster sum-of-squares (inertia). Hierarchical clustering requires calculating an n × n pairwise distance matrix (over 18 million pairs for customer keys), creating unacceptable quadratic memory consumption. DBSCAN struggles because RFM data naturally has varying density gradients.',
      operational:
        'K-Means executes in 0.12 seconds on the central sales fact table. It is integrated cleanly into the automated ETL pipeline without requiring distributed cluster computing or dedicated GPU instances.',
      business:
        'Marketing strategies require discrete, deterministic customer tiers (Cluster 1: Champions, Cluster 2: At-Risk, Cluster 3: Occasional). K-Means outputs exact centroid coordinates (e.g. $1,840 spend, 14-day recency) that marketing teams use directly to budget targeted discount promotions.',
    },
  },
  {
    id: 'revenue-regression',
    engine: 'Revenue Predictor Engine',
    category: 'regression',
    route: '/regression',
    task: 'Forecast periodic gross sales receipts from seasonal time indicators and aggregate item order volume',
    status: 'Production Active',
    selectedModel: {
      name: 'Multiple Linear Regression (MLR)',
      algorithmType: 'Multivariate Parametric Regression',
      badge: 'Production Selected',
      metrics: [
        { label: 'R² Score', value: '0.894 (89.4%)', isHighlight: true },
        { label: 'Inference', value: '< 1ms', isHighlight: true },
        { label: 'MAE', value: '$1,240' },
        { label: 'Interpretability', value: '100% Auditable', isHighlight: true },
      ],
      strengths: [
        'Explains 89.4% of total revenue variance across quarterly timeframes',
        'Model weights directly translate into marginal revenue elasticity per unit sold',
        'Zero risk of runaway polynomial divergence or memorizing seasonal noise',
      ],
    },
    alternativeModel: {
      name: 'Polynomial & Random Forest Regressor',
      algorithmType: 'Non-Linear & Ensemble Regressors',
      badge: 'Evaluated Baselines',
      metrics: [
        { label: 'R² (Train)', value: '0.942' },
        { label: 'R² (Test)', value: '0.781' },
        { label: 'Inference', value: '~45ms' },
        { label: 'Overfit Gap', value: '16.1%' },
      ],
      weaknesses: [
        'Higher-degree polynomial terms oscillate wildly outside historical training intervals (Runge phenomenon)',
        'Random Forest Regressors produce piecewise step functions that fail to extrapolate ongoing seasonal retail trends',
        'Ensemble black-box structure prevents auditing revenue impact for CFO balance sheet reporting',
      ],
    },
    delta: '+11.3% Generalization R² on Unseen Test Quarters',
    rationale: {
      theoretical:
        'At macro warehouse aggregation levels, transaction revenue scales linearly with order quantity and quarterly seasonality indices. Multiple Linear Regression maintains optimal bias-variance tradeoff without capturing supplier fulfillment anomalies.',
      operational:
        'Inference is a single vectorized dot product (y = W·X + b) executing in sub-1ms. Predictions render synchronously on frontend chart interactions without API timeouts or heavy compute load.',
      business:
        'Executive retail stakeholders demand financial auditability. MLR coefficients provide explicit economic meaning: each +1,000 unit inventory increase drives +$18,420 expected gross revenue, enabling clear inventory budget allocation.',
    },
  },
  {
    id: 'basket-association',
    engine: 'Market Basket Analysis',
    category: 'association',
    route: '/association',
    task: 'Uncover cross-selling product affinities and frequent item combinations from customer checkout baskets',
    status: 'Production Active',
    selectedModel: {
      name: 'Apriori Association Mining',
      algorithmType: 'Level-Wise Downward Closure Mining',
      badge: 'Production Selected',
      metrics: [
        { label: 'Top Lift', value: '4.82x', isHighlight: true },
        { label: 'Min Support', value: '3.0%', isHighlight: true },
        { label: 'Min Confidence', value: '15.0%' },
        { label: 'Affinity Pairs', value: '20 Strong Rules', isHighlight: true },
      ],
      strengths: [
        'Downward-closure property systematically filters millions of candidate pairs before rule formation',
        'Pinpoints high-lift cross-sell combinations (e.g. Cake Stand -> Tea Set, 4.82x Lift)',
        'Transparent multi-metric ranking (Support, Confidence, Lift) for auditable merchandising',
      ],
    },
    alternativeModel: {
      name: 'Brute-Force Pair Co-Occurrence',
      algorithmType: 'Exhaustive Combinatorial Search',
      badge: 'Evaluated Baseline',
      metrics: [
        { label: 'Candidate Sets', value: '2^N (Millions)' },
        { label: 'Spurious Rules', value: '74.2%' },
        { label: 'Memory', value: 'Unbounded' },
        { label: 'Lift Thresholding', value: 'None' },
      ],
      weaknesses: [
        'Evaluating 2^N combinations across 4,000+ retail catalog items leads to severe memory exhaustion',
        'Co-occurrence without Lift ranking highlights pairs simply because both items are universally popular',
        'Lacks support pruning, generating thousands of spurious, low-probability noise associations',
      ],
    },
    delta: '4.82x Lift Filtered / Downward-Closure Optimization',
    rationale: {
      theoretical:
        'Apriori leverages the downward-closure principle: all subsets of a frequent itemset must also be frequent. If an individual SKU has <3% support, all pairs containing it are pruned immediately, shrinking the search space exponentially.',
      operational:
        'Executing on a 50,000 transaction subset with min_support=0.03 completes in under 2.5 seconds in Python mlxtend, fitting comfortably within web server memory limits.',
      business:
        'The Lift metric (>1.0) isolates true statistical affinity from incidental co-purchases. When a customer adds a Cake Stand, displaying the 4.82x Lift Tea Set directly increases average basket order value by 14.8%.',
    },
  },
]

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

// ─── Net Worth / Gross Revenue & Valuation Data ───────────────────────────────

function generateNetWorth(mult: number) {
  return {
    summaryCards: [
      {
        id: 'gross-revenue' as const,
        title: 'Gross Revenue',
        value: `$${Math.round(1284500 * mult).toLocaleString()}`,
        icon: 'wallet' as const,
        color: '#10b981',
        change: { value: '+18.6%', label: 'vs previous period', tone: 'positive' as const },
      },
      {
        id: 'net-revenue' as const,
        title: 'Net Revenue',
        value: `$${Math.round(1089825 * mult).toLocaleString()}`,
        icon: 'trend' as const,
        color: '#3b82f6',
        change: { value: '+15.2%', label: 'after returns & discounts', tone: 'positive' as const },
      },
      {
        id: 'valuation' as const,
        title: 'Estimated Valuation',
        value: `$${(6.42 * mult).toFixed(1)}M`,
        icon: 'shield' as const,
        color: '#8b5cf6',
        change: { value: '+22.4%', label: 'based on 5x revenue multiple', tone: 'positive' as const },
      },
      {
        id: 'gross-margin' as const,
        title: 'Gross Margin',
        value: '64.8%',
        icon: 'pie' as const,
        color: '#f59e0b',
        change: { value: '+3.1 pts', label: 'margin improvement', tone: 'positive' as const },
      },
    ],
    revenueTrend: {
      title: 'Gross Revenue Trajectory',
      subtitle: 'Monthly revenue performance with growth trend line',
      trend: `+18.6% ${mult >= 11 ? 'YoY' : 'Period'}`,
      legend: [
        { dataKey: 'revenue', label: 'Gross Revenue ($K)', color: 'var(--chart-4)' },
        { dataKey: 'cogs', label: 'Cost of Goods Sold ($K)', color: 'var(--chart-1)' },
        { dataKey: 'netRevenue', label: 'Net Revenue ($K)', color: 'var(--chart-2)' },
      ],
      data: [
        { label: 'Month 1', revenue: Math.round(280 * mult), cogs: Math.round(98 * mult), netRevenue: Math.round(238 * mult), axisLabel: 'M1' },
        { label: 'Month 2', revenue: Math.round(320 * mult), cogs: Math.round(108 * mult), netRevenue: Math.round(272 * mult), axisLabel: 'M2' },
        { label: 'Month 3', revenue: Math.round(390 * mult), cogs: Math.round(132 * mult), netRevenue: Math.round(331 * mult), axisLabel: 'M3' },
        { label: 'Month 4', revenue: Math.round(460 * mult), cogs: Math.round(155 * mult), netRevenue: Math.round(391 * mult), axisLabel: 'M4' },
        { label: 'Month 5', revenue: Math.round(520 * mult), cogs: Math.round(172 * mult), netRevenue: Math.round(442 * mult), axisLabel: 'M5' },
        { label: 'Month 6', revenue: Math.round(610 * mult), cogs: Math.round(198 * mult), netRevenue: Math.round(518 * mult), axisLabel: 'M6' },
      ],
    },
    valuationBreakdown: {
      title: 'Valuation Composition',
      status: 'DCF Model Active',
      centerValue: `$${(6.42 * mult).toFixed(1)}M`,
      centerLabel: 'Total Valuation',
      items: [
        { label: 'Revenue Multiple (5x)', value: `$${(3.85 * mult).toFixed(1)}M`, percent: 60, color: '#3b82f6' },
        { label: 'Brand & Goodwill', value: `$${(1.28 * mult).toFixed(1)}M`, percent: 20, color: '#10b981' },
        { label: 'Customer Base Asset', value: `$${(0.77 * mult).toFixed(1)}M`, percent: 12, color: '#8b5cf6' },
        { label: 'Inventory & IP', value: `$${(0.52 * mult).toFixed(1)}M`, percent: 8, color: '#f59e0b' },
      ],
    },
    marginWaterfall: {
      title: 'Revenue-to-Profit Waterfall',
      subtitle: 'Breakdown from gross revenue to net operating income',
      status: `$${Math.round(321 * mult)}K Net`,
      series: [
        { dataKey: 'value', label: 'Amount ($K)', color: 'var(--chart-4)' },
      ],
      data: [
        { label: 'Gross Revenue', value: Math.round(1284 * mult), color: '#10b981' },
        { label: 'Returns & Refunds', value: -Math.round(128 * mult), color: '#ef4444' },
        { label: 'Discounts', value: -Math.round(67 * mult), color: '#f59e0b' },
        { label: 'Net Revenue', value: Math.round(1089 * mult), color: '#3b82f6' },
        { label: 'COGS', value: -Math.round(383 * mult), color: '#ef4444' },
        { label: 'Gross Profit', value: Math.round(706 * mult), color: '#8b5cf6' },
        { label: 'Operating Costs', value: -Math.round(385 * mult), color: '#f59e0b' },
        { label: 'Net Income', value: Math.round(321 * mult), color: '#10b981' },
      ],
    },
    revenueByCategoryTable: {
      title: 'Revenue by Product Category',
      actionLabel: 'Export Report',
      columns: ['#', 'Category', 'Revenue', 'Share', 'Growth', 'Margin'],
      rows: [
        {
          no: '01',
          category: 'Electronics & Audio',
          subcategory: '1,842 SKUs Active',
          logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=80&q=80',
          revenue: `$${Math.round(462800 * mult).toLocaleString()}`,
          share: '36.0%',
          growth: '+24.1%',
          growthTone: 'positive' as const,
          margin: '58.2%',
          marginTone: 'positive' as const,
        },
        {
          no: '02',
          category: 'Home & Kitchen',
          subcategory: '1,256 SKUs Active',
          logo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=80&q=80',
          revenue: `$${Math.round(347400 * mult).toLocaleString()}`,
          share: '27.0%',
          growth: '+18.7%',
          growthTone: 'positive' as const,
          margin: '71.4%',
          marginTone: 'positive' as const,
        },
        {
          no: '03',
          category: 'Fashion & Apparel',
          subcategory: '924 SKUs Active',
          logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=80&q=80',
          revenue: `$${Math.round(231200 * mult).toLocaleString()}`,
          share: '18.0%',
          growth: '+12.3%',
          growthTone: 'positive' as const,
          margin: '68.9%',
          marginTone: 'positive' as const,
        },
        {
          no: '04',
          category: 'Beauty & Lifestyle',
          subcategory: '682 SKUs Active',
          logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=80&q=80',
          revenue: `$${Math.round(154100 * mult).toLocaleString()}`,
          share: '12.0%',
          growth: '+9.8%',
          growthTone: 'positive' as const,
          margin: '62.1%',
          marginTone: 'positive' as const,
        },
        {
          no: '05',
          category: 'Sports & Outdoor',
          subcategory: '418 SKUs Active',
          logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=80&q=80',
          revenue: `$${Math.round(89000 * mult).toLocaleString()}`,
          share: '7.0%',
          growth: '+6.4%',
          growthTone: 'positive' as const,
          margin: '55.3%',
          marginTone: 'positive' as const,
        },
      ],
    },
    valuationGrowth: {
      title: 'Valuation Growth Over Time',
      subtitle: 'Estimated enterprise value trend by quarter',
      status: '+22.4% Growth',
      series: [
        { dataKey: 'valuation', label: 'Valuation ($M)', color: 'var(--chart-4)' },
        { dataKey: 'revenueBased', label: 'Revenue-Based ($M)', color: 'var(--chart-1)' },
      ],
      data: [
        { label: 'Q1', valuation: +(3.8 * mult).toFixed(1), revenueBased: +(3.2 * mult).toFixed(1) },
        { label: 'Q2', valuation: +(4.4 * mult).toFixed(1), revenueBased: +(3.8 * mult).toFixed(1) },
        { label: 'Q3', valuation: +(5.2 * mult).toFixed(1), revenueBased: +(4.5 * mult).toFixed(1) },
        { label: 'Q4', valuation: +(6.4 * mult).toFixed(1), revenueBased: +(5.6 * mult).toFixed(1) },
      ],
    },
    kpiMetrics: [
      {
        id: 'arpu',
        title: 'Revenue Per Customer (ARPU)',
        value: `$${Math.round(248 * mult)}`,
        description: 'Up 11.2% with cross-sell recommendations',
        color: 'var(--chart-4)',
        type: 'area' as const,
        data: [
          { label: '1', x: 0, y: 32 },
          { label: '2', x: 1, y: 26 },
          { label: '3', x: 2, y: 18 },
          { label: '4', x: 3, y: 10 },
          { label: '5', x: 4, y: 5 },
        ],
      },
      {
        id: 'cac',
        title: 'Customer Acquisition Cost',
        value: `$${Math.round(34 * (mult > 1 ? 0.92 : 1.05))}`,
        description: 'Decreasing with organic growth channels',
        color: 'var(--chart-1)',
        type: 'bars' as const,
        data: [
          { label: 'M1', value: 22 },
          { label: 'M2', value: 18 },
          { label: 'M3', value: 14 },
          { label: 'M4', value: 10 },
        ],
      },
      {
        id: 'ltv-cac',
        title: 'LTV:CAC Ratio',
        value: `${(4.2 * (mult > 1 ? 1.08 : 0.95)).toFixed(1)}x`,
        description: 'Healthy unit economics above 3x threshold',
        color: 'var(--chart-2)',
        type: 'area' as const,
        data: [
          { label: '1', x: 0, y: 28 },
          { label: '2', x: 1, y: 22 },
          { label: '3', x: 2, y: 16 },
          { label: '4', x: 3, y: 10 },
          { label: '5', x: 4, y: 6 },
        ],
      },
    ],
  }
}

export const netWorthDataByPeriod = {
  '7d': generateNetWorth(0.25),
  '30d': generateNetWorth(1.0),
  '90d': generateNetWorth(2.8),
  '1y': generateNetWorth(11.4),
  all: generateNetWorth(18.2),
}
