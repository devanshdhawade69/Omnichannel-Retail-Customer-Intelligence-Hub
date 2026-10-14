import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { netWorthDataByPeriod, type PeriodValue } from './data'
import { Button } from '@/components/ui/button'
import {
  DashboardAnalyticsUpIcon,
  DashboardArrowUpIcon,
  DashboardArrowUpRightIcon,
  DashboardMoneyBagIcon,
  DashboardPieChartIcon,
  DashboardShieldIcon,
} from './icons'
import {
  ChartMarker,
  DashboardCard,
  DashboardChartTooltip,
  DetailHeader,
  DetailTag,
  toneColor,
  useDashboardPeriod,
} from './shared'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type NetWorthByPeriod = typeof netWorthDataByPeriod
type NetWorthData = NetWorthByPeriod[PeriodValue]
type SummaryCardData = NetWorthData['summaryCards'][number]
type KpiMetric = NetWorthData['kpiMetrics'][number]
type CategoryRow = NetWorthData['revenueByCategoryTable']['rows'][number]

// ─── Summary Cards ────────────────────────────────────────────────────────────

const cardIcons = {
  wallet: DashboardMoneyBagIcon,
  trend: DashboardAnalyticsUpIcon,
  shield: DashboardShieldIcon,
  pie: DashboardPieChartIcon,
} as const

function SummaryCard({ card }: { card: SummaryCardData }) {
  const Icon = cardIcons[card.icon]

  return (
    <DashboardCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="truncate text-base font-normal leading-6">{card.title}</h2>
        <div className="dashboard-icon-badge flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg p-2 text-white shadow-none">
          <Icon className="size-5 shrink-0" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold leading-none tracking-normal">
          {card.value}
        </div>
        <div className="flex min-w-0 items-center gap-1 pb-0.5 text-xs leading-tight text-muted-foreground">
          <DashboardArrowUpIcon className="h-2.5 w-1.5 shrink-0" />
          <span
            className="shrink-0 font-medium"
            style={{ color: 'var(--chart-4)' }}
          >
            {card.change.value}
          </span>
          <span className="truncate">{card.change.label}</span>
        </div>
      </div>

      {/* Mini sparkline bar */}
      <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: `color-mix(in oklab, ${card.color} 15%, transparent)` }}>
        <div
          className="dashboard-progress-fill h-full rounded-full"
          style={{
            backgroundColor: card.color,
            width: card.id === 'gross-margin' ? '64.8%' : '78%',
          }}
        />
      </div>
    </DashboardCard>
  )
}

// ─── Revenue Trend Chart ──────────────────────────────────────────────────────

function RevenueTrendChart({ revenueTrend }: { revenueTrend: NetWorthData['revenueTrend'] }) {
  const chartData = revenueTrend.data.map((point) => ({
    label: point.label,
    revenue: point.revenue,
    cogs: point.cogs,
    netRevenue: point.netRevenue,
  }))
  const axisLabels = revenueTrend.data
    .filter((p) => p.axisLabel)
    .map((p) => p.axisLabel)

  const seriesColors = Object.fromEntries(revenueTrend.legend.map((l) => [l.dataKey, l.color]))
  const seriesNames = Object.fromEntries(revenueTrend.legend.map((l) => [l.dataKey, l.label]))

  return (
    <DashboardCard className="flex flex-col gap-5 xl:col-span-2">
      <DetailHeader title={revenueTrend.title} subtitle={revenueTrend.subtitle}>
        <DetailTag color="var(--chart-4)">{revenueTrend.trend}</DetailTag>
        <Button type="button" variant="secondary" size="sm">
          <span className="truncate">View Breakdown</span>
          <DashboardArrowUpRightIcon className="size-4 shrink-0" />
        </Button>
      </DetailHeader>

      <div className="dashboard-dot-grid h-80 min-w-0 overflow-hidden rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="nw-revenue-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-4)" stopOpacity="0.42" />
                <stop offset="100%" stopColor="var(--chart-4)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="nw-net-revenue-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis
              axisLine={false}
              dataKey="label"
              tick={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
              tickFormatter={(value) => `${value}K`}
              tickLine={false}
              width={48}
            />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  colors={seriesColors}
                  names={seriesNames}
                  valueFormatter={(value) => `$${value}K`}
                />
              }
            />
            <Area
              dataKey="revenue"
              dot={false}
              fill="url(#nw-revenue-fill)"
              isAnimationActive
              stroke="var(--chart-4)"
              strokeWidth={3}
              type="monotone"
            />
            <Area
              dataKey="netRevenue"
              dot={false}
              fill="url(#nw-net-revenue-fill)"
              isAnimationActive
              stroke="var(--chart-2)"
              strokeWidth={2}
              type="monotone"
            />
            <Area
              dataKey="cogs"
              dot={false}
              fill="transparent"
              isAnimationActive
              stroke="var(--chart-1)"
              strokeDasharray="8 8"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid min-w-0 grid-cols-6 pl-12 text-center text-xs text-muted-foreground">
        {axisLabels.map((label) => (
          <span key={label} className="truncate">{label}</span>
        ))}
      </div>

      <div className="flex min-w-0 flex-wrap items-center justify-center gap-5">
        {revenueTrend.legend.map((item) => (
          <div key={item.label} className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
            <ChartMarker color={item.color} className="size-2.5" />
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

// ─── Valuation Breakdown Donut ────────────────────────────────────────────────

function ValuationDonut({ breakdown }: { breakdown: NetWorthData['valuationBreakdown'] }) {
  const chartData = breakdown.items.map((item) => ({
    name: item.label,
    value: item.percent,
    fill: item.color,
  }))

  return (
    <DashboardCard className="flex flex-col gap-6">
      <DetailHeader title={breakdown.title}>
        <DetailTag>{breakdown.status}</DetailTag>
      </DetailHeader>

      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="relative mx-auto aspect-square w-full max-w-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                cornerRadius={4}
                data={chartData}
                dataKey="value"
                endAngle={-270}
                innerRadius="68%"
                isAnimationActive
                outerRadius="88%"
                paddingAngle={6}
                startAngle={90}
                stroke="none"
              />
              <RechartsTooltip
                wrapperStyle={{ zIndex: 20 }}
                cursor={false}
                content={
                  <DashboardChartTooltip
                    valueFormatter={(value) => `${value}%`}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-semibold leading-none">{breakdown.centerValue}</div>
            <div className="mt-2 text-base text-muted-foreground">{breakdown.centerLabel}</div>
          </div>
        </div>

        <div className="space-y-5">
          {breakdown.items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <ChartMarker color={item.color} className="size-4" />
                <span className="truncate text-base font-medium text-foreground/80">{item.label}</span>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-base font-medium text-foreground/80">{item.value}</span>
                <span className="min-w-10 text-right text-base text-muted-foreground">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

// ─── Revenue-to-Profit Waterfall ──────────────────────────────────────────────

function WaterfallChart({ waterfall }: { waterfall: NetWorthData['marginWaterfall'] }) {
  const chartData = waterfall.data.map((item) => ({
    name: item.label,
    value: Math.abs(item.value),
    fill: item.color,
    rawValue: item.value,
  }))

  return (
    <DashboardCard className="flex flex-col gap-5 xl:col-span-2">
      <DetailHeader title={waterfall.title} subtitle={waterfall.subtitle}>
        <DetailTag color="var(--chart-4)">{waterfall.status}</DetailTag>
      </DetailHeader>

      <div className="dashboard-dot-grid min-h-64 flex-1 overflow-hidden rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.65rem' }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
              tickFormatter={(value) => `$${value}K`}
              tickLine={false}
              width={56}
            />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  valueFormatter={(value, dataKey) => {
                    const item = chartData.find((d) => d.name === dataKey || d.value === value)
                    const raw = item?.rawValue ?? value
                    return `$${raw}K`
                  }}
                />
              }
            />
            <Bar dataKey="value" isAnimationActive radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}

// ─── KPI Metric Cards ─────────────────────────────────────────────────────────

function KpiMetricChart({ metric }: { metric: KpiMetric }) {
  if (metric.type === 'bars') {
    const chartData = metric.data.map((point) => ({
      label: point.label,
      value: point.value,
    }))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis dataKey="label" hide />
          <YAxis hide domain={[0, 28]} />
          <RechartsTooltip
            cursor={false}
            content={
              <DashboardChartTooltip
                colors={{ value: metric.color }}
                names={{ value: metric.title }}
              />
            }
          />
          <Bar
            activeBar={{ fill: `color-mix(in oklab, ${metric.color} 78%, var(--foreground))` }}
            dataKey="value"
            fill={metric.color}
            isAnimationActive
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const chartData = metric.data.map((point) => ({
    label: point.label,
    x: point.x,
    value: 44 - point.y,
  }))
  const xDomain = [chartData[0]?.x ?? 0, chartData[chartData.length - 1]?.x ?? 0]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`nw-kpi-${metric.id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={metric.color} stopOpacity="0.42" />
            <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" type="number" hide domain={xDomain} />
        <YAxis hide domain={[0, 44]} />
        <RechartsTooltip
          cursor={false}
          content={
            <DashboardChartTooltip
              colors={{ value: metric.color }}
              names={{ value: metric.title }}
            />
          }
        />
        <Area
          dataKey="value"
          dot={false}
          fill={`url(#nw-kpi-${metric.id}-fill)`}
          isAnimationActive
          stroke={metric.color}
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function KpiMetricCard({ metric }: { metric: KpiMetric }) {
  return (
    <DashboardCard className="flex min-h-40 flex-col gap-5">
      <div>
        <h2 className="truncate text-base font-medium leading-6">{metric.title}</h2>
        <div className="mt-4 text-3xl font-semibold leading-none">{metric.value}</div>
        <div className="mt-1 truncate text-xs text-muted-foreground">{metric.description}</div>
      </div>
      <div className="min-h-16 flex-1">
        <KpiMetricChart metric={metric} />
      </div>
    </DashboardCard>
  )
}

// ─── Revenue by Category Table ────────────────────────────────────────────────

function CategoryAsset({ row }: { row: CategoryRow }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface/50 border border-border">
        <img src={row.logo} alt="" className="size-full object-cover" />
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium leading-none">{row.category}</div>
        <div className="mt-1 text-xs leading-none text-muted-foreground">{row.subcategory}</div>
      </div>
    </div>
  )
}

function RevenueCategoryTable({ table }: { table: NetWorthData['revenueByCategoryTable'] }) {
  return (
    <DashboardCard className="flex flex-col gap-4 lg:col-span-2">
      <DetailHeader title={table.title}>
        <Button type="button" variant="secondary" size="sm">
          <span className="truncate">{table.actionLabel}</span>
          <DashboardArrowUpRightIcon className="size-4 shrink-0" />
        </Button>
      </DetailHeader>

      {/* Desktop Table */}
      <div className="hidden min-w-0 md:block">
        <div className="grid grid-cols-12 items-center rounded-lg border border-border bg-foreground/5 px-4 py-3 text-sm font-medium text-foreground/80">
          <div className="col-span-1">{table.columns[0]}</div>
          <div className="col-span-4">{table.columns[1]}</div>
          <div className="col-span-2">{table.columns[2]}</div>
          <div className="col-span-2">{table.columns[3]}</div>
          <div className="col-span-2">{table.columns[4]}</div>
          <div className="col-span-1">{table.columns[5]}</div>
        </div>

        <div>
          {table.rows.map((row) => (
            <div
              key={row.no}
              className="grid grid-cols-12 items-center border-b border-border px-4 py-3 last:border-b-0 hover:bg-surface/30 transition-colors"
            >
              <div className="col-span-1 text-sm text-muted-foreground">{row.no}</div>
              <div className="col-span-4 min-w-0">
                <CategoryAsset row={row} />
              </div>
              <div className="col-span-2 text-sm font-medium">{row.revenue}</div>
              <div className="col-span-2 text-sm">{row.share}</div>
              <div className="col-span-2 text-sm font-medium" style={{ color: toneColor(row.growthTone) }}>
                {row.growth}
              </div>
              <div className="col-span-1 text-sm" style={{ color: toneColor(row.marginTone) }}>
                {row.margin}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {table.rows.map((row) => (
          <div key={row.no} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <CategoryAsset row={row} />
              <span className="text-sm text-muted-foreground">{row.no}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Revenue</div>
                <div className="font-medium">{row.revenue}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Share</div>
                <div>{row.share}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Growth</div>
                <div style={{ color: toneColor(row.growthTone) }}>{row.growth}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Margin</div>
                <div style={{ color: toneColor(row.marginTone) }}>{row.margin}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

// ─── Valuation Growth Chart ───────────────────────────────────────────────────

function ValuationGrowthChart({ growth }: { growth: NetWorthData['valuationGrowth'] }) {
  const chartData = growth.data.map((row) => ({ ...row }))
  const seriesColorsMap = Object.fromEntries(growth.series.map((s) => [s.dataKey, s.color]))
  const seriesNamesMap = Object.fromEntries(growth.series.map((s) => [s.dataKey, s.label]))

  return (
    <DashboardCard className="flex min-h-80 flex-col gap-5">
      <DetailHeader title={growth.title} subtitle={growth.subtitle}>
        <DetailTag color="var(--chart-4)">{growth.status}</DetailTag>
      </DetailHeader>

      <div className="flex min-w-0 flex-wrap items-center justify-center gap-5">
        {growth.series.map((item) => (
          <div key={item.label} className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
            <ChartMarker color={item.color} className="size-2.5" />
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="min-h-56 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              axisLine={false}
              dataKey="label"
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: '0.75rem' }}
              tickFormatter={(value) => `$${value}M`}
              tickLine={false}
              width={48}
            />
            <RechartsTooltip
              cursor={false}
              content={
                <DashboardChartTooltip
                  colors={seriesColorsMap}
                  names={seriesNamesMap}
                  valueFormatter={(value) => `$${value}M`}
                />
              }
            />
            {growth.series.map((item) => (
              <Bar
                activeBar={{ fill: `color-mix(in oklab, ${item.color} 78%, var(--foreground))` }}
                key={item.dataKey}
                dataKey={item.dataKey}
                fill={item.color}
                isAnimationActive
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}

// ─── Page Export ───────────────────────────────────────────────────────────────

export function NetWorthPage() {
  const period = useDashboardPeriod()
  const data = netWorthDataByPeriod[period]

  return (
    <section className="flex min-h-full flex-col gap-4 p-4 pb-8 md:p-8">
      {/* Summary Cards Row */}
      <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {data.summaryCards.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}
      </div>

      {/* Revenue Trend + Valuation Donut */}
      <div className="grid min-w-0 gap-3 xl:grid-cols-3">
        <RevenueTrendChart revenueTrend={data.revenueTrend} />
        <ValuationDonut breakdown={data.valuationBreakdown} />
      </div>

      {/* KPI Metric Cards */}
      <div className="grid min-w-0 gap-3 lg:grid-cols-3">
        {data.kpiMetrics.map((metric) => (
          <KpiMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Waterfall + Valuation Growth */}
      <div className="grid min-w-0 gap-3 xl:grid-cols-2">
        <WaterfallChart waterfall={data.marginWaterfall} />
        <ValuationGrowthChart growth={data.valuationGrowth} />
      </div>

      {/* Revenue by Category Table */}
      <div className="grid min-w-0 gap-3 lg:grid-cols-3">
        <RevenueCategoryTable table={data.revenueByCategoryTable} />
        {/* Valuation Summary Sidebar */}
        <DashboardCard className="flex flex-col gap-6">
          <DetailHeader title="Valuation Highlights">
            <DetailTag color="var(--chart-4)">Live</DetailTag>
          </DetailHeader>

          <div className="flex flex-col gap-6">
            {[
              {
                title: 'Revenue Growth Rate',
                value: '+18.6% YoY',
                description: 'Consistent upward trajectory driven by Electronics & Home categories outperforming targets.',
                action: 'View Trend',
              },
              {
                title: 'Margin Expansion Signal',
                value: '+3.1 pts',
                description: 'Gross margin improved from 61.7% to 64.8% via supplier negotiation and reduced return rates.',
                action: 'Margin Analysis',
              },
              {
                title: 'Enterprise Value Multiple',
                value: '5.0x Revenue',
                description: 'Current multiple reflects strong unit economics (LTV:CAC > 4x) and healthy retention rates.',
                action: 'DCF Model',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={cn('flex flex-col gap-2', index > 0 && 'border-t border-border pt-6')}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium leading-tight">{item.title}</div>
                  <span
                    className="shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold"
                    style={{
                      color: 'var(--chart-4)',
                      backgroundColor: 'color-mix(in oklab, var(--chart-4) 12%, transparent)',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
                <div className="text-sm leading-snug text-muted-foreground">
                  {item.description}
                </div>
                <div className="mt-1 flex justify-end">
                  <Button type="button" variant="secondary" size="sm">
                    <span className="truncate">{item.action}</span>
                    <DashboardArrowUpRightIcon className="size-4 shrink-0" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </section>
  )
}
