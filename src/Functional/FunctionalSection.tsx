import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { activeTab } from "../types";

interface FunctionalSectionProps {
  children: ReactNode;
  activeTab: activeTab;
  setActiveTab: (value: activeTab) => void;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children,
  activeTab,
  setActiveTab,
  favoriteDogCount,
  unfavoriteDogCount,
}) => {
  const handleActiveTab = (value: activeTab) => {
    value === activeTab ? setActiveTab("all-dogs") : setActiveTab(value);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => {
              handleActiveTab("favorite");
            }}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorite" ? "active" : ""}`}
            onClick={() => {
              handleActiveTab("unfavorite");
            }}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              activeTab === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              handleActiveTab("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
