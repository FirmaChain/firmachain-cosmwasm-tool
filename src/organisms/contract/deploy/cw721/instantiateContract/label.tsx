import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  label: string;
  handleLabel: (value: string) => void;
}

const Label = ({ label, handleLabel }: IProps) => {
  return <CustomRow
    title={"Label"}
    merge={true}
    children={<TextInput value={label} placeholder={"ex) EventRewardContract, MarketPlaceContract..."} onChange={handleLabel} />} />;
};

export default Label;
