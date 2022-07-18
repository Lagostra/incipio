export interface IConfiguration {
  applications: IApplication[];
}

export interface IApplication {
  name: string;
  url: string;
}
