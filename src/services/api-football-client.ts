// Stub for real API-Football integration (v3.football.api-sports.io)
// Free tier: 100 requests/day. Replace mock-data-service calls with these when ready.

export const apiFootballClient = {
  baseUrl: 'https://v3.football.api-sports.io',
  apiKey: process.env['EXPO_PUBLIC_API_FOOTBALL_KEY'] ?? '',

  async getLiveMatches() {
    // TODO: GET /fixtures?live=all
    throw new Error('Not implemented — use mockDataService');
  },
  async getMatchById(_id: string) {
    // TODO: GET /fixtures?id={id}
    throw new Error('Not implemented — use mockDataService');
  },
  async getStandings(_leagueId: string, _season: number) {
    // TODO: GET /standings?league={leagueId}&season={season}
    throw new Error('Not implemented — use mockDataService');
  },
  async getFixtures(_leagueId: string) {
    // TODO: GET /fixtures?league={leagueId}&next=20
    throw new Error('Not implemented — use mockDataService');
  },
};
