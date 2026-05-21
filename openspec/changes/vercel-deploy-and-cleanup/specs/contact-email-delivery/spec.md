## ADDED Requirements

### Requirement: Contact form submissions SHALL be delivered to the practitioner's inbox via Web3Forms

When a visitor submits the contact form on the site, the system MUST send the submission to `https://api.web3forms.com/submit` using the Access Key configured in `VITE_WEB3FORMS_ACCESS_KEY`, with the destination email registered with that key (`romharel98@gmail.com`). No backend, database, or serverless function is used.

#### Scenario: Successful submission delivers an email
- **WHEN** the visitor fills the required fields (name, phone) and clicks "שליחת הודעה"
- **THEN** the client POSTs the form data (name, phone, optional email, optional message) plus the Access Key to `https://api.web3forms.com/submit`
- **AND** on a successful (2xx) response, the form fields are cleared and a success toast `ההודעה נשלחה` is shown with the existing Hebrew confirmation copy
- **AND** an email containing the submitted fields is delivered to `romharel98@gmail.com`

#### Scenario: Network or API failure surfaces an error to the visitor
- **WHEN** the request to Web3Forms fails (network error, non-2xx response, or response body indicates failure)
- **THEN** the form fields SHALL NOT be cleared
- **AND** a destructive-variant toast in Hebrew SHALL inform the visitor that sending failed and invite them to try again or use the phone/WhatsApp options visible in the same section

#### Scenario: Submit button reflects in-flight state
- **WHEN** a submission is in progress
- **THEN** the submit button SHALL show "שולחת..." and be disabled until the request settles (success or error)

### Requirement: The contact form SHALL fail safely when the Access Key is missing

If `VITE_WEB3FORMS_ACCESS_KEY` is undefined or empty at runtime (e.g., misconfigured Vercel project), the form MUST NOT attempt the network call and MUST show a clear error rather than silently succeeding.

#### Scenario: Missing Access Key shows a configuration error
- **WHEN** a visitor submits the form and `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` is falsy
- **THEN** no request is made to Web3Forms
- **AND** a destructive toast tells the visitor that the form is not configured and asks them to use phone/WhatsApp instead
- **AND** the failure is also logged via `console.error` so a developer inspecting the deploy notices

### Requirement: The contact form SHALL include a honeypot field for basic spam protection

A hidden `botcheck` input that real visitors leave empty MUST be present in the form payload. Submissions where it is non-empty rely on Web3Forms' built-in honeypot handling to drop the message.

#### Scenario: Honeypot is present and not visible to humans
- **WHEN** the form renders
- **THEN** an input named `botcheck` exists in the DOM but is visually hidden (e.g., `display: none` or off-screen) and not focusable
- **AND** its value is included in the submitted payload

### Requirement: The submitted payload SHALL preserve the form's user-facing field labels

Web3Forms surfaces field names in the delivered email. Field keys MUST be human-readable so the recipient inbox is intelligible.

#### Scenario: Field names in the payload are meaningful
- **WHEN** the form is submitted
- **THEN** the payload includes keys such as `name`, `phone`, `email`, `message`, and `subject` (with `subject` set to a fixed Hebrew string like `פנייה חדשה מהאתר` so the inbox row is recognizable)
