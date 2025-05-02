import type { Profile } from "../profile.type";

import service from "./service";

const getProfile = () =>
  service.get<Profile>("/profile").then((res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    return res.data;
  });

export default getProfile;
