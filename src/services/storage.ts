import { ApplicationSettings } from "@nativescript/core";
import { Post, Event, Profile } from "../data/mockData";

class StorageService {
  private static instance: StorageService;

  private constructor() {
    this.initializeStorage();
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private initializeStorage() {
    // Initialize storage with mock data if empty
    if (!ApplicationSettings.getString("posts")) {
      ApplicationSettings.setString("posts", JSON.stringify([]));
    }
    if (!ApplicationSettings.getString("events")) {
      ApplicationSettings.setString("events", JSON.stringify([]));
    }
    if (!ApplicationSettings.getString("comments")) {
      ApplicationSettings.setString("comments", JSON.stringify({}));
    }
    if (!ApplicationSettings.getString("likes")) {
      ApplicationSettings.setString("likes", JSON.stringify({}));
    }
    if (!ApplicationSettings.getString("eventRegistrations")) {
      ApplicationSettings.setString("eventRegistrations", JSON.stringify({}));
    }
  }

  // Posts
  getPosts(): Post[] {
    const posts = ApplicationSettings.getString("posts");
    return posts ? JSON.parse(posts) : [];
  }

  addPost(post: Omit<Post, "id">): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString()
    };
    posts.unshift(newPost);
    ApplicationSettings.setString("posts", JSON.stringify(posts));
    return newPost;
  }

  // Events
  getEvents(): Event[] {
    const events = ApplicationSettings.getString("events");
    return events ? JSON.parse(events) : [];
  }

  addEvent(event: Omit<Event, "id">): Event {
    const events = this.getEvents();
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      participants: 0
    };
    events.unshift(newEvent);
    ApplicationSettings.setString("events", JSON.stringify(events));
    return newEvent;
  }

  // Event Registrations
  getEventRegistrations(eventId: string): string[] {
    const registrations = ApplicationSettings.getString("eventRegistrations");
    const registrationsMap = registrations ? JSON.parse(registrations) : {};
    return registrationsMap[eventId] || [];
  }

  isRegisteredForEvent(eventId: string, userId: string): boolean {
    const registrations = this.getEventRegistrations(eventId);
    return registrations.includes(userId);
  }

  registerForEvent(eventId: string, userId: string): void {
    const registrations = ApplicationSettings.getString("eventRegistrations");
    const registrationsMap = registrations ? JSON.parse(registrations) : {};
    
    if (!registrationsMap[eventId]) {
      registrationsMap[eventId] = [];
    }
    
    if (!registrationsMap[eventId].includes(userId)) {
      registrationsMap[eventId].push(userId);
      ApplicationSettings.setString("eventRegistrations", JSON.stringify(registrationsMap));

      // Update event participants count
      const events = this.getEvents();
      const eventIndex = events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        events[eventIndex].participants = registrationsMap[eventId].length;
        ApplicationSettings.setString("events", JSON.stringify(events));
      }
    }
  }

  // Comments
  getComments(postId: string): string[] {
    const comments = ApplicationSettings.getString("comments");
    const commentsMap = comments ? JSON.parse(comments) : {};
    return commentsMap[postId] || [];
  }

  addComment(postId: string, comment: string) {
    const comments = ApplicationSettings.getString("comments");
    const commentsMap = comments ? JSON.parse(comments) : {};
    if (!commentsMap[postId]) {
      commentsMap[postId] = [];
    }
    commentsMap[postId].push(comment);
    ApplicationSettings.setString("comments", JSON.stringify(commentsMap));

    // Update comment count in post
    const posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].comments = (posts[postIndex].comments || 0) + 1;
      ApplicationSettings.setString("posts", JSON.stringify(posts));
    }
  }

  // Likes
  getLikes(postId: string): string[] {
    const likes = ApplicationSettings.getString("likes");
    const likesMap = likes ? JSON.parse(likes) : {};
    return likesMap[postId] || [];
  }

  toggleLike(postId: string, userId: string) {
    const likes = ApplicationSettings.getString("likes");
    const likesMap = likes ? JSON.parse(likes) : {};
    if (!likesMap[postId]) {
      likesMap[postId] = [];
    }

    const userLikeIndex = likesMap[postId].indexOf(userId);
    if (userLikeIndex === -1) {
      likesMap[postId].push(userId);
    } else {
      likesMap[postId].splice(userLikeIndex, 1);
    }
    ApplicationSettings.setString("likes", JSON.stringify(likesMap));

    // Update like count in post
    const posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].likes = likesMap[postId].length;
      ApplicationSettings.setString("posts", JSON.stringify(posts));
    }
  }

  // Clear all data (useful for testing)
  clearAll() {
    ApplicationSettings.remove("posts");
    ApplicationSettings.remove("events");
    ApplicationSettings.remove("comments");
    ApplicationSettings.remove("likes");
    ApplicationSettings.remove("eventRegistrations");
    this.initializeStorage();
  }
}

export { StorageService };