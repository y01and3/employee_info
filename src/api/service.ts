import type { CreateAxiosDefaults } from "axios";

import axios from "axios";

import baseUrl from "./baseUrl";

const config: CreateAxiosDefaults = {
  baseURL: baseUrl ? `${baseUrl.replace(/\/$/, "")}/api` : "/api",
};

export default axios.create(config);
