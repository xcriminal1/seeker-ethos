export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
}

// Team members data
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Former privacy advocate with 15+ years in data ethics and public information systems.",
    expertise: ["Data Ethics", "Privacy Law", "Technology Leadership"]
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Expert in secure systems architecture and ethical data processing technologies.",
    expertise: ["System Architecture", "Data Security", "Machine Learning"]
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    role: "Head of Ethics & Compliance",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Legal expert specializing in privacy law and ethical data collection practices.",
    expertise: ["Privacy Law", "Compliance", "Ethics Review"]
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Product strategist focused on user-centric design and transparent technologies.",
    expertise: ["Product Strategy", "UX Design", "User Research"]
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Specialist in ethical AI and machine learning for public information systems.",
    expertise: ["Machine Learning", "Data Analysis", "AI Ethics"]
  },
  {
    id: "6",
    name: "James Thompson",
    role: "Security Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Cybersecurity expert ensuring the highest standards of data protection.",
    expertise: ["Cybersecurity", "Data Protection", "Infrastructure"]
  }
];