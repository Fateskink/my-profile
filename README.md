# Portfolio Website - Nguyễn Trọng Thăng (Shayne Nguyen)

Professional portfolio website showcasing skills, projects, and experience as a Full Stack Developer.

## 🌐 Live Demo

**URL**: [https://thangnt.vercel.app](https://thangnt.vercel.app)

---

## 📁 Project Structure

```
profile/
├── index.html              # Entry point (26 lines)
├── components/             # HTML components
│   ├── navbar.html         # Navigation bar
│   ├── hero.html           # Hero section
│   ├── skills.html         # Skills section
│   ├── projects.html       # Projects section
│   ├── contact.html        # Contact section
│   └── footer.html         # Footer with turtle mascot
├── js/
│   └── app.js              # Component loader & app logic
├── css/
│   └── styles.css          # Custom styles
├── assets/                 # Static assets
│   ├── avatar.jpg          # Profile picture
│   ├── turtle.png          # Mascot/favicon
│   └── Nguyen-Trong-Thang-2026.pdf  # CV
├── profile.md              # Profile content (Markdown)
└── README.md               # This file
```

---

## 🏗️ Architecture

### Component-Based Structure (Fetch Pattern)

**Pattern giống PHP includes nhưng dùng JavaScript fetch:**

```javascript
// Giống: <?php include 'header.php'; ?>
await fetch('components/navbar.html');
```

**Workflow:**
1. Browser loads `index.html` (26 dòng - clean HTML với div placeholders)
2. `js/app.js` fetch tất cả components từ `components/`
3. Insert HTML vào đúng vị trí
4. Initialize interactions (scroll, animations, navbar)

**Advantages:**
- ✅ Component-based - Mỗi section 1 file riêng
- ✅ Easy to maintain - Edit component chỉ cần sửa 1 file
- ✅ Syntax highlighting - Full HTML syntax support
- ✅ No build tool - Vanilla JS, works everywhere
- ✅ Pattern familiar - Giống PHP/SSI includes

---

## 🔧 How to Update

### Update Personal Information

Edit respective component files in `components/`:
- `navbar.html` - Name, navigation links
- `hero.html` - Profile info, bio, location
- `contact.html` - Email, location, GitHub

**Dynamic values (age, experience) auto-calculate from:**
```javascript
const birthYear = 1997;        // in js/app.js
const workStartYear = 2022;
```

### Add New Skills

Edit `components/skills.html` - Add skill badges with icons.

### Add New Projects

Edit `components/projects.html` - Add project cards.

### Modify Styles

Edit `css/styles.css` for custom animations and effects.

---

## 🚀 Deployment

### Vercel (Current)

```bash
vercel --prod
```

**Custom Domain:**
- Vào: https://vercel.com/[your-project]/settings/domains
- Add domain: `thangnt.vercel.app`

### Other Platforms

Static site - works on:
- **Netlify**: Drag & drop
- **GitHub Pages**: Push to gh-pages branch
- **Cloudflare Pages**: Connect repo
- **Any static host**: Upload files

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom animations
- **Tailwind CSS** - Utility-first CSS (CDN)
- **JavaScript (Vanilla)** - Fetch API for component loading
- **Google Fonts** - Inter & JetBrains Mono
- **Simple Icons** - Technology logos
- **Vercel** - Hosting & deployment

---

## 🔄 Dynamic Features

### Auto-Calculated Values

- **Age**: Auto-calculates from `birthYear: 1997`
- **Experience**: Auto-calculates from `workStartYear: 2022`

### Scroll Animations

Elements fade in when scrolled into view using Intersection Observer API.

### Navbar Auto-Hide

Navbar hides when scrolling down, shows when scrolling up.

---

## 🐢 Easter Egg

Click the floating turtle in the bottom-right corner to visit GitHub profile!

---

## 📄 License

© 2025 Nguyễn Trọng Thăng (Shayne Nguyen). All rights reserved.

---

## 🔗 Links

- **Live Site**: [https://thangnt.vercel.app](https://thangnt.vercel.app)
- **GitHub**: [https://github.com/Fateskink/my-profile](https://github.com/Fateskink/my-profile)
- **Email**: [shaynenguyen9@gmail.com](mailto:shaynenguyen9@gmail.com)

---

*Built with ❤️ and ☕ by Thăng*
