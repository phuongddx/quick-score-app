import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mock-data-service';

export function useStandings(leagueId: string) {
  return useQuery({
    queryKey: ['standings', leagueId],
    queryFn: () => mockDataService.getStandings(leagueId),
    staleTime: 60_000, // standings rarely change mid-match
    enabled: !!leagueId,
  });
}
