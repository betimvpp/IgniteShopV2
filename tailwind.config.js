/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backgroundColor: {
                backtheme: '#121214'
            },
            height: {
                656: '656px'
            },
            maxWidth: {
                calc: 'calc(100vw - (100vw - 1180px)/2)'
            },
            minWidth: {
                540: '540px'
            },
            minHeight: {
                656: '656px',
                474: '474px'
            },
            gradientColorStops: {
                linear: '(180deg, #1EA483 0%, #7465D4 100%)'
            },
            fontSize: {
                price: '32px'
            }
        },
    },
    plugins: [],
}