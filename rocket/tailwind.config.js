import tailwindAnimate from 'tailwindcss-animate';

export default {
    content: [
        './index.html',
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './node_modules/streamdown/dist/**/*.js'
    ],
    prefix: '',
    theme: {
        extend: {
            colors: {
                'space-blue': '#1a3648',
                'space-dark': '#0d1b2a',
                'orange-light': '#ff6b35',
            }
        }
    },
    plugins: [tailwindAnimate]
};
