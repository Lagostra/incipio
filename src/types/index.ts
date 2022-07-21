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
  url: string;
}
