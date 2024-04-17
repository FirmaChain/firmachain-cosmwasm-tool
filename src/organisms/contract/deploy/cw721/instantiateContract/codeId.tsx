import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  codeId: string;
  handleCodeId: (value: string) => void;
}

const CodeId = ({ codeId, handleCodeId }: IProps) => {
  return <CustomRow title={"CodeId"} merge={true} children={<TextInput value={codeId} placeholder={"Cw721 CODE ID (DEFAULT 133)"} type={"text"} onChange={handleCodeId} />} />;
};

export default CodeId;
