import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  marketingDesc: string;
  handleMarketingDesc: (value: string) => void;
}

const MarketingDesc = ({ marketingDesc, handleMarketingDesc }: IProps) => {
  return <CustomRow title={"MarketingDesc"} merge={true} children={<TextInput value={marketingDesc} placeholder={"ex) MyToken's description is like this. (OPTION)"} onChange={handleMarketingDesc} />} />;
};

export default MarketingDesc;