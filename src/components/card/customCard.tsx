import { forwardRef } from "react";
import { Card, CardContent, Divider, Stack, alpha, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const CustomCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      headerTitle,
      headerChildren,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    }: any,
    ref: any
  ) => {
    const theme: any = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          width: "100%",
          border: border ? "1px solid #afafaf" : "none",
          borderRadius: 2,
          borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow: `0px 1px 3px ${alpha(theme.palette.grey[900], 0.15)}`,
          ":hover": {
            boxShadow: boxShadow ? shadow || `0px 1px 3px ${alpha(theme.palette.grey[900], 0.15)}` : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
        }}
      >
        {!darkTitle && (
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            {headerTitle && headerTitle}
            {headerChildren && headerChildren}
          </Stack>
        )}
        {darkTitle && (
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            {headerTitle && headerTitle}
            {headerChildren && headerChildren}
          </Stack>
        )}

        {divider && <Divider />}

        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

CustomCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.any,
  sx: PropTypes.object,
  title: PropTypes.string,
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  children: PropTypes.node,
};

export default CustomCard;
