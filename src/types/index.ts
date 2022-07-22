export interface IRepository {
  name: string;
  owner: string;
  fullName: string;
  url: string;
}

export interface IWorkflow {
  name: string;
  path: string;
}

export interface IRelease {
  name: string;
  tagName: string;
  commitHash: string;
  url: string;
  deployments: IDeployment[];
}

export interface IDeployment {
  environment: string;
  state: string;
  lastUpdate: Date;
}
