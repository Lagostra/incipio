import { Octokit } from "@octokit/rest";
import { getToken } from "../utils/auth";

export const octokit = new Octokit({ auth: getToken() });
