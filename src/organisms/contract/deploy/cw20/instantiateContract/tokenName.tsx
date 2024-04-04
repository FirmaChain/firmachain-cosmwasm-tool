import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  tokenName: string;
  handleTokenName: (value: string) => void;
}

const TokenName = ({ tokenName, handleTokenName }: IProps) => {
  return <CustomRow title={"TokenName"} merge={true} children={<TextInput value={tokenName} placeholder={"ex) FirmaChain Token, Ethereum Token..."} onChange={handleTokenName} />} />;
};

export default TokenName;
