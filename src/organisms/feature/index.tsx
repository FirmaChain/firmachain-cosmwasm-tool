import { useSelector } from "react-redux";

import AccordionCard from "components/card/accordionCard";

import { rootState } from "store/reducers";

import { TABS } from "constants/common";

import Cw20Feature from "./cw20";

const Features = () => {
  const { tab } = useSelector((state: rootState) => state.global);

  return (
    <AccordionCard title={"Features"} darkTitle={true}>
      {tab === TABS[0] && <Cw20Feature />}
    </AccordionCard>
  )
}

export default Features;