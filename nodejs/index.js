const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
// const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const emailConfig = require('./config/email-config');

// Load environment variables
dotenv.config();

const app = express();
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'email-templates/templates'));
// Middleware
app.use(cors());
app.use(express.json());

// Email templates directory
// const TEMPLATE_DIR = path.join(__dirname, 'email-templates');

// Configure multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const upload = multer({ storage });

// Email transporter
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });
const createTransporter = (platform) => {
  const config = emailConfig[platform.toLowerCase()];
  if (!config) {
    throw new Error(`Unsupported email platform: ${platform}`);
  }
  return nodemailer.createTransport(config);
};

// Email template helper
// const renderEmailTemplate = async (templateName, data) => {
//   const templatePath = path.join(TEMPLATE_DIR, `${templateName}.ejs`);
//   return await ejs.renderFile(templatePath, data);
// };

// Email sending endpoint with template support
app.post('/api/send-email', async (req, res) => {
  try {
    const { platform = 'outlook' } = req.body;
    const transporter = createTransporter(platform);
    await transporter.verify();
    // const attachments = req.files?.map(file => ({
    //   filename: file.originalname,
    //   path: file.path
    // })) || [];

    // Render email template
    const html = await new Promise((resolve, reject) => {
      app.render('template1.twig', {
        name: 'Test User',
        content: 'This is a test email content'
      }, (err, html) => {
        if (err) reject(err);
        resolve(html);
      });
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      html: html,
    };

    await transporter.sendMail(mailOptions);

    // Cleanup uploaded files
    // attachments.forEach(attachment => {
    //   fs.unlinkSync(attachment.path);
    // });

    res.status(200).json({ message: 'Email sent successfully', platform: platform });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message,
      platform: req.body.platform  });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));