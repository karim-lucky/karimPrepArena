
// User types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  createdAt: string;
}

// Test types
export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingPercentage: number;
  category: string;
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  testId: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  points: number;
}

// Enrollment types
export interface Enrollment {
  id: string;
  userId: string;
  testId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Attempt types
export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  score: number;
  startedAt: string;
  completedAt: string;
  status: 'in-progress' | 'completed' | 'timed-out';
  answers: {
    questionId: string;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
}

// User progress
export interface UserProgress {
  totalTestsAttempted: number;
  testsCompleted: number;
  averageScore: number;
  highestScore: number;
  awardsEarned: string[];
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
