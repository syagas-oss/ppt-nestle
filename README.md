# BioLife Presentation System

<div align="center">
<img width="1200" height="475" alt="BioLife Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 📚 Educational Project Overview

This is an **educational interactive presentation system** that demonstrates modern web development techniques applied to healthcare digital transformation. The project showcases Nestlé Health Science's BioLife platform - a comprehensive nutrition-as-a-service solution that transforms how people approach personalized nutrition through data-driven insights and AI-powered guidance.

### 🎯 Learning Objectives

This project serves as an educational resource for:
- **Modern Web Development**: React 18, TypeScript, Three.js, and contemporary frontend architectures
- **Healthcare Digital Transformation**: How traditional healthcare companies adapt to digital age challenges
- **Business Strategy**: Market analysis, competitive positioning, and go-to-market strategies in health tech
- **Data Governance & Privacy**: GDPR compliance, data ethics, and trust-building in health applications
- **Interactive Presentation Design**: Advanced UI/UX patterns for complex data visualization

## ✨ Key Features

### 🎨 Interactive 3D Presentation
- Immersive 3D backgrounds with Three.js
- Smooth slide transitions with Framer Motion
- Dynamic build animations and content reveals
- Fullscreen presentation mode

### 🧭 Advanced Navigation
- Keyboard shortcuts (arrow keys, spacebar, escape)
- Overview grid for quick slide navigation
- Speaker notes panel for presentation guidance
- Progress indicator and slide counter

### 📊 Rich Content Types
- Hero slides with impactful messaging
- Data visualization (charts, stats, timelines)
- Interactive cards and decision trees
- Market analysis tables and competitor comparisons
- Roadmap and strategic planning visuals

### 🖨️ Export Capabilities
- High-quality PDF export functionality
- Automated slide rendering for documentation
- Professional presentation materials generation

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern component-based architecture
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### 3D & Animation
- **Three.js** - 3D scene rendering via React Three Fiber
- **Framer Motion** - Declarative animations and transitions
- **@react-three/drei** - Useful helpers for React Three Fiber

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom Glassmorphism** - Modern design effects

### Utilities
- **html2canvas** - Screenshot generation for PDF export
- **jsPDF** - PDF document creation
- **ESLint + Prettier** - Code quality and formatting

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/syagas-oss/ppt-nestle.git
   cd ppt-nestle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## 🎮 Usage Guide

### Navigation Controls
- **Arrow Keys / Spacebar**: Navigate between slides
- **Escape**: Toggle overview grid
- **F**: Toggle fullscreen mode
- **N**: Toggle speaker notes
- **P**: Export presentation to PDF

### UI Controls
- **Grid Icon**: Open slide overview
- **Sticky Note**: Show/hide speaker notes
- **Printer**: Generate PDF export
- **Fullscreen**: Toggle presentation mode

## 📁 Project Structure

```
src/
├── components/
│   ├── Scene3D.tsx          # 3D background animations
│   └── SlideRenderer.tsx    # Dynamic slide content rendering
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point

public/
└── content/
    └── content.json         # Presentation slide data

Configuration files:
├── vite.config.ts           # Build configuration
├── tailwind.config.js       # Styling configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 📖 Educational Content

The presentation covers Nestlé Health Science's strategic transformation through BioLife:

### 🏢 Company Evolution
- 160+ year legacy in nutrition science
- Global market presence and scale
- Transition from traditional to digital health solutions

### 🌐 Market Analysis
- Digital health consumer behavior patterns
- Competitive landscape in nutrition apps
- Market gaps and opportunities

### 💡 Strategic Positioning
- Nutrition-as-a-Service business model
- Data-driven personalization approach
- Privacy-first architecture with GDPR compliance

### 🏗️ Technical Architecture
- Conversational AI interfaces
- Real-time data processing and analytics
- Secure cloud infrastructure and data governance

### 📈 Business Strategy
- 18-month roadmap and phased implementation
- Target market segmentation (25-55 age groups)
- Revenue model and sustainability planning

## 🎓 Learning Outcomes

After exploring this project, you'll understand:
- How to build interactive presentations with modern web tech
- Healthcare industry digital transformation strategies
- Data privacy and compliance in health applications
- Business model innovation in traditional industries
- Advanced React patterns for complex UIs

## 🤝 Contributing

This is an educational project demonstrating modern web development practices. Feel free to:
- Explore the codebase to learn advanced React patterns
- Study the 3D animation implementations
- Analyze the business strategy content
- Use it as a reference for similar presentation systems

## 📄 License

Educational project - see repository for details.

---

*Built with ❤️ using React, Three.js, and modern web technologies*
