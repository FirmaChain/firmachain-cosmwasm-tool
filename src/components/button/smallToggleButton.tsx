import { Button, useTheme } from "@mui/material";
import { useMemo } from "react";

type ButtonType = "success" | "error";

interface IProps {
  title: string;
  variant: ButtonType;
  active: boolean | null;
  color?: ButtonType;
  onClick: () => void;
}

const SmallToggleButton = ({ title, variant, active, color = variant, onClick }: IProps) => {
  const theme = useTheme();

  const ButtonStyle = useMemo(() => {
    const colorTheme = color === "error" ? theme.palette.error.main : theme.palette.success.main;

    if (variant === "error") {
      return {
        color: active === false ? theme.palette.common.white : theme.palette.grey[500],
        backgroundColor: active === false ? theme.palette.error.main : "transparent",
        border: `1px solid ${active === false ? theme.palette.error.main : theme.palette.grey[500]}`,
      };
    }
    return {
      color: active ? theme.palette.common.white : theme.palette.grey[500],
      backgroundColor: active ? colorTheme : "transparent",
      border: `1px solid ${active ? colorTheme : theme.palette.grey[500]}`,
    };
  }, [variant, active]);

  return (
    <Button
      variant={"contained"}
      color={color}
      sx={{
        width: "100px",
        height: "26.9px",
        fontSize: "0.8rem",
        boxShadow: "none",
        ...ButtonStyle,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default SmallToggleButton;