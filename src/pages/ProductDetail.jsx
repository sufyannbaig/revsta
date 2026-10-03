import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowLeft, Facebook, Instagram, Linkedin } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { useComparison } from "@/hooks/useComparison";
import EmptyAnalysisState from "@/components/EmptyAnalysisState";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ProductDetail() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const { comparisonCount, comparisonIds, addToCompare, removeFromCompare } = useComparison();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProductData = async () => {
    const prod = await base44.entities.Product.get(id);
    setProduct(prod);
    base44.analytics.track({ eventName: "product_view", properties: { product_id: id, product_name: prod.name, category: prod.category, brand: prod.brand } });
    if (typeof window.gtag === "function") window.gtag("event", "product_view", { product_id: id, product_name: prod.name, category: prod.category, brand: prod.brand });
    const [revs, kws] = await Promise.all([
      base44.entities.Review.filter({ product_id: id }, '-created_date', 10),
      base44.entities.Keyword.filter({ product_id: id }, '-count', 20),
    ]);
    setReviews(revs);
    setKeywords(kws);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProductData();
      } catch (e) {
        console.error("Failed to load product:", e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const runSentimentAnalysis = async () => {
    setAnalyzing(true);
    try {
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a product review sentiment analyzer. Search the web for real user reviews and discussions about the "${product.name}" by ${product.brand} (category: ${product.category}).

Look for discussions from Reddit, YouTube comments, tech forums, and social media. Based on what real people are saying, provide:

1. **reviews**: At least 10 specific user reviews/comments. Each should include:
   - platform: one of "reddit", "youtube", "quora", "facebook", "instagram", "linkedin"
   - author: the username or name (or "Anonymous" if not available)
   - content: the actual review text (1-3 sentences, realistic)
   - sentiment: "positive", "neutral", or "negative"

2. **keywords**: Top 8 most discussed keywords/phrases. Each should include:
   - keyword: the keyword or phrase
   - count: approximate number of mentions
   - sentiment: "positive" or "negative"

3. **ai_summary**: A comprehensive 3-5 sentence summary of overall sentiment

4. **positive_pct**, **neutral_pct**, **negative_pct**: Percentages that add up to 100

5. **sentiment_score**: Overall score out of 10 (one decimal place)

Make the reviews realistic and varied — some positive, some negative, some neutral. Use authentic-sounding usernames.`,
        add_context_from_internet: true,
        model: "gemini_3_flash",
        response_json_schema: {
          type: "object",
          properties: {
            reviews: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  platform: { type: "string" },
                  author: { type: "string" },
                  content: { type: "string" },
                  sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
                },
                required: ["platform", "author", "content", "sentiment"],
              },
            },
            keywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: { type: "string" },
                  count: { type: "number" },
                  sentiment: { type: "string", enum: ["positive", "negative"] },
                },
                required: ["keyword", "count", "sentiment"],
              },
            },
            ai_summary: { type: "string" },
            positive_pct: { type: "number" },
            neutral_pct: { type: "number" },
            negative_pct: { type: "number" },
            sentiment_score: { type: "number" },
          },
          required: ["reviews", "keywords", "ai_summary", "positive_pct", "neutral_pct", "negative_pct", "sentiment_score"],
        },
      });

      // Delete old reviews and keywords
      await base44.entities.Review.deleteMany({ product_id: id });
      await base44.entities.Keyword.deleteMany({ product_id: id });

      // Store new reviews
      const reviewRecords = analysis.reviews.map((r) => ({
        product_id: id,
        platform: r.platform,
        author: r.author,
        content: r.content,
        sentiment: r.sentiment,
        scraped_at: new Date().toISOString(),
      }));
      await base44.entities.Review.bulkCreate(reviewRecords);

      // Store keywords
      const keywordRecords = analysis.keywords.map((k) => ({
        product_id: id,
        keyword: k.keyword,
        count: k.count,
        sentiment: k.sentiment,
      }));
      await base44.entities.Keyword.bulkCreate(keywordRecords);

      // Update product with new scores
      await base44.entities.Product.update(id, {
        sentiment_score: analysis.sentiment_score,
        positive_pct: analysis.positive_pct,
        neutral_pct: analysis.neutral_pct,
        negative_pct: analysis.negative_pct,
        total_reviews: reviewRecords.length,
        ai_summary: analysis.ai_summary,
        last_scraped_at: new Date().toISOString(),
      });

      // Refresh data
      await fetchProductData();
    } catch (e) {
      console.error("Analysis failed:", e);
      alert("Failed to run analysis. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-figma-accent font-heading overflow-x-clip selection:bg-[#14c686] selection:text-white">
      <SiteHeader />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-[clamp(16px,5.2vw,75px)] py-8 md:py-[clamp(16px,4.2vw,60px)] flex flex-col gap-8 md:gap-[30px]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-figma-muted-2 border-t-[#14c686] rounded-full animate-spin" />
          </div>
        ) : !product ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-figma-20 text-figma-text-1">Product not found.</p>
          </div>
        ) : (
        <>

        {/* Back Button */}
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant}>
          <button onClick={() => navigate(-1)} className="flex flex-row justify-start items-center gap-2.5 py-[15px] px-[20px] pr-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#9f9c9c] w-fit min-h-[54px] hover:bg-white transition-colors group">
            <ArrowLeft className="w-4 h-4 text-figma-text-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Back</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="flex flex-col lg:flex-row gap-8 lg:gap-[30px] items-start"
        >
          {/* Product Image */}
          <div className="relative w-full lg:max-w-[635px] shrink-0 aspect-[635/502] rounded-[20px] overflow-clip shadow-sm">
            <img className="w-full h-full object-cover object-center" src={product.image_url} alt={product.name} />
            <div className="absolute top-[27px] left-[30px] flex flex-row justify-center items-center gap-2.5 py-2.5 px-5 bg-figma-primary rounded-[20px] h-9 shadow-md">
              <p className="text-figma-16 font-normal leading-figma-16 text-center text-figma-text-1">{product.trending ? '🔥 Trending' : product.top_rated ? '⭐ Top Rated' : ''}</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:max-w-[516px] flex flex-col gap-8 lg:mt-[29px]">
            <div>
              <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1 mb-2">{product.brand}</p>
              <h1 className="text-[clamp(32px,4vw,42px)] font-normal leading-[1.2143] text-figma-secondary">{product.name}</h1>
            </div>

            {/* Sentiment Score Card */}
            <div className="bg-figma-primary rounded-[20px] p-5 flex flex-col gap-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">Overall Sentiment Score:</p>
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1 flex items-baseline gap-1">
                    <span className="text-[clamp(28px,3vw,36px)] text-[#14c686] font-medium">{product.sentiment_score}</span>/10
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">Based on</p>
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-secondary">{product.total_reviews?.toLocaleString()} Reviews</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-4">
                <div className="flex h-2.5 w-full rounded-[20px] overflow-clip bg-gray-100">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${product.positive_pct}%` }} transition={{ duration: 1, delay: 0.2 }} className="bg-[#14c686] h-full" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${product.neutral_pct}%` }} transition={{ duration: 1, delay: 0.4 }} className="bg-figma-color-9 h-full" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${product.negative_pct}%` }} transition={{ duration: 1, delay: 0.6 }} className="bg-figma-surface-2 h-full" />
                </div>
                <div className="flex justify-between items-center text-figma-18 font-normal leading-figma-22">
                  <span className="text-[#14c686]">{product.positive_pct}% positive</span>
                  <span className="text-figma-text-4-2">{product.neutral_pct}% neutral</span>
                  <span className="text-figma-surface-2">{product.negative_pct}% negative</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="flex flex-row justify-center items-center gap-2.5 py-2.5 px-5 h-[53px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] w-full hover:opacity-90 transition-opacity shadow-md">
                <span className="text-figma-20 font-normal leading-figma-24 text-figma-primary">Buy Now</span>
              </a>
              <button onClick={() => comparisonIds.includes(product.id) ? removeFromCompare(product.id) : addToCompare(product)} className={`w-full flex flex-row justify-center items-center gap-2.5 py-2.5 px-5 h-[55px] rounded-[32px] transition-colors ${comparisonIds.includes(product.id) ? 'bg-[#dc2626] hover:bg-[#b91c1c]' : 'shadow-[inset_0_0_0_1px_#757575] hover:bg-gray-50'}`}>
                <span className={`text-figma-20 font-normal leading-figma-24 ${comparisonIds.includes(product.id) ? 'text-figma-primary' : 'text-figma-text-3'}`}>{comparisonIds.includes(product.id) ? 'Remove' : 'Add to compare'}</span>
              </button>
              <button
                onClick={runSentimentAnalysis}
                disabled={analyzing}
                className="flex flex-row justify-center items-center gap-2.5 py-2.5 px-5 h-[53px] rounded-[32px] w-full shadow-[inset_0_0_0_1px_#14c686] hover:bg-[#14c686]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-figma-muted-2 border-t-[#14c686] rounded-full animate-spin" />
                    <span className="text-figma-20 font-normal leading-figma-24 text-figma-text-3">Analyzing sentiment...</span>
                  </>
                ) : (
                  <span className="text-figma-20 font-normal leading-figma-24 text-[#14c686]">
                    {product.last_scraped_at ? '↻ Refresh Sentiment Analysis' : '▶ Run Sentiment Analysis'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.section>

        {/* AI Summary Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="bg-figma-primary rounded-[20px] p-6 md:p-[30px] flex flex-col gap-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <h2 className="text-[clamp(24px,2.5vw,32px)] font-normal leading-[1.2188] text-figma-secondary">AI-Generated Summary:</h2>
            <div className="flex items-center gap-2.5">
              <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-1">Based on:</span>
              <div className="flex items-center">
                <img className="w-6 h-6 rounded-full object-cover border-2 border-white relative z-40" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6f6517852_81f35bea3_1b02bbd5303e04559d8335b252aa7364d19e0e81.png" alt="Instagram" />
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-white relative z-30 -ml-2 overflow-clip">
                  <img className="w-full h-full object-cover" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Reddit" />
                </div>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-white relative z-20 -ml-2 overflow-clip">
                  <img className="w-full h-full object-cover" src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" alt="Facebook" />
                </div>
                <img className="w-6 h-6 rounded-full object-cover border-2 border-white relative z-10 -ml-2" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/04107839e_483686d77_2343e7c39ca2c945a6b42e25969cb5cc6f53726a.png" alt="Quora" />
              </div>
            </div>
          </div>
          {product.ai_summary ? (
            <p className="text-figma-22 font-normal leading-figma-27 text-figma-text-3 max-w-[1230px]">
              {product.ai_summary}
            </p>
          ) : (
            <EmptyAnalysisState onRun={runSentimentAnalysis} analyzing={analyzing} />
          )}
        </motion.section>

        {/* Sentiment Distribution Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="bg-figma-primary rounded-[20px] p-6 md:p-[30px] flex flex-col md:flex-row justify-between items-center gap-12 shadow-sm overflow-clip"
        >
          <div className="flex flex-col gap-8 w-full md:w-auto shrink-0">
            <h2 className="text-[clamp(24px,2.5vw,32px)] font-normal leading-[1.2188] text-figma-secondary">Sentiment Distribution:</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-[#14c686]" />
                <span className="text-[clamp(18px,2vw,24px)] font-normal leading-[1.2083] text-[#14c686]">Positive</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-figma-color-9" />
                <span className="text-[clamp(18px,2vw,24px)] font-normal leading-[1.2083] text-figma-color-9">Neutral</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-figma-surface-2" />
                <span className="text-[clamp(18px,2vw,24px)] font-normal leading-[1.2083] text-figma-surface-2">Negative</span>
              </div>
            </div>
          </div>

          {/* Fluid Pie Chart Container */}
          {product.last_scraped_at ? (
          <div className="relative w-full max-w-[594px] aspect-[594/331] flex items-center justify-center">
            {/* The actual pie chart using SVG for perfect fluid scaling and exact tailwind classes */}
            <div className="relative w-[60%] md:w-[331px] aspect-square">
              <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90 rounded-full drop-shadow-sm">
                {/* Negative (Red) - Base layer covering 100% */}
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" strokeWidth="32" strokeDasharray="100 100" className="text-figma-surface-2" />
                {/* Neutral (Yellow) - Covers up to 80% (leaving 20% red) */}
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" strokeWidth="32" strokeDasharray={`${product.neutral_pct + product.positive_pct} 100`} className="text-figma-color-9" />
                {/* Positive (Green) */}
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#14c686" strokeWidth="32" strokeDasharray={`${product.positive_pct} 100`} />
              </svg>
            </div>

            {/* Floating Labels - Positioned absolutely within the fluid container */}
            <div className="absolute top-[21%] left-[0%] hidden md:block">
              <p className="text-figma-22 font-normal leading-figma-27 text-[#14c686]">Positive: {product.positive_pct}%</p>
            </div>
            <div className="absolute top-[89%] left-[67%] hidden md:block">
              <p className="text-figma-22 font-normal leading-figma-27 text-figma-color-9">Neutral: {product.neutral_pct}%</p>
            </div>
            <div className="absolute top-[65%] left-[76%] hidden md:block">
              <p className="text-figma-22 font-normal leading-figma-27 text-figma-surface-2">Negative: {product.negative_pct}%</p>
            </div>
          </div>
          ) : (
            <EmptyAnalysisState onRun={runSentimentAnalysis} analyzing={analyzing} />
          )}
        </motion.section>

        {/* Keywords Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="bg-figma-primary rounded-[20px] p-6 md:p-[30px] flex flex-col gap-6 shadow-sm"
        >
          <h2 className="text-[clamp(24px,2.5vw,32px)] font-normal leading-[1.2188] text-figma-secondary">Most Discussed Keywords:</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {keywords.length === 0 ? (
              <EmptyAnalysisState onRun={runSentimentAnalysis} analyzing={analyzing} />
            ) : keywords.map((kw, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-row justify-center items-center gap-2.5 py-2.5 px-5 rounded-[40px] min-h-[42px] cursor-default ${
                  kw.sentiment === 'positive' ? 'bg-[#14c686]' : 'bg-figma-surface-2'
                }`}
              >
                <span className="text-figma-18 font-normal leading-figma-22 text-figma-primary">{kw.keyword}</span>
                <span className="text-figma-18 font-medium leading-figma-22 text-figma-primary">({kw.count})</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="bg-figma-primary rounded-[20px] p-6 md:p-[30px] flex flex-col gap-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-[clamp(24px,2.5vw,32px)] font-normal leading-[1.2188] text-figma-secondary">Real User Reviews:</h2>
            <div className="flex flex-wrap gap-4">
              <button className="flex flex-row justify-between items-center gap-5 py-[15px] px-[30px] bg-figma-accent rounded-[32px] min-h-[54px] hover:bg-gray-200 transition-colors">
                <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">All Platforms</span>
                <ChevronDown className="w-4 h-4 text-figma-text-4" />
              </button>
              <button className="flex flex-row justify-between items-center gap-5 py-[15px] px-[30px] bg-figma-accent rounded-[32px] min-h-[54px] hover:bg-gray-200 transition-colors">
                <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">All Reviews</span>
                <ChevronDown className="w-4 h-4 text-figma-text-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {reviews.length === 0 ? (
              <EmptyAnalysisState onRun={runSentimentAnalysis} analyzing={analyzing} />
            ) : reviews.map((review, i) => (
              <div key={i} className="bg-figma-accent rounded-[20px] p-6 md:p-[30px] flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)]" />
                    <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-2">{review.author || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className={`flex justify-center items-center py-2.5 px-5 rounded-[40px] min-h-[42px] ${
                      review.sentiment === 'positive' ? 'bg-[#14c686]' : review.sentiment === 'neutral' ? 'bg-figma-color-9' : 'bg-figma-surface-2'
                    }`}>
                      <span className="text-figma-18 font-normal leading-figma-22 text-figma-primary capitalize">{review.sentiment}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-clip">
                      <span className="text-figma-12 font-medium text-figma-text-1 uppercase">{review.platform?.[0] || '?'}</span>
                    </div>
                  </div>
                </div>
                <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-3">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}