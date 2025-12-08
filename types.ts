export interface Milestone {
  hour: number;
  title: string;
  description: string;
  benefit: string;
  phaseId: number;
}

export interface FastingPhase {
  id: number;
  name: string;
  range: string; // e.g., "0 - 4 Hours"
  description: string;
  color: string;
  minDuration: number; // Hours required to complete this phase
}

export interface OrganStatus {
  organ: string;
  icon: string; // Icon name
  status: string;
  detail: string;
}

export interface ChartDataPoint {
  hour: number;
  glucose: number;
  insulin: number;
  ketones: number;
  autophagy: number;
  hgh: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  threshold: number; // Number of streaks required
  icon: string;
  color: string;
}

export interface UserProgress {
  streaks: { [phaseId: number]: number }; // Map phase ID to streak count
  badges: string[]; // Array of earned badge IDs
  totalFasts: number;
}