export interface Home {
  _type: 'home';
  _id: string;
  headline?: string;
  subHeadline?: string;
  content?: any[];
  image?: {
    asset: {
      _ref: string;
      altText?: string;
    };
  };
  heading?: string;
} 

// Define WorkType for proper typing of works data
export type WorkType = {
  _id: string;
  heading: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  year?: string;
  stacks?: string[];
  links?: {
    title: string;
    url: string;
  }[];
  details?: string;
};