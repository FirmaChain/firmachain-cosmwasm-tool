import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  minterAddress: string;
  checkAddress: boolean;
  handleMinterAddress: (value: string) => void;
}

const MinterAddress = ({ minterAddress, checkAddress, handleMinterAddress }: IProps) => {
  return <CustomRow title={"MinterAddress"} merge={true} children={<TextInput value={minterAddress} placeholder={"ADDR (OPTION)"} checkValue={checkAddress} onChange={handleMinterAddress} />} />;
};

export default MinterAddress;
