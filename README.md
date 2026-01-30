# Portfolio Website - Nguyễn Trọng Thăng (Shayne Nguyen)

Professional portfolio website showcasing skills, projects, and experience as a Full Stack Developer.

## 🌐 Live Demo

**URL**: [https://thangnt.vercel.app](https://thangnt.vercel.app)

---

## 📁 Project Structure

```
profile/
├── assets/              # Static assets
│   ├── avatar.jpg      # Profile picture
│   ├── turtle.png      # Mascot/favicon
│   └── Nguyen-Trong-Thang-2026.pdf  # CV
├── css/                # Styles
│   └── styles.css      # Custom CSS styles
├── js/                 # JavaScript modules
│   ├── components/     # UI Components
│   │   ├── navbar.js       # Navigation bar
│   │   ├── hero.js         # Hero section
│   │   ├── skills.js       # Skills section
│   │   ├── skillIcons.js   # Skill icon helpers
│   │   ├── projects.js     # Projects section
│   │   ├── contact.js      # Contact section
│   │   └── footer.js       # Footer
│   ├── data.js         # Profile data (centralized)
│   └── app.js          # Main app initialization
├── index.html          # Entry point
├── profile.md          # Profile content (Markdown)
└── README.md           # This file
```

---

## 🏗️ Architecture

### Component-Based Structure

The website is built using **ES6 modules** with a component-based architecture:

1. **Data Layer** (`js/data.js`)
   - Centralized data source
   - Easy to update information
   - Single source of truth

2. **Component Layer** (`js/components/`)
   - Modular, reusable components
   - Each component is self-contained
   - Easy to maintain and extend

3. **App Layer** (`js/app.js`)
   - Initializes all components
   - Handles dynamic values (age, experience)
   - Sets up interactions (scroll, animations)

### Key Features

- ✅ **Component-based** - Easy to maintain and extend
- ✅ **ES6 Modules** - Modern JavaScript
- ✅ **Centralized Data** - Update once, reflect everywhere
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dynamic Content** - Auto-calculates age and experience
- ✅ **Smooth Animations** - Scroll-triggered animations
- ✅ **Performance** - Fast loading with optimized assets

---

## 🔧 How to Update

### Update Personal Information

Edit `js/data.js`:

```javascript
export const profileData = {
    name: {
        display: 'Nguyen Trong Thang',    // Display name (no diacritics)
        full: 'Nguyễn Trọng Thăng',       // Full Vietnamese name
        english: 'Shayne Nguyen'           // English name
    },
    birthYear: 1997,                       // Birth year (auto-calculates age)
    workStartYear: 2022,                   // Work start year (auto-calculates experience)
    contact: {
        email: 'shaynenguyen9@gmail.com',
        location: 'Hanoi, Vietnam',
        github: 'https://github.com/Fateskink',
        githubUsername: '@Fateskink'
    },
    // ... more data
};
```

### Add New Skills

In `js/data.js`, add to the `skills` object:

```javascript
skills: {
    backend: [
        { name: 'New Tech', icon: 'techname/COLOR', title: 'Full Name' },
        // ...
    ]
}
```

### Add New Projects

In `js/data.js`, add to the `projects` array:

```javascript
projects: [
    {
        date: '01/2026',
        title: 'Project Name',
        description: 'Project description...',
        tech: ['Tech1', 'Tech2', 'Tech3'],
        link: 'https://project-url.com',
        icon: 'trending'  // Options: trending, shield, book, building, briefcase, cart
    },
    // ...
]
```

### Modify a Component

Edit the respective component file in `js/components/`:

- `navbar.js` - Navigation bar
- `hero.js` - Hero section
- `skills.js` - Skills section
- `projects.js` - Projects section
- `contact.js` - Contact section
- `footer.js` - Footer and turtle mascot

---

## 🎨 Styling

### Tailwind CSS

The website uses Tailwind CSS CDN for styling. Most styles are utility classes applied directly in components.

### Custom CSS

Custom styles are in `css/styles.css`:
- Animations
- Gradients
- Hover effects
- Responsive utilities

### Color Scheme

- **Primary Gradient**: Purple (#667EEA) to Blue (#764BA2)
- **Background**: Dark (#0A0E27)
- **Text**: Light gray (#E2E8F0)
- **Accents**: Purple/Blue variations

---

## 🚀 Deployment

### Vercel (Current)

```bash
vercel --prod
```

### Other Platforms

The website is a static site and can be deployed to:
- **Netlify**: Drag & drop the folder
- **GitHub Pages**: Push to gh-pages branch
- **Cloudflare Pages**: Connect repository
- **Any static host**: Upload all files

---

## 📝 Content Management

### profile.md

The `profile.md` file contains detailed profile information in Markdown format:
- Professional summary
- Technical skills
- Project descriptions
- Expertise areas

This file serves as:
- ✅ Documentation
- ✅ CV alternative
- ✅ Easy reference for data.js updates

---

## 🔄 Dynamic Features

### Auto-Calculated Values

The website automatically calculates:

1. **Age**: `Current Year - Birth Year (1997)`
2. **Experience**: `Current Year - Work Start Year (2022)`

Updated displays:
- Hero section badge
- Contact section footer

### Scroll Animations

Elements with `.animate-on-scroll` class fade in when scrolled into view.

### Navbar Auto-Hide

Navbar hides when scrolling down and shows when scrolling up (after 100px scroll).

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles + animations
- **Tailwind CSS** - Utility-first CSS
- **JavaScript ES6+** - Modern JavaScript modules
- **Google Fonts** - Inter & JetBrains Mono
- **Simple Icons** - Technology logos
- **Vercel** - Hosting & deployment

---

## 📦 Assets

### Icons

Technology icons are loaded from:
- **CDN**: `https://cdn.simpleicons.org/`
- **Custom SVG**: Defined in `js/components/skillIcons.js`

### Images

- `avatar.jpg` - Profile picture
- `turtle.png` - Mascot & favicon

### Documents

- `Nguyen-Trong-Thang-2026.pdf` - CV (downloadable)

---

## 🐢 Easter Egg

Click the floating turtle in the bottom-right corner to visit the GitHub profile!

---

## 📄 License

© 2025 Nguyễn Trọng Thăng (Shayne Nguyen). All rights reserved.

---

## 🔗 Links

- **Live Site**: [https://thangnt.vercel.app](https://thangnt.vercel.app)
- **GitHub**: [https://github.com/Fateskink](https://github.com/Fateskink)
- **Email**: [shaynenguyen9@gmail.com](mailto:shaynenguyen9@gmail.com)

---

*Built with ❤️ and ☕ by Thăng*
