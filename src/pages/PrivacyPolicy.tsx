import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Privacy Policy
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  1. Information We Collect
                </h2>
                <p className="text-foreground mb-4">
                  At Moves International, we collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Fill out consultation or application forms</li>
                  <li>Contact us for information about our services</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Use our website and online services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  2. How We Use Your Information
                </h2>
                <p className="text-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Provide educational counselling and application assistance services</li>
                  <li>Communicate with you about our services and your applications</li>
                  <li>Send you updates about study opportunities and programs</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  3. Information Sharing
                </h2>
                <p className="text-foreground mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Educational institutions for application purposes</li>
                  <li>Service providers who assist us in our operations</li>
                  <li>Government agencies when required by law</li>
                </ul>
                <p className="text-foreground mt-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  4. Marketing Communications
                </h2>
                <p className="text-foreground mb-4">
                  If you consent to receive marketing communications, we may send you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Information about study opportunities and scholarships</li>
                  <li>Updates about our services and events</li>
                  <li>Educational content and resources</li>
                </ul>
                <p className="text-foreground mt-4">
                  You can opt out of marketing communications at any time by contacting us or following the unsubscribe instructions in our emails.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  5. Data Security
                </h2>
                <p className="text-foreground">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  6. Your Rights
                </h2>
                <p className="text-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with relevant authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  7. Contact Us
                </h2>
                <p className="text-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground">
                    <strong>Moves International</strong><br />
                    Email: privacy@movesinternational.com<br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;