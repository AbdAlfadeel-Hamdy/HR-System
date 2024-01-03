import * as React from "react";
import { Box, styled } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { Button, Fade, DialogTitle, DialogActions, IconButton, } from "@mui/material";
const TransitionsModal = ({ children, btnIcon, btnText, btnVariant = "outlined", btnColor = "inherit", feedback, feedbackTitle, feedbackFn, feedbackFnLoading, }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = async () => {
        if (feedbackFn)
            await feedbackFn();
    };
    return (<div>
      {btnText ? (<Button variant={btnVariant} startIcon={btnIcon} color={btnColor} onClick={handleOpen}>
          {btnText}
        </Button>) : (<IconButton onClick={handleOpen} color={btnColor}>
          {btnIcon}
        </IconButton>)}
      <StyledModal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: StyledBackdrop }}>
        <Fade in={open}>
          <Box sx={style}>
            {children}
            {feedback && (<div>
                <DialogTitle id="responsive-dialog-title">
                  {feedbackTitle}
                </DialogTitle>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfirm} disabled={feedbackFnLoading} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </div>)}
          </Box>
        </Fade>
      </StyledModal>
    </div>);
};
const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (<Fade in={open}>
        <div ref={ref} {...other}/>
      </Fade>);
});
const StyledModal = styled(Modal) `
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBackdrop = styled(Backdrop) `
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const style = (theme) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 620,
    borderRadius: "12px",
    padding: "16px 32px 24px 32px",
    backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
    boxShadow: `0px 2px 24px ${theme.palette.mode === "dark" ? "#000" : "#383838"}`,
});
export default TransitionsModal;
