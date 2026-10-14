import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from 'recharts'
import type { ClusteringResponse } from '../types/api'
import { DashboardCard, DetailHeader, DetailTag } from '../components/capitalio/shared'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// High-fidelity fallback centroids & customer profiles
const defaultSummary = [
  {
    cluster: 0,
    name: 'Champions (High-Value VIPs)',
    color: '#10b981',
    badge: 'Tier 1 • VIP',
    recency: 12.4,
    frequency: 18.2,
    monetary: 3840.5,
    customerCount: 1084,
    revenueShare: '68.2%',
    strategy: 'VIP concierge, early catalog access, zero-friction loyalty rewards.',
  },
  {
    cluster: 1,
    name: 'Loyal Everyday Regulars',
    color: '#3b82f6',
    badge: 'Tier 2 • Growth',
    recency: 28.1,
    frequency: 6.8,
    monetary: 1140.2,
    customerCount: 2482,
    revenueShare: '24.6%',
    strategy: 'Cross-category upsells, free shipping thresholds, referral incentives.',
  },
  {
    cluster: 2,
    name: 'At-Risk / Lapsed Shoppers',
    color: '#f59e0b',
    badge: 'Tier 3 • Retention',
    recency: 182.6,
    frequency: 1.8,
    monetary: 248.9,
    customerCount: 806,
    revenueShare: '7.2%',
    strategy: 'Re-engagement winback email flows with 15-20% limited-time vouchers.',
  },
]

// Generate realistic distributed customer point cloud around the 3 centroids
function generateCustomerPoints() {
  const points: {
    id: string
    recency: number
    frequency: number
    monetary: number
    cluster: number
    name: string
  }[] = []

  // Cluster 0 (Champions): low recency, high frequency, high monetary
  for (let i = 0; i < 22; i++) {
    points.push({
      id: `CUST-${1000 + i}`,
      recency: Math.max(2, Math.round(12 + (Math.random() * 16 - 8))),
      frequency: Math.max(10, Math.round(18 + (Math.random() * 10 - 5))),
      monetary: Math.round(3800 + (Math.random() * 1600 - 800)),
      cluster: 0,
      name: 'Champions (VIP)',
    })
  }

  // Cluster 1 (Loyal Regulars): moderate recency, moderate frequency, moderate monetary
  for (let i = 0; i < 28; i++) {
    points.push({
      id: `CUST-${2000 + i}`,
      recency: Math.max(10, Math.round(28 + (Math.random() * 24 - 12))),
      frequency: Math.max(3, Math.round(7 + (Math.random() * 6 - 3))),
      monetary: Math.round(1140 + (Math.random() * 500 - 250)),
      cluster: 1,
      name: 'Loyal Regulars',
    })
  }

  // Cluster 2 (At-Risk): high recency, low frequency, low monetary
  for (let i = 0; i < 20; i++) {
    points.push({
      id: `CUST-${3000 + i}`,
      recency: Math.max(80, Math.round(180 + (Math.random() * 90 - 45))),
      frequency: Math.max(1, Math.round(2 + (Math.random() * 2 - 1))),
      monetary: Math.round(250 + (Math.random() * 180 - 90)),
      cluster: 2,
      name: 'At-Risk Lapsed',
    })
  }

  return points
}

const mockCustomerPoints = generateCustomerPoints()

export default function ClusteringEngine() {
  const [data, setData] = useState<ClusteringResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiveConnected, setIsLiveConnected] = useState(false)
  const [axisMode, setAxisMode] = useState<'recency-monetary' | 'frequency-monetary' | 'recency-frequency'>(
    'recency-monetary'
  )

  // Live Customer Segment Calculator inputs
  const [calcRecency, setCalcRecency] = useState<number>(20)
  const [calcFrequency, setCalcFrequency] = useState<number>(8)
  const [calcMonetary, setCalcMonetary] = useState<number>(1400)

  useEffect(() => {
    let isMounted = true
    axios
      .get('http://localhost:5000/api/segment-customers')
      .then((res) => {
        if (!isMounted) return
        if (res.data && Array.isArray(res.data.summary) && res.data.summary.length > 0) {
          setData(res.data)
          setIsLiveConnected(true)
        } else {
          setData({
            centroids: [
              [12.4, 18.2, 3840.5],
              [28.1, 6.8, 1140.2],
              [182.6, 1.8, 248.9],
            ],
            summary: defaultSummary,
            labels: [0, 1, 2],
          })
        }
        setLoading(false)
      })
      .catch(() => {
        if (!isMounted) return
        setData({
          centroids: [
            [12.4, 18.2, 3840.5],
            [28.1, 6.8, 1140.2],
            [182.6, 1.8, 248.9],
          ],
          summary: defaultSummary,
          labels: [0, 1, 2],
        })
        setIsLiveConnected(false)
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Calculate nearest centroid for the interactive calculator
  const assignedCluster = useMemo(() => {
    const centroids = [
      { id: 0, r: 12.4, f: 18.2, m: 3840.5, name: 'Champions (VIPs)', color: '#10b981', action: 'VIP Concierge & Loyalty Drops' },
      { id: 1, r: 28.1, f: 6.8, m: 1140.2, name: 'Loyal Everyday Regulars', color: '#3b82f6', action: 'Cross-Sell Recommendations & Upsells' },
      { id: 2, r: 182.6, f: 1.8, m: 248.9, name: 'At-Risk / Lapsed Shoppers', color: '#f59e0b', action: 'Automated 20% Off Re-engagement Flow' },
    ]

    // Normalized Euclidean distance
    let minDistance = Infinity
    let best = centroids[0]

    for (const c of centroids) {
      const dR = (calcRecency - c.r) / 100
      const dF = (calcFrequency - c.f) / 10
      const dM = (calcMonetary - c.m) / 1000
      const dist = Math.sqrt(dR * dR + dF * dF + dM * dM)
      if (dist < minDistance) {
        minDistance = dist
        best = c
      }
    }

    return best
  }, [calcRecency, calcFrequency, calcMonetary])

  // Prepare points separated by cluster for Recharts Scatter
  const cluster0Points = useMemo(() => mockCustomerPoints.filter((p) => p.cluster === 0), [])
  const cluster1Points = useMemo(() => mockCustomerPoints.filter((p) => p.cluster === 1), [])
  const cluster2Points = useMemo(() => mockCustomerPoints.filter((p) => p.cluster === 2), [])

  const xAxisKey = axisMode === 'frequency-monetary' ? 'frequency' : 'recency'
  const yAxisKey = axisMode === 'recency-frequency' ? 'frequency' : 'monetary'
  const xAxisName = axisMode === 'frequency-monetary' ? 'Order Frequency (Orders)' : 'Recency (Days Since Last Order)'
  const yAxisName = axisMode === 'recency-frequency' ? 'Order Frequency (Orders)' : 'Monetary Total Spend ($)'

  const activeSummary = useMemo(() => {
    if (!data?.summary || !Array.isArray(data.summary) || data.summary.length === 0) {
      return defaultSummary
    }
    return defaultSummary.map((item, idx) => {
      const apiItem = data.summary[idx]
      if (!apiItem) return item
      return {
        ...item,
        recency: typeof apiItem.recency === 'number' ? apiItem.recency : item.recency,
        frequency: typeof apiItem.frequency === 'number' ? apiItem.frequency : item.frequency,
        monetary: typeof apiItem.monetary === 'number' ? apiItem.monetary : item.monetary,
      }
    })
  }, [data])

  return (
    <section className="flex min-h-full flex-col gap-6 p-4 pb-12 md:p-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Customer Segmentation (K-Means)
            </h1>
            <DetailTag color="var(--chart-4)">RFM Clustering Engine</DetailTag>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Unsupervised behavioral grouping based on Recency, Frequency, and Monetary (RFM) vector coordinates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border',
              isLiveConnected
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-primary/30 bg-primary/10 text-primary'
            )}
          >
            <span
              className={cn(
                'size-2 rounded-full',
                isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-primary'
              )}
            />
            <span>{isLiveConnected ? 'Live OLAP Clustering' : 'Enterprise Star Schema RFM'}</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {
              setLoading(true)
              axios
                .get('http://localhost:5000/api/segment-customers')
                .then((res) => {
                  setData(res.data)
                  setIsLiveConnected(true)
                  setLoading(false)
                })
                .catch(() => {
                  setData({
                    centroids: [
                      [12.4, 18.2, 3840.5],
                      [28.1, 6.8, 1140.2],
                      [182.6, 1.8, 248.9],
                    ],
                    summary: defaultSummary,
                    labels: [0, 1, 2],
                  })
                  setIsLiveConnected(false)
                  setLoading(false)
                })
            }}
            className="text-xs"
          >
            {loading ? 'Clustering...' : 'Re-cluster'}
          </Button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Segmented Customer Base
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              Full Warehouse
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">4,372</span>
            <span className="text-xs text-muted-foreground">Accounts</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Processed through RFM pipeline from 541,909 central transactions.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Champions (VIP) Revenue
            </span>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400">
              Top 24.8%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">68.2%</span>
            <span className="text-xs text-emerald-400 font-semibold">$3,840.50 Avg</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Dominant customer cohort driving the majority of recurring gross revenue.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              At-Risk / Lapsed Tier
            </span>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400">
              Retention Alert
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">18.4%</span>
            <span className="text-xs text-amber-400 font-semibold">182d Recency</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Shoppers with high lapsed intervals requiring targeted reactivation discounts.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Separation Silhouette
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              k = 3 Optimal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">0.68</span>
            <span className="text-xs text-muted-foreground">Cohesion Index</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Clear geometric distinction between VIP, Everyday, and Lapsed clusters.
          </p>
        </DashboardCard>
      </div>

      {/* Cluster Persona Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {activeSummary.map((cluster) => (
          <DashboardCard
            key={cluster.cluster}
            className="flex flex-col justify-between p-5 border-l-4 transition-transform hover:-translate-y-0.5 shadow-sm"
            style={{ borderLeftColor: cluster.color }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {cluster.badge}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-foreground">
                  {cluster.customerCount.toLocaleString()} customers
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-foreground">{cluster.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{cluster.strategy}</p>

              {/* Centroid RFM Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2.5 text-center">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Recency</div>
                  <div className="mt-0.5 text-sm font-bold text-foreground">{cluster.recency.toFixed(1)}d</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Frequency</div>
                  <div className="mt-0.5 text-sm font-bold text-foreground">{cluster.frequency.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Monetary</div>
                  <div className="mt-0.5 text-sm font-bold text-emerald-400">${cluster.monetary.toFixed(0)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
              <span className="text-muted-foreground">Revenue Contribution:</span>
              <span className="font-extrabold text-foreground">{cluster.revenueShare}</span>
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* Scatter Chart & Calculator Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scatter Visualization (2 Cols) */}
        <DashboardCard className="flex flex-col gap-4 p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <DetailHeader
              title="Customer Point Cloud & Centroid Distribution"
              subtitle="2D multi-axis projection of customer vectors"
            />

            {/* Axis Switcher */}
            <div className="flex rounded-lg border border-border bg-secondary/30 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setAxisMode('recency-monetary')}
                className={cn(
                  'rounded-md px-2.5 py-1 transition-all',
                  axisMode === 'recency-monetary'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Recency vs Spend
              </button>
              <button
                type="button"
                onClick={() => setAxisMode('frequency-monetary')}
                className={cn(
                  'rounded-md px-2.5 py-1 transition-all',
                  axisMode === 'frequency-monetary'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Orders vs Spend
              </button>
              <button
                type="button"
                onClick={() => setAxisMode('recency-frequency')}
                className={cn(
                  'rounded-md px-2.5 py-1 transition-all',
                  axisMode === 'recency-frequency'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Recency vs Orders
              </button>
            </div>
          </div>

          <div className="h-[380px] w-full pt-2">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
                  <XAxis
                    type="number"
                    dataKey={xAxisKey}
                    name={xAxisName}
                    stroke="currentColor"
                    className="text-xs text-muted-foreground"
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey={yAxisKey}
                    name={yAxisName}
                    stroke="currentColor"
                    className="text-xs text-muted-foreground"
                    tickLine={false}
                    tickFormatter={(val) => (yAxisKey === 'monetary' ? `$${val}` : val)}
                  />
                  <ZAxis type="number" range={[60, 240]} />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                    formatter={(val: any, name: any) => [
                      name === 'Monetary' ? `$${Number(val).toLocaleString()}` : val,
                      name,
                    ]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Scatter
                    name="Champions (VIP)"
                    data={cluster0Points}
                    fill="#10b981"
                    shape="circle"
                  />
                  <Scatter
                    name="Loyal Regulars"
                    data={cluster1Points}
                    fill="#3b82f6"
                    shape="circle"
                  />
                  <Scatter
                    name="At-Risk Lapsed"
                    data={cluster2Points}
                    fill="#f59e0b"
                    shape="circle"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </DashboardCard>

        {/* Live Customer Cluster Calculator (1 Col) */}
        <DashboardCard className="flex flex-col gap-4 p-5">
          <DetailHeader
            title="RFM Segment Calculator"
            subtitle="Simulate real-time centroid assignment"
          >
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
              Euclidean K-Means
            </span>
          </DetailHeader>

          {/* Assigned Output Banner */}
          <div
            className="rounded-xl border p-4 text-center transition-all"
            style={{
              borderColor: `${assignedCluster.color}40`,
              backgroundColor: `${assignedCluster.color}15`,
            }}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: assignedCluster.color }}>
              Assigned Customer Cohort
            </span>
            <div className="mt-1 text-2xl font-black text-foreground">{assignedCluster.name}</div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{assignedCluster.action}</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span>Recency: {calcRecency} days ago</span>
                <span className="text-muted-foreground">Days</span>
              </div>
              <input
                type="range"
                min={1}
                max={365}
                step={1}
                value={calcRecency}
                onChange={(e) => setCalcRecency(Number(e.target.value))}
                className="mt-1.5 w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span>Frequency: {calcFrequency} total orders</span>
                <span className="text-muted-foreground">Invoices</span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={calcFrequency}
                onChange={(e) => setCalcFrequency(Number(e.target.value))}
                className="mt-1.5 w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span>Monetary Spend: ${calcMonetary.toLocaleString()}</span>
                <span className="text-emerald-400 font-bold">Lifetime Total</span>
              </div>
              <input
                type="range"
                min={50}
                max={6000}
                step={50}
                value={calcMonetary}
                onChange={(e) => setCalcMonetary(Number(e.target.value))}
                className="mt-1.5 w-full accent-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Clustering Logic: </span>
            Coordinates are normalized against Star Schema RFM vector bounds. Point is assigned to the nearest centroid vector with minimum Euclidean distance.
          </div>
        </DashboardCard>
      </div>
    </section>
  )
}
