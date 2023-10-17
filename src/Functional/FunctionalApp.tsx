import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, activeTab } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogDataList, setAllDogDataList] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<activeTab>("all-dogs");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const dogs: Dog[] = await Requests.getAllDogs();
      setAllDogDataList(dogs);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTrashIconClick = async (dogId: number) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(dogId);
      fetchData();
    } catch (error) {
      console.error("Error deleting dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeartClick = async (dogId: number) => {
    await toggleFavorite(dogId, false);
  };

  const handleEmptyHeartClick = async (dogId: number) => {
    await toggleFavorite(dogId, true);
  };

  const toggleFavorite = async (dogId: number, isFavorite: boolean) => {
    setIsLoading(true);
    try {
      await Requests.updateDog(dogId, isFavorite);
      fetchData();
    } catch (error) {
      console.error("Error updating dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostDog = async (dog: Partial<Dog>): Promise<undefined> => {
    try {
      setIsLoading(true);
      await Requests.postDog(dog);
      await fetchData();
    } catch (error) {
      console.error("Error posting dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDogsForActiveTab = (dogs: Dog[], activeTab: activeTab): Dog[] => {
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

  const activeTabDataList = getDogsForActiveTab(allDogDataList, activeTab);
  const favoriteDogCount = allDogDataList.filter(
    (dog) => dog.isFavorite
  ).length;
  const unfavoriteDogCount = allDogDataList.filter(
    (dog) => !dog.isFavorite
  ).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteDogCount={favoriteDogCount}
        unfavoriteDogCount={unfavoriteDogCount}
      >
        {activeTab === "create-dog-form" ? (
          <FunctionalCreateDogForm
            handlePostDog={handlePostDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            handleTrashIconClick={handleTrashIconClick}
            handleHeartClick={handleHeartClick}
            handleEmptyHeartClick={handleEmptyHeartClick}
            isLoading={isLoading}
            getDogs={activeTabDataList}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
