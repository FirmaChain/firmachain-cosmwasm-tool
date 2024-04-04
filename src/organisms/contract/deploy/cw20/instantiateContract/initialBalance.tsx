import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  initialBalance: string;
  handleInitialBalance: (value: string) => void;
}

const InitialBalance = ({ initialBalance, handleInitialBalance }: IProps) => {
  return <CustomRow title={"InitialBalance"} merge={true} children={<TextInput value={initialBalance} placeholder={"PRICE, PRICE, PRICE..."} type={"text"} onChange={handleInitialBalance} />} />;
};

export default InitialBalance;
