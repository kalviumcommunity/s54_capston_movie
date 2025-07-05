import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Divider,
  Box
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              userSelect: "none",
              fontWeight: 600,
              color: "primary.main",
              "&:hover": {
                color: "secondary.main",
              },
              transition: "all 0.3s ease"
            }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeMenu}
            PaperProps={{
              sx: {
                mt: 1.2,
                borderRadius: 2,
                minWidth: 220,
                boxShadow: 4,
                p: 1
              }
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={closeMenu}
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase" fontSize="0.85rem" fontWeight={600}>
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}

            <Divider sx={{ my: 1 }} />

            <ListItemButton
              onClick={() => {
                dispatch(setUser(null));
                closeMenu();
              }}
              sx={{
                borderRadius: 1,
                color: "error.main",
                "&:hover": {
                  backgroundColor: "error.light",
                  color: "white"
                }
              }}
            >
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase" fontSize="0.85rem" fontWeight={600}>
                    sign out
                  </Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
