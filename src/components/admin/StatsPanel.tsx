import { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchVisitStats, fetchChatStats, type VisitStat, type ChatStat } from "@/api";

type DataType = "visits" | "chats";
type TimeRange = "1w" | "1m" | "6m" | "1y";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
];

const StatsPanel = () => {
  const { t } = useLanguage();
  const [dataType, setDataType] = useState<DataType>("visits");
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  const [visitData, setVisitData] = useState<VisitStat[]>([]);
  const [chatData, setChatData] = useState<ChatStat[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      if (dataType === "visits") {
        setVisitData(await fetchVisitStats(timeRange));
      } else {
        setChatData(await fetchChatStats(timeRange));
      }
    } catch {}
    setLoading(false);
  }, [dataType, timeRange]);

  useEffect(() => { load(); }, [load]);

  // Get unique categories
  const categories = useMemo(() => {
    if (dataType === "visits") {
      return [...new Set(visitData.map((d) => d.country))];
    }
    return [...new Set(chatData.map((d) => d.service_ref))];
  }, [dataType, visitData, chatData]);

  // Transform data for stacked bar chart
  const chartData = useMemo(() => {
    const raw = dataType === "visits" ? visitData : chatData;
    const categoryKey = dataType === "visits" ? "country" : "service_ref";
    const dateMap = new Map<string, Record<string, number>>();

    for (const item of raw) {
      const key = (item as any)[categoryKey] as string;
      if (activeFilter && key !== activeFilter) continue;
      const date = item.date;
      if (!dateMap.has(date)) dateMap.set(date, {});
      const entry = dateMap.get(date)!;
      entry[key] = (entry[key] || 0) + item.count;
    }

    return Array.from(dateMap.entries())
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [dataType, visitData, chatData, activeFilter]);

  const visibleCategories = activeFilter ? [activeFilter] : categories;

  const timeRanges: { key: TimeRange; label: string }[] = [
    { key: "1w", label: t.admin.week },
    { key: "1m", label: t.admin.month },
    { key: "6m", label: t.admin.halfYear },
    { key: "1y", label: t.admin.year },
  ];

  const dataTypes: { key: DataType; label: string }[] = [
    { key: "visits", label: t.admin.visits },
    { key: "chats", label: t.admin.chatsByService },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar - data type selector */}
        <div className="lg:w-56 space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{t.admin.statistics}</h3>
          {dataTypes.map((dt) => (
            <button
              key={dt.key}
              onClick={() => { setDataType(dt.key); setActiveFilter(null); }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                dataType === dt.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {dt.label}
            </button>
          ))}

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {dataType === "visits" ? t.admin.visits : t.admin.chatsByService}
              </h4>
              <button
                onClick={() => setActiveFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  !activeFilter
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.admin.filterAll}
              </button>
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                    activeFilter === cat
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main chart area */}
        <div className="flex-1 bg-card rounded-xl border border-border p-6">
          {/* Time range selector */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {dataType === "visits" ? t.admin.visits : t.admin.chatsByService}
            </h3>
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
              {timeRanges.map((tr) => (
                <button
                  key={tr.key}
                  onClick={() => setTimeRange(tr.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    timeRange === tr.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          {loading ? (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
              Loading...
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
              {t.admin.noData}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(v: string) => {
                    const d = new Date(v);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {visibleCategories.map((cat, i) => (
                  <Bar
                    key={cat}
                    dataKey={cat}
                    fill={COLORS[categories.indexOf(cat) % COLORS.length]}
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
