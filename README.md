# Rose App

**Rose App** is a modern flower shopping platform built with Next.js 14.  
It allows users to buy flowers for many occasions such as birthdays, weddings, engagements, and anniversaries through a smooth and elegant user experience.  
The app is bilingual, supporting both English and Arabic , and includes a dark mode for a stylish and comfortable viewing experience in any lighting condition.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Internationalization: next-intl (English & Arabic)
- Data Management: React Query
- Form Handling: React Hook Form + Zod
- Icons: Lucide React
- Code Formatting: Prettier

## Features
- Bilingual support (English & Arabic)
- Dark mode theme
- Reusable UI components (buttons, inputs, text areas, etc.)
- Optimized fonts (Sarabun & Tajawal)
- Organized folder structure and clean codebase

## Getting Started
First, install dependencies:

```bash
yarn install
```
Then, run the development server:

```bash
yarn dev
```
## Environment Variables
To run this project, you need to set up the following environment variables.

Create a `.env.local` file in the root directory and add:

```bash
# Development environment (your local machine)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
API="https://flower.elevateegy.com"


## Contributing
1. Clone the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'feat: add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

### Commit Convention
We use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code formatting
- `refactor:` Code restructuring

### Pull Request Naming Convention
**Format:** `[Type]: Brief description`
**Examples:**
- `feat: add shopping cart functionality`
- `fix: resolve product image loading issue`
- `docs: update API integration guide`
- `style: improve responsive design on mobile`
- `refactor: optimize product filtering logic`


After running the development server, open [http://localhost:3000](http://localhost:3000) in your browser to view **Rose App**.

You can start customizing the app by editing the files inside the `app/` directory.

This project uses optimized Google Fonts — **Sarabun** for English and **Tajawal** for Arabic — for a beautiful, cohesive design.

You can check out [the Next.js GitHub repository](https://github.com/Aya-Mohammed-Hussien/Rose-App) - your feedback and contributions are welcome!


