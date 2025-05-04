import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			mystery: {
    				'100': '#E5DEFF',
    				'200': '#D6BCFA',
    				'300': '#B197FC',
    				'400': '#9775FA',
    				'500': '#845EF7',
    				'600': '#7048E8',
    				'700': '#5F3DC4',
    				'800': '#4C309C',
    				'900': '#402A83',
    				'950': '#1A1F2C'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			'pulse-glow': {
    				'0%, 100%': {
    					opacity: '0.6',
    					boxShadow: '0 0 5px rgba(165, 130, 255, 0.5)'
    				},
    				'50%': {
    					opacity: '1',
    					boxShadow: '0 0 20px rgba(165, 130, 255, 0.8)'
    				}
    			},
    			shimmer: {
    				'0%': {
    					backgroundPosition: '-500px 0'
    				},
    				'100%': {
    					backgroundPosition: '500px 0'
    				}
    			},
    			'bounce-slow': {
    				'0%, 100%': {
    					transform: 'translateY(-5%)'
    				},
    				'50%': {
    					transform: 'translateY(0)'
    				}
    			},
    			'spin-slow': {
    				'0%': {
    					transform: 'rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg)'
    				}
    			},
    			'fade-in-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'fade-in-down': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(-20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'fade-in': {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			float: 'float 6s ease-in-out infinite',
    			'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
    			shimmer: 'shimmer 2.5s infinite linear',
    			'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
    			'spin-slow': 'spin-slow 10s linear infinite',
    			'fade-in-up': 'fade-in-up 0.7s ease-out',
    			'fade-in-down': 'fade-in-down 0.7s ease-out',
    			'fade-in': 'fade-in 0.5s ease-out'
    		},
    		backgroundImage: {
    			'hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(132, 94, 247, 0.15) 0%, rgba(10, 10, 25, 0) 65%)',
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(165, 130, 255, 0.1), transparent)',
    			'feature-card': 'linear-gradient(135deg, rgba(165, 130, 255, 0.05) 0%, rgba(95, 61, 196, 0.1) 100%)',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;