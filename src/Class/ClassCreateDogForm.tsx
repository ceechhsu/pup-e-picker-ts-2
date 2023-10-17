import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormProps {
  handlePostDog: (dog: Partial<Dog>) => Promise<Dog | undefined>;
  isLoading: boolean;
}

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = {
    formData: {
      name: "",
      image: defaultSelectedImage,
      description: "",
      isFavorite: false,
    },
  };

  clearFormData = () => {
    this.setState({
      formData: {
        name: "",
        image: defaultSelectedImage,
        description: "",
        isFavorite: false,
      },
    });
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({
      formData: {
        ...this.state.formData,
        image: value,
      },
    });
  };

  handleOnSubmit = () => {
    this.props.handlePostDog(this.state.formData);
    this.clearFormData();
  };

  render() {
    const { isLoading } = this.props;
    const { name, description, image } = this.state.formData;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleOnSubmit();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="dog-description"
          value={description}
          cols={80}
          rows={10}
          onChange={this.handleInputChange}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="dog-type"
          onChange={this.handleSelectChange}
          value={image}
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
  }
}
