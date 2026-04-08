const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer Outlook Transport Setup
// NOTE: Make sure to replace 'your_app_password_here' with an actual Microsoft App Password
// You can generate one in your Microsoft Account Security settings.
// Microsoft entirely blocked standard Basic Auth passwords for Outlook recently. 
// Standard practice is to use a Gmail account as your "Sender Server".
// It will instantly deliver the reservation to your Outlook account!
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'puneetvashisht@gmail.com', // Enter ANY generic Gmail address
    pass: 'vnpo apqr onbg dyed' // Enter a 16-character Google App Password
  }
});

app.post('/api/register', async (req, res) => {
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ error: 'Name and contact are required.' });
  }

  try {
    const mailOptions = {
      from: 'puneetvashisht@gmail.com', // Must match the Gmail address above
      to: 'puneetvashisht@outlook.com',   // Destination account (your Microsoft Outlook)
      subject: `New Training Registration from ${name}`,
      text: `You have a new registration for the Advanced React Patterns training!\n\nName: ${name}\nContact (Email/WhatsApp): ${contact}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
          <h2 style="color: #06b6d4;">New Training Registration</h2>
          <p>You have a new lead for the <strong>Advanced React Patterns</strong> session.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact (Email / WhatsApp):</strong> ${contact}</p>
          <br/>
          <p style="color: #666; font-size: 0.9em;"><em>System Notification - You can reach out directly via their contact credentials above.</em></p>
        </div>
      `
    };

    // Attempt to send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully: %s', info.messageId);

    res.status(200).json({ success: true, message: 'Registration email sent.' });
  } catch (error) {
    console.error('Error sending email. Ensure password is correct.', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
  console.log(`Waiting for registration requests...`);
});
