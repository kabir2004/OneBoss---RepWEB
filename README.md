# OneBoss Dashboard

A modern business intelligence dashboard built with Next.js, React, and TypeScript. OneBoss provides comprehensive analytics and management tools for business operations with a focus on assets, clients, and performance metrics.

## Features

- **Interactive Dashboard** - Customizable widgets displaying key business metrics
- **Asset Management** - Track assets by plan type and supplier
- **Client Analytics** - Monitor top clients and their performance
- **Product Insights** - Analyze top-performing products and their trends
- **User Authentication** - Secure sign-in system with password recovery
- **Responsive Design** - Modern UI built with Radix UI and Tailwind CSS
- **Dark/Light Mode** - Theme switching for better user experience

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kabir2004/OneBoss---RepWEB.git
cd OneBoss---RepWEB
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js app router
│   ├── dashboard/         # Dashboard page
│   ├── signin/           # Authentication pages
│   └── forgot-password/  # Password recovery
├── components/           # React components
│   ├── auth/            # Authentication forms
│   ├── kokonutui/       # Dashboard components
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/             # Static assets
```

## Deployment

The application is optimized for deployment on Vercel with the included `vercel.json` configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kabir2004/OneBoss---RepWEB)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.