import { ModalActions } from "store/action";

interface IProps {
  enable: boolean;
  message?: string | undefined;
}

const LoadingProgress = ({ enable, message = "" }: IProps) => {
  ModalActions.handleLoading({ enable: enable, message: message });
};

export default LoadingProgress;
