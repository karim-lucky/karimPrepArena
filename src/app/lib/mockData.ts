import { User, Test, Question, Enrollment, TestAttempt, Notification } from "./types";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    createdAt: '2023-01-05T00:00:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: '/placeholder.svg',
    createdAt: '2022-12-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    createdAt: '2023-02-10T00:00:00Z',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
    createdAt: '2023-03-15T00:00:00Z',
  },
];

// Mock tests
export const mockTests: Test[] = [
  {
    id: '1',
    title: 'Biology Mock Test',
    description: 'Comprehensive test covering key biology concepts for MDCAT preparation.',
    duration: 60,
    totalQuestions: 30,
    passingPercentage: 60,
    category: 'Biology',
    price: 300,
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-15T10:00:00Z',
    isActive: true,
    createdAt: '2025-05-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Chemistry Fundamentals',
    description: 'Test your knowledge of basic chemistry principles for competitive exams.',
    duration: 45,
    totalQuestions: 25,
    passingPercentage: 70,
    category: 'Chemistry',
    price: 300,
    startDate: '2025-06-20T14:00:00Z',
    endDate: '2025-06-20T15:00:00Z',
    isActive: true,
    createdAt: '2025-05-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'Physics Challenge',
    description: 'Advanced physics problems to prepare you for competitive examinations.',
    duration: 90,
    totalQuestions: 40,
    passingPercentage: 65,
    category: 'Physics',
    price: 300,
    startDate: '2025-06-25T10:00:00Z',
    endDate: '2025-06-25T11:30:00Z',
    isActive: true,
    createdAt: '2025-05-25T00:00:00Z',
  },
  {
    id: '4',
    title: 'English Proficiency',
    description: 'Test your English language skills required for medical school admissions.',
    duration: 30,
    totalQuestions: 20,
    passingPercentage: 75,
    category: 'English',
    price: 300,
    startDate: '2025-07-01T09:00:00Z',
    endDate: '2025-07-01T09:30:00Z',
    isActive: true,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Comprehensive MDCAT Mock',
    description: 'Full-length MDCAT simulation covering all subjects.',
    duration: 180,
    totalQuestions: 100,
    passingPercentage: 70,
    category: 'MDCAT',
    price: 500,
    startDate: '2025-07-10T08:00:00Z',
    endDate: '2025-07-10T11:00:00Z',
    isActive: true,
    createdAt: '2025-06-10T00:00:00Z',
  },
];

// Sample questions for the Biology test


export const mockQuestions: Record<string, Question[]> = {
  '1': [
    {
      id: '1-1',
      testId: '1',
      text: 'Which of the following is NOT a function of the cell membrane?',
      options: [
        'Transport of materials',
        'Cell signaling',
        'Protein synthesis',
        'Structural support'
      ],
      correctOptionIndex: 2,
      points: 5,
    },
    {
      id: '1-2',
      testId: '1',
      text: 'The process by which a cell engulfs material is called:',
      options: [
        'Exocytosis',
        'Endocytosis',
        'Osmosis',
        'Diffusion'
      ],
      correctOptionIndex: 1,
      points: 5,
    },
    {
      id: '1-3',
      testId: '1',
      text: 'Which organelle is known as the "powerhouse" of the cell?',
      options: [
        'Nucleus',
        'Endoplasmic Reticulum',
        'Mitochondria',
        'Golgi Apparatus'
      ],
      correctOptionIndex: 2,
      points: 5,
    },
    {
      id: '1-4',
      testId: '1',
      text: 'DNA replication occurs during which phase of the cell cycle?',
      options: [
        'G1 Phase',
        'S Phase',
        'G2 Phase',
        'M Phase'
      ],
      correctOptionIndex: 1,
      points: 5,
    },
    {
      id: '1-5',
      testId: '1',
      text: 'Which of the following is a function of the lymphatic system?',
      options: [
        'Production of insulin',
        'Return of interstitial fluid to blood',
        'Digestion of fats',
        'Filtration of blood'
      ],
      correctOptionIndex: 1,
      points: 5,
    },
  ],
  '2': [
    {
      id: '2-1',
      testId: '2',
      text: 'What is the pH of a neutral solution?',
      options: ['0', '7', '14', '3.5'],
      correctOptionIndex: 1,
      points: 5,
    },
    {
      id: '2-2',
      testId: '2',
      text: 'Which of the following is NOT a noble gas?',
      options: ['Helium', 'Neon', 'Argon', 'Oxygen'],
      correctOptionIndex: 3,
      points: 5,
    },
  ],
};

// Add more mock questions for other tests as needed...

// Mock enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    userId: '1',
    testId: '1',
    status: 'approved',
    paymentStatus: 'completed',
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    testId: '2',
    status: 'pending',
    paymentStatus: 'completed',
    createdAt: '2025-06-05T00:00:00Z',
  },
  {
    id: '3',
    userId: '2',
    testId: '1',
    status: 'approved',
    paymentStatus: 'completed',
    createdAt: '2025-06-02T00:00:00Z',
  },
  {
    id: '4',
    userId: '4',
    testId: '1',
    status: 'pending',
    paymentStatus: 'completed',
    createdAt: '2025-05-11T08:30:00Z', // Today's date
  },
  {
    id: '5',
    userId: '5',
    testId: '3',
    status: 'pending',
    paymentStatus: 'completed',
    createdAt: '2025-05-11T09:45:00Z', // Today's date
  },
  {
    id: '6',
    userId: '2',
    testId: '4',
    status: 'pending',
    paymentStatus: 'completed',
    createdAt: '2025-05-10T14:20:00Z',
  },
  {
    id: '7',
    userId: '1',
    testId: '5',
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2025-05-11T07:15:00Z', // Today's date, but payment pending
  },
];

// Mock test attempts
export const mockTestAttempts: TestAttempt[] = [
  {
    id: '1',
    userId: '1',
    testId: '1',
    score: 85,
    startedAt: '2025-05-01T09:00:00Z',
    completedAt: '2025-05-01T09:55:00Z',
    status: 'completed',
    answers: [
      {
        questionId: '1-1',
        selectedOptionIndex: 2,
        isCorrect: true,
      },
      {
        questionId: '1-2',
        selectedOptionIndex: 1,
        isCorrect: true,
      },
      {
        questionId: '1-3',
        selectedOptionIndex: 0,
        isCorrect: false,
      },
    ],
  },
  {
    id: '2',
    userId: '2',
    testId: '1',
    score: 70,
    startedAt: '2025-05-02T14:00:00Z',
    completedAt: '2025-05-02T14:55:00Z',
    status: 'completed',
    answers: [
      {
        questionId: '1-1',
        selectedOptionIndex: 2,
        isCorrect: true,
      },
      {
        questionId: '1-2',
        selectedOptionIndex: 2,
        isCorrect: false,
      },
      {
        questionId: '1-3',
        selectedOptionIndex: 2,
        isCorrect: true,
      },
    ],
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Test Registration Approved',
    message: 'Your registration for Biology Mock Test has been approved.',
    read: false,
    createdAt: '2025-06-02T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    title: 'New Test Available',
    message: 'A new Chemistry test is now available for registration.',
    read: true,
    createdAt: '2025-06-03T08:00:00Z',
  },
  {
    id: '3',
    userId: '1',
    title: 'Payment Reminder',
    message: 'Please complete your payment for the Chemistry test.',
    read: false,
    createdAt: '2025-06-06T09:00:00Z',
  },
];

// Helper functions to get data
export const getCurrentUser = () => mockUsers[0]; // Assume logged in as student
export const getAdminUser = () => mockUsers[2]; // Admin user

export const getUpcomingTests = () => 
  mockTests.filter(test => new Date(test.startDate) > new Date());

export const getEnrolledTests = (userId: string) => 
  mockEnrollments
    .filter(enrollment => enrollment.userId === userId && enrollment.status === 'approved')
    .map(enrollment => mockTests.find(test => test.id === enrollment.testId))
    .filter(Boolean) as Test[];

export const getPendingEnrollments = (userId: string) =>
  mockEnrollments
    .filter(enrollment => enrollment.userId === userId && enrollment.status === 'pending')
    .map(enrollment => ({
      enrollment,
      test: mockTests.find(test => test.id === enrollment.testId),
    }))
    .filter(item => item.test) as { enrollment: Enrollment; test: Test }[];

export const getUserTestAttempts = (userId: string) =>
  mockTestAttempts
    .filter(attempt => attempt.userId === userId)
    .map(attempt => ({
      attempt,
      test: mockTests.find(test => test.id === attempt.testId),
    }))
    .filter(item => item.test) as { attempt: TestAttempt; test: Test }[];

export const getUserProgress = (userId: string) => {
  const attempts = mockTestAttempts.filter(attempt => attempt.userId === userId);
  const completedAttempts = attempts.filter(attempt => attempt.status === 'completed');
  
  if (attempts.length === 0) {
    return {
      totalTestsAttempted: 0,
      testsCompleted: 0,
      averageScore: 0,
      highestScore: 0,
      awardsEarned: [],
    };
  }
  
  const scores = completedAttempts.map(attempt => attempt.score);
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length || 0;
  const highestScore = Math.max(...scores, 0);
  
  // Mock awards logic
  const awardsEarned = [];
  if (highestScore >= 90) awardsEarned.push('Top Performer');
  if (completedAttempts.length >= 3) awardsEarned.push('Consistent Learner');
  if (avgScore >= 80) awardsEarned.push('Excellence Award');
  
  return {
    totalTestsAttempted: attempts.length,
    testsCompleted: completedAttempts.length,
    averageScore: avgScore,
    highestScore,
    awardsEarned,
  };
};

export const getUserNotifications = (userId: string) =>
  mockNotifications.filter(notification => notification.userId === userId);

// Admin functions
export const getAllEnrollments = () =>
  mockEnrollments.map(enrollment => ({
    enrollment,
    user: mockUsers.find(user => user.id === enrollment.userId),
    test: mockTests.find(test => test.id === enrollment.testId),
  })).filter(item => item.user && item.test) as { 
    enrollment: Enrollment; 
    user: User; 
    test: Test 
  }[];

export const getPendingApprovals = () =>
  mockEnrollments
    .filter(enrollment => enrollment.status === 'pending')
    .map(enrollment => ({
      enrollment,
      user: mockUsers.find(user => user.id === enrollment.userId),
      test: mockTests.find(test => test.id === enrollment.testId),
    }))
    .filter(item => item.user && item.test) as { 
      enrollment: Enrollment; 
      user: User; 
      test: Test 
    }[];

export const getAllStudentPerformance = () =>
  mockUsers
    .filter(user => user.role === 'student')
    .map(user => ({
      user,
      progress: getUserProgress(user.id),
      attempts: getUserTestAttempts(user.id),
    }));
