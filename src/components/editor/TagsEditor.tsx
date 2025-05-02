import type { Tag } from "../../profile.type";

import {
  Button,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";

import InPlaceEditor from "./InPlaceEditor";

interface TagsEditorProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagsEditor = ({ tags, onChange }: TagsEditorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="tags">
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          color="secondary"
          startContent={
            <span className="ml-1 my-auto" role="img">
              {tag.emoji}
            </span>
          }
          variant="shadow"
        >
          <InPlaceEditor
            className="inline"
            maxWidth={100}
            minWidth={30}
            type="text"
            value={tag.text}
            onDelete={() => {
              const newTags = tags.filter((t) => t.id !== tag.id);

              onChange(newTags);
            }}
            onSave={(value) => {
              const newTags = tags.map((t) =>
                t.id === tag.id ? { ...t, name: value } : t,
              );

              onChange(newTags);
            }}
          />
        </Chip>
      ))}
      <Popover
        showArrow
        isOpen={isOpen}
        offset={10}
        placement="bottom"
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            className="w-[28px] h-[28px]"
            color="primary"
            variant="shadow"
          >
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
                Tag
              </p>
              <form
                className="mt-2 flex flex-col gap-2 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newTags = [
                    ...tags,
                    {
                      id: Date.now(),
                      emoji: formData.get("emoji") as string,
                      text: formData.get("text") as string,
                    },
                  ];

                  onChange(newTags);
                  setIsOpen(false);
                  e.currentTarget.reset();
                }}
              >
                <Input
                  label="Emoji"
                  name="emoji"
                  size="sm"
                  variant="bordered"
                />
                <Input label="Text" name="text" size="sm" variant="bordered" />
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

export default TagsEditor;
