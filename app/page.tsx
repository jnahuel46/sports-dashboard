import { Clock, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/organisms/Navigation';
import MatchCard from '@/components/organisms/MatchCard';
import F1Card from '@/components/organisms/F1Card';

export default function Home() {
  // Datos mock para demostración (en producción vendrían de las APIs)
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Argentina/Buenos_Aires'
    });
  };

  const mockFootballMatches = [
    {
      homeTeam: 'Boca Juniors',
      awayTeam: 'River Plate',
      homeScore: 2,
      awayScore: 1,
      status: 'live' as const,
      time: '15:30',
      league: 'Liga Profesional Argentina',
      events: [
        { minute: 23, type: 'goal' as const, player: 'Benedetto', team: 'home' as const },
        { minute: 45, type: 'card' as const, player: 'Enzo Pérez', team: 'away' as const },
        { minute: 67, type: 'goal' as const, player: 'Langoni', team: 'home' as const }
      ],
      possession: { home: 58, away: 42 }
    },
    {
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeScore: 1,
      awayScore: 1,
      status: 'halftime' as const,
      time: '16:30',
      league: 'Premier League',
      events: [
        { minute: 12, type: 'goal' as const, player: 'Saka', team: 'home' as const },
        { minute: 38, type: 'goal' as const, player: 'Sterling', team: 'away' as const }
      ]
    },
    {
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      status: 'upcoming' as const,
      time: '21:00',
      league: 'La Liga'
    }
  ];

  const mockF1Data = {
    sessionType: 'qualifying' as const,
    circuitName: 'Monza GP',
    time: '15:00',
    status: 'live' as const,
    drivers: [
      { position: 1, name: 'Max Verstappen', team: 'Red Bull', time: '1:20.354' },
      { position: 2, name: 'Charles Leclerc', team: 'Ferrari', time: '1:20.498', gap: '0.144' },
      { position: 3, name: 'Lewis Hamilton', team: 'Mercedes', time: '1:20.623', gap: '0.269' },
      { position: 4, name: 'Lando Norris', team: 'McLaren', time: '1:20.754', gap: '0.400' },
      { position: 5, name: 'Carlos Sainz', team: 'Ferrari', time: '1:20.891', gap: '0.537' }
    ],
    weather: {
      condition: 'partly cloudy',
      temperature: 28,
      track: 'dry' as const,
      wind: '12 km/h NE'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Hero Section */}
        <section className="text-center py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            MatchDay Central
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Tu centro deportivo en tiempo real
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>ART {getCurrentTime()}</span>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En Vivo</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hoy</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seguimientos</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">📅 Hoy</TabsTrigger>
            <TabsTrigger value="live">🔴 En Vivo</TabsTrigger>
            <TabsTrigger value="standings">📊 Posiciones</TabsTrigger>
            <TabsTrigger value="more">⚡ Más</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-6 mt-6">
            {/* Featured Match */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Partido Destacado</h2>
              <MatchCard {...mockFootballMatches[0]} className="mb-6" />
            </section>

            {/* F1 Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Fórmula 1</h2>
              <F1Card {...mockF1Data} className="mb-6" />
            </section>

            {/* Other Matches */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Otros Partidos</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockFootballMatches.slice(1).map((match, index) => (
                  <MatchCard key={index} {...match} />
                ))}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="live" className="space-y-6 mt-6">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">🔴 EN VIVO</Badge>
                Eventos en directo
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockFootballMatches
                  .filter(match => match.status === 'live')
                  .map((match, index) => (
                    <MatchCard key={index} {...match} />
                  ))}
              </div>
              <F1Card {...mockF1Data} />
            </section>
          </TabsContent>
          
          <TabsContent value="standings" className="space-y-6 mt-6">
            <section>
              <h2 className="text-2xl font-bold mb-6">Posiciones</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Liga Profesional Argentina</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Boca Juniors', 'River Plate', 'Racing', 'Independiente', 'San Lorenzo'].map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-bold">{index + 1}</span>
                          <span>{team}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {65 - index * 5} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
          
          <TabsContent value="more" className="space-y-6 mt-6">
            <section>
              <h2 className="text-2xl font-bold mb-6">Más Deportes</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏀 NBA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Próximamente...</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎾 ATP
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Próximamente...</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏈 NFL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Próximamente...</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* Loading State Demo */}
        <section className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-4">
            Actualizando datos en tiempo real...
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
