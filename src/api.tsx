import toast from "react-hot-toast";
import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    const requestOptions = {
      method: "GET",
    };

    return fetch("http://localhost:3000/dogs", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result

  postDog: (partialDog: Partial<Dog>) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialDog),
    };

    return fetch(`${baseUrl}/dogs`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Dog Created");
        return result;
      })
      .catch((error) => {
        console.error("Error creating dog:", error);
        throw error; // You can handle the error further up the call stack if needed
      });
  },

  // should delete a dog from the database
  deleteDog: (dogId: number) => {
    const requestOptions = {
      method: "DELETE",
    };

    return fetch(`${baseUrl}/dogs/${dogId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          // Handle errors if the response status is not OK (e.g., 404)
          throw new Error(`Failed to delete dog with ID ${dogId}`);
        }
        return response.json();
      })
      .then((result) => result)
      .catch((error) => {
        console.error("Error deleting dog:", error);
        throw error; // You can handle the error further up the call stack if needed
      });
  },

  updateDog: (dogId: number, isFavorite: boolean): Promise<Dog> => {
    if (typeof dogId !== "number" || typeof isFavorite !== "boolean") {
      throw new Error(
        "Invalid input types. dogId should be a number, and isFavorite should be a boolean."
      );
    }

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite }), // Send the updated isFavorite value
    };

    return fetch(`${baseUrl}/dogs/${dogId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedDog: Dog) => updatedDog)
      .catch((error) => {
        console.error("Error updating dog:", error);
        throw error; // You can handle the error further up the call stack if needed
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
