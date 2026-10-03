/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        // figma:revsta (cZaXwqx2) — start
        "figma-surface-3": "hsl(var(--figma-surface-3))",
        "figma-subtle-2": "hsl(var(--figma-subtle-2))",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-surface-2": "hsl(var(--figma-surface-2))",
        "figma-border": "hsl(var(--figma-border))",
        "figma-highlight": "hsl(var(--figma-highlight))",
        "figma-subtle": "hsl(var(--figma-subtle))",
        "figma-color-9": "hsl(var(--figma-color-9))",
        "figma-color-11": "hsl(var(--figma-color-11))",
        "figma-color-12": "hsl(var(--figma-color-12))",
        "figma-color-13": "hsl(var(--figma-color-13))",
        "figma-text-4-2": "hsl(var(--figma-text-4-2))",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-muted-2": "hsl(var(--figma-muted-2))",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-primary": "hsl(var(--figma-primary))",
        "figma-secondary": "hsl(var(--figma-secondary))",
        "figma-accent": "hsl(var(--figma-accent))",
        "figma-muted": "hsl(var(--figma-muted))",
        // figma:revsta (cZaXwqx2) — end
      
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		
  		
  		'figma-surface': 'hsl(var(--figma-surface))',
  		
  		'figma-text-2': 'hsl(var(--figma-text-2))',
  		
  		'figma-text-3': 'hsl(var(--figma-text-3))',
  		
  		'figma-text-4': 'hsl(var(--figma-text-4))',
  		
  		'figma-text-1': 'hsl(var(--figma-text-1))',
  		
  		
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		
  		
  		fontSize: {
        // figma:revsta (cZaXwqx2) — start
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-22": "22px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-32": "32px",
        "figma-42": "42px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-16": "16px",
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-32": "32px",
        "figma-42": "42px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-12": "12px",
        "figma-14": "14px",
        "figma-16": "16px",
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-24": "24px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-18": "18px",
        "figma-20": "20px",
        "figma-24": "24px",
        "figma-28": "28px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
  			
  			'figma-12': '12px',
  			
  			'figma-14': '14px',
  			
  			'figma-16': '16px',
  			
  			'figma-18': '18px',
  			
  			'figma-20': '20px',
  			
  			'figma-22': '22px',
  			
  			'figma-24': '24px',
  			
  			'figma-28': '28px',
  			
  			'figma-50': '50px',
  			
  			'figma-64': '64px',
  			
  		},
  		
  		
  		fontWeight: {
        // figma:revsta (cZaXwqx2) — start
        "figma-normal": "400",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-normal": "400",
        "figma-medium": "500",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-normal": "400",
        "figma-medium": "500",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-light": "300",
        "figma-normal": "400",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-normal": "400",
        // figma:revsta (cZaXwqx2) — end
      
  			
  			'figma-light': '300',
  			
  			'figma-normal': '400',
  			
  			'figma-medium': '500',
  			
  		},
  		
  		
  		lineHeight: {
        // figma:revsta (cZaXwqx2) — start
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-27": "27px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-27": "27px",
        "figma-29": "29px",
        "figma-39": "39px",
        "figma-51": "51px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-16": "16px",
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-27": "27px",
        "figma-29": "29px",
        "figma-39": "39px",
        "figma-51": "51px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-12": "12px",
        "figma-14": "14px",
        "figma-16": "16px",
        "figma-18": "18px",
        "figma-19": "19px",
        "figma-20": "20px",
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
        // figma:revsta (cZaXwqx2) — start
        "figma-20": "20px",
        "figma-22": "22px",
        "figma-24": "24px",
        "figma-28": "28px",
        "figma-29": "29px",
        "figma-64": "64px",
        // figma:revsta (cZaXwqx2) — end
      
  			
  			'figma-12': '12px',
  			
  			'figma-14': '14px',
  			
  			'figma-16': '16px',
  			
  			'figma-18': '18px',
  			
  			'figma-19': '19px',
  			
  			'figma-20': '20px',
  			
  			'figma-22': '22px',
  			
  			'figma-24': '24px',
  			
  			'figma-27': '27px',
  			
  			'figma-28': '28px',
  			
  			'figma-29': '29px',
  			
  			'figma-50': '50px',
  			
  			'figma-64': '64px',
  			
  		},
  		
  		
  		fontFamily: {
  			
  			'heading': ['"Inter Tight"', 'sans-serif'],
  			
  		},
  		
  		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};