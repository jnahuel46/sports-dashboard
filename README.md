# MatchDay Central 🏆

A real-time sports dashboard that brings you the most exciting matches and events of the day, featuring Argentine football, Formula 1, Premier League, and more.

## ✨ Features

- **Real-time Updates**: Live scores, match events, and race timing
- **Multi-Sport Coverage**: Football (Argentine League, Premier League, Champions League) and Formula 1
- **Smart Timeline**: Day's events organized chronologically with local time
- **Weather Integration**: Race conditions and match weather data
- **Predictions**: AI-powered match predictions and statistics
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Sleek sports-focused design with modern aesthetics

## 🏈 Sports Coverage

### Football
- **Argentine Primera División**: Boca, River, Racing, Independiente, and more
- **Premier League**: All English top-flight matches
- **UEFA Champions League**: European elite competition
- **Real-time Statistics**: Goals, cards, substitutions, and match events

### Formula 1
- **Race Weekends**: Practice, Qualifying, and Race sessions
- **Live Timing**: Sector times, fastest laps, and positions
- **Weather Conditions**: Track temperature, wind, and precipitation
- **Championship Standings**: Drivers and Constructors tables

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sports-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Add your API keys:
```env
API_SPORTS_KEY=your_api_sports_key
FOOTBALL_DATA_KEY=your_football_data_key
OPENWEATHER_KEY=your_openweather_key
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 🔌 API Integrations

- **[API-Sports](https://api-sports.io)**: Primary source for football and F1 data
- **[Football-Data.org](https://football-data.org)**: European football leagues
- **[OpenWeatherMap](https://openweathermap.org)**: Weather conditions for outdoor events
- **[Ergast F1 API](http://ergast.com/api/f1)**: Historical F1 data and statistics

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Server Components + Client Components
- **Real-time**: WebSocket connections for live updates
- **Deployment**: Vercel (recommended)

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard with multiple columns
- **Tablet**: Adaptive layout with stacked components
- **Mobile**: Single-column layout with swipeable cards

## 🔄 Real-time Updates

- Live score updates every 30 seconds
- Match events (goals, cards, substitutions) in real-time
- F1 timing updates during sessions
- Weather condition monitoring
- Automatic timezone detection and conversion

## 🎨 Design System

- **Dark Theme**: Primary UI with sports-focused color palette
- **Typography**: Geist font family for optimal readability
- **Animations**: Smooth transitions and loading states
- **Icons**: Sports-specific iconography and team badges

## 📊 Performance

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages for better performance
- **Image Optimization**: Automatic image compression and formats
- **Caching**: Smart API response caching to reduce load times

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Vercel](https://vercel.com) for seamless deployment and hosting
- Sports APIs for providing comprehensive sports data

---

Built with ❤️ for sports fans around the world.
