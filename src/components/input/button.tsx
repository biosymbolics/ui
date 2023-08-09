import { ReactElement } from "react";
import {
  default as JoyButton,
  ButtonProps as JoyButtonProps,
} from "@mui/joy/Button";

type ButtonProps = {
  children: JoyButtonProps["children"];
  color?: JoyButtonProps["color"];
  disabled?: JoyButtonProps["disabled"];
  fullWidth?: JoyButtonProps["fullWidth"];
  isLoading?: JoyButtonProps["loading"];
  size?: JoyButtonProps["size"];
  variant?: JoyButtonProps["variant"];
};

/**
 * Button wrapper
 *
 * @param props.children
 * @param props.color
 * @param props.disabled
 * @param props.fullWidth
 * @param props.isLoading
 * @param props.size
 * @param props.variant defaults to soft
 * @returns Button
 */
export const Button = ({
  children,
  isLoading,
  ...props
}: ButtonProps): ReactElement<ButtonProps> => (
  <JoyButton variant="soft" {...props} loading={isLoading}>
    {children}
  </JoyButton>
);
