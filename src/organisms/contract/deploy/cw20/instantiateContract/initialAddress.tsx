import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  initialAddress: string;
  handleInitialAddress: (value: string) => void;
}

const InitialAddress = ({ initialAddress, handleInitialAddress }: IProps) => {
  return <CustomRow title={"InitialAddress"} merge={true} children={<TextInput value={initialAddress} placeholder={"ADDR, ADDR, ADDR..."} onChange={handleInitialAddress} />} />;
};

export default InitialAddress;
