import { ChangeEvent, useRef, useState } from "react";
import { ButtonBase, InputAdornment, Stack, TextField } from "@mui/material";
import { FilePresent } from "@mui/icons-material";

interface IProps {
  handleFile: (file: string | ArrayBuffer | null) => void;
}

const FileUpload = ({ handleFile }: IProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [attachment, setAttachment] = useState<any>(null);

  const inputStyle = {
    "& input": {
      padding: "5px 10px",
      fontSize: "0.7rem",
    },
  };

  const onClickFileUpload = async () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files !== null && files.length > 0) {
      const file = files[0];
      setAttachment(file);
      handleFileData(file);
    }
  };

  const handleFileData = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let fileData = fileReader.result;
      if (fileData) {
        const uint8Array = new Uint8Array(fileData as ArrayBuffer);
        handleFile(uint8Array);
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <Stack>
      <ButtonBase onClick={onClickFileUpload}>
        <TextField
          hiddenLabel
          fullWidth
          autoComplete={"off"}
          variant={"outlined"}
          value={attachment?.name || ""}
          placeholder={"Click to upload file"}
          sx={{ ...inputStyle }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilePresent sx={{ width: "15px", height: "15px" }} />
              </InputAdornment>
            ),
          }}
        />
      </ButtonBase>
      <input ref={ref} id="file_input" type="file" hidden onChange={handleChange} style={{ display: "none" }} />
    </Stack>
  );
};

export default FileUpload;
