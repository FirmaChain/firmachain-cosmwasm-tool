import { useSelector } from "react-redux"

import { rootState } from "store/reducers"
import AccordionCard from "components/card/accordionCard";
import { TABS } from "constants/common";

import Cw20Bulk from "./cw20";

const Bulk = () => {
  const { tab } = useSelector((state: rootState) => state.global);

  return (
    <AccordionCard title={"Bulk"} darkTitle={true}>
      {tab === TABS[0] && <Cw20Bulk />}
    </AccordionCard>
  )
}

export default Bulk;