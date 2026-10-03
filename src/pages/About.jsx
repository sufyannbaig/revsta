import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";

export default function About() {
  return (
    <InfoPageLayout title="About Revsta">
      <p className="text-[clamp(16px,1.8vw,22px)] text-figma-text-3">Where Real Reviews Stand.</p>

      <p>Revsta was built on a simple idea: product reviews should come from real people, not manipulated ratings. In an era where fake reviews and paid endorsements are everywhere, we cut through the noise by analyzing authentic conversations happening on social media.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">How It Works</h2>
      <p>We use AI-powered sentiment analysis to scan discussions across Reddit, YouTube, and Meta platforms. Our models identify what real users are saying about products — the good, the bad, and the nuanced — and translate that into clear sentiment scores you can trust.</p>
      <p>Every product on Revsta has a sentiment score from 1 to 10, based on aggregated real-world opinions. You can see the breakdown of positive, neutral, and negative sentiment, explore the most common keywords people use, and read actual reviews from social media.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Why Trust Us?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Real Sources:</strong> Our data comes from actual social media discussions, not paid reviews or manufacturer claims</li>
        <li><strong>AI-Powered:</strong> Advanced sentiment models analyze thousands of data points to produce fair, balanced scores</li>
        <li><strong>Transparent:</strong> We show you the breakdown — positive, neutral, and negative — so you can judge for yourself</li>
        <li><strong>Community-Driven:</strong> Can't find a product? Request it and our AI will research it across social media</li>
      </ul>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Affiliate Disclosure</h2>
      <p>Revsta earns revenue through the Amazon Associates Program. When you click a "Buy Now" link and make a purchase, we may earn a commission at no extra cost to you. This does not affect our sentiment scores — they are generated entirely from social media analysis, not influenced by any brand or retailer.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Our Mission</h2>
      <p>We believe consumers deserve honest, unfiltered product insights. Revsta exists to amplify real voices and help you make better buying decisions — one authentic review at a time.</p>
    </InfoPageLayout>
  );
}