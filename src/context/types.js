interface Follower {
    userId: string;
    _id: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    accountType: 'pending' | 'active' | 'inactive';
    age: string; 
    city: string;
    country: string;
    createdAt: string; 
    followerCount: number;
    followers: Follower[];
    following: string[]; 
    gender: 'male' | 'female' | 'other'; 
    isDelete: boolean; 
    mobile: string;
    profileImage: string; 
    status: 'active' | 'inactive'; 
    subscriberCount: number;
    subscribers: string[]; 
    updatedAt: string; 
    __v: number; 
    token?: string;
  }

  export interface AppContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoginLoading: boolean | null;
    setIsLoginLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
    isLoggedin: boolean | null;
    success_notify: any,
    error_notify: any,
    isLoggeg_in:()=> Promise<void> ,
    setGlobalLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
    globalLoading: boolean | null;
    getLocalStorageData: (key: string) => Promise<User | null>
  }