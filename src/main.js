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
  const { query, handleSubmit, order } = useContext(MyContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!props.loading && props.items.length > 0) {
      setLoaded(true); // Data has successfully loaded
    }
  }, [props.loading, props.items]);

  return (
    <main>
      <section className="main-content-container">
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

        {props.type === "photo" && props.items.length !== 0 && loaded && <PhotoItem photos={props.items} />
        }
        {props.type === "video" && props.items.length !== 0 && loaded && <VideoItem videos={props.items} />}
        {props.loading && <Loading />}
        {!props.loading && props.items.length === 0 && !loaded && (
          <ErrorComponent
            message={`Oops! That doesn’t seem right. Could you check your input and try again?`}
          />
        )}
      </section>
    </main>
  );
}

export { MainContent };
