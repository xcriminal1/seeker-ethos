export interface Person {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  age: number;
  photo: string;
  aadhaarNumber?: string; // Simulated, not stored in real implementation
  profession?: string;
  verified: boolean;
  lastSeen?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
}

// Mock people data for simulation
export const mockPeople: Person[] = [
  {
    id: "1",
    name: "Priya Sharma",
    phone: "+91-9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    gender: "Female",
    dateOfBirth: "1990-05-15",
    age: 34,
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face",
    profession: "Software Engineer",
    verified: true,
    lastSeen: "2024-01-15"
  },
  {
    id: "2",
    name: "Rahul Patel",
    phone: "+91-8765432109",
    city: "Ahmedabad",
    state: "Gujarat",
    gender: "Male",
    dateOfBirth: "1985-08-22",
    age: 39,
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    profession: "Business Analyst",
    verified: true,
    lastSeen: "2024-01-10"
  },
  {
    id: "3",
    name: "Anjali Gupta",
    phone: "+91-7654321098",
    city: "Delhi",
    state: "Delhi",
    gender: "Female",
    dateOfBirth: "1992-12-03",
    age: 32,
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face",
    profession: "Marketing Manager",
    verified: false,
    lastSeen: "2024-01-12"
  },
  {
    id: "4",
    name: "Vikram Singh",
    phone: "+91-6543210987",
    city: "Bangalore",
    state: "Karnataka",
    gender: "Male",
    dateOfBirth: "1988-03-18",
    age: 36,
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    profession: "Data Scientist",
    verified: true,
    lastSeen: "2024-01-14"
  },
  {
    id: "5",
    name: "Sneha Reddy",
    phone: "+91-5432109876",
    city: "Hyderabad",
    state: "Telangana",
    gender: "Female",
    dateOfBirth: "1995-07-25",
    age: 29,
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face",
    profession: "Doctor",
    verified: true,
    lastSeen: "2024-01-13"
  },
  {
    id: "6",
    name: "Arjun Kumar",
    phone: "+91-4321098765",
    city: "Chennai",
    state: "Tamil Nadu",
    gender: "Male",
    dateOfBirth: "1991-11-08",
    age: 33,
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    profession: "Teacher",
    verified: false,
    lastSeen: "2024-01-11"
  },
  {
    id: "7",
    name: "Kavya Menon",
    phone: "+91-3210987654",
    city: "Kochi",
    state: "Kerala",
    gender: "Female",
    dateOfBirth: "1987-04-12",
    age: 37,
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face",
    profession: "Architect",
    verified: true,
    lastSeen: "2024-01-09"
  },
  {
    id: "8",
    name: "Rohit Jain",
    phone: "+91-2109876543",
    city: "Jaipur",
    state: "Rajasthan",
    gender: "Male",
    dateOfBirth: "1993-09-30",
    age: 31,
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    profession: "Entrepreneur",
    verified: true,
    lastSeen: "2024-01-16"
  },
  {
    id: "9",
    name: "Meera Nair",
    phone: "+91-1098765432",
    city: "Pune",
    state: "Maharashtra",
    gender: "Female",
    dateOfBirth: "1989-01-17",
    age: 35,
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face",
    profession: "Lawyer",
    verified: true,
    lastSeen: "2024-01-08"
  },
  {
    id: "10",
    name: "Aditya Verma",
    phone: "+91-0987654321",
    city: "Kolkata",
    state: "West Bengal",
    gender: "Male",
    dateOfBirth: "1994-06-21",
    age: 30,
    photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop&crop=face",
    profession: "Journalist",
    verified: false,
    lastSeen: "2024-01-07"
  }
];

// Team members data
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face",
    bio: "Former privacy advocate with 15+ years in data ethics and public information systems.",
    expertise: ["Data Ethics", "Privacy Law", "Technology Leadership"]
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO & Lead Developer",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=300&fit=crop&crop=face",
    bio: "Expert in secure systems architecture and ethical data processing technologies.",
    expertise: ["System Architecture", "Data Security", "Machine Learning"]
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    role: "Head of Ethics & Compliance",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face",
    bio: "Legal expert specializing in privacy law and ethical data collection practices.",
    expertise: ["Privacy Law", "Compliance", "Ethics Review"]
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=300&fit=crop&crop=face",
    bio: "Product strategist focused on user-centric design and transparent technologies.",
    expertise: ["Product Strategy", "UX Design", "User Research"]
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face",
    bio: "Specialist in ethical AI and machine learning for public information systems.",
    expertise: ["Machine Learning", "Data Analysis", "AI Ethics"]
  },
  {
    id: "6",
    name: "James Thompson",
    role: "Security Engineer",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=300&fit=crop&crop=face",
    bio: "Cybersecurity expert ensuring the highest standards of data protection.",
    expertise: ["Cybersecurity", "Data Protection", "Infrastructure"]
  }
];

// Search filters
export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Kochi"
];

export const states = [
  "Maharashtra", "Delhi", "Karnataka", "Telangana", "Gujarat", "Tamil Nadu", "West Bengal", "Rajasthan", "Kerala"
];

// Mock search function
export const searchPeople = (query: string, filters?: {
  city?: string;
  state?: string;
  gender?: string;
  ageRange?: [number, number];
}): Person[] => {
  let results = mockPeople;

  // Search by name or phone
  if (query) {
    results = results.filter(person => 
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.phone.includes(query.replace(/\D/g, ''))
    );
  }

  // Apply filters
  if (filters) {
    if (filters.city) {
      results = results.filter(person => person.city === filters.city);
    }
    if (filters.state) {
      results = results.filter(person => person.state === filters.state);
    }
    if (filters.gender) {
      results = results.filter(person => person.gender === filters.gender);
    }
    if (filters.ageRange) {
      results = results.filter(person => 
        person.age >= filters.ageRange![0] && person.age <= filters.ageRange![1]
      );
    }
  }

  return results;
};