export declare interface UrlRequestProps {
  url: string;
  userId: string;
  status: "submitted" | "inprogress" | "completed";
  data: any;
  id?: any;
}

export declare interface UserType {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
}

export declare interface ClassType {
  id?: string;
  name: string;
  division?: string;
  createdBy: string;
  students?: string[];
}
export type TabState = "New Game" | "History" | "Students";

export declare interface StudentType {
  id: string;
  name: string;
  parentEmail: string;
  createdBy: string;
  classId: string;
  isVerified: boolean;
}
