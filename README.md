# IconModifier - Material Icon Wizard

A visual wizard for overlaying modifiers on Material Icons. Create custom icon compositions with base icons and modifiers positioned at various locations.

## ✅ Fixed Issues

The following issues have been resolved:
- ✅ Fixed "Cannot find module './app/app.module'" error
- ✅ Converted to Angular 17 standalone components architecture  
- ✅ Updated all component imports and dependencies
- ✅ Fixed TypeScript compilation errors
- ✅ Resolved Material Design component binding issues

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Open your browser**:
   Navigate to `http://localhost:4200`

The application should now be running successfully! 🎉

## 📱 Features

- 🎯 **Icon Selection**: Search and select from 50+ Material Icons
- 🎨 **Visual Positioning**: Choose modifier positions (top-left, top-right, bottom-left, bottom-right, center)
- 🎨 **Customization**: Adjust icon size, colors, and styling
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **Code Generation**: Generate HTML, CSS, and SVG code
- 📋 **Copy & Download**: Copy code to clipboard or download files
- 🔄 **Real-time Preview**: See changes instantly

## 🏗️ Architecture

This Angular 17 application uses standalone components:

```
src/app/
├── components/
│   ├── icon-selector/          # Reusable icon picker with search
│   ├── icon-preview/           # Live preview with size options  
│   └── position-selector/      # Visual position selection
├── services/
│   ├── icon-data.service.ts    # Material Icons data & search
│   └── code-generator.service.ts # HTML/CSS/SVG generation
├── models/
│   └── icon.model.ts           # TypeScript interfaces
└── app.component.*             # Main wizard orchestrator
```

## 🛠️ Technical Stack

- **Angular 17** with standalone components
- **Angular Material** for UI components
- **TypeScript** for type safety
- **SCSS** for styling
- **Material Symbols** font from Google

## 🎯 Usage

1. **Select Base Icon**: Search for your main icon
2. **Choose Modifier**: Pick a modifier icon (common ones are pre-filtered)
3. **Position Modifier**: Use visual grid or radio buttons
4. **Customize**: Adjust size and colors
5. **Preview**: See real-time composition
6. **Export**: Copy or download generated code

## 🔧 Build Commands

```bash
# Development server
npm start

# Production build  
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 📝 License

MIT License - see LICENSE file for details