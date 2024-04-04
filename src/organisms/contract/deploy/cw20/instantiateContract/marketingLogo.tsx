import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  marketingLogo: string;
  handleMarketingLogo: (value: string) => void;
}

const MarketingLogo = ({ marketingLogo, handleMarketingLogo }: IProps) => {
  return <CustomRow title={"MarketingLogo"} merge={true} children={<TextInput value={marketingLogo} placeholder={"ex) https://example.com/mytoken-logo.png (OPTION)"} onChange={handleMarketingLogo} />} />;
};

export default MarketingLogo;
