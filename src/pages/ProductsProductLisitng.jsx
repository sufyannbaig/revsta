import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useComparison } from "@/hooks/useComparison";
import { base44 } from "@/api/base44Client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ProductsProductLisitng() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const { comparisonCount, comparisonIds, addToCompare, removeFromCompare } = useComparison();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minSentiment, setMinSentiment] = useState(0);
  const [sortBy, setSortBy] = useState("most_positive");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await base44.entities.Product.list('-sentiment_score');
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const CATEGORIES = ["All", "Smart Phones", "Earbuds", "Smart Watches", "Laptops", "Tablets", "Accessories"];

  const brands = [...new Set(products.map(p => p.brand))];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
    .filter(p => (p.sentiment_score || 0) >= minSentiment)
    .sort((a, b) => {
      if (sortBy === "most_positive") return (b.sentiment_score || 0) - (a.sentiment_score || 0);
      if (sortBy === "least_positive") return (a.sentiment_score || 0) - (b.sentiment_score || 0);
      if (sortBy === "most_reviews") return (b.total_reviews || 0) - (a.total_reviews || 0);
      if (sortBy === "name_az") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-figma-accent font-heading flex flex-col overflow-x-clip">
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-[clamp(16px,5.2vw,75px)] pt-[clamp(16px,4.2vw,60px)] pb-[clamp(25px,6.9vw,100px)] flex flex-col gap-8">

        {/* Top Section */}
        <div className="flex flex-col gap-6">
          <button onClick={() => navigate(-1)} className="flex flex-row justify-start items-center gap-2.5 py-[15px] px-[20px] pr-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#9f9c9c] w-fit min-h-[54px] hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-4 h-4 text-figma-text-4" />
            <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Back</span>
          </button>
          <h1 className="text-[clamp(35px,4.44vw,64px)] font-normal leading-[1.0] text-figma-secondary">Products</h1>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-[20px] xl:gap-[30px] items-start">

          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[308px] shrink-0 bg-figma-primary rounded-[20px] p-[30px] flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-figma-secondary" />
              <h2 className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.0] text-figma-secondary">Filters</h2>
            </div>
            <div className="w-full h-px bg-figma-muted-2" />

            {/* Category */}
            <div className="flex flex-col gap-3">
              <h3 className="text-figma-18 font-normal leading-figma-18 text-figma-secondary">Category:</h3>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full py-2.5 px-5 pr-10 bg-figma-accent rounded-[32px] min-h-11 text-figma-16 font-normal leading-figma-19 text-figma-text-4 outline-none cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-figma-text-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <h3 className="text-figma-18 font-normal leading-figma-18 text-figma-secondary">Brand:</h3>
              <div className="flex flex-col gap-3">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                    <div className={`w-3.5 h-3.5 rounded-[2px] flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-[#14c686]' : 'bg-figma-muted-2 group-hover:bg-gray-300'}`}>
                      {selectedBrands.includes(brand) && <span className="text-white text-[10px] leading-none">✓</span>}
                    </div>
                    <span className="text-figma-16 font-normal leading-figma-16 text-figma-text-1">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sentiment Score */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-figma-18 font-normal leading-figma-18 text-figma-secondary">
                Minimum Sentiment Score: <span className="text-[#14c686]">{minSentiment.toFixed(1)}</span>
              </h3>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minSentiment}
                onChange={(e) => setMinSentiment(parseFloat(e.target.value))}
                className="w-full accent-[#14c686] cursor-pointer"
              />
            </div>
          </aside>

          {/* Right Main Area */}
          <div className="flex-1 flex flex-col gap-6 w-full">

            {/* Search & Sort Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center w-full">
              <div className="flex-1 flex items-center bg-figma-primary rounded-[50px] min-h-[54px] pl-6 pr-1.5 shadow-sm w-full">
                <input
                  type="text"
                  placeholder="Search for products (e.g., Iphone 15, earbuds etc)"
                  className="flex-1 bg-transparent outline-none text-figma-18 font-normal leading-figma-22 text-figma-text-4 placeholder:text-figma-text-4 truncate"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] bg-[#14c686] rounded-[32px] h-[42px] shrink-0 hover:bg-[#12b379] transition-colors">
                  <Search className="w-5 h-5 text-figma-primary" />
                  <span className="text-figma-20 font-normal leading-figma-24 text-figma-primary hidden sm:inline-block">Search</span>
                </button>
              </div>
              <div className="relative w-full md:w-[217px] shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full py-[15px] px-[30px] pr-10 bg-figma-primary rounded-[32px] min-h-[54px] shadow-sm text-figma-18 font-normal leading-figma-22 text-figma-text-4 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <option value="most_positive">Most Positive</option>
                  <option value="least_positive">Least Positive</option>
                  <option value="most_reviews">Most Reviews</option>
                  <option value="name_az">Name (A-Z)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-figma-text-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <p className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Showing {filteredProducts.length} products</p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px] xl:gap-[30px] w-full">
              {loading ? (
                <p className="col-span-full text-center text-figma-text-1 py-8">Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center gap-4 py-12 text-center">
                  <p className="text-figma-18 text-figma-text-1">No products found.</p>
                  <button onClick={() => navigate('/RequestProduct')} className="flex items-center gap-2 py-[12px] px-[24px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] text-figma-16 font-normal text-figma-primary hover:opacity-90 transition-opacity">
                    Request This Product
                  </button>
                </div>
              ) : filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-figma-accent rounded-[20px] p-2.5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/ProductDetail/${product.id}`)}
                >
                  <div className="relative w-full h-[280px] rounded-[20px] overflow-clip bg-white flex items-center justify-center p-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    {product.trending && (
                      <div className="absolute top-[20px] left-[26px] flex flex-row justify-start items-center gap-2.5 py-[5px] px-[10px] bg-figma-primary rounded-[20px] shadow-sm">
                        <span className="text-figma-12 font-normal leading-figma-12 text-center text-figma-text-1">🔥 Trending</span>
                      </div>
                    )}
                  </div>

                  <div className="px-1.5 flex flex-col gap-1">
                    <span className="text-figma-16 font-normal leading-figma-16 text-figma-text-1">{product.brand}</span>
                    <h3 className="text-figma-18 font-normal leading-figma-18 text-figma-text-2 truncate">{product.name}</h3>

                    <div className="flex items-end justify-between mt-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-figma-14 font-light leading-figma-14 text-figma-text-1">Sentiment</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[22px] font-normal leading-figma-20 text-[#14c686]">{product.sentiment_score}</span>
                          <span className="text-figma-18 font-normal leading-figma-20 text-figma-text-2">/10</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-figma-14 font-light leading-figma-14 text-right text-figma-text-1">Based on:</span>
                        <span className="text-figma-14 font-normal leading-figma-14 text-[#262628]">{product.total_reviews} Reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 px-1.5 pb-1.5 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
                    <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-row justify-center items-center py-2.5 px-5 h-[39px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] hover:opacity-90 transition-opacity">
                      <span className="text-figma-16 font-normal leading-figma-19 text-figma-primary whitespace-nowrap">Buy Now</span>
                    </a>
                    <button onClick={() => comparisonIds.includes(product.id) ? removeFromCompare(product.id) : addToCompare(product)} className={`flex-[1.2] flex flex-row justify-center items-center py-2.5 px-5 h-[39px] rounded-[32px] transition-colors ${comparisonIds.includes(product.id) ? 'bg-[#dc2626] hover:bg-[#b91c1c]' : 'shadow-[inset_0_0_0_1px_#757575] hover:bg-gray-100'}`}>
                      <span className={`text-figma-16 font-normal leading-figma-19 whitespace-nowrap ${comparisonIds.includes(product.id) ? 'text-figma-primary' : 'text-figma-text-3'}`}>{comparisonIds.includes(product.id) ? 'Remove' : 'Add to compare'}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}