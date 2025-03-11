import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { getYouTubeVideoID } from "@/lib/getYoutubeVideo";

const VideoBlock = async () => {
  const latest_videos = await directus.request(readSingleton("latest_videos"));

  return (
    <PaddingContainer className=" lg:max-w-screen-lg xl:max-w-screen-xl max-w-screen-sm  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {latest_videos &&
        latest_videos.videos.map(
          (video: { link: string }, i: React.Key | null | undefined) => (
            <iframe
              key={i}
              className="w-full h-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                video.link
              )}`}
              allowFullScreen
            />
          )
        )}
    </PaddingContainer>
  );
};

export default VideoBlock;
