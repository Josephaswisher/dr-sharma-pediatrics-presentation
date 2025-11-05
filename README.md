# Dr. Sharma's Pediatric Clerkship Review

**Interactive Presentation Platform**

Created for **Dr. Shiksha Sharma, MD** - Pediatric Hospitalist at Inova Children's Hospital

**📦 Complete Package**: See [DELIVERABLES-PACKAGE.md](./DELIVERABLES-PACKAGE.md) for full documentation

---

## 🦋 Project Overview

This is a modern, interactive presentation system designed for pediatric medical education:

- **18 high-yield slides** (30-45 minute presentation)
- **Beautiful butterfly-themed UI** (Inova branding)
- **Interactive quiz elements**
- **Supabase backend** for analytics
- **Vercel-ready deployment**
- **PDF export capabilities**

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3145
```

### Build for Production

```bash
# Create optimized build
npm run build

# Export static files for Vercel
npm run export

# Files will be in the 'out' directory
```

---

## 📦 Deliverables

### 1. **Interactive Presentation** (`/out` directory)
- Upload to Vercel for instant deployment
- Supports keyboard navigation (Arrow keys, Space, 'N' for notes)
- Mobile-responsive design

### 2. **PDF Handouts** (`/handouts` directory)
- Quick reference cards
- Developmental milestones cheat sheet
- Algorithm flowcharts
- Dosing reference card

### 3. **Student Study Guide** (`/handouts/study-guide.pdf`)
- Comprehensive 4-week curriculum
- High-yield tables and clinical pearls
- Print-friendly format

---

## 🎨 Features

### Interactive Elements
- ✅ Embedded quiz questions with instant feedback
- ✅ Clinical decision tree algorithms
- ✅ Animated butterfly theme
- ✅ Dark mode toggle
- ✅ Speaker notes panel
- ✅ Progress tracking

### Backend Integration (Supabase)
- ✅ Analytics dashboard (track which slides students spend time on)
- ✅ Quiz performance tracking
- ✅ Session recording

### Export Capabilities
- ✅ Print to PDF (Ctrl+P / Cmd+P)
- ✅ Download individual handouts
- ✅ Export presentation as static HTML

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend & analytics
- **reveal.js** - Presentation framework
- **jsPDF** - PDF generation

---

##  📁 Project Structure

```
dr-sharma-peds/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── data/
│   │   └── slides.ts        # Presentation content
│   ├── utils/               # Helper functions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── handouts/                # Generated PDFs
└── out/                     # Built static files (for Vercel)
```

---

## 🚢 Deployment Instructions

### Option 1: Vercel (Recommended - One Click)

1. Create Vercel account at https://vercel.com
2. Click "Add New Project"
3. Import from Git or upload the `/out` folder
4. Deploy! (takes ~30 seconds)

### Option 2: Manual Upload

1. Run `npm run export`
2. Upload `/out` directory to any static host
3. Done!

### Option 3: GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Point to `/out` directory

---

## 🔑 Environment Variables

Create `.env.local` file:

```bash
# Supabase (for analytics)
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

*Note: Analytics are optional. Presentation works without Supabase.*

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `N` | Toggle speaker notes |
| `D` | Toggle dark mode |
| `Ctrl+P` | Print/Export PDF |
| `Esc` | Exit fullscreen |

---

## 📊 Analytics Dashboard

Access at: `/analytics` (requires Supabase setup)

- View slide engagement metrics
- See quiz performance
- Export data for QI projects

---

## 👩‍⚕️ About Dr. Sharma

**Shiksha Sharma, MD**
Pediatric Hospitalist
Inova Children's Hospital, Virginia

*First-year attending physician with fresh perspective on pediatric clerkship education.*

---

## 📝 License

Educational use only. © 2024 Inova Children's Hospital

---

## 🐛 Support

For technical issues or questions:
- Email: joseph.swisher@example.com (Technical contact)
- GitHub Issues: [Link to repository]

---

**Built with ❤️ using the PLEXUS Framework**

🦋 Butterfly theme symbolizes transformation from medical student to confident pediatrician.
