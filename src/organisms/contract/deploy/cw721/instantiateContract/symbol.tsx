import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  symbol: string;
  handleSymbol: (value: string) => void;
}

const Symbol = ({ symbol, handleSymbol }: IProps) => {
  return <CustomRow title={"Symbol"} merge={true} children={<TextInput value={symbol} placeholder={"ex) FCT, ETH..."} onChange={handleSymbol} />} />;
};

export default Symbol;
