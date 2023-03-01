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
  name: string;
  division?: string;
  createdBy: string;
}
