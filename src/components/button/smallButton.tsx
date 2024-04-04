import { Button } from "@mui/material";

type Color = "error" | "primary" | "secondary" | "info" | "success" | "warning" | "inherit";

interface IProps {
    title: string;
    active?: boolean;
    color?: Color;
    onClick: () => void;
}

const SmallButton = ({ title, active = false, color = "primary", onClick }: IProps) => {
    return (
        <Button disableElevation disabled={active} sx={{ width: "80px", height: "26.9px", fontSize: "0.7rem" }} size="small" variant="contained" color={color} onClick={onClick}>
            {title}
        </Button>
    );
};

export default SmallButton;
