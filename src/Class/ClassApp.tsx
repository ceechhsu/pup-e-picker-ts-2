import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, activeTab } from "../types";
import { Requests } from "../api";

export class ClassApp extends Component {
  state = {
    allDogDataList: [] as Dog[],
    isLoading: false,
    activeTab: "all-dogs" as activeTab,
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const dogs: Dog[] = await Requests.getAllDogs();
      this.setState({ allDogDataList: dogs });
    } catch (error) {
      console.log("Error fetching dogs:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  handleTrashIconClick = async (dogId: number) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(dogId);
      this.fetchData();
    } catch (error) {
      console.error("Error deleting dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleHeartClick = async (dogId: number) => {
    await this.toggleFavorite(dogId, false);
  };

  handleEmptyHeartClick = async (dogId: number) => {
    await this.toggleFavorite(dogId, true);
  };

  toggleFavorite = async (dogId: number, isFavorite: boolean) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog(dogId, isFavorite);
      this.fetchData();
    } catch (error) {
      console.error("Error updating dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePostDog = async (dog: Partial<Dog>): Promise<undefined> => {
    try {
      this.setState({ isLoading: true });
      await Requests.postDog(dog);
      await this.fetchData();
    } catch (error) {
      console.error("Error posting dog:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getDogsForActiveTab = (dogs: Dog[], activeTab: activeTab): Dog[] => {
    switch (activeTab) {
      case "all-dogs":
        return dogs;
      case "favorite":
        return dogs.filter((dog) => dog.isFavorite);
      case "unfavorite":
        return dogs.filter((dog) => !dog.isFavorite);
      case "create-dog-form":
        return dogs;
      default:
        throw new Error(`Invalid activeTab value: ${activeTab}`);
    }
  };

  render() {
    const { allDogDataList, activeTab, isLoading } = this.state;
    const activeTabDataList = this.getDogsForActiveTab(
      allDogDataList,
      activeTab
    );
    const favoriteDogCount = allDogDataList.filter(
      (dog) => dog.isFavorite
    ).length;
    const unfavoriteDogCount = allDogDataList.filter(
      (dog) => !dog.isFavorite
    ).length;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={(activeTab: activeTab) => this.setState({ activeTab })}
          favoriteDogCount={favoriteDogCount}
          unfavoriteDogCount={unfavoriteDogCount}
        >
          {activeTab === "create-dog-form" ? (
            <ClassCreateDogForm
              handlePostDog={this.handlePostDog}
              isLoading={isLoading}
            />
          ) : (
            <ClassDogs
              handleTrashIconClick={this.handleTrashIconClick}
              handleHeartClick={this.handleHeartClick}
              handleEmptyHeartClick={this.handleEmptyHeartClick}
              isLoading={isLoading}
              getDogs={activeTabDataList}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
