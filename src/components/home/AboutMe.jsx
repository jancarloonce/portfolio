import React from "react";
import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));

  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  return (
    <div className="container py-5">
      <Jumbotron id="aboutme" className="m-0">
        <div className="row justify-content-center"> {/* Updated here */}
          <div className="col-12 col-md-5 d-flex align-items-center mb-4 mb-md-0">
            {showPic && (
              <img
                className="border border-secondary rounded-circle mx-auto"
                src={profilePicUrl}
                alt="profilepicture"
                style={{ maxWidth: "100%" }}
                width={imgSize}
                height={imgSize}
              />
            )}
          </div>
          <div className={`col-12 col-md-${showPic ? "7" : "12"}`}>
            <h2 className="display-4 mb-5 text-center">{heading}</h2>
            <p className="lead text-center">{message}</p>
            {resume && (
              <p className="lead text-center">
                <a
                  className="btn btn-outline-dark btn-lg"
                  href={resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="button"
                  aria-label="Resume/CV"
                >
                  Download CV
                </a>
              </p>
            )}
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default AboutMe;
