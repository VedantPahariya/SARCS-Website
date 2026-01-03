/**
 * Contact Info Component
 * 
 * Purpose: Display lab contact information.
 */

'use client';

import { Card, EmailButton } from '@/components/ui';
import { MapPin, Phone } from 'lucide-react';

interface ContactInfoProps {
  address: string[];
  email: string;
  phone?: string;
}

/**
 * ContactInfo Component
 * 
 * Contact details display with:
 * - Address
 * - Email
 * - Phone (optional)
 */
export function ContactInfo({ address, email, phone }: ContactInfoProps) {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-50">
        Contact Information
      </h3>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex gap-3">
          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
          <address className="not-italic text-surface-600 dark:text-surface-400">
            {address.map((line, index) => (
              <span key={index}>
                {line}
                {index < address.length - 1 && <br />}
              </span>
            ))}
          </address>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <EmailButton email={email} size="md" showLabel />
        </div>

        {/* Phone */}
        {phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
            <a
              href={`tel:${phone}`}
              className="text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
            >
              {phone}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
