import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  handlePostDog: (dog: Partial<Dog>) => Promise<Dog | undefined>;
  isLoading: boolean;
}

export const FunctionalCreateDogForm: React.FC<
  FunctionalCreateDogFormProps
> = ({ handlePostDog, isLoading }) => {
  const [formData, setFormData] = useState<Partial<Dog>>({
    name: "",
    image: defaultSelectedImage,
    description: "",
    isFavorite: false,
  });

  const clearFormData = () => {
    setFormData({
      name: "",
      image: defaultSelectedImage,
      description: "",
      isFavorite: false,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      image: value, // Update the image property with the selected value
    });
  };

  const handleOnSubmit = () => {
    handlePostDog(formData);
    clearFormData();
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="dog-description"
        value={formData.description}
        cols={80}
        rows={10}
        onChange={handleInputChange}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="dog-type"
        onChange={handleSelectChange}
        value={formData.image}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
