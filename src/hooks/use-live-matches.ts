import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mock-data-service';

export function useLiveMatches() {
  return useQuery({
    queryKey: ['matches', 'live'],
    queryFn: () => mockDataService.getLiveMatches(),
    refetchInterval: 5000,
    staleTime: 2000,
  });
}

export function useLiveMatchCount(): number {
  const { data } = useLiveMatches();
  return data?.length ?? 0;
}
