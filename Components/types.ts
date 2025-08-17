export type Complaint = {
  id: number
  subject: string
  status: string
  department: string
  priority_level: string
  complaint_content: string
  complaint_answer: string | null
}

export type Request = {
  id: number;
  FullName: string;
  PhoneNumber: string;
  AcademicEmail: string;
  SeatNumber: string;
  Level: string;
  Department: string;
}
export type Suggestion = {
  id: number;
  subject: string;
  status: string;
  department: string;
  suggestion_content: string;
  suggestion_answer: string;
};