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
} 