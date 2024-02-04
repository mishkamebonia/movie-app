import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress variant="indeterminate" />
    </Backdrop>
  );
};

export default Loader;
