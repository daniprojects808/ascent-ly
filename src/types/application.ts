export type ApplicationStatus = 'not_started' | 'in_progress' | 'completed';

export type WorkType = 'remote' | 'hybrid' | 'onsite';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead';

export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  position_title: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  industry?: string;
  work_type?: WorkType;
  experience_level?: ExperienceLevel;
  status: ApplicationStatus;
  notes?: string;
  applied_date?: string;
  is_favorited?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApplicationMetrics {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  offers: number;
}
