import { MainContent } from "../main";
import {
  InputContainer,
  DropDown,
  DropDownListItem,
  Icon,
} from "../components/general";
import "../styles/preview-page.css";

function Preview() {
  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="preview-header">
          <div className="user-container">
            <img
              src="user-avatar.jpg"
              alt="User Avatar"
              className="user-avatar"
            />
            <div className="flex-column">
              <p className="user-name">Username</p>
              <div className="links">
                <a href="#follow" className="link">
                  Follow
                </a>
                <span className="circle">•</span>
                <a href="#donate" className="link">
                  Donate
                </a>
              </div>
            </div>
          </div>

          <div className="icon-container">
            <div className="btn btn-border btn-square">
              <Icon class="fas fa-thumbs-up"></Icon>
            </div>
            <div className="btn btn-border btn-square">
              <Icon class="fa-regular fa-heart"></Icon>
              Like 42
            </div>
            <div className="btn btn-border btn-square">
              <Icon class="fa-regular fa-bookmark"></Icon>
              Collect
            </div>
            <div className="btn btn-border btn-square">
              <Icon class="fa-solid fa-solid-nodes"></Icon>
            </div>
          </div>
        </div>
        <div className="img-slider">Image Slider Content Here</div>
        <div className="more-info">More Info Content Here</div>
      </div>
    </div>
  );
}

export { Preview };
