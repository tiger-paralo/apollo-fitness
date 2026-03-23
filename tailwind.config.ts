import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apollo brand colors from mockup
        'apollo-black': '#0A0A0A',
        'apollo-card': '#141414',
        'apollo-card-hover': '#1A1A1A', 
        'apollo-text': '#FFFFFF',
        'apollo-muted': '#8A8A8A',
        'apollo-subtle': '#5A5A5A',
        'apollo-teal': '#57B5A0',
        'apollo-orange': '#FF6B35',
        'apollo-orange-hover': '#FF8555',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Oswald', 'system-ui', 'sans-serif'],
        'stat': ['Bebas Neue', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-md': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.2' }],
        'stat': ['clamp(3.5rem, 8vw, 5rem)', { lineHeight: '1', letterSpacing: '0.02em' }],
      },
      animation: {
        'float': 'float 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config