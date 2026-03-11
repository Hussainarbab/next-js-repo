export type Role =
  | "user"
  | "admin"
  | "driver"
  | "carpenter"
  | "painter"
  | "laborer";

export interface User {
  _id: string;
  name?: string;
  email: string;
  role: Role;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  salary?: string;
  contact: string;
}

export interface Application {
  _id: string;
  job: Job;
  applicantName: string;
  applicantContact: string;
  resume?: string;
  message?: string;
  appliedAt: string;
}

export interface Message {
  _id: string;
  from: User;
  to: User;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

