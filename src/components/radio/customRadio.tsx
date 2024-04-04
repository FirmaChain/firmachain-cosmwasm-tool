import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface IRadioProps {
  enumValues: { [s: number]: string };
  selectedValue: number;
  onChange: (value: number) => void;
}

const CustomRadioGroup = ({ enumValues, selectedValue, onChange }: IRadioProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <RadioGroup row value={selectedValue} onChange={handleChange} aria-labelledby="demo-row-radio-buttons-group-label">
        {Object.keys(enumValues).map((key) => {
          const value = Number(key);
          if (!isNaN(value)) {
            return (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={
                  <Box component={"div"} fontSize={"11.5px"}>
                    {enumValues[value]}
                  </Box>
                }
              />
            );
          }
          return null;
        })}
      </RadioGroup>
    </FormControl>
  )
};

export default CustomRadioGroup;