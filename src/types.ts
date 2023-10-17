// Add your own custom types in here
export type activeTab =
  | "unfavorite"
  | "favorite"
  | "all-dogs"
  | "create-dog-form";

export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};
