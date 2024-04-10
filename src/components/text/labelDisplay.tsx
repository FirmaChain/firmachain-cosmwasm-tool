import { Stack, Typography } from "@mui/material";

interface IProps {
  label: string;
  value: string;
};

const LabelDisplay = ({ label, value }: IProps) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} mt={"2px"}>
      <Typography sx={{ color: "grey", fontSize: "13px" }}>{label}</Typography>
      <Stack sx={{ }}>
        <Typography sx={{ fontSize: "13px" }}>{value}</Typography>
      </Stack>
    </Stack>
  )
}

export default LabelDisplay;