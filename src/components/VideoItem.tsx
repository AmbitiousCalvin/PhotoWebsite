import { Icon } from "./general";

function VideoItem({ videos }) {

  const calculateSpan = (
    videoHeight: number,
    videoWidth: number,
    rowHeight = 10,
  ) => {
    const aspectRatio = videoHeight / videoWidth;
    return Math.ceil(aspectRatio * rowHeight);
  };

  function formatViews(views: number): string | number {
    if (views > 1000000)
      return `${(views / 1000000).toFixed(2)}m`;
    if (views > 1000)
      return `${(views / 1000).toFixed(1)}k`;
    return views;
  }

  const downloadImage = async (url: RequestInfo | URL) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = crypto.randomUUID();
      link.click();
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  function handleImageLoad(index: any) {
    const gridItem = document.querySelector(`.grid-item-${index}`);
    gridItem.classList.remove("loading");
  }

  return (
    <div className="grid-container">
      {!videos ? (
        <div>No videos found</div>
      ) : (
        videos.map((video, index) => {
          const rowSpan = calculateSpan(
            video.videos.small.width,
            video.videos.small.height,
          );
          return (
            <>
              <div
                key={video.id}
                className={`grid-item grid-item-${index} loading`}
                id={index}
                style={{
                  gridRowEnd: `span ${rowSpan}`,
                }}
              >
                <div className="author-info-mini">
                  <div className="author-name-container">
                    {video.userImageURL && (
                      <div className="image-container">
                        <img
                          className="author-image"
                          src={video.userImageURL}
                          alt={video.user}
                        />
                      </div>
                    )}

                    <a
                      href={`https://pixabay.com/users/${video.user}-${video.user_id}/`}
                      className="author-name"
                    >
                      {video.user}
                    </a>
                  </div>
                  <div className="photo-status">
                    Views: {formatViews(video.views)}
                  </div>
                </div>

                <img
                  loading={index <= 15 ? "eager" : "lazy"}
                  className="main-img"
                  src={video.videos.small.thumbnail}
                  alt={video.tags}
                  onLoad={() => handleImageLoad(index)}
                />

                <Icon
                  class={"fa-solid fa-video position-center icon play-icon"}
                />

                <div className="overlay">
                  <div className="author-info">
                    <div className="author-name-container">
                      {video.userImageURL && (
                        <div className="image-container">
                          <img
                            className="author-image"
                            src={video.userImageURL}
                            alt={video.user}
                          />
                        </div>
                      )}

                      <a
                        href={`https://pixabay.com/users/${video.user}-${video.user_id}/`}
                        className="author-name"
                      >
                        {video.user}
                      </a>
                    </div>
                    <div className="photo-status">
                      Views: {formatViews(video.views)}
                    </div>
                  </div>

                  <div className="photo-info">
                    <div className="photo-tags">
                      <p>{video.tags}</p>
                    </div>
                    <div
                      className="download-btn"
                      onClick={() => downloadImage(video.videos.small.url)}
                    >
                      <Icon class={"fa-solid fa-download"} />
                      Download
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}

export { VideoItem };
