import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  adminAddress: string;
  checkAddress: boolean;
  handleAdminAddress: (value: string) => void;
}

const Admin = ({ adminAddress, checkAddress, handleAdminAddress }: IProps) => {
  return <CustomRow title={"Admin"} merge={true} children={<TextInput value={adminAddress} placeholder={"ADDR"} checkValue={checkAddress} onChange={handleAdminAddress} />} />;
};

export default Admin;
