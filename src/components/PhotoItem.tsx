import { Icon } from "./general";

function PhotoItem({ photos }) {

  const calculateSpan = (
    photoHeight: number,
    photoWidth: number,
    rowHeight = 10,
  ) => {
    const aspectRatio = photoHeight / photoWidth;
    return Math.ceil(aspectRatio * rowHeight);
  };

  const formatViews = (views: number) => {
    if (views > 1000000) return `${(views / 1000000).toFixed(2)}m`;
    if (views > 1000) return `${(views / 1000).toFixed(1)}k`;
    return views;
  };

  const downloadImage = async (url: RequestInfo | URL) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = crypto.randomUUID();
      link.click();
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  function handleImageLoad(index: any) {
    const gridItem = document.querySelector(`.grid-item-${index}`);
    gridItem.classList.remove("loading");
  }

  return (
    <div className="grid-container">
      {!photos ? (
        <div>No photos found</div>
      ) : (
        photos.map((photo, index) => {
          const rowSpan = calculateSpan(
            photo.webformatHeight,
            photo.webformatWidth,
          );
          return (
            <>
              <div
                key={photo.id}
                className={`grid-item grid-item-${index}`}
                id={index}
                style={{
                  gridRowEnd: `span ${rowSpan}`,
                  aspectRatio: `${photo.webformatWidth} / ${photo.webformatHeight}`,
                }}
              >
                <div className="author-info-mini">
                  <div className="author-name-container">
                    {photo.userImageURL && (
                      <div className="image-container">
                        <img
                          className="author-image"
                          src={photo.userImageURL}
                          alt={photo.user}
                        />
                      </div>
                    )}

                    <a
                      href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                      className="author-name"
                    >
                      {photo.user}
                    </a>
                  </div>
                  <div className="photo-status">
                    Views: {formatViews(photo.views)}
                  </div>
                </div>

                <img
                  loading={index <= 15 ? "eager" : "lazy"}
                  className="main-img"
                  src={photo.webformatURL}
                  alt={photo.tags}
                  onLoad={() => handleImageLoad(index)}
                />

                <div className="overlay">
                  <div className="author-info">
                    <div className="author-name-container">
                      {photo.userImageURL && (
                        <div className="image-container">
                          <img
                            className="author-image"
                            src={photo.userImageURL}
                            alt={photo.user}
                          />
                        </div>
                      )}

                      <a
                        href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                        className="author-name"
                      >
                        {photo.user}
                      </a>
                    </div>
                    <div className="photo-status">
                      Views: {formatViews(photo.views)}
                    </div>
                  </div>

                  <div className="photo-info">
                    <div className="photo-tags">
                      <p>{photo.tags}</p>
                    </div>
                    <div
                      className="download-btn"
                      onClick={() => downloadImage(photo.webformatURL)}
                    >
                      <Icon class={"fa-solid fa-download"} />
                      Download
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        },
        )
      )}
    </div>
  );
}

export { PhotoItem };
