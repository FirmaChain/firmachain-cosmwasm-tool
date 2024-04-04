import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  marketingAddress: string;
  checkAddress: boolean;
  handleMarketingAddress: (value: string) => void;
}

const MarketingAddress = ({ marketingAddress, checkAddress, handleMarketingAddress }: IProps) => {
  return <CustomRow title={"MarketingAddress"} merge={true} children={<TextInput value={marketingAddress} checkValue={checkAddress} placeholder={"ADDR (OPTION)"} onChange={handleMarketingAddress} />} />;
};

export default MarketingAddress;
