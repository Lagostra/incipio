import { IRepository } from ".";

export interface IConfiguration {
  applications: IApplication[];
}

export interface IApplication {
  name: string;
  url: string;
  repository: IRepository;
  deployWorkflow: IWorkflow;
  versionPrefix?: string;
  environments: string[];
}

export interface IWorkflow {
  name: string;
  path: string;
}
