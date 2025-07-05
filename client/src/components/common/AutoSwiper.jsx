import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Swiper
        spaceBetween={20} // ⬅️ spacing between cards
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
