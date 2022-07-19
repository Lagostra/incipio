export interface IRepositoryDto {
  name: string;
  full_name: string;
  owner: IOwnerDto;
  html_url: string;
  private: boolean;
  archived: boolean;
}

export interface IOwnerDto {
  login: string;
}

export interface IWorkflowResponse {
  total_count: number;
  workflows: IWorkflowDto[];
}

export interface IWorkflowDto {
  id: number;
  name: string;
  path: string;
  state: string;
}
