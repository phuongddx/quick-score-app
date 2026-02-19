import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mock-data-service';

export function useMatchDetail(id: string) {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => mockDataService.getMatchById(id),
    refetchInterval: 5000,
    staleTime: 2000,
    enabled: !!id,
  });
}
