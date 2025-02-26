export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostFormValues {
    title: string;
    body: string;
  }