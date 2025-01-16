import { useState, useEffect, useContext } from "react";
import { Loading } from "./components/loading";
import DropdownSelect from "./components/select";
import ErrorComponent from "./components/ErrorPage";
import { PhotoItem } from "./components/PhotoItem";
import { VideoItem } from "./components/VideoItem";
import "./styles/main.css";
import "./styles/video-main.css";
import { MyContext } from "./App";

function MainContent(props) {
  const { query, handleSubmit } = useContext(MyContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!props.loading && props.items.length > 0) {
      setLoaded(true);
    }
  }, [props.loading, props.items]);

  return (
    <main>
      <section className="main-content-container">
        {!props.error && (
          <div className="title-container">
            <h2>Free Stock {props.type === "photo" ? "Photos" : "Videos"}</h2>
            <DropdownSelect
              query={query}
              handleSubmit={handleSubmit}
              options={[
                { value: "popular", text: "Trending" },
                { value: "latest", text: "New" },
              ]}
            />
          </div>
        )}

        {props.type === "photo" && loaded && (
          <PhotoItem photos={props.items} data={props.data} />
        )}
        {props.type === "video" && loaded && (
          <VideoItem videos={props.items} data={props.data} />
        )}
        {props.loading && <Loading />}

        {props.error && !props.loading && (
          <ErrorComponent
            html={props.children}
            image={props.image}
            message={
              props.message
                ? props.message
                : `Oops! That doesn’t seem right. Could you check your input and try again?`
            }
          />
        )}
      </section>
    </main>
  );
}

export { MainContent };
