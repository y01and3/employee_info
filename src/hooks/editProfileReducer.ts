import type { Item, Profile } from "../profile.type";
import type React from "react";

export type DraggableProfileKey = Exclude<
  keyof Profile,
  "resume" | "backgroundColor"
>;

export type EditDataPayload = {
  [K in keyof Profile]: {
    key: K;
    data: Profile[K] extends Item<infer U> ? U : Profile[K];
  };
}[keyof Profile];

export type EditProfileAction =
  | {
      type: "POSITION";
      payload: {
        key: DraggableProfileKey;
        x: number;
        y: number;
      };
    }
  | {
      type: "DATA";
      payload: EditDataPayload;
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

      return {
        ...state,
        [key]: {
          ...state[key],
          x: x + state[key].x,
          y: y + state[key].y,
        },
      };
    }
    case "DATA": {
      const { payload } = action;

      switch (payload.key) {
        case "backgroundColor":
          return {
            ...state,
            backgroundColor: payload.data,
          };
        case "resume":
          return {
            ...state,
            resume: payload.data,
          };
        case "name":
          return {
            ...state,
            name: { ...state.name, context: payload.data },
          };
        case "avatar":
          return {
            ...state,
            avatar: { ...state.avatar, context: payload.data },
          };
        case "introduction":
          return {
            ...state,
            introduction: { ...state.introduction, context: payload.data },
          };
        case "tag":
          return {
            ...state,
            tag: { ...state.tag, context: payload.data },
          };
        case "social":
          return {
            ...state,
            social: { ...state.social, context: payload.data },
          };
        default:
          return state;
      }
    }
    case "FLASH": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default editProfileReducer;
