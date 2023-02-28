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
