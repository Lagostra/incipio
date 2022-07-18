export interface IConfiguration {
  applications: IApplication[];
}

export interface IApplication {
  name: string;
  url: string;
  repository: IRepository;
}

export interface IRepository {
  name: string;
  owner: string;
  fullName: string;
}
