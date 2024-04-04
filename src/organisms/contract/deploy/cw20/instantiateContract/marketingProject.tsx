import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";

interface IProps {
  marketingProject: string;
  handleMarketingProject: (value: string) => void;
}

const MarketingProject = ({ marketingProject, handleMarketingProject }: IProps) => {
  return <CustomRow title={"MarketingProject"} merge={true} children={<TextInput value={marketingProject} placeholder={"ex) http://firmachain.org (OPTION)"} onChange={handleMarketingProject} />} />;
};

export default MarketingProject;
