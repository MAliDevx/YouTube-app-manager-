import { 
  Category, 
  Language, 
  Movie, 
  User, 
  SubscriptionPackage, 
  Payment, 
  Advertisement, 
  Notification,
  Banner,
  WatchHistory
} from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Action', icon: '🔥', status: 'Active' },
  { id: '2', name: 'Comedy', icon: '😂', status: 'Active' },
  { id: '3', name: 'Drama', icon: '🎭', status: 'Active' },
  { id: '4', name: 'Horror', icon: '👻', status: 'Active' },
  { id: '5', name: 'Sci-Fi', icon: '🚀', status: 'Active' },
];

export const languages: Language[] = [
  { id: '1', name: 'English', icon: '🇺🇸', status: 'Active' },
  { id: '2', name: 'Hindi', icon: '🇮🇳', status: 'Active' },
  { id: '3', name: 'Spanish', icon: '🇪🇸', status: 'Active' },
  { id: '4', name: 'French', icon: '🇫🇷', status: 'Active' },
];

export const movies: Movie[] = [
  {
    id: '1',
    name: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    categoryId: '5',
    languageId: '1',
    releaseYear: 2014,
    duration: '2h 49m',
    bannerImage: 'https://picsum.photos/seed/interstellar/1200/600',
    thumbnailImage: 'https://picsum.photos/seed/interstellar-thumb/300/450',
    videoUrl: 'https://example.com/video.mp4',
    trailerUrl: 'https://youtube.com/watch?v=zSWdZVt8V98',
    enableDownload: true,
    status: 'Active',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    categoryId: '1',
    languageId: '1',
    releaseYear: 2008,
    duration: '2h 32m',
    bannerImage: 'https://picsum.photos/seed/darkknight/1200/600',
    thumbnailImage: 'https://picsum.photos/seed/darkknight-thumb/300/450',
    videoUrl: 'https://example.com/video.mp4',
    trailerUrl: 'https://youtube.com/watch?v=EXeTwQWaywY',
    enableDownload: true,
    status: 'Active',
    createdAt: '2024-01-02T10:00:00Z'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    package: 'Premium',
    subscriptionStatus: 'Active',
    registrationDate: '2024-01-10',
    subscriptionStart: '2024-01-10',
    subscriptionExpiry: '2025-01-10'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    package: 'Basic',
    subscriptionStatus: 'Active',
    registrationDate: '2024-02-15',
    subscriptionStart: '2024-02-15',
    subscriptionExpiry: '2024-03-15'
  }
];

export const packages: SubscriptionPackage[] = [
  { id: '1', name: 'Basic', price: 9.99, validity: '1 Month', quality: 'HD', devicesAllowed: 1, description: 'Basic streaming' },
  { id: '2', name: 'Standard', price: 15.99, validity: '1 Month', quality: 'Full HD', devicesAllowed: 2, description: 'Standard streaming' },
  { id: '3', name: 'Premium', price: 19.99, validity: '1 Month', quality: '4K', devicesAllowed: 4, description: 'Premium streaming' },
];

export const payments: Payment[] = [
  {
    id: 'PAY1',
    userId: '1',
    userName: 'John Doe',
    packageId: '3',
    packageName: 'Premium',
    amount: 19.99,
    method: 'Credit Card',
    transactionId: 'TXN123456',
    date: '2024-03-01',
    status: 'Success'
  }
];

export const ads: Advertisement[] = [
  {
    id: '1',
    title: 'Summer Sale',
    type: 'Banner',
    fileUrl: 'https://picsum.photos/seed/ad1/800/200',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'Active'
  }
];

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Featured: Interstellar',
    image: 'https://picsum.photos/seed/banner1/1200/400',
    movieId: '1',
    displayOrder: 1
  }
];

export const watchHistory: WatchHistory[] = [
  { id: '1', userId: '1', movieName: 'Interstellar', date: '2024-03-05', durationWatched: '1h 30m' },
  { id: '2', userId: '1', movieName: 'The Dark Knight', date: '2024-03-06', durationWatched: '2h 00m' },
];

export const notifications: Notification[] = [
  { id: '1', title: 'Welcome', message: 'Welcome to CineAdmin!', sentTo: 'All', sentAt: '2024-01-01T09:00:00Z' }
];
