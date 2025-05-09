import { useNavigate, Link } from "react-router-dom";

import Comment from "../components/Comment";
import Toolbar from "../components/Toolbar";

import cameraBanner from "../assets/cameraBanner.jpg";

type HomePageProps = {
  currentSort: string;
  currentFilter: string;
  darkMode: boolean;
  loginToken: string;
  statusMessage: string;
  setStatusMessage: (msg: string) => void;
  setLoginToken: (token: string) => void;
  handleToggleDarkMode: () => void;
  handleSortChange: (sort: string) => void;
  handleFilterChange: (filter: string) => void;
  comments: Array<{ id: number; photoId: number; author: string; text: string; timestamp: string }>;
  onAddComment: (photoId: number, comment: { author: string; text: string }) => void;
  handleLogout: () => void;
};

export default function HomePage(props: HomePageProps) {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    props.handleLogout();
    navigate("/");
  };

  return (
    <div className={props.darkMode ? "dark" : "light"}>
      {/* Navbar */}
      <header>
        <nav className="navbar">
          <Toolbar
            setStatusMessage={props.setStatusMessage}
            setLoginToken={props.setLoginToken}
            statusMessage={props.statusMessage}
            handleToggleDarkMode={props.handleToggleDarkMode}
            handleSortChange={props.handleSortChange}
            handleFilterChange={props.handleFilterChange}
            currentSort={props.currentSort}
            currentFilter={props.currentFilter}
            loginToken={props.loginToken}
            handleLogout={handleLogoutAndRedirect}
          />
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${cameraBanner})` }}
      >
        <div className="hero-content">
          <h1>Welcome to ProCamShare</h1>
          <p>
            Discover, share, and manage your best photography moments.
            <br />
            Sort, filter, and upload your photos with ease!
          </p>
          <a href="#features" className="cta-button">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div
            className="feature"
            onClick={() => navigate("/upload")}
            style={{ cursor: "pointer" }}
          >
            <h3>📸 Upload Photos</h3>
            <p>Share your favorite shots with the community.</p>
          </div>
          <div
            className="feature"
            onClick={() => navigate("/gallery")}
            style={{ cursor: "pointer" }}
          >
            <h3>🔍 Manage Gallery</h3>
            <p>Edit, update, or delete your uploads.</p>
          </div>
          <Link to="/view-sort-photos" style={{ textDecoration: "none" }}>
            <div className="feature">
              <h3>View &amp; Sort Photos</h3>
              <p>Dynamic gallery with filters and sorting.</p>
            </div>
          </Link>
          <div className="feature">
            <h3>Device Library</h3>
            <p>Explore and link devices to your photos.</p>
          </div>
          <div className="feature">
            <h3>Comment Section</h3>
            <p>Discuss and share feedback on photos.</p>

            <Comment
              photoId={1}
              comments={props.comments.filter((c) => c.photoId === 1)}
              onAddComment={props.onAddComment}
            />
          </div>
          <div
            className="feature"
            onClick={() => navigate("/persona")}
            style={{ cursor: "pointer" }}
          >
            <h3>Persona User</h3>
            <p>Example of persona user.</p>
            <p>
              {" "}
              Profiles that may be interested in this type of web application.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
