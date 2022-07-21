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

export interface IReleaseDto {
  id: number;
  html_url: string;
  tag_name: string;
  name: string;
}

export interface IEnvironmentResponse {
  total_count: number;
  environments: IEnvironmentDto[];
}

export interface IEnvironmentDto {
  id: number;
  name: string;
}
