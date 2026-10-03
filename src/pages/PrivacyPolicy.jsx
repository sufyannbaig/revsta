import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";

export default function PrivacyPolicy() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <p className="text-figma-text-4">Last updated: July 2025</p>

      <p>Revsta ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Information We Collect</h2>
      <p><strong>Account Information:</strong> When you create an account, we collect your email address and authentication credentials. We do not store passwords in plain text.</p>
      <p><strong>Product Requests:</strong> When you submit a product request, we store the product name, brand, category, and any notes you provide.</p>
      <p><strong>Usage Data:</strong> We may collect anonymized analytics data about how you interact with our site, including pages visited and features used.</p>
      <p><strong>Comparison Data:</strong> Your product comparison selections are stored locally in your browser and are not transmitted to our servers.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide and maintain our service</li>
        <li>Research and add products you request</li>
        <li>Improve our sentiment analysis and product recommendations</li>
        <li>Communicate with you about your account or requests</li>
        <li>Detect, prevent, and address technical issues or fraud</li>
      </ul>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Third-Party Services</h2>
      <p>We use the following third-party services that may collect data governed by their own privacy policies:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Amazon Associates:</strong> Product purchase links may contain affiliate tracking tags</li>
        <li><strong>AI/LLM Providers:</strong> We use AI models to analyze sentiment from public social media data (Reddit, YouTube, Meta)</li>
        <li><strong>Authentication Providers:</strong> For Google sign-in, if applicable</li>
      </ul>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Data From Social Media</h2>
      <p>Our sentiment analysis is based on publicly available discussions from platforms like Reddit, YouTube, and Meta. We do not access private accounts or personal data from these platforms. We aggregate and anonymize this data to produce sentiment scores.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Cookies</h2>
      <p>We use essential cookies to maintain your session and authentication state. We do not use third-party advertising cookies.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Your Rights</h2>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Opt out of communications at any time</li>
        <li>Request export of your data</li>
      </ul>
      <p>To exercise these rights, please contact us at the email provided below.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Data Security</h2>
      <p>We implement reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.</p>

      <h2 className="text-figma-24 font-normal text-figma-secondary mt-8">Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at support@revsta.com.</p>
    </InfoPageLayout>
  );
}