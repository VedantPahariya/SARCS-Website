/**
 * Contact Page
 * 
 * Purpose: Dedicated contact page with contact information and open positions.
 * Separated from blog for better organization.
 */

import type { Metadata } from 'next';
import { PageHeader, Section, SectionHeader } from '@/components/ui';
import { ContactInfo, OpeningsSection } from '@/components/blog';
import type { Opening } from '@/types';

// Import data
import openingsData from '@/data/openings.json';
import labInfoData from '@/data/lab-info.json';

const openings = openingsData as Opening[];
const labInfo = labInfoData.lab;

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with SARCS Lab. Find contact information and explore opportunities to join our research team.',
};

/**
 * Contact Page Component
 * 
 * Stacked vertical layout with:
 * - Contact information (top)
 * - Open positions (bottom)
 * Both sections centered
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with our lab or explore opportunities to join our research team."
      />

      {/* Contact Info Section */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Get in Touch"
            subtitle="We'd love to hear from you."
            align="center"
          />
          <div className="mx-auto max-w-2xl">
            <ContactInfo
              address={labInfo.address}
              email={labInfo.email}
              phone={labInfo.phone}
            />
          </div>
        </div>
      </Section>

      {/* Openings Section */}
      <Section className="pt-0">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Join Our Team"
            subtitle="Current openings and opportunities."
            align="center"
          />
          <OpeningsSection openings={openings} />
        </div>
      </Section>
    </>
  );
}
