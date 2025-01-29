export interface Profile {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: number;
  avatar: string;
  connections: number;
  bio: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  type: 'CASE_STUDY' | 'RESEARCH' | 'DISCUSSION' | 'QUESTION';
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'CONFERENCE' | 'WORKSHOP' | 'WEBINAR';
  date: string;
  organizer: string;
  participants: number;
  virtual: boolean;
}

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'Central Medical Center',
    experience: 12,
    avatar: 'https://i.pravatar.cc/150?img=1',
    connections: 245,
    bio: 'Specialized in interventional cardiology with focus on preventive care'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    hospital: 'University Hospital',
    experience: 8,
    avatar: 'https://i.pravatar.cc/150?img=2',
    connections: 189,
    bio: 'Research focus on neurodegenerative diseases and innovative treatments'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Medical',
    experience: 15,
    avatar: 'https://i.pravatar.cc/150?img=3',
    connections: 312,
    bio: 'Dedicated to children\'s healthcare and developmental medicine'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just published a new research paper on cardiovascular health in young adults. Looking for collaboration opportunities.',
    type: 'RESEARCH',
    likes: 45,
    comments: 12,
    timestamp: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    content: 'Interesting case study: Patient presenting with unusual neurological symptoms. Thoughts welcome.',
    type: 'CASE_STUDY',
    likes: 32,
    comments: 8,
    timestamp: '2024-03-19T15:45:00Z'
  },
  {
    id: '3',
    userId: '3',
    content: 'What\'s your experience with the new pediatric vaccination guidelines?',
    type: 'DISCUSSION',
    likes: 28,
    comments: 15,
    timestamp: '2024-03-18T09:15:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Medical Innovation Summit',
    type: 'CONFERENCE',
    date: '2024-06-15',
    organizer: 'Medical Association',
    participants: 500,
    virtual: false
  },
  {
    id: '2',
    title: 'Advanced Surgical Techniques Workshop',
    type: 'WORKSHOP',
    date: '2024-05-20',
    organizer: 'Surgical Society',
    participants: 50,
    virtual: false
  },
  {
    id: '3',
    title: 'Healthcare Technology Integration Seminar',
    type: 'WEBINAR',
    date: '2024-04-10',
    organizer: 'HealthTech Institute',
    participants: 200,
    virtual: true
  }
];