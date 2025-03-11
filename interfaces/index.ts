type TSubmenu = {
  label: string;
  link: string;
  header_text?: string;
};
type TMenu = {
  label: string;
  link?: string;
  submenu?: TSubmenu[];
};

export type TSetting = {
  menu: TMenu[];
  contact_no: string;
  press_link: string;
  logo_type: "title" | "image";
  title: string;
  logo?: string;
  career_link: string;
  description: string;
  quick_links: { label: string; link: string }[];
  legal_links: { label: string; link: string }[];
  contact_details: string;
  main_title: string;
  main_logo?: string;
  motto?: string;
  socials: {
    icon: string;
    link: string;
  }[];
};

export type TSlider = {
  sliders_id: {
    id: string;
    image: string;
    text: string;
    position: string;
    button_text: string;
    button_link: string;
    button_position: "start" | "center" | "end";
  };
};

export type THeroSliderBlock = {
  id: number;
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
  id: number;
  collection: string;
  item: {
    id: string;
    recognitions: TRecognition[];
  };
};
export type TPartnerBlock = {
  id: number;
  collection: string;
  item: {
    id: string;
    partners: TPartner[];
  };
};

export type TLocationBlock = {
  id: number;
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
    google_map_link: string;
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
  id: number;
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
  id: number;
  collection: string;
  item: {
    id: string;
    title: string;
    subtitle: string;
  };
};

export type TServedNumbersBlock = {
  id: number;
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
  id: number;
  collection: string;
  item: {
    id: string;
    sectors: TSector[];
  };
};

export type TTestimonialBlock = {
  id: number;
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

    ratings: number;
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

export type TPress = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  links: {
    link: string;
  }[];
};

export type TProject = {
  blurDataURL: string | undefined;
  id: string;
  project_status: "on-going" | "completed" | "up-coming";
  tags: string[];
  body: string;
  image: string;
  slug: string;
  title: string;
  date_updated: string;
  date_created: string;
  foundation: {
    slug: string;
    name: string;
    logo: string;
  };
};

export type TBlog = {
  id: string;
  tags: string[];
  body: string;
  image: string;
  slug: string;
  title: string;
  date_updated: string;
  date_created: string;
  description: string;
  blurDataURL: string;
};

export type TCareer = {
  id: string;
  position: string;
  job_type: string;
  slug: string;
  deadline: string;
  vacancy: number;
  experience: string;
  date_updated: string;
  date_created: string;
  edu_qualification: string;
  gender: "male" | "female" | "both";
  working_days: string;
  office_hour: string;
  salary: string;
  benefits: string;
  location: string;
  body: string;
  company_name: string;
};

export type TBreadCrumbBlock = {
  id: number;
  collection: string;

  item: { id: number; page_name: string; section_name: string };
};

export type TReportBlock = {
  id: number;
  collection: string;

  item: { id: number; section_name: string; reports: TReport[] };
};

export type TAboutUsBlock = {
  id: number;
  collection: string;

  item: {
    id: number;
    image?: string;
    body: string;
    button_text?: string;
    button_link?: string;
    image_position: "left" | "right" | "none";
    button_position: "left" | "right" | "center";
    button: boolean;
  };
};

export type TTeamBlock = {
  id: number;
  collection: string;
  item: {
    id: number;
    team: TTeam[];
  };
};

export type TDonation = {
  id: string;
  title: string;
  image: string;
  date_created: string;
  date_updated: string;
  body: string;
};

export type TTeam = {
  team_id: {
    id: string;
    name: string;
    designation: string;
    image: string;
    quote: string;
    body: string;
    slug: string;
    socials: {
      link: string;
      icon: string;
    }[];
  };
};

export type TReport = {
  reports_id: {
    id: string;
    pdf: string;
    title: string;
    year: string;
  };
};

export type TProjectPageBlock = {
  id: number;
  collection: string;
  item: {
    id: string;
    title: "enabled" | "disabled";
    show_body: "enabled" | "disabled";
    foundation: {
      id: string;
      name: string;
      logo?: string;
      body?: string;
      slug: string;
    };
  };
};

export type TTimelineBlock = {
  id: number;
  collection: string;
  item: {
    id: number;
    milestones: TMilestone[];
  };
};

export type TMilestone = {
  step: string;
  story: string;
  year: string;
};

export type TProjectShowcaseBlock = {
  id: number;
  collection: string;
  item: {
    id: string;
    limit: number;
    projects: { projects_id: TProject }[];
  };
};

export type TService = {
  id: number;
  icon: string;
  title: string;
  description: string;
  slug: string;
  body: string;
  image: string;
};

export type TServiceBlock = {
  id: number;
  collection: string;
  item: {
    id: number;
    services: {
      services_id: TService;
    }[];
    info_text: string;
    button_link?: string;
    button_text?: string;
    button: "enabled" | "disabled";
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
  | TTestimonialBlock
  | TProjectPageBlock
  | TBreadCrumbBlock
  | TReportBlock
  | TAboutUsBlock
  | TTeamBlock
  | TTimelineBlock
  | TProjectShowcaseBlock
  | TServiceBlock;

export type TPageBlock = {
  date_created: any;
  last_updated: string;
  id: string;
  show_modal: "true" | "false";
  modal_image?: string;
  name: string;
  permalink: string;
  date_updated: string;
  blocks: TBlock[];
};
