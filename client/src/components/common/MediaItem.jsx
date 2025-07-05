import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import CircularRate from "./CircularRate";
import favoriteUtils from "../../utils/favorite.utils";

const MediaItem = ({ media, mediaType }) => {
  const theme = useTheme();
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date?.split("-")[0]);
    } else {
      setReleaseDate(media.first_air_date?.split("-")[0]);
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          position: "relative",
          borderRadius: "1rem",
          overflow: "hidden",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: `0 0 20px ${theme.palette.primary.main}`
          },
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText"
        }}
      >
        {/* Favorite badge */}
        {mediaType !== "people" &&
          favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
            <FavoriteIcon
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: "2rem",
                color: "#ff1744"
              }}
            />
          )}

        {/* Reddish-Yellow gradient overlay */}
        <Box
          className="media-back-drop"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: "opacity 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            background: "linear-gradient(to top, rgba(255,23,68,0.9), rgba(255,235,59,0.3))"
          }}
        />

        {/* Play button */}
        {mediaType !== "people" && (
          <Button
            className="media-play-btn"
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
              display: { xs: "none", md: "flex" },
              opacity: 0,
              transition: "opacity 0.3s ease",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ff1744",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#f50057"
              },
              "& .MuiButton-startIcon": {
                marginRight: "-4px"
              }
            }}
          />
        )}

        {/* Media info */}
        {mediaType !== "people" && (
          <Box
            className="media-info"
            sx={{
              transition: "all 0.3s ease",
              opacity: { xs: 1, md: 0 },
              position: "absolute",
              bottom: { xs: 0, md: "-20px" },
              width: "100%",
              padding: { xs: "10px", md: "1.5rem 1rem" },
              background: "rgba(255, 23, 68, 0.8)"
            }}
          >
            <Stack spacing={1}>
              {rate && <CircularRate value={rate} />}
              <Typography fontSize="0.9rem" color="#ffeb3b">
                {releaseDate}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize="1rem"
                sx={uiConfigs.style.typoLines(1, "left")}
              >
                {title}
              </Typography>
            </Stack>
          </Box>
        )}

        {/* People (Actors/Directors) */}
        {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(255,23,68,0.8)"
            }}
          >
            <Typography
              variant="subtitle2"
              color="#fff"
              sx={uiConfigs.style.typoLines(1, "left")}
            >
              {media.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default MediaItem;
