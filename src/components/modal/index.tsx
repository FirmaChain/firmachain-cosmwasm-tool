import React from 'react';
import { Box, Button, Modal, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ModalProps {
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const baseStyle = {
  position: 'absolute' as 'absolute',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  width: "350px"
};

const headerStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: 4,
  paddingTop: 1.5,
  paddingBottom: 1.5,
  borderTopLeftRadius: "7px",
  borderTopRightRadius: "7px"
};

const bodyStyle = {
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 2,
  paddingBottom: 2
};

const footerStyle = {
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 2
};

const TxModal: React.FC<ModalProps> = ({ children, onConfirm, onCancel }) => {
  const theme = useTheme();

  return (
    <Modal open={true} onClose={() => { }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 0 }}>
      <Box sx={{ ...baseStyle }}>
        <Box sx={{ ...headerStyle }}>
          <SendIcon color="inherit" />
          <Typography variant="h6" style={{ marginLeft: theme.spacing(1), fontSize: "18px", fontWeight: "800" }}>
            {"CONFIRM"}
          </Typography>
        </Box>
        <Box sx={{ ...bodyStyle }}>
          {children}
        </Box>
        <Box sx={{ ...footerStyle, display: "flex", direction: "row", justifyContent: "space-between", gap: 1 }}>
          <Button onClick={onCancel} variant="outlined" color="primary" fullWidth>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="primary" fullWidth>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TxModal;