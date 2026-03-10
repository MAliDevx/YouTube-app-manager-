export type Status = 'Active' | 'Inactive';

export interface Category {
  id: string;
  name: string;
  icon: string;
  status: Status;
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  status: Status;
}

export interface Movie {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  languageId: string;
  releaseYear: number;
  duration: string;
  bannerImage: string;
  thumbnailImage: string;
  videoUrl: string;
  trailerUrl: string;
  enableDownload: boolean;
  status: Status;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  image: string;
  movieId: string;
  displayOrder: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  subscriptionStatus: 'Active' | 'Expired' | 'None';
  registrationDate: string;
  subscriptionStart?: string;
  subscriptionExpiry?: string;
}

export interface WatchHistory {
  id: string;
  userId: string;
  movieName: string;
  date: string;
  durationWatched: string;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  price: number;
  validity: string;
  quality: 'SD' | 'HD' | 'Full HD' | '4K';
  devicesAllowed: number;
  description: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  packageId: string;
  packageName: string;
  amount: number;
  method: string;
  transactionId: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
}

export interface Advertisement {
  id: string;
  title: string;
  type: 'Banner' | 'Video' | 'Popup';
  fileUrl: string;
  startDate: string;
  endDate: string;
  status: Status;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  sentTo: 'All' | 'Selected';
  targetUserIds?: string[];
  sentAt: string;
}

export interface AppSettings {
  appName: string;
  appLogo: string;
  appIcon: string;
  privacyPolicy: string;
  termsAndConditions: string;
  contactInfo: string;
  supportEmail: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}
