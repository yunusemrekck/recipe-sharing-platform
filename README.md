# Savora - Recipe Sharing Platform

A beautiful recipe sharing platform where home cooks share their favorite dishes with the world.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (to be configured)
  - Authentication
  - PostgreSQL Database
  - Storage for images
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend features)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Supabase credentials to `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
recipe-sharing-platform/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Hero section
│   ├── RecipeCard.tsx      # Recipe card component
│   ├── CategorySection.tsx # Category browsing
│   ├── CTASection.tsx      # Call-to-action section
│   └── TagChip.tsx         # Tag component
├── lib/                    # Utilities and data
│   ├── utils.ts            # Helper functions
│   └── sample-data.ts      # Sample recipe data
└── public/                 # Static assets
```

## Design System

### Colors

- **Cream**: Background tones (`cream-50` to `cream-400`)
- **Terracotta**: Primary accent (`terracotta-400` to `terracotta-700`)
- **Sage**: Secondary accent (`sage-300` to `sage-600`)
- **Charcoal**: Text colors (`charcoal-700` to `charcoal-900`)

### Typography

- **Display**: Playfair Display (headings)
- **Body**: Source Sans 3 (body text)

## Next Steps

1. Set up Supabase project and configure environment variables
2. Create database schema (profiles, recipes, ingredients, steps, tags)
3. Implement authentication (sign up, sign in, sign out)
4. Build recipe creation form
5. Add image upload functionality
6. Implement search and filtering
7. Add reporting functionality

## License

MIT
