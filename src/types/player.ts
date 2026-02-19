export interface PlayerProfile {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  nationality: string;
  age: number;
}
