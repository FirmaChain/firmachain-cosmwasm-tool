import CustomRadioGroup from "components/radio/customRadio";
import CustomRow from "components/table/row/customRow";
import { ACCESS_TYPES } from "./storeCode";

interface IProps {
  title: string;
  selectedAccessType: number;
  onChangeRadioType: (value: number) => void;
}
const AccessType = ({ title, selectedAccessType, onChangeRadioType }: IProps) => {
  return <CustomRow title={title} merge={true} children={<CustomRadioGroup enumValues={ACCESS_TYPES} selectedValue={selectedAccessType} onChange={onChangeRadioType} />} />;
}

export default AccessType;