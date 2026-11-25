import type { Profile } from "./profile.type";

import { addToast, Button } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router";

import baseUrl from "./api/baseUrl";
import editProfile from "./api/editProfile";
import getProfile from "./api/getProfile";
import ProfileEditor from "./components/ProfileEditor";
import BackgroundColorEditor from "./components/editor/BackgroundColorEditor";
import applyProfile from "./hooks/applyProfile";
import editProfileReducer from "./hooks/editProfileReducer";
import { defaultProfile, ProfileProvider } from "./hooks/profileContext";

const EditApp = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);
  const [profile, dispatchProfile] = React.useReducer(
    editProfileReducer,
    defaultProfile,
  );

  const changeProfile = async (nextProfile: Profile) => {
    if (!baseUrl) {
      localStorage.setItem("profile", JSON.stringify(nextProfile));

      return;
    }
    await editProfile(nextProfile);
  };

  const setProfile = React.useCallback((nextProfile: Profile) => {
    dispatchProfile({ type: "FLASH", payload: nextProfile });
  }, []);

  React.useEffect(() => {
    if (!baseUrl) {
      const lsProfile = localStorage.getItem("profile");

      if (lsProfile) {
        try {
          const parsedProfile = JSON.parse(lsProfile) as Partial<Profile>;

          applyProfile(parsedProfile, setProfile);
        } catch {
          localStorage.removeItem("profile");
        }
      }

      return;
    }

    getProfile()
      .then((data: Profile) => {
        applyProfile(data, setProfile);
      })
      .catch((error) => {
        addToast({
          title: "Error loading profile",
          description: String(error),
          color: "danger",
        });
      });
  }, [setProfile]);

  const handleConfirm = async () => {
    setIsSaving(true);
    try {
      await changeProfile(profile);
      navigate("/");
    } catch (error) {
      addToast({
        title: "Error saving profile",
        description: String(error),
        color: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    try {
      await changeProfile(defaultProfile);
      setProfile(defaultProfile);
      addToast({
        title: "Profile reset",
        description: "Profile has been reset to default.",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error resetting profile",
        description: String(error),
        color: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundColor: profile.backgroundColor }}
    >
      <div className="fixed top-0 right-0 w-fit z-50">
        <Button
          className="m-5 float-right"
          color="warning"
          isDisabled={isSaving}
          onPress={handleConfirm}
        >
          Confirm Edit
        </Button>
        <Button
          className="m-5 float-right"
          color="danger"
          isDisabled={isSaving}
          onPress={handleReset}
        >
          Back to Default
        </Button>
        <BackgroundColorEditor
          className="m-5 float-right"
          color={profile.backgroundColor}
          onChange={(color) => {
            dispatchProfile({
              type: "DATA",
              payload: { key: "backgroundColor", data: color },
            });
          }}
        />
      </div>
      <ProfileProvider value={{ profile, dispatchProfile }}>
        <ProfileEditor />
      </ProfileProvider>
    </div>
  );
};

export default EditApp;
