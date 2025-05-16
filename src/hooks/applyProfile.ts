import type { Profile } from "../profile.type";

import { defaultProfile } from "./profileContext";

const applyProfile = (
  data: Profile,
  setProfile: (profile: Profile) => void,
) => {
  const newProfile: Profile = {
    backgroundColor: data.backgroundColor ?? defaultProfile.backgroundColor,
    name: { ...defaultProfile.name, ...data.name },
    avatar: { ...defaultProfile.avatar, ...data.avatar },
    tag: { ...defaultProfile.tag, ...data.tag },
    introduction: {
      ...defaultProfile.introduction,
      ...data.introduction,
    },
    social: { ...defaultProfile.social, ...data.social },
    resume: [...defaultProfile.resume, ...data.resume],
  };

  setProfile(newProfile);
};

export default applyProfile;
