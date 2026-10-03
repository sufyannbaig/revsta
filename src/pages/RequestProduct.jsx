import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { Send, Search, Loader2, CheckCircle2, Sparkles, Zap } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CATEGORIES = ["Smart Phones", "Earbuds", "Smart Watches", "Laptops", "Tablets", "Accessories"];

export default function RequestProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ product_name: "", brand: "", category: "Smart Phones", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loadingReqs, setLoadingReqs] = useState(true);
  const [researching, setResearching] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => {});
    const fetchRequests = async () => {
      try {
        const data = await base44.entities.ProductRequest.list('-created_date', 20);
        setRequests(data);
      } catch (e) {
        console.error("Failed to load requests:", e);
      } finally {
        setLoadingReqs(false);
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_name.trim()) return;
    setSubmitting(true);
    try {
      await base44.entities.ProductRequest.create({
        ...form,
        status: "pending"
      });
      setSubmitted(true);
      setForm({ product_name: "", brand: "", category: "Smart Phones", notes: "" });
      const data = await base44.entities.ProductRequest.list('-created_date', 20);
      setRequests(data);
    } catch (e) {
      console.error("Failed to submit request:", e);
    } finally {
      setSubmitting(false);
    }
  };

  const researchSingleProduct = async (req) => {
    const productData = await base44.integrations.Core.InvokeLLM({
      prompt: `Research the product "${req.product_name}" by ${req.brand || "unknown brand"} (category: ${req.category}). Find what real users on Reddit, YouTube, and social media are saying about it. Provide: sentiment_score (1-10), positive_pct, neutral_pct, negative_pct (must sum to 100), total_reviews (realistic estimate), a 2-sentence ai_summary of public sentiment, and whether it's trending or top_rated based on current buzz.`,
      add_context_from_internet: true,
      response_json_schema: {
        "type": "object",
        "properties": {
          "sentiment_score": { "type": "number" },
          "positive_pct": { "type": "number" },
          "neutral_pct": { "type": "number" },
          "negative_pct": { "type": "number" },
          "total_reviews": { "type": "number" },
          "trending": { "type": "boolean" },
          "top_rated": { "type": "boolean" },
          "ai_summary": { "type": "string" }
        }
      }
    });

    const categoryImages = {
      "Smart Phones": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      "Earbuds": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
      "Smart Watches": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop",
      "Laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      "Tablets": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
      "Accessories": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop"
    };

    await base44.entities.Product.create({
      name: req.product_name,
      brand: req.brand || "Unknown",
      category: req.category,
      image_url: categoryImages[req.category] || categoryImages["Accessories"],
      sentiment_score: productData.sentiment_score || 7,
      positive_pct: productData.positive_pct || 70,
      neutral_pct: productData.neutral_pct || 20,
      negative_pct: productData.negative_pct || 10,
      total_reviews: productData.total_reviews || 500,
      trending: productData.trending || false,
      top_rated: productData.top_rated || false,
      affiliate_url: `https://www.amazon.com/s?k=${encodeURIComponent(req.product_name + ' ' + (req.brand || ''))}&tag=revsta-20`,
      ai_summary: productData.ai_summary || ""
    });

    await base44.entities.ProductRequest.update(req.id, { status: "approved" });
  };

  const handleResearch = async (req) => {
    setResearching(req.id);
    try {
      await researchSingleProduct(req);
      const data = await base44.entities.ProductRequest.list('-created_date', 20);
      setRequests(data);
    } catch (e) {
      console.error("Research failed:", e);
    } finally {
      setResearching(null);
    }
  };

  const handleResearchAll = async () => {
    const pending = requests.filter(r => r.status === 'pending');
    if (pending.length === 0) return;
    setBatchProcessing(true);
    setBatchProgress({ current: 0, total: pending.length });
    for (let i = 0; i < pending.length; i++) {
      setBatchProgress({ current: i, total: pending.length });
      try {
        await researchSingleProduct(pending[i]);
      } catch (e) {
        console.error(`Failed to research ${pending[i].product_name}:`, e);
      }
    }
    setBatchProgress({ current: pending.length, total: pending.length });
    const data = await base44.entities.ProductRequest.list('-created_date', 20);
    setRequests(data);
    setBatchProcessing(false);
  };

  const filteredRequests = requests.filter(r =>
    r.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-figma-accent font-heading">
      <SiteHeader />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-[clamp(16px,5.2vw,75px)] pt-[clamp(25px,6.9vw,100px)] pb-[clamp(40px,11.1vw,160px)]">
        {/* Title */}
        <div className="mb-12 max-w-2xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[clamp(35px,4.44vw,64px)] font-normal leading-[1.0] text-figma-secondary mb-4">
            Request a Product
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.2] text-figma-text-1">
            Can't find what you're looking for? Submit a product request and our AI will research it across social media and add it to the database.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-figma-primary rounded-[20px] p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#14c686] mb-4" />
                <h3 className="text-figma-24 font-normal text-figma-secondary mb-2">Request Submitted!</h3>
                <p className="text-figma-18 text-figma-text-1 mb-6">We'll research this product and add it soon.</p>
                <button onClick={() => setSubmitted(false)} className="py-[12px] px-[24px] bg-figma-accent rounded-[32px] text-figma-18 font-normal text-figma-text-1 hover:bg-gray-200 transition-colors">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-figma-18 font-normal text-figma-secondary mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={form.product_name}
                    onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                    placeholder="e.g., Samsung Galaxy S24 Ultra"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-figma-accent text-figma-18 text-figma-secondary outline-none focus:ring-2 ring-[#14c686]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-figma-18 font-normal text-figma-secondary mb-2">Brand</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="e.g., Samsung"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-figma-accent text-figma-18 text-figma-secondary outline-none focus:ring-2 ring-[#14c686]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-figma-18 font-normal text-figma-secondary mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-figma-accent text-figma-18 text-figma-secondary outline-none focus:ring-2 ring-[#14c686]/30 transition-all"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-figma-18 font-normal text-figma-secondary mb-2">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any details about the product..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-figma-accent text-figma-18 text-figma-secondary outline-none focus:ring-2 ring-[#14c686]/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || !form.product_name.trim()}
                  className="flex items-center justify-center gap-2 py-[15px] px-[30px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] text-figma-20 font-normal text-figma-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Community Requests */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-[clamp(20px,2.5vw,36px)] font-normal text-figma-secondary">Community Requests</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {currentUser?.role === 'admin' && pendingCount > 0 && (
                  <button
                    onClick={handleResearchAll}
                    disabled={batchProcessing}
                    className="flex items-center gap-2 py-2.5 px-4 rounded-[32px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] text-figma-16 font-normal text-figma-primary hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {batchProcessing ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing {batchProgress.current}/{batchProgress.total}...</>
                    ) : (
                      <><Zap className="w-4 h-4" /> Research All ({pendingCount})</>
                    )}
                  </button>
                )}
                <div className="flex items-center bg-figma-primary rounded-full px-4 py-2 shadow-sm flex-1 max-w-[280px]">
                  <Search className="w-4 h-4 text-figma-text-4 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-figma-16 text-figma-secondary placeholder:text-figma-text-4"
                  />
                </div>
              </div>
            </div>

            {loadingReqs ? (
              <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-figma-text-4" /></div>
            ) : filteredRequests.length === 0 ? (
              <div className="bg-figma-primary rounded-[20px] p-12 text-center shadow-sm">
                <p className="text-figma-18 text-figma-text-1">No requests yet. Be the first to submit one!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredRequests.map((req) => (
                  <div key={req.id} className="bg-figma-primary rounded-[16px] p-5 shadow-sm flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-figma-20 font-normal text-figma-secondary">{req.product_name}</h3>
                        {req.brand && <p className="text-figma-16 text-figma-text-1">{req.brand}</p>}
                      </div>
                      <span className={`text-figma-14 px-3 py-1 rounded-full whitespace-nowrap ${
                        req.status === 'approved' ? 'bg-[#14c686]/10 text-[#14c686]' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-figma-14 text-figma-text-4">{req.category}</span>
                      {req.notes && <span className="text-figma-14 text-figma-text-1 truncate">— {req.notes}</span>}
                    </div>
                    {req.status === 'pending' && (
                      <button
                        onClick={() => handleResearch(req)}
                        disabled={researching === req.id || batchProcessing}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-[32px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] text-figma-16 font-normal text-figma-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {researching === req.id ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Researching via AI...</>
                        ) : (
                          <><Sparkles className="w-4 h-4" /> Research & Add to Database</>
                        )}
                      </button>
                    )}
                    {req.status === 'approved' && (
                      <button
                        onClick={() => navigate('/ProductsProductLisitng')}
                        className="text-figma-16 text-[#14c686] hover:underline text-left"
                      >
                        View in Products →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}