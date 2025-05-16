import type { Profile } from "../profile.type";
import type { EditProfileAction } from "./editProfileReducer";

import React from "react";

const defaultProfile: Profile = {
  name: { x: 10, y: 43, context: "Alice White" },
  avatar: { x: 10, y: 0, context: "https://i.pravatar.cc/1200" },
  tag: {
    x: 58,
    y: 24,
    context: [
      { id: 1, emoji: "👩‍💻", text: "Full-Stack Developer" },
      { id: 2, emoji: "🎨", text: "UI/UX Designer" },
      { id: 3, emoji: "📚", text: "Tech Blogger" },
    ],
  },
  introduction: {
    x: 11,
    y: 69,
    context:
      "👋 Hi there! I'm Alice White, a passionate full-stack developer with 5+ years of experience in building scalable web applications.",
  },
  social: {
    x: 39,
    y: 62,
    context: [
      { id: 1, emoji: "🐦", link: "https://twitter.com/alicewhite" },
      { id: 2, emoji: "💼", link: "https://linkedin.com/in/alicewhite" },
      { id: 3, emoji: "📸", link: "https://instagram.com/alicewhite" },
      { id: 4, emoji: "🌐", link: "https://alicewhite.dev" },
    ],
  },
  resume: [
    {
      id: 1,
      start: 1622505600000,
      end: 1685664000000,
      title: "Senior Software Engineer at TechCorp",
      description:
        "💻 Led a team of developers to build a high-performance e-commerce platform, improving load times by 30%.",
    },
    {
      id: 2,
      start: 1590969600000,
      end: 1622505600000,
      title: "UI/UX Designer at CreativeStudio",
      description:
        "🎨 Designed and implemented user-friendly interfaces for a variety of web and mobile applications.",
    },
  ],
};

const ProfileContext = React.createContext<{
  profile: Profile;
  dispatchProfile: (action: EditProfileAction) => void;
}>({
  profile: defaultProfile,
  dispatchProfile: () => {
    throw new Error("dispatchProfile function not implemented");
  },
});

const ProfileProvider = ProfileContext.Provider;

const useProfile = () => {
  return React.useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfile, defaultProfile };
