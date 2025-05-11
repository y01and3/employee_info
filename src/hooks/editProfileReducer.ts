import type { Experience, Profile, Social, Tag } from "../profile.type";
import type React from "react";

export type EditProfileAction =
  | {
      type: "POSITION";
      payload: {
        key: keyof Profile;
        gridX: number;
        gridY: number;
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
      const { key, gridX, gridY } = action.payload;

      return {
        ...state,
        [key]: {
          ...state[key],
          gridX: gridX + state[key].gridX,
          gridY: gridY + state[key].gridY,
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
