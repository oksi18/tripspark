export interface Place {
  id: number;
  name: string;
  city: string;
  description: string;
  category: string;
  budget_level: number;
  popularity: number;
  lat: number;
  lng: number;
  avg_visit_minutes: number;
}

export interface Interest {
  id: number;
  name: string;
}