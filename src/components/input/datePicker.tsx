import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

interface IProps {
  onChange: (value: any) => void;
}

const DatePicker = ({ onChange }: IProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
        onChange={onChange}
        format="YYYY-MM-DD hh:mm:ss"
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                fontSize: "0.7rem",
              },
              "& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "5px 10px"
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  )
}

export default DatePicker;