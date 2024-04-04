import { Fragment, ReactNode, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { AccordionSummary, Box, Collapse } from "@mui/material";

interface IProps {
  summary: ReactNode;
  collapse: ReactNode;
  paddingForExpandButton?: boolean;
  defaultExpended?: boolean;
}

const Accordion = ({ summary, collapse, paddingForExpandButton = true, defaultExpended = true }: IProps) => {
  const [expanded, setExpanded] = useState(defaultExpended);

  const buttonStyle = {
    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-in-out",
  };
  const summaryContentStyle = {
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  };

  const onChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <AccordionSummary
        expandIcon={
          <Box sx={{ ...buttonStyle, padding: paddingForExpandButton ? "0 20px" : "0 5px" }}>
            <ExpandMore />
          </Box>
        }
        sx={{ ...summaryContentStyle, padding: 0 }}
        onClick={onChange}
      >
        {summary}
      </AccordionSummary>
      <Collapse in={expanded}>{collapse}</Collapse>
    </Fragment>
  );
};

export default Accordion;
