export default function PrivacyPage() {
  return (
    <div className="container-narrow py-16 md:py-24 max-w-3xl">
      <h1 className="heading-section text-primary mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-body text-foreground/80">
        <section>
          <h2 className="font-serif text-xl mb-2">Information we collect</h2>
          <p>
            When you create an account, we collect your email address and encrypted password.
            When guests submit RSVPs, we collect their name, email, phone, attendance status,
            and optional message — associated with the relevant invitation.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">How we use your data</h2>
          <p>
            Account data is used for authentication and admin access. RSVP data is shared only
            with the invitation owner (admin) for event planning purposes. Uploaded images are
            stored via Cloudinary and linked to invitation content.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">Data retention</h2>
          <p>
            Data is retained while your account and invitations are active. You may request
            deletion by contacting hello@belleame.com.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">Contact</h2>
          <p>For privacy inquiries, email hello@belleame.com.</p>
        </section>
        <p className="text-sm text-muted-foreground">Last updated: June 2026</p>
      </div>
    </div>
  )
}
