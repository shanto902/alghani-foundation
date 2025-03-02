type TSubmenu = {
  label: string;
  link: string;
};
type TMenu = {
  label: string;
  link?: string;
  submenu?: TSubmenu[];
};

export type TSetting = {
  menu: TMenu[];
  contact_no: string;
  press_link: "#";
  careers_link: "#";
  description: string;
  quick_links: { label: string; link: string }[];
  legal_links: { label: string; link: string }[];
  contact_details: string;
};

export type TSlider = {
  slides_id: {
    id: string;
    image: string;
    title: string;
    description: string;
    total_funds: number;
    earned_funds: number;
    type: "urgent" | "normal";
  };
};

export type THeroSliderBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    sliders: TSlider[];
  };
};

export type TRecognition = {
  recognition_id: {
    id: number;
    image: string;
    title: string;
    description: string;
  };
};

export type TRecognitionBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    recognitions: TRecognition[];
  };
};
export type TPartnerBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    partners: TPartner[];
  };
};

export type TLocationBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    locations: TLocation[];
    map_center: {
      coordinates: [number, number];
    };
  };
};

export type TLocation = {
  locations_id: {
    id: number;
    image: string;
    subtitle: string;
    title: string;
    description: string;
    location: {
      coordinates: [number, number];
    };
  };
};

export type TPartner = {
  partner_id: {
    id: number;
    logo: string;
    name: string;
    link: string;
  };
};

export type TSponsorProgramBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    image: string;
    headline: string;
    description: string;
    button_text: string;
    button_link: string;
  };
};

export type THeaderBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    title: string;
    subtitle: string;
  };
};

export type TServedNumbersBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    numbers: {
      year: string;
      value: number;
    }[];
  };
};

export type TDevelopmentBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    sectors: TSector[];
  };
};

export type TTestimonialBlock = {
  id: string;
  collection: string;
  item: {
    id: string;
    testimonials: TTestimonial[];
  };
};

export type TTestimonial = {
  testimonial_id: {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string;
  };
};

export type TSector = {
  sector_id: {
    id: number;
    color: string;
    icon: string;
    label: string;
    value: number;
  };
};

export type TBlock =
  | THeroSliderBlock
  | TSponsorProgramBlock
  | THeaderBlock
  | TServedNumbersBlock
  | TRecognitionBlock
  | TPartnerBlock
  | TLocationBlock
  | TDevelopmentBlock
  | TTestimonialBlock;

export type TPageBlock = {
  last_updated: string;
  id: string;
  name: string;
  permalink: string;
  blocks: TBlock[];
};
