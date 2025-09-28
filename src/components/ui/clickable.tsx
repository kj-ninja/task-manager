import { cn } from "@lib/utils";
import React, { forwardRef, type KeyboardEvent, type MouseEvent } from "react";

/**
 * Props for the Clickable component.
 */
export interface ClickableProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Event handler for the click or key press event.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  disabled?: boolean;
  testId?: string;
}

export const Clickable = forwardRef<HTMLDivElement, ClickableProps>(
  ({ onClick, children, className = "", testId, disabled, ...props }, ref) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) {
          onClick?.(e);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!disabled) {
        onClick?.(e);
      }
    };

    const isClickable = !!onClick && !disabled;

    return (
      <div
        ref={ref}
        aria-disabled={disabled}
        role={isClickable ? "button" : undefined}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          {
            "cursor-pointer": isClickable,
          },
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Clickable.displayName = "Clickable";
