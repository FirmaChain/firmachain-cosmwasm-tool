import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  name: string;
  handleName: (value: string) => void;
}

const Name = ({ name, handleName }: IProps) => {
  return <CustomRow title={"Name"} merge={true} children={<TextInput value={name} placeholder={"TEXT"} onChange={handleName} />} />;
};

export default Name;
