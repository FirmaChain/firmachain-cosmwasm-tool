import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  tokenSymbol: string;
  handleTokenSymbol: (value: string) => void;
}

const TokenSymbol = ({ tokenSymbol, handleTokenSymbol }: IProps) => {
  return <CustomRow title={"TokenSymbol"} merge={true} children={<TextInput value={tokenSymbol} placeholder={"ex) FCT, ETH..."} onChange={handleTokenSymbol} />} />;
};

export default TokenSymbol;
