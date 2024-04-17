import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  adminAddres: string;
  checkAddress: boolean;
  handleAdminAddress: (value: string) => void;
}

const Admin = ({ adminAddres, checkAddress, handleAdminAddress }: IProps) => {
  return <CustomRow title={"Admin"} merge={true} children={<TextInput value={adminAddres} checkValue={checkAddress} placeholder={"ADDR"} onChange={handleAdminAddress} />} />;
};

export default Admin;
