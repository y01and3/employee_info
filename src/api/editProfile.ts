import type { Profile } from "../profile.type";

import service from "./service";

const editProfile = (profile: Profile) =>
  service.put<Profile>("/profile", profile).then((res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    return res.data;
  });

export default editProfile;
