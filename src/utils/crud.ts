import { getToken } from "./auth";

export interface ICrudOptions {
  parseJson?: boolean;
}

const DEFAULT_OPTIONS: ICrudOptions = {
  parseJson: true,
};

export const get = async (
  url: string,
  options: ICrudOptions = {}
): Promise<any> => {
  options = { ...DEFAULT_OPTIONS, ...options };
  const response = await sendRequest(url);
  return options.parseJson ? await response.json() : await response.blob();
};

const sendRequest = async (
  url: string,
  method: string = "GET"
): Promise<Response> => {
  return fetch(url, {
    method: method,
    headers: {
      Authorization: `token ${getToken()}`,
    },
  });
};
