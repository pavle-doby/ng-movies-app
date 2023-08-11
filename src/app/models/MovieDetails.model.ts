export interface MovieDetails {
  _id: string;
  id: string;
  ratingsSummary: {
    aggregateRating: number | null;
    voteCount: number;
    __typename: string;
  };
  episodes: any[] | null;
  primaryImage: {
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
  genres: {
    genres: {
      text: string;
      id: string;
      __typename: string;
    }[];
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
  runtime: {
    seconds: number;
    __typename: string;
  };
  series: string | null;
  meterRanking?: {
    currentRank: number;
    rankChange: {
      changeDirection: 'UP' | 'DOWN';
      difference: number;
      __typename: 'MeterRankChange';
    };
    __typename: 'TitleMeterRanking';
  };
  plot: {
    plotText: {
      plainText: string;
      __typename: string;
    };
    language: {
      id: string;
      __typename: string;
    };
    __typename: string;
  };
}
