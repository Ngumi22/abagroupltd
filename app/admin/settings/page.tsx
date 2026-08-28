import { BranchesSection } from "@/components/admin/settings/branches-section";
import { ContactPhonesSection } from "@/components/admin/settings/contact-phones-section";
import { ContactEmailsSection } from "@/components/admin/settings/contact-emails-section";
import { SocialLinksSection } from "@/components/admin/settings/social-links-section";
import {
  getBranches,
  getContactPhones,
  getContactEmails,
  getSocialLinks,
} from "@/lib/data/contact-info";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { requirePageAccess } from "@/lib/auth/require-page-access";
import { TestimonialsManager } from "@/components/admin/testimonials/manage";
import { getTestimonials } from "@/lib/data/reviews";

export default async function AdminSettingsPage() {
  await requirePageAccess({ contactInfo: ["read"] });
  <TestimonialsManager testimonials={[]} />;
  const [branches, phones, emails, socialLinks, testimonials] =
    await Promise.all([
      getBranches(),
      getContactPhones(),
      getContactEmails(),
      getSocialLinks(),
      getTestimonials(),
    ]);

  return (
    <AdminPageFrame
      eyebrow="Company settings"
      title="Contact information"
      description="Manage the office locations, phone numbers, emails, and social accounts shown across the public site."
    >
      <div className="grid gap-6">
        <BranchesSection branches={branches} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ContactPhonesSection phones={phones} />
          <ContactEmailsSection emails={emails} />
        </div>
        <SocialLinksSection socialLinks={socialLinks} />
        <TestimonialsManager testimonials={testimonials} />
      </div>
    </AdminPageFrame>
  );
}
