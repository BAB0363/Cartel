tailwind.config = {
    darkMode: 'class',
    theme: { 
        extend: { 
            colors: {
                'hell-dark': '#0a0a0a',
                'hell-red': '#7f1d1d',
                'soul-blue': '#0e7490',
                'soul-dark': '#020617',
                'gold': '#fbbf24',
                'mystery': '#581c87',
                'plague': '#14532d',
                'cartel-green': '#1a4731', 
                'cartel-snow': '#f1f5f9', 
                'cartel-blood': '#450a0a',
                'crypto-green': '#00ff41',
            },
            fontFamily: {
                mono: ['Courier New', 'Courier', 'monospace'],
                serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
                display: ['Impact', 'Arial Black', 'sans-serif'],
            },
            animation: { 
                'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'glitch': 'glitch 0.2s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
                'implode': 'implode 0.5s ease-in forwards',
                'reveal': 'reveal 1s ease-out forwards',
                'digit-mutate': 'digitMutate 0.05s infinite',
                'number-climb': 'numberClimb 2s ease-out forwards',
                'float-up': 'floatUp 2s ease-out forwards', 
                'pot-pulse': 'potPulse 0.3s ease-in-out',
                'soul-float': 'soulFloat 3s ease-in-out infinite',
                'screen-jump': 'screenJump 4s infinite',
                'corrupt-text': 'corruptText 3s infinite',
                'gold-shine': 'goldShine 2s infinite linear',
                'split-left': 'splitLeft 3s forwards',
                'split-right': 'splitRight 3s forwards',
                'fade-out': 'fadeOut 3s forwards',
                'seal-flash': 'sealFlash 1s infinite alternate',
                'extreme-chaos': 'extremeChaos 0.1s infinite',
                'summon': 'summon 2s ease-in-out infinite',
                'gunshot': 'gunshot 0.1s ease-out',
                'hacker-text': 'hackerText 0.1s infinite',
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                },
                reveal: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                extremeChaos: {
                    '0%': { transform: 'translate(2px, 2px) skewX(20deg) filter(blur(1px))' },
                    '25%': { transform: 'translate(-2px, -2px) skewX(-20deg) filter(blur(0px))' },
                    '50%': { transform: 'translate(1px, -1px) scale(1.1) filter(blur(2px))' },
                    '75%': { transform: 'translate(-1px, 1px) scale(0.9)' },
                    '100%': { transform: 'translate(0, 0) skewX(10deg)' },
                },
                digitMutate: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '25%': { opacity: '0.5', transform: 'translateY(-2px)' },
                    '50%': { opacity: '0.8', transform: 'translateY(2px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                floatUp: {
                    '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
                    '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: '1' },
                    '100%': { transform: 'translateY(-40px) scale(1)', opacity: '0' }
                },
                potPulse: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.3)', color: '#22c55e' }, 
                    '100%': { transform: 'scale(1)' }
                },
                soulFloat: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' },
                    '50%': { transform: 'translateY(-10px) scale(1.1)', filter: 'brightness(1.5)' }
                },
                screenJump: {
                    '0%, 98%': { transform: 'translateY(0)' },
                    '99%': { transform: 'translateY(3px) skewX(2deg)' },
                    '99.5%': { transform: 'translateY(-3px) skewX(-2deg)' },
                    '100%': { transform: 'translateY(0)' }
                },
                corruptText: {
                    '0%, 100%': { textShadow: 'none', color: 'inherit' },
                    '50%': { textShadow: '1px 0 0 rgba(255,0,0,0.7), -1px 0 0 rgba(0,0,255,0.7)' },
                    '90%': { color: 'rgba(255,255,255,0.8)' },
                    '92%': { color: '#ef4444' }
                },
                goldShine: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' }
                },
                sealFlash: {
                    '0%': { boxShadow: '0 0 5px #fbbf24', borderColor: '#fbbf24' },
                    '100%': { boxShadow: '0 0 20px #fbbf24', borderColor: '#fef3c7' }
                },
                splitLeft: {
                    '0%': { transform: 'translateX(0) scale(1)', opacity: '0' },
                    '20%': { opacity: '1' },
                    '100%': { transform: 'translateX(-20vw) scale(1.2)', opacity: '1' }
                },
                splitRight: {
                    '0%': { transform: 'translateX(0) scale(1)', opacity: '0' },
                    '20%': { opacity: '1' },
                    '100%': { transform: 'translateX(20vw) scale(1.2)', opacity: '1' }
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '80%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                summon: {
                    '0%': { boxShadow: '0 0 0 0px rgba(255,0,0,0)', transform: 'scale(1)' },
                    '50%': { boxShadow: '0 0 20px 10px rgba(0,255,0,0.3)', transform: 'scale(1.05)' },
                    '100%': { boxShadow: '0 0 0 0px rgba(255,0,0,0)', transform: 'scale(1)' }
                },
                gunshot: {
                    '0%': { transform: 'scale(1) rotate(0deg)' },
                    '50%': { transform: 'scale(1.5) rotate(-10deg)' },
                    '100%': { transform: 'scale(1) rotate(0deg)' }
                },
                hackerText: {
                    '0%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '1' }
                }
            }
        } 
    }
};
