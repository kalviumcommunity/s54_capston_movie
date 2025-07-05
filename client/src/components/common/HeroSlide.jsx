import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";

import uiConfigs from "../../configs/ui.configs";
import CircularRate from "./CircularRate";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        dispatch(setGlobalLoading(false));
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode]
        }
      }}
    >
      <Swiper
        grabCursor
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        style={{ width: "100%", height: "max-content" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            {/* Background image */}
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%"
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
                transition: "transform 1s ease",
                "&:hover": {
                  transform: "scale(1.01)"
                }
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
              }}
            />

            {/* Content */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { xs: "20px", sm: "40px", md: "5rem", lg: "10rem" }
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  color: "text.primary",
                  width: { xs: "100%", md: "60%", lg: "40%" }
                }}
              >
                <Stack spacing={3}>
                  {/* Title */}
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                      fontSize: {
                        xs: "1.8rem",
                        sm: "2.4rem",
                        md: "2.8rem",
                        lg: "4rem"
                      }
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>

                  {/* Rating + Genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularRate value={movie.vote_average} />
                    <Divider orientation="vertical" flexItem />
                    {[...movie.genre_ids]
                      .splice(0, 2)
                      .map((genreId, index) => {
                        const genreName = genres.find((g) => g.id === genreId)?.name;
                        return (
                          <Chip
                            key={index}
                            label={genreName}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        );
                      })}
                  </Stack>

                  {/* Overview */}
                  <Typography
                    variant="body2"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                      fontSize: { xs: "0.9rem", sm: "1rem" }
                    }}
                  >
                    {movie.overview}
                  </Typography>

                  {/* Watch Now Button */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{
                      width: "fit-content",
                      paddingX: "2rem",
                      fontWeight: 600
                    }}
                  >
                    Watch Now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
