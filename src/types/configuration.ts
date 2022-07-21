export interface IConfiguration {
  applications: IApplication[];
}

export interface IApplication {
  name: string;
  url: string;
  repository: IRepository;
  deployWorkflow: IWorkflow;
  versionPrefix?: string;
}

export interface IRepository {
  name: string;
  owner: string;
  fullName: string;
}

export interface IWorkflow {
  name: string;
  path: string;
}
