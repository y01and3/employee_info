import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import type { Social } from "../../profile.type";

import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface SocialEditorProps {
  socials: Social[];
  onChange: (social: Social[]) => void;
}

const SocialEditor = ({ socials, onChange }: SocialEditorProps) => {
  const [isOpen, setIsOpen] = React.useState("");
  return (
    <div className="flex flex-row gap-3">
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
            <Button isIconOnly>
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
                    const newSocials = socials.map((s) =>
                      s.id === social.id
                        ? {
                            id: social.id,
                            emoji: formData.get("emoji") as string,
                            link: formData.get("link") as string,
                          }
                        : s
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
                    type="url"
                    label="Link"
                    name="link"
                    size="sm"
                    variant="bordered"
                  />
                  <Button className="w-full mt-2" type="submit" variant="flat">
                    Confirm
                  </Button>
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
          <Button isIconOnly color="primary">
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
                  const newSocials = [
                    ...socials,
                    {
                      id: Date.now(),
                      emoji: formData.get("emoji") as string,
                      link: formData.get("link") as string,
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
                  type="url"
                  label="Link"
                  name="link"
                  size="sm"
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
