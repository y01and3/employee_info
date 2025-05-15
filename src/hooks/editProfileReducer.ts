import type { Experience, Item, Profile, Social, Tag } from "../profile.type";
import type React from "react";

export type EditProfileAction =
  | {
      type: "POSITION";
      payload: {
        key: Omit<keyof Profile, "resume">;
        x: number;
        y: number;
      };
    }
  | {
      type: "DATA";
      payload: {
        key: keyof Profile;
        data: string | Tag[] | Social[] | Experience[];
      };
    }
  | {
      type: "FLASH";
      payload: Profile;
    };

const editProfileReducer: React.Reducer<Profile, EditProfileAction> = (
  state: Profile,
  action: EditProfileAction,
) => {
  switch (action.type) {
    case "POSITION": {
      const { key, x, y } = action.payload;
      const key_profile = key as keyof Profile;

      return {
        ...state,
        [key_profile]: {
          ...state[key_profile],
          x: x + (state[key_profile] as Item<unknown>).x,
          y: y + (state[key_profile] as Item<unknown>).y,
        },
      };
    }
    case "DATA": {
      const { key, data } = action.payload;

      return {
        ...state,
        [key]: {
          ...state[key],
          context: data,
        },
      };
    }
    case "FLASH": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default editProfileReducer;
