import { useQuery } from '@tanstack/react-query';
import { useFavoritesStore } from '../stores/favorites-store';
import { mockDataService } from '../services/mock-data-service';

/** Returns live matches where one of the teams is a favourite */
export function useFavoriteMatches() {
  const { favoriteTeamIds } = useFavoritesStore();

  return useQuery({
    queryKey: ['matches', 'favorites', favoriteTeamIds],
    queryFn: () => {
      const live = mockDataService.getLiveMatches();
      if (favoriteTeamIds.length === 0) return [];
      return live.filter(
        (m) =>
          favoriteTeamIds.includes(m.homeTeam.id) ||
          favoriteTeamIds.includes(m.awayTeam.id),
      );
    },
    refetchInterval: 5000,
    staleTime: 2000,
  });
}
