import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mock-data-service';

export function useFixtures(leagueId?: string, days = 14) {
  return useQuery({
    queryKey: ['fixtures', leagueId ?? 'all', days],
    queryFn: () => mockDataService.getFixtures(leagueId, days),
    staleTime: 30_000,
  });
}
