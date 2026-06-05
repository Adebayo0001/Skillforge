export enum CourseCategory {
  ALL = 'All',
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  DATA = 'Data',
  CREATIVE = 'Creative',
}

export enum CourseFormat {
  COHORT = 'Live Cohort',
  SELF_PACED = 'Self-Paced Programme',
}

export enum CourseLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export interface SyllabusLesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface SyllabusModule {
  id: string;
  title: string;
  lessons: SyllabusLesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  category: CourseCategory;
  level: CourseLevel;
  format: CourseFormat;
  price: number;
  oldPrice?: number;
  syllabus: SyllabusModule[];
  previewVideoUrl?: string;
  durationHours: number;
  durationWeeks: number;
  cohortDates?: string[];
  thumbnailUrl: string;
  isFeatured: boolean;
  learningOutcomes: string[];
  targetAudience: string[];
  instructorId: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  imageUrl: string;
  experienceText: string;
  isFeatured: boolean;
  courseCount: number;
}

export interface Review {
  id: string;
  courseId: string;
  studentName: string;
  profession: string;
  company: string;
  rating: number;
  quote: string;
  date: string;
  imageUrl?: string;
}

export interface OutcomeCard {
  id: string;
  studentName: string;
  quote: string;
  outcomeText: string;
  relativeTimeText: string;
  courseName: string;
  imageUrl: string;
}
