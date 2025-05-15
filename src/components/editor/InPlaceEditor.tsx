import { Icon } from "@iconify-icon/react";
import React from "react";

interface InPlaceEditProps {
  type: "text" | "textarea" | "date";
  value: string;
  className?: string;
  fontSize?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minLines?: number;
  maxLines?: number;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  iconSize?: number | string;
}

const InPlaceEditor = ({
  type,
  value,
  className,
  fontSize,
  minWidth,
  maxWidth,
  maxLines,
  onSave,
  onCancel,
  onDelete,
  iconSize,
}: InPlaceEditProps) => {
  const [lastSubmittedValue, setLastSubmittedValue] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-fit h-fit flex flex-row justify-center items-center">
      <div className="relative">
        <span
          className={className}
          style={{
            display: type !== "textarea" ? "inline-block" : "block",
            fontSize: fontSize,
            lineHeight: type === "textarea" ? "1.5rem" : "1.2rem",
            minWidth: minWidth,
            maxWidth: maxWidth,
            maxLines: maxLines,
            wordBreak: type === "text" ? "keep-all" : "break-word",
            whiteSpace: "pre-line",
            visibility: "hidden",
            paddingRight: type === "date" ? "1.5rem" : "0",
          }}
        >
          {/* to fit firefox */}
          {type === "date" && inputValue.replace(/-/g, " / ")}
          {type !== "date" &&
            inputValue.replace(/ /g, "\u00A0").replace(/\n$/g, "\n\u00A0")}
        </span>
        {type !== "textarea" && (
          <input
            className={
              "border-none bg-transparent outline-0 underline underline-offset-3 absolute top-0 left-0 w-[100%] h-[100%]" +
              " " +
              className
            }
            style={{
              fontSize: fontSize,
              lineHeight: "1.2rem",
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
              fontSize: fontSize,
              lineHeight: "1.5rem",
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
          className="editor-button save-button"
          onClick={() => {
            if (inputValue === lastSubmittedValue) {
              return;
            }
            onSave(inputValue);
            setLastSubmittedValue(inputValue);
          }}
        >
          <Icon
            className="m-auto"
            icon="line-md:confirm"
            {...(iconSize
              ? { width: iconSize, height: iconSize }
              : { width: "1rem", height: "1rem" })}
          />
        </button>
      )}
      {onCancel && (
        <button
          className="editor-button cancel-button"
          onClick={() => {
            onCancel();
          }}
        >
          <Icon
            className="m-auto"
            icon="line-md:close"
            {...(iconSize
              ? { width: iconSize, height: iconSize }
              : { width: "1rem", height: "1rem" })}
          />
        </button>
      )}
      {onDelete && (
        <button
          className="editor-button delete-button"
          onClick={() => {
            onDelete();
          }}
        >
          <Icon
            className="text-red-600 m-auto"
            icon="line-md:trash"
            {...(iconSize
              ? { width: iconSize, height: iconSize }
              : { width: "1rem", height: "1rem" })}
          />
        </button>
      )}
    </div>
  );
};

export default InPlaceEditor;
