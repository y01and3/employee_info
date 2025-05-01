import { Icon } from "@iconify-icon/react";
import React from "react";

interface InPlaceEditProps {
  type: "text" | "textarea";
  value: string;
  className?: string;
  minWidth?: number;
  maxWidth?: number;
  minLines?: number;
  maxLines?: number;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const InPlaceEdit = ({
  type,
  value,
  className,
  minWidth = 100,
  maxWidth = 500,
  maxLines,
  onSave,
  onCancel,
  onDelete,
}: InPlaceEditProps) => {
  const [lastSubmittedValue, setLastSubmittedValue] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-fit h-fit flex flex-row ">
      <div className="relative">
        <span
          className={"inline-block invisible" + " " + className}
          style={{ minWidth: minWidth, maxWidth: maxWidth, maxLines: maxLines }}
        >
          {inputValue.replace(/ /g, "\u00A0")}
        </span>
        <input
          className={
            "border-none bg-transparent outline-0 underline underline-offset-3 absolute top-0 left-0 w-[100%] h-[100%]" +
            " " +
            className
          }
          type={type}
          value={inputValue}
          onChange={handleChange}
        />
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
          <Icon className="my-auto" icon="line-md:confirm" />
        </button>
      )}
      {onCancel && (
        <button
          className="cancel-button"
          onClick={() => {
            onCancel();
          }}
        >
          <Icon className="my-auto" icon="line-md:close" />
        </button>
      )}
      {onDelete && (
        <button
          className="delete-button"
          onClick={() => {
            onDelete();
          }}
        >
          <Icon className="text-red-600 mt-auto mb-auto" icon="line-md:trash" />
        </button>
      )}
    </div>
  );
};

export default InPlaceEdit;
