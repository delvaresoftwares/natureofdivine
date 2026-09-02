'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchFunnel } from '@/lib/actions';
import type { ConversionFunnel } from '@/lib/analytics-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Loader2, ArrowDown, Lock, TrendingUp, Eye, MousePointerClick, MapPin, CreditCard, CheckCircle2, IndianRupee, ShoppingBag, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'notd_admin_unlocked';

type Range = 'today' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

const RANGE_LABELS: Record<string, string> = {
  today: 'Today',
  daily: 'Last 30 Days',
  weekly: 'Last 12 Weeks',
  monthly: 'Last 12 Months',
  yearly: 'Last Year',
  custom: 'Custom Range',
};

const STAGE_STYLE: Record<string, { icon: any; color: string; bar: string }> = {
  awareness: { icon: Eye, color: '#6366f1', bar: 'bg-indigo-500' },
  buttonPages: { icon: MousePointerClick, color: '#0ea5e9', bar: 'bg-sky-500' },
  shippingVisit: { icon: MapPin, color: '#f59e0b', bar: 'bg-amber-500' },
  paymentEnter: { icon: CreditCard, color: '#f97316', bar: 'bg-orange-500' },
  paymentSuccess: { icon: CheckCircle2, color: '#10b981', bar: 'bg-emerald-500' },
};

export function FunnelDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === process.env.NEXT_PUBLIC_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      window.sessionStorage.setItem(STORAGE_KEY, '1');
      setError('');
    } else {
      setError('Incorrect passcode.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-sm border-border/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> Admin Access
            </CardTitle>
            <CardDescription>Enter the passcode to view the funnel dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Unlock Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <FunnelContent />;
}

function FunnelContent() {
  const [timeRange, setTimeRange] = useState<Range>('daily');
  const [customRange, setCustomRange] = useState<{ start?: Date; end?: Date }>({});
  const [data, setData] = useState<ConversionFunnel | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const startMs = customRange.start?.getTime();
      const endMs = customRange.end?.getTime();
      const result = await fetchFunnel(
        timeRange,
        timeRange === 'custom' && startMs && endMs ? { start: startMs, end: endMs + 86400000 - 1 } : undefined
      );
      setData(result);
    } catch (e) {
      console.error('Failed to load funnel', e);
    } finally {
      setLoading(false);
    }
  }, [timeRange, customRange]);

  useEffect(() => {
    load();
  }, [load]);

  const maxValue = data ? Math.max(...data.stages.map(s => s.value), 1) : 1;

  return (
    <div className="container mx-auto py-10 md:py-14 max-w-5xl space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline">Conversion Funnel</h1>
          <p className="text-muted-foreground mt-1">Awareness → Purchase performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as Range)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="daily">Last 30 Days</SelectItem>
              <SelectItem value="weekly">Last 12 Weeks</SelectItem>
              <SelectItem value="monthly">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          {timeRange === 'custom' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {customRange.start && customRange.end
                    ? `${customRange.start.toLocaleDateString()} – ${customRange.end.toLocaleDateString()}`
                    : 'Pick dates'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: customRange.start, to: customRange.end }}
                  onSelect={(r) => {
                    setCustomRange({ start: r?.from, end: r?.to });
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </header>

      {loading || !data ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard icon={<Eye className="h-5 w-5 text-indigo-500" />} label="Awareness" value={data.totalVisitors} />
            <SummaryCard icon={<ShoppingBag className="h-5 w-5 text-sky-500" />} label="Total Orders" value={data.totalOrders} />
            <SummaryCard icon={<IndianRupee className="h-5 w-5 text-emerald-500" />} label="Revenue" value={`₹${data.totalSales.toLocaleString()}`} />
            <SummaryCard icon={<TrendingUp className="h-5 w-5 text-amber-500" />} label="Conversion" value={`${data.overallConversion}%`} />
          </div>

          {/* Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Funnel
              </CardTitle>
              <CardDescription>{RANGE_LABELS[timeRange]}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.stages.map((stage, index) => {
                const style = STAGE_STYLE[stage.key] || STAGE_STYLE.awareness;
                const Icon = style.icon;
                const width = stage.value > 0 ? Math.max((stage.value / maxValue) * 100, 4) : 2;
                const drop = index > 0 ? data.drops[index - 1] : null;
                return (
                  <div key={stage.key}>
                    <div className="flex items-center gap-3 mb-1">
                      <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center text-white', style.bar)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <p className="font-semibold text-sm">{stage.label}</p>
                          <p className="font-mono font-bold text-lg">{stage.value.toLocaleString()}</p>
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted overflow-hidden mt-1">
                          <div
                            className={cn('h-full rounded-full transition-all duration-700', style.bar)}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                      {drop !== null && (
                        <div className="text-right shrink-0 hidden sm:block">
                          <p className="text-xs text-muted-foreground">step conv.</p>
                          <p className="text-sm font-bold text-muted-foreground">{drop.percent}%</p>
                        </div>
                      )}
                    </div>
                    {index < data.stages.length - 1 && (
                      <div className="flex justify-center -mb-2 -mt-1 ml-12">
                        <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Drop breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step Conversions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.stages.slice(1).map((stage, i) => {
                const drop = data.drops[i];
                const style = STAGE_STYLE[stage.key] || STAGE_STYLE.awareness;
                return (
                  <div key={stage.key} className="flex items-center gap-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground w-40 shrink-0">
                      {data.stages[i].label} → {stage.label}
                    </span>
                    <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${drop.percent}%`, backgroundColor: style.color }}
                      />
                    </div>
                    <span className="text-sm font-bold w-12 text-right">{drop.percent}%</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Blog clicks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" /> Blog Clicks
              </CardTitle>
              <CardDescription>
                Total blog article views in this range: <strong className="font-bold">{data.blogClicksTotal.toLocaleString()}</strong> · sorted by most clicked
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.blogClicks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No blog clicks recorded in this range yet.</p>
              ) : (
                <div className="space-y-2">
                  {data.blogClicks.map((item, index) => (
                    <div key={item.slug} className="flex items-center gap-3">
                      <span className="w-5 text-xs font-bold text-muted-foreground">{index + 1}</span>
                      <span className="text-sm flex-1 truncate">{item.slug}</span>
                      <span className="font-mono font-bold text-sm">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <p className="text-center text-xs text-muted-foreground pb-8">
        Admin passcode access · Conversion funnel data from analytics events.
      </p>
    </div>
  );
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-2xl md:text-3xl font-headline font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
