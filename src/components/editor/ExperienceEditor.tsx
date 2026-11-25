import type { Experience } from "../../profile.type";

import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Input,
  DateRangePicker,
  Divider,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";

import BlindList from "../animations/BlindList";

import InPlaceEditor from "./InPlaceEditor";

interface ExperienceEditorProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const toDateInputValue = (timestamp: number): string => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().split("T")[0];
  }

  return date.toISOString().split("T")[0];
};

const ExperienceEditor = ({ experiences, onChange }: ExperienceEditorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="resume">
      <BlindList
        items={experiences.map((experience) => ({
          id: experience.id.toString(),
          content: (
            <div key={experience.id}>
              <InPlaceEditor
                className="w-full text-left font-bold"
                maxWidth="100%"
                minWidth={100}
                type="text"
                value={experience.title}
                onDelete={() => {
                  const newExperiences = experiences.filter(
                    (exp) => exp.id !== experience.id,
                  );

                  onChange(newExperiences);
                }}
                onSave={(value) => {
                  const newExperiences = experiences.map((exp) =>
                    exp.id === experience.id ? { ...exp, title: value } : exp,
                  );

                  onChange(newExperiences);
                }}
              />
              <div className="flex flex-row gap-2">
                <InPlaceEditor
                  type="date"
                  value={toDateInputValue(experience.start)}
                  onSave={(value) => {
                    const parsed = Date.parse(value);

                    if (Number.isNaN(parsed)) {
                      return;
                    }
                    const newExperiences = experiences.map((exp) =>
                      exp.id === experience.id
                        ? { ...exp, start: parsed }
                        : exp,
                    );

                    onChange(newExperiences);
                  }}
                />
                -
                <InPlaceEditor
                  type="date"
                  value={toDateInputValue(experience.end)}
                  onSave={(value) => {
                    const parsed = Date.parse(value);

                    if (Number.isNaN(parsed)) {
                      return;
                    }
                    const newExperiences = experiences.map((exp) =>
                      exp.id === experience.id ? { ...exp, end: parsed } : exp,
                    );

                    onChange(newExperiences);
                  }}
                />
              </div>
              <Divider className="my-5" />
              <InPlaceEditor
                className="w-full text-left"
                maxWidth="95%"
                minWidth={100}
                type="textarea"
                value={experience.description ?? ""}
                onSave={(value) => {
                  const newExperiences = experiences.map((exp) =>
                    exp.id === experience.id
                      ? { ...exp, description: value }
                      : exp,
                  );

                  onChange(newExperiences);
                }}
              />
            </div>
          ),
        }))}
        speed={5}
      />
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
            aria-label="Add experience"
            className="w-full h-[28px]"
            color="primary"
            variant="shadow"
          >
            <Icon className="m-auto" icon="line-md:plus" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className="text-sm font-bold text-foreground" {...titleProps}>
                Experience
              </p>
              <form
                className="mt-2 flex flex-col gap-2 w-full text-xs"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const start = Date.parse(
                    String(formData.get("start") ?? "").trim(),
                  );
                  const end = Date.parse(
                    String(formData.get("end") ?? "").trim(),
                  );
                  const title = String(formData.get("title") ?? "").trim();
                  const description = String(
                    formData.get("description") ?? "",
                  ).trim();

                  if (!title || Number.isNaN(start) || Number.isNaN(end)) {
                    return;
                  }
                  const newExperiences = [
                    ...experiences,
                    {
                      id: Date.now(),
                      start,
                      end,
                      title,
                      description,
                    },
                  ];

                  onChange(newExperiences);
                  setIsOpen(false);
                  e.currentTarget.reset();
                }}
              >
                <DateRangePicker
                  endName="end"
                  label="Duration"
                  size="sm"
                  startName="start"
                  variant="bordered"
                />
                <Input
                  label="title"
                  name="title"
                  size="sm"
                  variant="bordered"
                />
                <Textarea
                  label="description"
                  name="description"
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

export default ExperienceEditor;
