import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

interface ClassDogsProps {
  handleTrashIconClick: (dogId: number) => Promise<void>;
  handleHeartClick: (dogId: number) => Promise<void>;
  handleEmptyHeartClick: (dogId: number) => Promise<void>;
  isLoading: boolean;
  getDogs: Dog[];
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const {
      handleTrashIconClick,
      handleHeartClick,
      handleEmptyHeartClick,
      isLoading,
      getDogs,
    } = this.props;

    return (
      <>
        {getDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => handleTrashIconClick(dog.id)}
            onHeartClick={() => handleHeartClick(dog.id)}
            onEmptyHeartClick={() => handleEmptyHeartClick(dog.id)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
