# Spectrium Solutions Website

A modern, responsive website for Spectrium Solutions - an internet service provider / authorized Spectrum retailer.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Fast**: Built with Vite for optimal performance
- **SEO Ready**: Proper meta tags and semantic HTML
- **Google Ads Compliant**: Includes all required disclaimers

## 📁 Project Structure

```
spectrium-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS + custom animations
├── index.html           # HTML entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/spectrium-website.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite - just click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. Deploy
   ```bash
   vercel
   ```

## ⚙️ Environment Variables (Optional)

If you need environment variables, create a `.env` file:

```env
VITE_API_URL=https://api.example.com
```

Access in code: `import.meta.env.VITE_API_URL`

## 📄 Pages

| Page | Description |
|------|-------------|
| Home | Landing page with hero, features, plans, testimonials |
| Spectrum | Dedicated Spectrum internet plans page |
| Internet | Compare internet speeds and plans |
| Plans | All available pricing plans |
| Coverage | Check service availability by ZIP code |
| About | Company information |
| Contact | Contact form and information |
| Privacy | Privacy policy |
| Terms | Terms and conditions |
| Refund | Refund policy |

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Content
Edit `src/App.jsx` to update:
- Phone numbers
- Email addresses
- Pricing
- Plan details
- Company information

### Branding
Replace `public/favicon.svg` with your own logo.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📜 License

MIT License - feel free to use for your business!

---

Built with ❤️ using React, Vite, and Tailwind CSS
