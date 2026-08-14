import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildRegistrationEmail(data) {
  const firstName = data.firstName || 'Applicant';
  const referenceNumber = data.referenceNumber || 'N/A';
  const institution = data.institution || 'Your chosen institution';
  const courseField = data.courseField || 'your selected field';

  return {
    subject: `Internship Registration Received - ${referenceNumber}`,
    text: `Dear ${firstName},\n\nThank you for registering for the Tshirts Village internship program. We have received your application with reference number ${referenceNumber}.\n\nYour application details:\n- Institution: ${institution}\n- Course/Field: ${courseField}\n\nOur team will review your application and contact you with the next step soon.\n\nBest regards,\nThe Tshirts Village Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="color: #111827; margin-bottom: 12px;">Application Received</h2>
        <p>Dear ${escapeHtml(firstName)},</p>
        <p>Thank you for registering for the Tshirts Village internship program.</p>
        <p>We have received your application with reference number <strong>${escapeHtml(referenceNumber)}</strong>.</p>
        <ul>
          <li><strong>Institution:</strong> ${escapeHtml(institution)}</li>
          <li><strong>Course/Field:</strong> ${escapeHtml(courseField)}</li>
        </ul>
        <p>Our team will review your application and contact you with the next step soon.</p>
        <p>Best regards,<br />The Tshirts Village Team</p>
      </div>
    `,
  };
}

function buildApprovalEmails(data) {
  const firstName = data.firstName || 'Applicant';
  const referenceNumber = data.referenceNumber || 'N/A';

  return [
    {
      subject: `Your Internship Application Has Been Approved - ${referenceNumber}`,
      text: `Dear ${firstName},\n\nCongratulations! Your internship application has been approved and we are happy to welcome you to the Tshirts Village internship program.\n\nReference Number: ${referenceNumber}\n\nWe will share the final onboarding details and next steps with you shortly.\n\nBest regards,\nThe Tshirts Village Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="color: #111827; margin-bottom: 12px;">Congratulations!</h2>
          <p>Dear ${escapeHtml(firstName)},</p>
          <p>Congratulations! Your internship application has been approved and we are happy to welcome you to the Tshirts Village internship program.</p>
          <p>Reference Number: <strong>${escapeHtml(referenceNumber)}</strong></p>
          <p>We will share the final onboarding details and next steps with you shortly.</p>
          <p>Best regards,<br />The Tshirts Village Team</p>
        </div>
      `,
    },
    {
      subject: 'Your Internship Onboarding Steps',
      text: `Dear ${firstName},\n\nYour approval is confirmed. Please keep your email and phone handy as the team will send onboarding details and orientation information shortly.\n\nIf you have any questions before onboarding begins, reply to this email and our team will support you.\n\nWelcome aboard!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="color: #111827; margin-bottom: 12px;">Next Steps</h2>
          <p>Dear ${escapeHtml(firstName)},</p>
          <p>Your approval is confirmed. Please keep your email and phone handy as the team will send onboarding details and orientation information shortly.</p>
          <p>If you have any questions before onboarding begins, reply to this email and our team will support you.</p>
          <p><strong>Welcome aboard!</strong></p>
        </div>
      `,
    },
  ];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const key = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@tshirtvilage.com';
  const adminEmail = process.env.ADMIN_EMAIL || fromEmail;

  if (!key) {
    return res.status(500).json({
      ok: false,
      error: 'SendGrid is not configured. Add SENDGRID_API_KEY and FROM_EMAIL to your deployment environment.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const type = body.type;
    const emailAddress = body.email || adminEmail;
    const firstName = body.firstName || 'Applicant';
    const data = {
      firstName,
      email: emailAddress,
      referenceNumber: body.referenceNumber,
      institution: body.institution,
      courseField: body.courseField,
      phone: body.phone,
    };

    if (type === 'registration') {
      const message = buildRegistrationEmail(data);
      await sgMail.send({
        to: emailAddress,
        from: fromEmail,
        replyTo: adminEmail,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });

      return res.status(200).json({ ok: true, type, sent: 1 });
    }

    if (type === 'approval') {
      const messages = buildApprovalEmails(data);
      await Promise.all(
        messages.map((message) =>
          sgMail.send({
            to: emailAddress,
            from: fromEmail,
            replyTo: adminEmail,
            subject: message.subject,
            text: message.text,
            html: message.html,
          })
        )
      );

      return res.status(200).json({ ok: true, type, sent: messages.length });
    }

    return res.status(400).json({ ok: false, error: 'Unsupported email type.' });
  } catch (error) {
    const details = error?.response?.body?.errors || error?.message || 'Unknown error';
    return res.status(500).json({
      ok: false,
      error: typeof details === 'string' ? details : JSON.stringify(details),
    });
  }
}
