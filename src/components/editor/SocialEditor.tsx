import type { Social } from "../../profile.type";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";

interface SocialEditorProps {
  socials: Social[];
  onChange: (social: Social[]) => void;
}

const SocialEditor = ({ socials, onChange }: SocialEditorProps) => {
  const [isOpen, setIsOpen] = React.useState("");

  return (
    <div className="social">
      {socials.map((social) => (
        <Popover
          key={social.id}
          showArrow
          isOpen={isOpen === String(social.id)}
          offset={10}
          placement="bottom"
          onOpenChange={(open) => setIsOpen(open ? String(social.id) : "")}
        >
          <PopoverTrigger>
            <Button isIconOnly aria-label={social.link}>
              <span className="m-auto" role="img">
                {social.emoji}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {(titleProps) => (
              <div className="px-1 py-2 w-full">
                <p
                  className="text-small font-bold text-foreground"
                  {...titleProps}
                >
                  Social
                </p>
                <form
                  className="mt-2 flex flex-col gap-2 w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const emoji = String(formData.get("emoji") ?? "").trim();
                    const link = String(formData.get("link") ?? "").trim();

                    if (!link) {
                      return;
                    }
                    const newSocials = socials.map((s) =>
                      s.id === social.id
                        ? {
                            id: social.id,
                            emoji,
                            link,
                          }
                        : s,
                    );

                    onChange(newSocials);
                    setIsOpen("");
                    e.currentTarget.reset();
                  }}
                >
                  <Input
                    defaultValue={social.emoji}
                    label="Emoji"
                    name="emoji"
                    size="sm"
                    variant="bordered"
                  />
                  <Input
                    defaultValue={social.link}
                    label="Link"
                    name="link"
                    size="sm"
                    type="url"
                    variant="bordered"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button className="flex-1" type="submit" variant="flat">
                      Confirm
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      variant="flat"
                      onPress={() => {
                        onChange(socials.filter((s) => s.id !== social.id));
                        setIsOpen("");
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      ))}

      <Popover
        key={"add"}
        showArrow
        isOpen={isOpen === "add"}
        offset={10}
        placement="bottom"
        onOpenChange={(open) => setIsOpen(open ? "add" : "")}
      >
        <PopoverTrigger>
          <Button isIconOnly aria-label="Add social link" color="primary">
            <Icon className="m-auto" icon="line-md:plus" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              >
                Social
              </p>
              <form
                className="mt-2 flex flex-col gap-2 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const emoji = String(formData.get("emoji") ?? "").trim();
                  const link = String(formData.get("link") ?? "").trim();

                  if (!link) {
                    return;
                  }
                  const newSocials = [
                    ...socials,
                    {
                      id: Date.now(),
                      emoji,
                      link,
                    },
                  ];

                  onChange(newSocials);
                  setIsOpen("");
                  e.currentTarget.reset();
                }}
              >
                <Input
                  label="Emoji"
                  name="emoji"
                  size="sm"
                  variant="bordered"
                />
                <Input
                  label="Link"
                  name="link"
                  size="sm"
                  type="url"
                  variant="bordered"
                />
                <Button className="w-full mt-2" type="submit" variant="flat">
                  Add
                </Button>
              </form>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SocialEditor;
