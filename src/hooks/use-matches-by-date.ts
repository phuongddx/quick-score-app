import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mock-data-service';

export function useMatchesByDate(date: string) {
  return useQuery({
    queryKey: ['matches', 'date', date],
    queryFn: () => mockDataService.getMatchesByDate(date),
    refetchInterval: 5000,
    staleTime: 2000,
  });
}
