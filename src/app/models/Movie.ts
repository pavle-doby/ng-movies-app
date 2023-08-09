export interface Movie {
  _id: string;
  id: string;
  primaryImage?: {
    id: string;
    width: number;
    height: number;
    url: string;
    caption: {
      plainText: string;
      __typename: string;
    };
    __typename: string;
  };
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
  titleText: {
    text: string;
    __typename: string;
  };
  originalTitleText: {
    text: string;
    __typename: string;
  };
  releaseYear: {
    endYear: number;
    year: number;
  };
  releaseDate: {
    day: number;
    month: number;
    year: number;
  };
}
