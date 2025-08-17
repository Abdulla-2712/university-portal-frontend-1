export type Complaint = {
  id: number
  subject: string
  status: string
  department: string
  priority_level: string
  complaint_content: string
  complaint_answer: string | null
}
