import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { useComparison } from "@/hooks/useComparison";
import ShareButtons from "@/components/ShareButtons";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const HeaderLogo = () => (
  <div className="relative w-[157px] h-11 shrink-0">
    <img className="w-[5px] h-[5px] absolute top-0 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/17fbc2b79_92be05b3b_157_2104_157_1586.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-0 left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f4fffdeb3_cd2e1e469_157_2104_157_1594.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/412245464_b5e64444f_157_2104_157_1602.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-0 left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/dd8362671_29305bc82_157_2104_157_1606.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f90187fa0_f88e5a361_157_2104_157_1587.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-1.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6047a3319_cc02f6cd7_157_2104_157_1595.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[11px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/ff2a64efb_2c187280b_157_2104_157_1603.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[17px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/cc5a419e4_15af6ce78_157_2104_157_1607.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-[22px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c23c15c98_2db6ca3d5_157_2104_157_1611.svg" alt="V" />
    <img className="w-[5px] h-[5px] absolute top-1.5 left-7" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/90a3709b4_d1e14c655_157_2104_157_1617.svg" alt="V" />
    <img className="w-[17px] h-[25px] absolute top-[7px] left-[47px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6ba8260da_f5514f6d2_157_2104_157_1580.svg" alt="V" />
    <img className="w-4 h-[25px] absolute top-[7px] left-[66px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/0cec1998d_5a153f972_157_2104_157_1581.svg" alt="V" />
    <img className="w-5 h-[25px] absolute top-[7px] left-[84px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1014821e9_ec02b1e12_157_2104_157_1582.svg" alt="V" />
    <img className="w-[17px] h-[26px] absolute top-1.5 left-[104px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/74fbb12d0_459e10f57_157_2104_157_1583.svg" alt="V" />
    <img className="w-[18px] h-[25px] absolute top-[7px] left-[122px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d7ec1f58a_21be74424_157_2104_157_1584.svg" alt="V" />
    <img className="w-[19px] h-[25px] absolute top-[7px] left-[138px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/675cd9ff9_1be2fc066_157_2104_157_1585.svg" alt="V" />
  </div>
);

const FooterLogo = () => (
  <div className="relative w-full max-w-[286px] h-20 shrink-0">
    <img className="w-[9px] h-[9px] absolute top-0 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/89b57a557_a50ea91bc_209_4250.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-0 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/6c5dfeec0_69a1a6cfd_209_4258.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-0 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/0bf39316d_6f83872bc_209_4266.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-0 left-[30px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d757af268_6763a97a7_209_4270.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-0" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/c15ddc358_5baff6ea4_209_4251.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-2.5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/57e006f3d_8fffc0aa9_209_4259.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-5" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/f60634a2a_b78e0fb55_209_4267.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[30px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/937d230a0_164fd8998_209_4271.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[41px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/dccea5bb5_2e9f6f628_209_4275.svg" alt="V" />
    <img className="w-[9px] h-[9px] absolute top-2.5 left-[51px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/67b7c8d75_a1e6402db_209_4281.svg" alt="V" />
    <img className="w-[31px] h-[45px] absolute top-3 left-[86px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/a04652bc8_7af3b483a_209_4244.svg" alt="V" />
    <img className="w-7 h-[45px] absolute top-3 left-[120px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/35ba10647_9e4de039c_209_4245.svg" alt="V" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[152px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/e38af51b6_d8143f4c7_209_4246.svg" alt="V" />
    <img className="w-8 h-[46px] absolute top-3 left-[189px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/d6f5ad67b_7e075af3b_209_4247.svg" alt="V" />
    <img className="w-8 h-[45px] absolute top-3 left-[222px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/5d725e129_255dad781_209_4248.svg" alt="V" />
    <img className="w-[35px] h-[45px] absolute top-3 left-[251px]" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/1c9e4596e_e870166db_209_4249.svg" alt="V" />
  </div>
);

function CompareCard({ product, onRemove, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-figma-primary rounded-[30px] p-5 flex flex-col gap-5"
    >
      <img className="rounded-[20px] w-full aspect-[595/360] object-cover" src={product.image_url} alt={product.name} />
      <div>
        <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">{product.brand}</p>
        <h3 className="text-[clamp(23px,2.92vw,42px)] font-normal leading-[1.2143] text-figma-secondary mt-1">{product.name}</h3>
      </div>
      <div className="rounded-[20px] border border-gray-100 p-5 flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">Overall Sentiment Score:</p>
            <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1 mt-1">
              <span className="text-[clamp(20px,2.5vw,36px)] text-[#14c686]">{product.sentiment_score}</span>/10
            </p>
          </div>
          <div className="text-right">
            <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-1">Based on</p>
            <p className="text-figma-20 font-normal leading-figma-24 text-figma-secondary mt-1">{(product.total_reviews || 0).toLocaleString()} Reviews</p>
          </div>
        </div>
        <div className="flex h-2.5 rounded-full overflow-clip w-full bg-figma-surface-2">
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${product.positive_pct || 0}%` }} className="bg-[#14c686] h-full" />
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${product.neutral_pct || 0}%` }} className="bg-figma-color-9 h-full" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-figma-18 font-normal leading-figma-22 text-[#14c686]">{product.positive_pct || 0}% positive</p>
          <p className="text-figma-18 font-normal leading-figma-22 text-figma-text-4-2">{product.neutral_pct || 0}% neutral</p>
          <p className="text-figma-18 font-normal leading-figma-22 text-figma-surface-2">{product.negative_pct || 0}% negative</p>
        </div>
      </div>
      <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer" className="w-full py-[15px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] rounded-[32px] text-figma-20 font-normal leading-figma-24 text-figma-primary hover:opacity-90 transition-opacity text-center">
        Buy Now
      </a>
      <div className="flex gap-2.5 w-full">
        <button onClick={() => navigate(`/ProductDetail/${product.id}`)} className="flex-1 py-[15px] rounded-[32px] shadow-[inset_0_0_0_1px_#757575] text-figma-20 font-normal leading-figma-24 text-figma-text-3 hover:bg-gray-50 transition-colors">
          View Details
        </button>
        <button onClick={() => onRemove(product.id)} className="w-[140px] shrink-0 py-[15px] rounded-[32px] shadow-[inset_0_0_0_1px_#cc2020] text-figma-20 font-normal leading-figma-24 text-figma-surface-2 hover:bg-red-50 transition-colors">
          Remove
        </button>
      </div>
    </motion.div>
  );
}

export default function ComparisonPage2Products() {
  const navigate = useNavigate();
  const { comparisonIds, removeFromCompare, clearComparison } = useComparison();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (comparisonIds.length < 2) {
      navigate('/ComparisonPage0Products');
      return;
    }
    const loadData = async () => {
      try {
        const [p1, p2] = await Promise.all([
          base44.entities.Product.get(comparisonIds[0]),
          base44.entities.Product.get(comparisonIds[1]),
        ]);
        const [kw1, kw2] = await Promise.all([
          base44.entities.Keyword.filter({ product_id: comparisonIds[0] }, '-count', 10),
          base44.entities.Keyword.filter({ product_id: comparisonIds[1] }, '-count', 10),
        ]);
        p1._keywords = kw1;
        p2._keywords = kw2;
        setProducts([p1, p2]);
      } catch (e) {
        console.error("Failed to load comparison data:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [comparisonIds, navigate]);

  if (loading || products.length < 2) {
    return (
      <div className="min-h-screen bg-figma-accent flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-figma-muted-2 border-t-[#14c686] rounded-full animate-spin" />
      </div>
    );
  }

  const [p1, p2] = products;
  const higher = (p1.sentiment_score || 0) >= (p2.sentiment_score || 0) ? p1 : p2;
  const lower = (p1.sentiment_score || 0) >= (p2.sentiment_score || 0) ? p2 : p1;
  const totalReviews = (p1.total_reviews || 0) + (p2.total_reviews || 0);
  const shareText = `Check out my product comparison on Revsta: ${p1.name} (${p1.sentiment_score}/10) vs ${p2.name} (${p2.sentiment_score}/10) — ${higher.name} wins!`;

  return (
    <div className="max-w-[1440px] w-full mx-auto bg-figma-accent font-heading overflow-clip relative">
      <SiteHeader />

      <main className="px-5 md:px-[clamp(16px,5.2vw,75px)] pt-[clamp(16px,4.2vw,60px)] pb-[clamp(25px,6.9vw,100px)] flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px]">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2.5 py-[15px] px-[20px] rounded-[32px] shadow-[inset_0_0_0_1px_#9f9c9c] w-fit hover:bg-gray-50 transition-colors">
            <img className="w-[7px] h-3" src="https://media.base44.com/images/public/6a52896674219eaa2fe9325d/79c163fc7_e94e91ab6_74_649_57995_3444.svg" alt="" />
            <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Back</span>
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <h1 className="text-[clamp(35px,4.44vw,64px)] font-normal leading-[1.0] text-figma-secondary">Product Comparison</h1>
            <div className="flex flex-wrap items-center gap-2.5">
              <ShareButtons title={shareText} url={window.location.href} />
              <button onClick={clearComparison} className="flex justify-center items-center py-[15px] px-[30px] rounded-[32px] shadow-[inset_0_0_0_1px_#9f9c9c] h-[54px] hover:bg-gray-50 transition-colors">
                <span className="text-figma-18 font-normal leading-figma-22 text-figma-text-4">Clear All</span>
              </button>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[rgba(20,198,134,0.05)] rounded-[20px] shadow-[inset_0_0_0_1px_rgba(20,198,134,0.20)] p-5 md:p-[30px] mt-[30px]">
          <h2 className="text-[clamp(18px,2.22vw,32px)] font-normal leading-[1.2188] text-figma-secondary mb-5">AI Verdict</h2>
          <p className="text-figma-22 font-normal leading-figma-27 text-figma-text-3 max-w-[1230px]">
            Based on sentiment analysis across {totalReviews.toLocaleString()} reviews, <span className="text-[#14c686]">{higher.name}</span> has the highest overall sentiment score ({higher.sentiment_score}/10). However, <span className="text-[#14c686]">{lower.name}</span> may excel in specific features based on user feedback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CompareCard product={p1} onRemove={removeFromCompare} navigate={navigate} />
          <CompareCard product={p2} onRemove={removeFromCompare} navigate={navigate} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-figma-primary rounded-[20px] p-5 md:p-[30px] w-full flex flex-col overflow-x-auto">
          <h2 className="text-[clamp(18px,2.22vw,32px)] font-normal leading-[1.2188] text-figma-secondary mb-10 shrink-0">Sentiment Distribution Comparison:</h2>
          <div className="relative flex-1 flex min-h-[350px] min-w-[800px]">
            <div className="flex flex-col justify-between items-end pr-4 w-[60px] text-figma-20 font-normal leading-figma-24 text-figma-text-1 shrink-0 z-10 pb-[clamp(16px,2.8vw,40px)]">
              <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
            </div>
            <div className="flex-1 relative border-b-2 border-figma-text-1/20 flex items-end justify-around pb-[clamp(16px,2.8vw,40px)]">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-[clamp(16px,2.8vw,40px)]">
                <div className="w-full h-0 border-t-2 border-dashed border-figma-text-1/20" />
                <div className="w-full h-0 border-t-2 border-dashed border-figma-text-1/20" />
                <div className="w-full h-0 border-t-2 border-dashed border-figma-text-1/20" />
                <div className="w-full h-0 border-t-2 border-dashed border-figma-text-1/20" />
                <div className="w-full h-0" />
              </div>
              {[
                { label: 'Positive', val1: p1.positive_pct || 0, val2: p2.positive_pct || 0 },
                { label: 'Neutral', val1: p1.neutral_pct || 0, val2: p2.neutral_pct || 0 },
                { label: 'Negative', val1: p1.negative_pct || 0, val2: p2.negative_pct || 0 },
              ].map((group) => (
                <div key={group.label} className="relative z-10 flex gap-2.5 items-end h-full w-full max-w-[250px] justify-center">
                  <motion.div initial={{ height: 0 }} whileInView={{ height: `${group.val1}%` }} className="w-[120px] bg-[#14c686]" />
                  <motion.div initial={{ height: 0 }} whileInView={{ height: `${group.val2}%` }} className="w-[120px] bg-[#22d3ee]" />
                  <span className="absolute -bottom-10 text-figma-20 font-normal leading-figma-24 text-figma-text-1">{group.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-16 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-[#14c686]" />
              <span className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.2083] text-[#14c686]">{p1.name}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-[#22d3ee]" />
              <span className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.2083] text-[#22d3ee]">{p2.name}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-figma-primary rounded-[20px] p-5 md:p-[30px] w-full">
          <h2 className="text-[clamp(18px,2.22vw,32px)] font-normal leading-[1.2188] text-figma-secondary mb-[clamp(16px,2.8vw,40px)] md:mb-[clamp(16px,4.2vw,60px)]">Top Keywords Comparison:</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(16px,2.8vw,40px)] md:gap-[clamp(16px,4.2vw,60px)]">
            {products.map((product) => {
              const keywords = product._keywords || [];
              const liked = keywords.filter(k => k.sentiment === 'positive');
              const disliked = keywords.filter(k => k.sentiment === 'negative');
              return (
                <div key={product.id}>
                  <h3 className="text-[clamp(14px,1.67vw,24px)] font-normal leading-[1.2083] text-figma-secondary mb-[30px]">{product.name}</h3>
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-3 mb-3.5">Most Liked</p>
                  <div className="flex flex-wrap gap-2.5 mb-[30px]">
                    {liked.length === 0 ? (
                      <p className="text-figma-18 text-figma-text-1">No data yet.</p>
                    ) : liked.map((kw, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2.5 px-5 rounded-[40px] bg-[#14c686]">
                        <span className="text-figma-18 font-normal leading-figma-22 text-figma-primary">{kw.keyword}</span>
                        <span className="text-figma-18 font-medium leading-figma-22 text-figma-primary">({kw.count})</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-figma-20 font-normal leading-figma-24 text-figma-text-3 mb-3.5">Most Disliked</p>
                  <div className="flex flex-wrap gap-2.5">
                    {disliked.length === 0 ? (
                      <p className="text-figma-18 text-figma-text-1">No data yet.</p>
                    ) : disliked.map((kw, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2.5 px-5 rounded-[20px] bg-figma-surface-2">
                        <span className="text-figma-18 font-normal leading-figma-22 text-figma-primary">{kw.keyword}</span>
                        <span className="text-figma-18 font-medium leading-figma-22 text-figma-primary">({kw.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}