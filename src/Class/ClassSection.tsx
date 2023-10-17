import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { activeTab } from "../types";

interface ClassSectionProps {
  children: ReactNode;
  activeTab: activeTab;
  setActiveTab: (value: activeTab) => void;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
}

export class ClassSection extends Component<ClassSectionProps> {
  handleActiveTab(value: activeTab) {
    const { activeTab, setActiveTab } = this.props;
    if (value === activeTab) {
      setActiveTab("all-dogs");
    } else {
      setActiveTab(value);
    }
  }

  render() {
    const { children, activeTab, favoriteDogCount, unfavoriteDogCount } =
      this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${activeTab === "favorite" ? "active" : ""}`}
              onClick={() => {
                this.handleActiveTab("favorite");
              }}
            >
              favorited ( {favoriteDogCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeTab === "unfavorite" ? "active" : ""
              }`}
              onClick={() => {
                this.handleActiveTab("unfavorite");
              }}
            >
              unfavorited ( {unfavoriteDogCount} )
            </div>
            <div
              className={`selector ${
                activeTab === "create-dog-form" ? "active" : ""
              }`}
              onClick={() => {
                this.handleActiveTab("create-dog-form");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
