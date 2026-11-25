import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import React from "react";

import Avatar from "../animations/Avatar";

interface AvatarEditorProps {
  avatar: string;
  onChange: (src: string) => void;
}

const AvatarEditor = ({ avatar, onChange }: AvatarEditorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      showArrow
      isOpen={isOpen}
      offset={10}
      placement="bottom"
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <button
          aria-label="Edit avatar"
          className="cursor-pointer rounded-full bg-transparent p-0 border-0"
          type="button"
        >
          <Avatar className="avatar" src={avatar} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Avatar
            </p>
            <form
              className="mt-2 flex flex-col gap-2 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const src = String(formData.get("src") ?? "").trim();

                if (!src) {
                  return;
                }
                onChange(src);
                setIsOpen(false);
                e.currentTarget.reset();
              }}
            >
              <Input
                defaultValue={avatar}
                label="Image Source"
                name="src"
                size="sm"
                type="url"
                variant="bordered"
              />
              <Button className="w-full mt-2" type="submit" variant="flat">
                Submit
              </Button>
            </form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AvatarEditor;
