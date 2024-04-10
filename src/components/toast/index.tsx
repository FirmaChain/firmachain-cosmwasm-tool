import { VariantType, enqueueSnackbar } from "notistack";

interface IProps {
    message: string;
    variant: VariantType;
}

const Toast = ({ message, variant }: IProps) => {
    enqueueSnackbar(message, {
        variant: variant,
        anchorOrigin: {
            horizontal: "center",
            vertical: "top",
        },
    });
};

export default Toast;
