import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  minterCap: number;
  handleMinterCap: (value: number) => void;
}

const MinterCap = ({ minterCap, handleMinterCap }: IProps) => {
  return <CustomRow title={"MinterCap"} merge={true} children={<TextInput value={minterCap} placeholder={"PRICE (OPTION)"} type={"number"} onChange={handleMinterCap} />} />;
};

export default MinterCap;
