export type Project = {
  id?: number;
  title: string;
  description?: string;
  tasks?: Task[]
}

export type Task = {
  id?: number;
  title: string;
  status: string;
}