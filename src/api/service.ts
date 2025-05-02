import type { CreateAxiosDefaults } from "axios";

import axios from "axios";

import baseUrl from "./baseUrl";

const config: CreateAxiosDefaults = {
  baseURL: baseUrl,
};

export default axios.create(config);
