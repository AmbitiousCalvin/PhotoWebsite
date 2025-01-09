import { SetStateAction, useEffect, useState } from "react";
import { InputContainer, DropDown, DropDownListItem, Icon } from "./general";
import React, { useContext } from "react";
import { Loading } from "./loading";
import DropdownSelect from "./select";
import "./styles/main.css";

function Grid(props: any) {
  const photos = props.photos;

  const calculateSpan = (
    photoHeight: number,
    photoWidth: number,
    rowHeight = 10
  ) => {
    const aspectRatio = photoHeight / photoWidth;
    return Math.ceil(aspectRatio * rowHeight);
  };

  const formatViews = (views: number) => {
    if (views > 1000000) return `${(views / 1000000).toFixed(2)}m`;
    return `${(views / 1000).toFixed(1)}k`;
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

  return (
    <div className="grid-container">
      {!photos ? (
        <div>No photos found</div>
      ) : (
        photos.map(
          (
            photo: {
              webformatHeight: number;
              webformatWidth: number;
              webformatURL: RequestInfo | URL | undefined;
              tags:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              userImageURL: string | undefined;
              user:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              user_id: any;
              views: number;
            },
            index: React.Key | null | undefined
          ) => {
            const rowSpan = calculateSpan(
              photo.webformatHeight,
              photo.webformatWidth
            );
            return (
              <div
                key={index}
                className="grid-item"
                id={index}
                style={{
                  gridRowEnd: `span ${rowSpan}`,
                  height: `${photo.webImageHeight}px`,
                }}
              >
                <img
                  className="main-img"
                  src={photo.webformatURL}
                  alt={photo.tags}
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
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
}

function MainContent(props: any) {
  return (
    <main>
      <section className="main-content-container">
        <div className="title-container">
          <h2>Free Stock Photos</h2>
          <DropdownSelect
            query={props.query}
            handleSubmit={props.handleSubmit}
            options={[
              { value: "trending", text: "Trending" },
              { value: "new", text: "New" },
            ]}
          />
        </div>
        <Grid photos={props.photos} />
        {props.loading && <Loading />}
      </section>
    </main>
  );
}

export { MainContent };
