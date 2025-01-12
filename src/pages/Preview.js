import { MainContent } from "../main";
import {
  InputContainer,
  DropDown,
  DropDownListItem,
  Icon,
} from "../components/general";
import { useState, useEffect } from "react";
// import "../styles/preview-page.css";

// function Preview() {
//   return (
//     <div className="preview-page">
//       {/* <div className="preview-container">
//         <div className="preview-header">
//           <div className="user-container">
//             <div className="user-avatar-container">
//               <img
//                 src="user-avatar.jpg"
//                 alt="User Avatar"
//                 className="user-avatar"
//               />
//             </div>
//             <div className="flex-column">
//               <p className="user-name">Username</p>
//               <div className="links">
//                 <a href="#follow" className="link">
//                   Follow
//                 </a>
//                 <span className="circle">•</span>
//                 <a href="#donate" className="link">
//                   Donate
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="icon-container">
//             <div className="btn btn-border btn-square btn-border-hover">
//               <Icon class="fa-regular fa-bookmark"></Icon>
//               Collect
//             </div>
//             <div className="btn btn-border btn-square btn-border-hover">
//               <Icon class="fa-regular fa-heart"></Icon>
//               Like 42
//             </div>
//             <div className="btn btn-border btn-square btn-border-hover">
//               <Icon class="fa-regular fa-share-from-square"></Icon>
//               Share
//             </div>

//             <div className="btn btn-square preview-download-btn">
//               <div className="text-section">Download</div>
//               <div className="display-flex text-section icon-section">
//                 <Icon class="fa-solid fa-angle-right" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="img-slider">
//           <button className="icon slider-button left">
//             <Icon class="fa-solid fa-chevron-left" />
//           </button>
//           <img />
//           <button className="icon slider-button right">
//             <Icon class="fa-solid fa-chevron-right" />
//           </button>
//         </div>
//         <div className="more-info">More Info Content Here</div>
//       </div> */}

//       <div className="preview-container">
//         <div className="preview-header">
//           <div className="icon-container">
//             <div className="btn btn-border btn-square btn-border-hover">
//               <Icon class="fa-regular fa-bookmark"></Icon>
//             </div>
//             <div className="btn btn-border btn-square btn-border-hover">
//               <Icon class="fa-regular fa-heart"></Icon>
//               Like 42
//             </div>

//             <div className="btn btn-square preview-download-btn">
//               <div className="text-section">Download</div>
//               <div className="display-flex text-section icon-section">
//                 <Icon class="fa-solid fa-angle-right" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="img-slider">
//           <button className="icon slider-button left">
//             <Icon class="fa-solid fa-chevron-left" />
//           </button>
//           <img />
//           <button className="icon slider-button right">
//             <Icon class="fa-solid fa-chevron-right" />
//           </button>
//         </div>
//         <div className="flex-row">
//           <div className="user-container">
//             <div className="user-avatar-container">
//               <img
//                 src="user-avatar.jpg"
//                 alt="User Avatar"
//                 className="user-avatar"
//               />
//             </div>
//             <p className="user-name">Username</p>
//           </div>
//           <button className="btn btn-border btn-square btn-white">
//             Follow
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function Preview() {
  const [isMobile, setIsMobile] = useState(false);
  const username = "Username";
  const avatar = "user-avatar.jpg";
  const likeCount = 42;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 435);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="preview-header">
          {isMobile ? (
            <>
              <IconContainer likeCount={likeCount} />
            </>
          ) : (
            <>
              <UserContainer username={username} avatar={avatar} />
              <IconContainer likeCount={likeCount} />
            </>
          )}
        </div>
        <ImgSlider />
        {isMobile && (
          <div className="flex-row">
            <UserContainer username={username} avatar={avatar} />
            <button className="btn btn-border btn-square btn-white">
              Follow
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { Preview };

function UserContainer({ username, avatar }) {
  return (
    <div className="user-container">
      <div className="user-avatar-container">
        <img src={avatar} alt="User Avatar" className="user-avatar" />
      </div>
      <p className="user-name">{username}</p>
    </div>
  );
}

function IconContainer({ likeCount }) {
  return (
    <div className="icon-container">
      <div className="btn btn-border btn-square btn-border-hover">
        <Icon class="fa-regular fa-bookmark"></Icon>
      </div>
      <div className="btn btn-border btn-square btn-border-hover">
        <Icon class="fa-regular fa-heart"></Icon> Like {likeCount}
      </div>
      <div className="btn btn-square preview-download-btn">
        <div className="text-section">Download</div>
        <div className="display-flex text-section icon-section">
          <Icon class="fa-solid fa-angle-right" />
        </div>
      </div>
    </div>
  );
}

function ImgSlider() {
  return (
    <div className="img-slider">
      <button className="icon slider-button left">
        <Icon class="fa-solid fa-chevron-left" />
      </button>
      <img />
      <button className="icon slider-button right">
        <Icon class="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}
