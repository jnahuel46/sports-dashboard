import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface F1Driver {
  position: number;
  name: string;
  team: string;
  time: string;
  gap?: string;
  country?: string;
}

interface F1CardProps {
  sessionType: 'practice' | 'qualifying' | 'race';
  sessionNumber?: number;
  circuitName: string;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  drivers?: F1Driver[];
  weather?: {
    condition: string;
    temperature: number;
    track: 'dry' | 'wet';
    wind?: string;
  };
  lapsCompleted?: number;
  totalLaps?: number;
  className?: string;
}

const F1Card = ({
  sessionType,
  sessionNumber,
  circuitName,
  time,
  status,
  drivers = [],
  weather,
  lapsCompleted,
  totalLaps,
  className
}: F1CardProps) => {
  const getSessionTitle = () => {
    switch (sessionType) {
      case 'practice': 
        return `PRÁCTICA LIBRE${sessionNumber ? ` ${sessionNumber}` : ''}`;
      case 'qualifying': 
        return 'CLASIFICACIÓN';
      case 'race': 
        return 'CARRERA';
      default: 
        return String(sessionType).toUpperCase();
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': case 'clear': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': case 'rain': return '🌧️';
      case 'partly cloudy': return '⛅';
      case 'overcast': return '🌫️';
      default: return '🌤️';
    }
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-600 font-bold';
    if (position === 2) return 'text-gray-600 font-bold';
    if (position === 3) return 'text-amber-700 font-bold';
    return 'text-foreground';
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse">🔴 EN VIVO</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">🏁 {time} ART</Badge>;
      case 'finished':
        return <Badge variant="outline">🏆 FINALIZADO</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDriverInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getTeamColor = (team: string) => {
    const teamColors: { [key: string]: string } = {
      'Red Bull': 'bg-blue-600',
      'Ferrari': 'bg-red-600',
      'Mercedes': 'bg-cyan-400',
      'McLaren': 'bg-orange-500',
      'Alpine': 'bg-pink-500',
      'Aston Martin': 'bg-green-600',
      'Williams': 'bg-blue-400',
      'AlphaTauri': 'bg-gray-600',
      'Alfa Romeo': 'bg-red-800',
      'Haas': 'bg-gray-400'
    };
    return teamColors[team] || 'bg-primary';
  };

  return (
    <Card className={cn('hover:shadow-lg transition-all duration-300 cursor-pointer', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏎️</span>
            <div>
              <CardTitle className="text-lg">FÓRMULA 1</CardTitle>
              <div className="text-sm text-muted-foreground">{circuitName}</div>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{getSessionTitle()}</h3>
            {status === 'upcoming' && (
              <div className="text-sm text-muted-foreground">⏰ {time}</div>
            )}
          </div>
          
          {/* Progreso de la carrera */}
          {status === 'live' && totalLaps && lapsCompleted !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Vuelta {lapsCompleted} de {totalLaps}</span>
                <span>{Math.round((lapsCompleted / totalLaps) * 100)}%</span>
              </div>
              <Progress value={(lapsCompleted / totalLaps) * 100} className="h-2" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Resultados/Tiempos */}
        {drivers.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              🏁 {sessionType === 'race' ? 'Posiciones' : 'Mejores Tiempos'}
            </h4>
            <div className="space-y-2">
              {drivers.slice(0, 5).map((driver, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'text-sm w-6 text-center',
                      getPositionColor(driver.position)
                    )}>
                      {driver.position}.
                    </span>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={cn(
                        'text-white text-xs font-bold',
                        getTeamColor(driver.team)
                      )}>
                        {getDriverInitials(driver.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">
                        {driver.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {driver.team}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">
                      {driver.time}
                    </div>
                    {driver.gap && (
                      <div className="text-xs text-muted-foreground">
                        +{driver.gap}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Información del clima */}
        {weather && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">
                Condiciones de Pista
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>{getWeatherIcon(weather.condition)}</span>
                  <span className="text-muted-foreground">
                    {weather.temperature}°C
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{weather.track === 'dry' ? '🏁' : '💧'}</span>
                  <span className="text-muted-foreground">
                    {weather.track === 'dry' ? 'Seca' : 'Húmeda'}
                  </span>
                </div>
                {weather.wind && (
                  <div className="flex items-center gap-2 col-span-2">
                    <span>💨</span>
                    <span className="text-muted-foreground">
                      Viento: {weather.wind}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default F1Card;