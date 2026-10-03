import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Activity, Package, Star, ShieldAlert } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ScatterChart, Scatter, Legend, ZAxis
} from "recharts";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CATEGORY_COLORS = {
  "Smart Phones": "#14c686",
  "Earbuds": "#22d3ee",
  "Smart Watches": "#f59e0b",
  "Laptops": "#8b5cf6",
  "Tablets": "#ec4899",
  "Accessories": "#6366f1",
};

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-figma-primary rounded-[20px] p-6 flex items-center gap-4 shadow-sm"
  >
    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-normal font-heading text-figma-text-2 leading-tight">{value}</p>
      <p className="text-sm font-normal font-heading text-figma-text-1">{label}</p>
    </div>
  </motion.div>
);

export default function Analytics() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await base44.entities.Product.list("-sentiment_score", 200);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load analytics:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    if (!products.length) return { total: 0, avgSentiment: 0, trending: 0, topRated: 0 };
    const total = products.length;
    const avgSentiment = (products.reduce((sum, p) => sum + (p.sentiment_score || 0), 0) / total).toFixed(1);
    const trending = products.filter(p => p.trending).length;
    const topRated = products.filter(p => p.top_rated).length;
    return { total, avgSentiment, trending, topRated };
  }, [products]);

  const categoryData = useMemo(() => {
    const grouped = {};
    products.forEach(p => {
      const cat = p.category || "Other";
      if (!grouped[cat]) grouped[cat] = { category: cat, products: 0, totalSentiment: 0, totalReviews: 0 };
      grouped[cat].products++;
      grouped[cat].totalSentiment += p.sentiment_score || 0;
      grouped[cat].totalReviews += p.total_reviews || 0;
    });
    return Object.values(grouped).map(g => ({
      category: g.category,
      avgSentiment: parseFloat((g.totalSentiment / g.products).toFixed(1)),
      productCount: g.products,
      totalReviews: g.totalReviews,
    }));
  }, [products]);

  const trendData = useMemo(() => {
    const grouped = {};
    products.forEach(p => {
      const date = p.updated_date || p.created_date;
      if (!date) return;
      const day = new Date(date).toISOString().slice(0, 10);
      if (!grouped[day]) grouped[day] = { date: day, totalSentiment: 0, count: 0 };
      grouped[day].totalSentiment += p.sentiment_score || 0;
      grouped[day].count++;
    });
    return Object.values(grouped)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(g => ({
        date: new Date(g.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        avgSentiment: parseFloat((g.totalSentiment / g.count).toFixed(1)),
        analyzed: g.count,
      }));
  }, [products]);

  const scatterData = useMemo(() => {
    return products.map(p => ({
      name: p.name,
      sentiment: p.sentiment_score || 0,
      reviews: p.total_reviews || 0,
      category: p.category || "Other",
    }));
  }, [products]);

  const risingStars = useMemo(() => {
    return [...products]
      .filter(p => p.sentiment_score != null)
      .sort((a, b) => (b.sentiment_score || 0) - (a.sentiment_score || 0))
      .slice(0, 5);
  }, [products]);

  const fallingBehind = useMemo(() => {
    return [...products]
      .filter(p => p.sentiment_score != null)
      .sort((a, b) => (a.sentiment_score || 0) - (b.sentiment_score || 0))
      .slice(0, 5);
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-figma-accent font-heading flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-figma-accent font-heading flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-figma-primary rounded-[20px] p-10 shadow-sm flex flex-col items-center text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#dc2626]/15 flex items-center justify-center mb-5">
              <ShieldAlert className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-normal font-heading text-figma-secondary mb-3">Admin Access Only</h1>
            <p className="text-figma-18 font-normal text-figma-text-1 mb-6">The analytics dashboard is restricted to administrators.</p>
            <button onClick={() => navigate("/")} className="flex items-center gap-2 py-3 px-6 bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] text-figma-16 font-normal text-figma-primary hover:opacity-90 transition-opacity">
              Back to Home
            </button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-figma-accent font-heading flex flex-col overflow-x-clip">
      <SiteHeader />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-[clamp(16px,5.2vw,75px)] pt-[clamp(16px,4.2vw,60px)] pb-[clamp(25px,6.9vw,100px)] flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[clamp(35px,4.44vw,64px)] font-normal leading-[1.0] text-figma-secondary">Analytics</h1>
          <p className="text-figma-18 font-normal text-figma-text-1">Sentiment trends and momentum across all products</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Package} label="Total Products" value={stats.total} color="#14c686" delay={0.05} />
          <StatCard icon={Activity} label="Avg Sentiment" value={`${stats.avgSentiment}/10`} color="#22d3ee" delay={0.1} />
          <StatCard icon={TrendingUp} label="Trending" value={stats.trending} color="#f59e0b" delay={0.15} />
          <StatCard icon={Star} label="Top Rated" value={stats.topRated} color="#8b5cf6" delay={0.2} />
        </div>

        {/* Sentiment Trend Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-figma-primary rounded-[20px] p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#14c686]" />
            <h2 className="text-xl font-normal font-heading text-figma-secondary">Sentiment Trend Over Time</h2>
          </div>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#737373" />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 13 }}
                  formatter={(v) => [`${v}/10`, "Avg Sentiment"]}
                />
                <Line type="monotone" dataKey="avgSentiment" stroke="#14c686" strokeWidth={3} dot={{ fill: "#14c686", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-figma-text-1 text-center py-12">No trend data available yet.</p>
          )}
        </motion.div>

        {/* Two-column: Category Bar + Scatter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-figma-primary rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#22d3ee]" />
              <h2 className="text-xl font-normal font-heading text-figma-secondary">Sentiment by Category</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
                <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} stroke="#737373" width={90} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 13 }}
                  formatter={(v) => [`${v}/10`, "Avg Sentiment"]}
                />
                <Bar dataKey="avgSentiment" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[entry.category] || "#14c686"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-figma-primary rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-[#8b5cf6]" />
              <h2 className="text-xl font-normal font-heading text-figma-secondary">Sentiment vs Engagement</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis type="number" dataKey="reviews" name="Reviews" tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis type="number" dataKey="sentiment" name="Sentiment" domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#737373" />
                <ZAxis range={[60, 60]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 13 }}
                  formatter={(v, n) => [v, n === "sentiment" ? "Sentiment" : "Reviews"]}
                  labelFormatter={() => ""}
                />
                <Legend />
                {Object.keys(CATEGORY_COLORS).map(cat => (
                  <Scatter
                    key={cat}
                    name={cat}
                    data={scatterData.filter(d => d.category === cat)}
                    fill={CATEGORY_COLORS[cat]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Rising Stars & Falling Behind */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rising Stars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-figma-primary rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#14c686]/15 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#14c686]" />
              </div>
              <h2 className="text-xl font-normal font-heading text-figma-secondary">Rising Stars</h2>
            </div>
            <div className="flex flex-col gap-3">
              {risingStars.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/ProductDetail/${p.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-figma-accent cursor-pointer transition-colors"
                >
                  <span className="text-sm font-normal text-figma-text-4 w-6">#{i + 1}</span>
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-normal text-figma-text-2 truncate">{p.name}</p>
                    <p className="text-xs font-normal text-figma-text-1">{p.brand} · {p.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-normal text-[#14c686]">{p.sentiment_score}</p>
                    <p className="text-xs text-figma-text-1">{p.total_reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Falling Behind */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-figma-primary rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#dc2626]/15 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[#dc2626]" />
              </div>
              <h2 className="text-xl font-normal font-heading text-figma-secondary">Falling Behind</h2>
            </div>
            <div className="flex flex-col gap-3">
              {fallingBehind.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/ProductDetail/${p.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-figma-accent cursor-pointer transition-colors"
                >
                  <span className="text-sm font-normal text-figma-text-4 w-6">#{i + 1}</span>
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-normal text-figma-text-2 truncate">{p.name}</p>
                    <p className="text-xs font-normal text-figma-text-1">{p.brand} · {p.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-normal text-[#dc2626]">{p.sentiment_score}</p>
                    <p className="text-xs text-figma-text-1">{p.total_reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}