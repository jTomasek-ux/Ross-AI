import LegalLayout, { legalMetadata } from "@/components/LegalLayout";

export const metadata = legalMetadata(
  "Privacy Policy",
  "How Ross AI handles information when you upload and analyze contract PDFs."
);

const LAST_UPDATED = "June 9, 2026";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <section>
        <h2>1. Overview</h2>
        <p>
          This Privacy Policy explains what information Ross AI processes when
          you use the Service and how that information is handled. Ross AI is a
          proof-of-concept application and does not require user accounts.
        </p>
      </section>

      <section>
        <h2>2. Information We Process</h2>
        <p>When you use the contract analysis feature, we process:</p>
        <ul>
          <li>
            <strong>Uploaded PDF files</strong> — the contract you submit for
            analysis
          </li>
          <li>
            <strong>Extracted text</strong> — text parsed from your PDF (up to
            approximately 15,000 characters per request)
          </li>
          <li>
            <strong>Technical data</strong> — standard server logs such as IP
            address, browser type, request timestamps, and error information
            when applicable
          </li>
        </ul>
        <p>
          We do not ask for your name, email address, or payment information to
          use the Service.
        </p>
      </section>

      <section>
        <h2>3. How We Use Information</h2>
        <p>We use the information above to:</p>
        <ul>
          <li>Extract readable text from your uploaded PDF</li>
          <li>Generate AI-powered summaries and obligation highlights</li>
          <li>Operate, secure, and troubleshoot the Service</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Processing (OpenAI)</h2>
        <p>
          Contract text is sent to <strong>OpenAI</strong> to generate
          analysis. OpenAI processes this data according to its own terms and
          privacy policies. By using the Service, you acknowledge that your
          contract content will be transmitted to OpenAI for processing.
        </p>
        <p>
          Do not upload documents you are not permitted to share with a
          third-party AI provider, or documents subject to strict
          confidentiality obligations, unless you have assessed and accepted
          that risk.
        </p>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>
          Uploaded contracts are processed in memory to provide a single
          analysis response. Ross AI does not intentionally store your uploaded
          PDFs or contract text in a persistent database as part of this
          proof-of-concept.
        </p>
        <p>
          Server logs and third-party providers (including OpenAI and your
          hosting platform) may retain data according to their own retention
          practices.
        </p>
      </section>

      <section>
        <h2>6. Cookies and Local Storage</h2>
        <p>
          The Service does not use advertising or analytics cookies by default.
          Your browser may store minimal technical data required for normal
          website operation. If cookies or analytics are added in the future,
          this policy will be updated.
        </p>
      </section>

      <section>
        <h2>7. Children&apos;s Privacy</h2>
        <p>
          The Service is not directed to children under 13 (or the minimum age
          required in your jurisdiction). We do not knowingly collect personal
          information from children.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict processing of personal data, or to object to
          certain processing. Because we do not maintain user accounts or
          persistently store uploaded contracts, we may be unable to retrieve
          specific documents after processing has completed.
        </p>
        <p>
          To exercise applicable rights or ask privacy questions, contact the
          project maintainer via the Ross AI GitHub repository.
        </p>
      </section>

      <section>
        <h2>9. International Users</h2>
        <p>
          If you access the Service from outside the country where it is
          hosted, your information may be processed in jurisdictions with
          different data protection laws, including the United States.
        </p>
      </section>

      <section>
        <h2>10. Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last
          updated&quot; date at the top of this page will reflect the latest
          revision.
        </p>
      </section>
    </LegalLayout>
  );
}
