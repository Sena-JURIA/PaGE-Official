export type Game = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  detail: {
    description: string; // HTMLを許容
    credits?: string;
    note?: string;
  };
};
