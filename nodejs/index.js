const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
// const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const emailConfig = require('./config/email-config');

dotenv.config();

const app = express();
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'email-templates/templates'));
// Middleware
app.use(cors());
app.use(express.json());

const headerToKeyMap = {
  'All Category': 'all',
  'SSD Total': 'ssdTotal',
  'Cola SSD': 'cola',
  'Other SSD': 'otherSSD',
  'Coffee': 'coffee',
  'Juice': 'juice',
  'NS Tea': 'nsTea',
  'Black Tea': 'blackTea',
  'Sports': 'sports',
  'Energy': 'energy',
  'Water': 'water',
  'Others': 'others'
};

const sampleData = {
  title:'&lt;SOVI report: Teiban&gt;',
  subscription:'(Face Share By Maker x Category table. Filter by Channel = SMDD and Teiban Type = Teiban Total)',
  headers:['All Category', 'SSD Total', 'Cola SSD', 'Other SSD', 'Coffee', 'Juice', 'NS Tea', 'Black Tea', 'Sports', 'Energy', 'Water', 'Others'],
  metrics: {
    importance: {
      imp: {
        all: 25.3, ssdTotal: 24.1, cola: 15.2, otherSSD: 8.9, coffee: 12.4, 
        juice: 10.2, nsTea: 8.7, blackTea: 7.5, sports: 6.8, energy: 5.4, 
        water: 4.2, others: 3.1
      },
      importance: {
        all: 1, ssdTotal: 4, cola: 7, otherSSD: 9, coffee: 11, 
        juice: -22, nsTea: 5, blackTea: 8, sports: -10, energy: 12, 
        water: 3, others: -6
      }
    }
  },
  companies: [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png',
      data: {
        share: {
        all: 1, ssdTotal: 4, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 2, nsTea: 5, blackTea: 8, sports: 10, energy: 12, 
        water: 3, others: 6
        },
        vsLy: {
        all: 23, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 82, sports: -3, energy: 45, 
        water: -33, others: 64
        }
      }
    },
    {
      logo: 'https://download.logo.wine/logo/Suntory/Suntory-Logo.wine.png',
      data: {
        share: {
        all: 1, ssdTotal: 1, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 1, nsTea: 1, blackTea: 1, sports: 10, energy: 12, 
        water: 3, others: 1
        },
        vsLy: {
        all: 1, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 1, sports: -3, energy: 1, 
        water: -33, others: 1
        }
      }
    },
    {
      logo: 'https://w7.pngwing.com/pngs/550/780/png-transparent-kirin-hd-logo-thumbnail.png',
      data: {
        share: {
        all: 1, ssdTotal: 1, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 1, nsTea: 1, blackTea: 1, sports: 10, energy: 12, 
        water: 3, others: 1
        },
        vsLy: {
        all: 1, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 1, sports: -3, energy: 1, 
        water: -33, others: 1
        }
      }
    },
    {
      logo: 'https://3ssoft.com.vn/wp-content/uploads/2024/09/asahi-breweries-hd-logo-thumbnail.png',
      data: {
        share: {
        all: 1, ssdTotal: 1, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 1, nsTea: 1, blackTea: 1, sports: 10, energy: 12, 
        water: 3, others: 1
        },
        vsLy: {
        all: 1, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 1, sports: -3, energy: 1, 
        water: -33, others: 1
        }
      }
    },
    {
      logo: 'https://w7.pngwing.com/pngs/597/885/png-transparent-ito-en-hd-logo-thumbnail.png',
      data: {
        share: {
        all: 1, ssdTotal: 1, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 1, nsTea: 1, blackTea: 1, sports: 10, energy: 12, 
        water: 3, others: 1
        },
        vsLy: {
        all: 1, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 1, sports: -3, energy: 1, 
        water: -33, others: 1
        }
      }
    },
    {
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKWzkIiYlqk2NzelqvEb8JaXlVKkBGp4cCSg&s',
      data: {
        share: {
        all: 1, ssdTotal: 1, cola: 7, otherSSD: 9, coffee: 11, 
        juice: 1, nsTea: 1, blackTea: 1, sports: 10, energy: 12, 
        water: 3, others: 1
        },
        vsLy: {
        all: 1, ssdTotal: 41, cola: 73, otherSSD: 94, coffee: 21, 
        juice: 22, nsTea: -1, blackTea: 1, sports: -3, energy: 1, 
        water: -33, others: 1
        }
      }
    },
  ]
}
const sampleData2 = {
  title:'&lt;SOVI by Account: Teiban&gt;',
  subscription:'(Face Share By Account table. Screenshot "All Category" data of all channels. Only get accounts with Segment = Strategic)',
  headers: [
    { name: "Account" },
    { name: "Segment" },
    { name: "vs.LY (pts)" },
    { name: "Company A", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png' },
    { name: "Company B", logo: "https://download.logo.wine/logo/Suntory/Suntory-Logo.wine.png" },
    { name: "Company C", logo: "https://w7.pngwing.com/pngs/550/780/png-transparent-kirin-hd-logo-thumbnail.png" },
    { name: "Company D", logo: "https://3ssoft.com.vn/wp-content/uploads/2024/09/asahi-breweries-hd-logo-thumbnail.png" },
    { name: "Company E", logo: 'https://w7.pngwing.com/pngs/597/885/png-transparent-ito-en-hd-logo-thumbnail.png' }
],
categories: [
    {
        categoryName: "SM TTL",
        dataRow: [21, 22, 23, 24, 25, 26],
        rows: [
            { account: "Account A", segment: "Strategic", vsLY: 1, companies: [3, 4, 5, 6, 7] },
            { account: "Account B", segment: "Strategic", vsLY: 2, companies: [8, 9, 12, 11, 13] },
        ]
    },
    {
        categoryName: "Drug TTL",
        dataRow: [21, 22, 23, 24, 25, 26],
        rows: [
            { account: "Account N", segment: "Strategic", vsLY: "data", companies: ["data", "data", "data", "data", "data"] },
            { account: "Account O", segment: "Strategic", vsLY: "data", companies: ["data", "data", "data", "data", "data"] },
        ]
    },
    {
        categoryName: "Discounter TTL",
        dataRow: [21, 22, 23, 24, 25, 26],
        rows: [
            { account: "Account X", segment: "Strategic", vsLY: "data", companies: ["data", "data", "data", "data", "data"] },
            { account: "Account Y", segment: "Strategic", vsLY: "data", companies: ["data", "data", "data", "data", "data"] },
        ]
    }
] 
}
const sampleData3 ={
  title:'&lt;POC report: Out of Teiban&gt;',
  subscription:'(PoC - By Account table. Screenshot "All Category" data of all channels.)',
}
const createTransporter = (platform) => {
  const config = emailConfig[platform.toLowerCase()];
  if (!config) {
    throw new Error(`Unsupported email platform: ${platform}`);
  }
  return nodemailer.createTransport(config);
};


// Email sending endpoint with template support
app.post('/api/send-email', async (req, res) => {
  try {
    const { platform = 'gmail' } = req.body;
    const transporter = createTransporter(platform);
    await transporter.verify();

    // Render email template
    const html = await new Promise((resolve, reject) => {
      app.render('main_template.twig', {
        headerToKeyMap: headerToKeyMap,
        sampleData2: sampleData2,
        sampleData3: sampleData3,
        ...sampleData,
        sample:'120.5'
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


    res.status(200).json({ message: 'Email sent successfully', platform: platform });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message,
      platform: req.body.platform  });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));