export const services = [
  {
    id: 1,
    title: "Personal Training",
    description: "One-on-one sessions tailored to your fitness goals with certified trainers.",
    icon: "dumbbell",
  },
  {
    id: 2,
    title: "Fitness Assessment",
    description: "Comprehensive evaluation of your current fitness level and personalized recommendations.",
    icon: "clipboard",
  },
  {
    id: 3,
    title: "Pain Management & Recovery",
    description: "Specialized programs to help you recover from injuries and manage chronic pain.",
    icon: "heart",
  },
  {
    id: 4,
    title: "Therapeutic Massages",
    description: "Professional massage therapy to relieve tension and promote muscle recovery.",
    icon: "hands",
  },
  {
    id: 5,
    title: "Relaxation Massages",
    description: "Stress-relief massages designed to help you unwind and rejuvenate.",
    icon: "spa",
  },
  {
    id: 6,
    title: "Health Counselling",
    description: "Expert guidance on nutrition, lifestyle, and overall wellness strategies.",
    icon: "user",
  },
];

export const pricing = [
  {
    id: 1,
    name: "Monthly Gym Membership",
    price: "J$11,000",
    period: "/month",
    description: "Full gym access to all equipments and group classes",
    features: ["Unlimited gym access", "Group classes included", "Free parking"],
    popular: true,
  },
  {
    id: 2,
    name: "Personal Training",
    price: "J$30,000",
    period: "/month",
    description: "Starting price for personalized training sessions",
    features: ["3 sessions per week throughout the month", "Custom workout plans", "Nutrition guidance", "Progress tracking"],
    popular: false,
  },
  {
    id: 3,
    name: "Therapeutic Massages",
    price: "J$8,500",
    period: "/session",
    description: "Professional therapeutic massage services",
    features: ["60-minute session", "Certified Massage therapists", "Flexible scheduling"],
    popular: false,
  },
  {
    id: 4,
    name: "Health Counseling",
    price: "J$3,000",
    period: "/session",
    description: "Starting price for expert health and wellness consultation",
    features: ["1-hour consultation", "Personalized advice", "Goal setting", "Follow-up support"],
    popular: false,
  },
  {
    id: 5,
    name: "Daily Rate",
    price: "J$1,000",
    period: "/day",
    description: "Perfect for visitors or trying us out",
    features: ["Full day access", "All equipment", "Group classes (Only on Tuesdays)", "No commitment"],
    popular: false,
  },
  {
    id: 6,
    name: "Weekly Rate",
    price: "J$3,000",
    period: "/week",
    description: "Great value for short-term training",
    features: ["7-day access", "All amenities", "Group classes"],
    popular: false,
  },
];

//Need to make it that the owner of the website can upload this information instead of having it hardcoded.
export const memberHighlight = {
  name: "Travane Morrison",
  achievement: "Bench 450lbs",
  testimonial: "GymOxytocin transformed my life. The trainer is incredibly supportive, and the community keeps me motivated every single day. I've never felt stronger or more confident!",
  image: "/member-highlight.jpg",
  memberSince: "January 2025",
};


export const videos = [
  {
    id: 1,
    title: "High-Intensity Training",
    thumbnail: "/Media/Thumbnail1.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Group Fitness Class",
    thumbnail: "/Media/Thumbnail2.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Personal Training Session",
    thumbnail: "/Media/Thumbnail3.png",
    videoUrl: "https://www.youtube.com/embed/kTkOXGqUJkA",
  },
  {
    id: 4,
    title: "Recovery & Stretching",
    thumbnail: "/Media/Thumbnail4.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Strength Training Basics",
    thumbnail: "/Media/Thumbnail5.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Cardio Workout",
    thumbnail: "/Media/Thumbnail6.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const gymInfo = {
  name: "Gym Oxytocin",
  tagline: "Health. Strength. Confidence.",
  address: "54 Waltham Park Road",
  hours: {
    daily: "6:00 AM – 10:00 PM",
    Weekend: "7:00 AM – 7:00 PM",
    groupClasses: "Tuesday 5:30 PM & 6:30 PM",
  },
  socials: {
    instagram: "@GymOxytocin",
    instagramPersonal: "@travanemorrison",
  },
};
