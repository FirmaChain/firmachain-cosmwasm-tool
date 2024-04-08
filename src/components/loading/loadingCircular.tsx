import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";

interface IProps {
  message: string | undefined;
}

const LoadingCircular = ({ message }: IProps) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{ position: "fixed", top: "-50%", left: "-50%", width: "200%", height: "200%", backgroundColor: "#00000050", zIndex: 999999, overflow: "hidden" }}
      alignItems={"center"}
      gap={"15px"}
      justifyContent={"center"}
    >
      <CircularProgress />
      {(message !== undefined || message !== "") && (
        <Typography variant={"body1"} sx={{ fontWeight: "500", color: theme.palette.primary.main, backgroundColor: theme.palette.common.white, padding: "5px 10px", borderRadius: "4px" }}>
          {message}
        </Typography>
      )}
    </Stack>
  );
};

export default LoadingCircular;
