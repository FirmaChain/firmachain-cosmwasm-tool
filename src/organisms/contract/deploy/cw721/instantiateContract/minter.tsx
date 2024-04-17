import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  minterAddress: string;
  checkAddress: boolean;
  handleMinterAddress: (value: string) => void;
}

const Minter = ({ minterAddress, checkAddress, handleMinterAddress }: IProps) => {
  return <CustomRow title={"Minter"} merge={true} children={<TextInput value={minterAddress} checkValue={checkAddress} placeholder={"ADDR"} onChange={handleMinterAddress} />} />;
};

export default Minter;
