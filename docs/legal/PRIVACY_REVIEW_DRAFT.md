# Internal privacy draft — owner and legal review required

This is an internal review document, not a published policy or a legal compliance conclusion. The public privacy page describes actual current behavior. Inquiry sending remains disabled until the owner approves policy and configuration.

## English review text

Responsible organization: **owner must supply legal name and privacy contact**. Describe the information collected: business name/contact, organization, project location, product interest, project details, timeline and inquiry consent. Explain the purpose: responding to the requested project discussion; no automatic marketing subscription. Do not request health information.

Disclose the chosen email provider, hosting location and any enabled CRM, including cross-border processing if applicable. Confirm the retention period and who deletes records from inboxes, providers, backups and the CRM. The application itself does not store inquiry bodies; it retains hashed operational rate-limit/replay keys until maintenance removes old buckets. Hosting logs are controlled by the host and need their own retention review.

Explain how the person can request access, correction, deletion or withdrawal of consent, how identity is checked proportionately, and any applicable limits. Supply a monitored privacy email. Confirm the handling of incident reports and owner responsibilities. Review the actual provider contracts before approving these statements.

## Texte de révision en français

Organisation responsable : **le propriétaire doit fournir le nom légal et le contact de confidentialité**. Décrire les coordonnées professionnelles, l’organisation, le lieu du projet, l’intérêt, les détails, l’échéancier et le consentement. Préciser que ces renseignements servent à répondre à la demande, sans inscription automatique au marketing. Ne pas demander de données sur la santé.

Indiquer le service de courriel, l’hébergement et tout CRM activé, ainsi que le traitement à l’extérieur du territoire pertinent, s’il y a lieu. Confirmer la durée de conservation et la personne responsable de la suppression dans les boîtes de réception, services, sauvegardes et CRM. L’application ne conserve pas le contenu des demandes; les clés opérationnelles hachées sont retirées par la maintenance. Examiner séparément les journaux de l’hébergeur.

Décrire les demandes d’accès, de correction, de suppression ou de retrait, la vérification proportionnée de l’identité et les limites applicables. Fournir une adresse de confidentialité surveillée. Confirmer la gestion des incidents et les responsabilités à partir des contrats réels.

## Required approval before sending is enabled

- Fill public legal name, privacy email, provider disclosure and retention settings; rebuild the site.
- Make `LEAD_RETENTION_DAYS` and `NEXT_PUBLIC_RETENTION_DAYS` consistent.
- Establish a real deletion process; configuration alone does not delete provider/inbox/CRM records.
- Review whether the selected processing arrangements require additional disclosures or agreements.
- Set `PRIVACY_POLICY_APPROVED=true` only after owner review. Revisit the consent version when the approved purpose changes.
