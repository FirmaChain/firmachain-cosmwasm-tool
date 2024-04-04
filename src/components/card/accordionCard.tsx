import { Fragment, forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider, Typography, alpha } from "@mui/material";

import PropTypes from "prop-types";
import Accordion from "components/accordion/accordion";

const headerSX = {
  padding: "10px 20px",
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

const AccordionCard = forwardRef(
  ({ border = true, boxShadow, children, content = true, contentSX = {}, darkTitle, divider = true, elevation, secondary, shadow, sx = {}, title, codeHighlight, ...others }: any, ref: any) => {
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
        <Accordion
          summary={
            <Fragment>
              {!darkTitle && title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: "subtitle1" }} title={title} action={secondary} />}
              {darkTitle && title && (
                <CardHeader
                  sx={headerSX}
                  title={
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                      {title}
                    </Typography>
                  }
                  action={secondary}
                />
              )}
            </Fragment>
          }
          collapse={
            <Fragment>
              {title && divider && <Divider />}
              {content && <CardContent sx={contentSX}>{children}</CardContent>}
              {!content && children}
            </Fragment>
          }
        />
      </Card>
    );
  }
);

AccordionCard.propTypes = {
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

export default AccordionCard;
