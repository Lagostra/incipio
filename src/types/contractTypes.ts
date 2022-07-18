export interface IRepositoryDto {
  name: string;
  full_name: string;
  owner: IOwnerDto;
  html_url: string;
  private: boolean;
}

export interface IOwnerDto {
  login: string;
}
