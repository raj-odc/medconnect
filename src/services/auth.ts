import { ApplicationSettings } from "@nativescript/core";

interface User {
  id: string;
  email: string;
  name: string;
  specialty: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
  };

  private constructor() {
    // Load saved auth state
    const savedUser = ApplicationSettings.getString("user");
    if (savedUser) {
      this.authState.user = JSON.parse(savedUser);
      this.authState.isAuthenticated = true;
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    // Mock login with test credentials
    if (email === "test@example.com" && password === "password") {
      const user: User = {
        id: "1",
        email: "test@example.com",
        name: "Dr. John Doe",
        specialty: "General Medicine"
      };
      
      this.authState.user = user;
      this.authState.isAuthenticated = true;
      
      // Save to persistent storage
      ApplicationSettings.setString("user", JSON.stringify(user));
      
      return user;
    }
    throw new Error("Invalid credentials");
  }

  async register(email: string, password: string, name: string, specialty: string): Promise<User> {
    // Mock successful registration
    const user: User = {
      id: Date.now().toString(), // Generate a unique ID
      email,
      name,
      specialty
    };
    
    this.authState.user = user;
    this.authState.isAuthenticated = true;
    
    // Save to persistent storage
    ApplicationSettings.setString("user", JSON.stringify(user));
    
    return user;
  }

  logout(): void {
    this.authState.user = null;
    this.authState.isAuthenticated = false;
    ApplicationSettings.remove("user");
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }
}

export { AuthService }