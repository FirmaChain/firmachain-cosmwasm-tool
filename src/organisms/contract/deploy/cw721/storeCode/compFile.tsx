import FileUpload from "components/input/fileUpload";
import CustomRow from "components/table/row/customRow";

interface IProps {
  handleFile: (file: string | ArrayBuffer | null) => void;
}

const CompFile = ({ handleFile }: IProps) => {
  return <CustomRow title={"File"} merge={true} children={<FileUpload handleFile={handleFile} />} />;
};

export default CompFile;
