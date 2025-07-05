import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "250px",           // 📏 Increased width
            maxWidth: "90vw",         // 🛡️ Prevent overflow on small screens
            marginBottom: "1.5rem"    // 📦 Optional vertical spacing
          }}
        >
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
