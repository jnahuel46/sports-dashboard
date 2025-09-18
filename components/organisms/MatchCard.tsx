import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'substitution';
  player: string;
  team: 'home' | 'away';
}

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished' | 'halftime';
  time: string;
  league: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  events?: MatchEvent[];
  possession?: { home: number; away: number };
  className?: string;
}

const MatchCard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  time,
  league,
  homeTeamLogo,
  awayTeamLogo,
  events = [],
  possession,
  className
}: MatchCardProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'card': return '🟨';
      case 'substitution': return '🔄';
      default: return '•';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse">🔴 EN VIVO</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">📅 {time}</Badge>;
      case 'finished':
        return <Badge variant="outline">🏁 FINAL</Badge>;
      case 'halftime':
        return <Badge variant="destructive">⏸️ ENTRETIEMPO</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTeamInitials = (teamName: string) => {
    return teamName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  return (
    <Card className={cn('hover:shadow-lg transition-all duration-300 cursor-pointer', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {league}
          </Badge>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Marcador principal */}
        <div className="flex items-center justify-between">
          {/* Equipo local */}
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-12 h-12">
              <AvatarImage src={homeTeamLogo} alt={homeTeam} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                {getTeamInitials(homeTeam)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{homeTeam}</div>
              <div className="text-xs text-muted-foreground">Local</div>
            </div>
          </div>
          
          {/* Marcador */}
          <div className="flex flex-col items-center mx-4">
            {homeScore !== undefined && awayScore !== undefined ? (
              <div className="text-3xl font-bold">
                {homeScore} - {awayScore}
              </div>
            ) : (
              <div className="text-xl font-medium text-muted-foreground">vs</div>
            )}
            {status === 'live' && (
              <div className="text-xs text-muted-foreground mt-1">
                {Math.floor(Math.random() * 90) + 1}
              </div>
            )}
          </div>
          
          {/* Equipo visitante */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="min-w-0 text-right">
              <div className="font-semibold text-sm truncate">{awayTeam}</div>
              <div className="text-xs text-muted-foreground">Visitante</div>
            </div>
            <Avatar className="w-12 h-12">
              <AvatarImage src={awayTeamLogo} alt={awayTeam} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                {getTeamInitials(awayTeam)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Posesión de balón */}
        {possession && status === 'live' && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Posesión</span>
                <span>{possession.home}% - {possession.away}%</span>
              </div>
              <div className="flex gap-1">
                <div 
                  className="h-2 bg-primary rounded-l"
                  style={{ width: `${possession.home}%` }}
                />
                <div 
                  className="h-2 bg-secondary rounded-r"
                  style={{ width: `${possession.away}%` }}
                />
              </div>
            </div>
          </>
        )}
        
        {/* Eventos del partido */}
        {events.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Eventos recientes</h4>
              <div className="space-y-1">
                {events.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      {event.minute}
                    </Badge>
                    <span>{getEventIcon(event.type)}</span>
                    <span className="text-muted-foreground truncate">
                      {event.player}
                    </span>
                  </div>
                ))}
                {events.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{events.length - 3} eventos más...
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

export default MatchCard;