export type StepType =
  | "CreateFile"
  | "CreateFolder"
  | "EditFile"
  | "DeleteFile"
  | "RunScript";

export interface Step {
  id: number;
  title: string;
  description: string;
  type: StepType;
  status: "pending" | "in progress" | "completed";
  code?: string;
  path?: string;
}

export interface FileItems{
  name:string;
  type:"file"|"folder";
  path:string;
  children?:FileItems[];
  content?:string

}