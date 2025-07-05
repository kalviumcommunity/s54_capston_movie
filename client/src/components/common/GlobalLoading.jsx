import { useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (globalLoading) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [globalLoading]);

  return (
    <Fade in={isVisible} timeout={300}>
      <Backdrop
        open={isVisible}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.4)"
        }}
      >
        <Box textAlign="center">
          <Logo />
          <Box mt={3}>
            <CircularProgress color="primary" thickness={4} />
            <Typography variant="body2" mt={2} color="text.secondary">
              Loading, please wait...
            </Typography>
          </Box>
        </Box>
      </Backdrop>
    </Fade>
  );
};

export default GlobalLoading;
