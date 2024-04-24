export type Status = "doing" | "todo" | "done" | "blocked";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: Status;
  project_id?: number;
  oldStatus?: Status;
}

export type Board = {
  doing?: Task[];
  todo?: Task[];
  done?: Task[];
  blocked?: Task[];
};