import LegalLayout, { legalMetadata } from "@/components/LegalLayout";

export const metadata = legalMetadata(
  "Disclaimer",
  "Important limitations on Ross AI contract analysis — not legal advice."
);

const LAST_UPDATED = "June 9, 2026";

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated={LAST_UPDATED}>
      <section>
        <h2>General Information Only</h2>
        <p>
          Ross AI provides automated, AI-generated summaries of contract
          documents. All output is for general informational purposes only. It
          is not legal advice, legal opinion, or legal representation.
        </p>
      </section>

      <section>
        <h2>No Attorney-Client Relationship</h2>
        <p>
          Using Ross AI does not create an attorney-client relationship between
          you and Ross AI or any person involved in operating the Service. No
          such relationship is intended or implied.
        </p>
      </section>

      <section>
        <h2>AI Limitations</h2>
        <p>AI-generated analysis may:</p>
        <ul>
          <li>Miss important clauses, risks, or context</li>
          <li>Misinterpret legal language or jurisdiction-specific rules</li>
          <li>Reflect biases or errors present in the underlying model</li>
          <li>Become outdated as laws and contracts change</li>
        </ul>
        <p>
          Only text-based PDFs are supported. Scanned image PDFs may produce
          unreliable or empty results.
        </p>
      </section>

      <section>
        <h2>Your Obligation to Verify</h2>
        <p>
          You are solely responsible for reviewing original contract language
          and obtaining advice from a qualified attorney before signing,
          amending, enforcing, or relying on any agreement.
        </p>
      </section>

      <section>
        <h2>Confidentiality Warning</h2>
        <p>
          Uploading a contract sends its text content to third-party AI
          infrastructure for processing. Do not upload confidential,
          privileged, or regulated information unless you are authorized to do
          so and understand the implications described in our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>

      <section>
        <h2>No Warranty</h2>
        <p>
          Ross AI is provided as a proof-of-concept without warranty. See our{" "}
          <a href="/terms">Terms of Use</a> for full disclaimers and
          limitations of liability.
        </p>
      </section>
    </LegalLayout>
  );
}
