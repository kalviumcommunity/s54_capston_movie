import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";

import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    sx: {
      transition: "all 0.3s ease",
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
      boxShadow: trigger ? 3 : 0
    }
  });
};
const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    const newTheme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(newTheme));
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={handleSidebarToggle} />
      <ScrollAppBar>
        <AppBar
          elevation={0}
          sx={{
            zIndex: 9999,
            backdropFilter: "blur(8px)",
            backgroundColor:
              themeMode === themeModes.dark
                ? "rgba(18, 18, 18, 0.6)"
                : "rgba(255, 255, 255, 0.7)"
          }}
        >
          <Toolbar
            sx={{
              px: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "64px"
            }}
          >
            {/* Left: Logo and Sidebar toggle */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                sx={{ display: { md: "none" }, mr: 1 }}
                onClick={handleSidebarToggle}
              >
                <MenuIcon />
              </IconButton>
              <Logo />
            </Box>

            {/* Center: All menu items including Home */}
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center"
              }}
            >
              <Stack direction="row" spacing={2}>
                {menuConfigs.main.map((item, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: appState.includes(item.state)
                        ? "primary.contrastText"
                        : "text.primary",
                      fontWeight: 500,
                      px: 2,
                      textTransform: "none",
                      borderRadius: "20px"
                    }}
                    variant={appState.includes(item.state) ? "contained" : "text"}
                  >
                    {item.display}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Right: Auth + Theme Toggle */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              {/* Auth */}
              {!user ? (
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 3
                  }}
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign In
                </Button>
              ) : (
                <UserMenu />
              )}

              {/* Theme Toggle - now to the right of Login */}
              <IconButton onClick={handleThemeToggle} sx={{ color: "inherit" }}>
                {themeMode === themeModes.dark ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <WbSunnyOutlinedIcon />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
