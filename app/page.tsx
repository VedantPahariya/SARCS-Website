/**
 * Home Page
 * 
 * Purpose: Landing page for SARCS Lab website.
 * Displays hero, news, highlights, stats, and affiliations.
 */

import { Section, SectionHeader, Quote } from '@/components/ui';
import {
  HeroSection,
  NewsSection,
  AffiliationsSection,
} from '@/components/home';

// Import data - PLACEHOLDER: In production, these would be fetched at build time
import labInfoData from '@/data/lab-info.json';
import newsData from '@/data/news.json';
import type { NewsItem, Affiliation } from '@/types';

// Type assertions for imported JSON
const labInfo = labInfoData.lab;
const news = newsData as NewsItem[];
const affiliations = labInfo.affiliations as Affiliation[];

/**
 * Home Page Component
 * 
 * Static home page featuring:
 * - Hero section with lab identity
 * - Latest news and updates
 * - Research highlights
 * - Lab statistics
 * - Institutional affiliations
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        labName={labInfo.name}
        fullName={labInfo.fullName}
        mission={labInfo.mission}
        logoSrc={labInfo.logo}
        // PLACEHOLDER: Add your own hero background image
        // backgroundImage="/images/hero-bg.jpg"
      />

      {/* News Section */}
      <Section className="pb-4">
        <SectionHeader
          title="Latest News"
          subtitle="Recent updates, publications, and announcements from the lab."
        />
        <NewsSection news={news} maxItems={5} />
      </Section>

      {/* Inspirational Quote */}
      <div className="container-page py-4">
        <Quote
          text="Research is to see what everybody else has seen, and to think what nobody else has thought."
          author="Albert Szent-Györgyi"
          title="Nobel Laureate in Physiology"
          variant="centered"
        />
      </div>

      {/* Affiliations Section */}
      <Section className="pt-4">
        <SectionHeader
          title="Our Affiliations"
          subtitle="Proud to be part of these institutions and collaborations."
          align="center"
        />
        <AffiliationsSection affiliations={affiliations} />
      </Section>
    </>
  );
}
