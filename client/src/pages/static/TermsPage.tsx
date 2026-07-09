export default function TermsPage() {
  return (
    <div className="container-narrow py-16 md:py-24 max-w-3xl">
      <h1 className="heading-section text-primary mb-8">Terms of Service</h1>
      <div className="space-y-6 text-body text-foreground/80">
        <section>
          <h2 className="font-serif text-xl mb-2">Acceptance of terms</h2>
          <p>
            By using Belle Ame, you agree to these terms. If you do not agree, please do not
            use the platform.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">Service description</h2>
          <p>
            Belle Ame provides tools to create, publish, and manage digital wedding invitations
            including RSVP collection and image hosting.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">User responsibilities</h2>
          <p>
            You are responsible for the content you publish, ensuring you have rights to any
            images uploaded, and complying with applicable laws. Do not upload offensive or
            illegal content.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">Limitation of liability</h2>
          <p>
            Belle Ame is provided &quot;as is&quot; without warranties. We are not liable for
            indirect damages arising from use of the service.
          </p>
        </section>
        <p className="text-sm text-muted-foreground">Last updated: June 2026</p>
      </div>
    </div>
  )
}
