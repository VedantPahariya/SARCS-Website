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
 * Two-column layout with:
 * - Contact information (left)
 * - Open positions (right)
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with our lab or explore opportunities to join our research team."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info - Left */}
          <div>
            <SectionHeader
              title="Get in Touch"
              subtitle="We'd love to hear from you."
            />
            <ContactInfo
              address={labInfo.address}
              email={labInfo.email}
              phone={labInfo.phone}
            />
          </div>

          {/* Openings - Right */}
          <div>
            <SectionHeader
              title="Join Our Team"
              subtitle="Current openings and opportunities."
            />
            <OpeningsSection openings={openings} />
          </div>
        </div>
      </Section>
    </>
  );
}
