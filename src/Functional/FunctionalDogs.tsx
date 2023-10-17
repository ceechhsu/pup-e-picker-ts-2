import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

interface FunctionalDogsProps {
  handleTrashIconClick: (dogId: number) => Promise<void>;
  handleHeartClick: (dogId: number) => Promise<void>;
  handleEmptyHeartClick: (dogId: number) => Promise<void>;
  isLoading: boolean;
  getDogs: Dog[];
}

export const FunctionalDogs: React.FC<FunctionalDogsProps> = ({
  handleTrashIconClick,
  handleHeartClick,
  handleEmptyHeartClick,
  isLoading,
  getDogs,
}: FunctionalDogsProps) => (
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
