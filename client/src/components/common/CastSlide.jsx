import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";

const CastSlide = ({ casts }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", sm: "33.33%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
          transition: "transform 0.3s ease-in-out"
        },
        "& .swiper-slide:hover": {
          transform: "scale(1.03)"
        }
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  paddingTop: "120%",
                  color: "text.primary",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(cast.profile_path)),
                  transition: "transform 0.3s ease"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                    padding: "10px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white"
                  }}
                >
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                      fontSize: "0.9rem",
                      fontWeight: 600
                    }}
                  >
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
