import { Popover, PopoverTrigger, Button, PopoverContent } from "@heroui/react";
import React from "react";
import ColorPicker from "react-pick-color";

interface BackgroundColorEditorProps {
  className?: string;
  color: string;
  onChange: (color: string) => void;
}

const BackgroundColorEditor = ({
  color,
  onChange,
  className,
}: BackgroundColorEditorProps) => {
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
        <Button
          className={className ?? ""}
          style={{ backgroundColor: "white", color: "black" }}
          variant="flat"
        >
          Change Background Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-sm font-bold text-foreground" {...titleProps}>
              Background Color
            </p>
            <ColorPicker
              color={color}
              onChange={(color) =>
                onChange(
                  `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.alpha})`,
                )
              }
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default BackgroundColorEditor;
