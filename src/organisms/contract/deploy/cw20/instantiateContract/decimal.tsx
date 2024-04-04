import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  decimal: number;
  handleDecimal: (value: number) => void;
}

const Decimal = ({ decimal, handleDecimal }: IProps) => {
  return <CustomRow title={"Decimal"} merge={true} children={<TextInput value={decimal} placeholder={"6 (decimal)"} type={"number"} onChange={handleDecimal} />} />;
};

export default Decimal;
