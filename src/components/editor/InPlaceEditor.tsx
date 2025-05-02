import { Icon } from "@iconify-icon/react";
import React from "react";

interface InPlaceEditProps {
  type: "text" | "textarea" | "date";
  value: string;
  className?: string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minLines?: number;
  maxLines?: number;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const InPlaceEditor = ({
  type,
  value,
  className,
  minWidth = 100,
  maxWidth = 500,
  maxLines = 10,
  onSave,
  onCancel,
  onDelete,
}: InPlaceEditProps) => {
  const [lastSubmittedValue, setLastSubmittedValue] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-fit h-fit flex flex-row ">
      <div className="relative">
        <span
          className={className}
          style={{
            display: type !== "textarea" ? "inline-block" : "block",
            minWidth: minWidth,
            maxWidth: maxWidth,
            maxLines: maxLines,
            wordBreak: type === "text" ? "keep-all" : "break-word",
            whiteSpace: "pre-line",
            visibility: "hidden",
            paddingRight: type === "date" ? "1.5em" : "0",
          }}
        >
          {inputValue.replace(/ /g, "\u00A0").replace(/\n$/g, "\n\u00A0")}
        </span>
        {type !== "textarea" && (
          <input
            className={
              "border-none bg-transparent outline-0 underline underline-offset-3 absolute top-0 left-0 w-[100%] h-[100%]" +
              " " +
              className
            }
            style={{
              minWidth: minWidth,
              maxWidth: maxWidth,
            }}
            type={type}
            value={inputValue}
            onChange={handleChange}
          />
        )}
        {type === "textarea" && (
          <textarea
            className={
              "border-none bg-transparent outline-0 underline underline-offset-3 absolute top-0 left-0 w-[100%] h-[100%] break-words resize-none scrollbar-hidden" +
              " " +
              className
            }
            style={{
              minWidth: minWidth,
              maxWidth: maxWidth,
              maxLines: maxLines,
            }}
            value={inputValue}
            onChange={handleChange}
          />
        )}
      </div>
      {onSave && (
        <button
          className="save-button"
          onClick={() => {
            if (inputValue === lastSubmittedValue) {
              return;
            }
            onSave(inputValue);
            setLastSubmittedValue(inputValue);
          }}
        >
          <Icon className="m-auto" icon="line-md:confirm" />
        </button>
      )}
      {onCancel && (
        <button
          className="cancel-button"
          onClick={() => {
            onCancel();
          }}
        >
          <Icon className="m-auto" icon="line-md:close" />
        </button>
      )}
      {onDelete && (
        <button
          className="delete-button"
          onClick={() => {
            onDelete();
          }}
        >
          <Icon className="text-red-600 m-auto" icon="line-md:trash" />
        </button>
      )}
    </div>
  );
};

export default InPlaceEditor;
