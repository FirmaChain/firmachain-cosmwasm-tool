import { CardHeader, Stack, Switch, Typography } from "@mui/material";
import { MODES } from "../../constants/common";


const headerSX = {
  padding: "10px 0",
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

interface IProps {
  mode: boolean;
  onChangeMode: (value: boolean) => void;
}

const SwitchMode = ({ mode, onChangeMode }: IProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMode(event.target.checked);
  };

  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"} padding={"0 20px"}>
      <CardHeader
        sx={{ ...headerSX, opacity: mode ? 0.3 : 1 }}
        title={
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {MODES[0]}
          </Typography>
        }
      />
      <Switch checked={mode} onChange={handleChange} />
      <CardHeader
        sx={{ ...headerSX, opacity: mode ? 1 : 0.3 }}
        title={
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {MODES[1]}
          </Typography>
        }
      />
    </Stack>
  );
};

export default SwitchMode;
