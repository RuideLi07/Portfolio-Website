export type PracticeImpactPair = {
  practice: string;
  impact: string;
};

export type TableRow = {
  category: {
    name: string;
    icon?: string;
    iconLight?: string;
  };
  items: PracticeImpactPair[];
  agencies?: string[];
};

export type PipelineStep = {
  num: string;
  title: string;
  desc: string;
  tech?: string;
  subSteps?: Array<{
    tag: string;
    name: string;
    detail: string;
  }>;
};

export type ContentBlock =
  | { type: "text"; content: string; isBold?: boolean; size?: "sm" | "base" | "lg" | "xl" }
  | { type: "image"; src: string; srcLight?: string; alt?: string; caption?: string; showCaptionInline?: boolean; transparent?: boolean; width?: number; }
  | { type: "image-row"; showCaptionInline?: boolean; images: Array<{src: string; srcLight?: string; alt?: string; caption?: string; transparent?: boolean; width?: number;}>; }
  | {
      type: "image-grid-featured";
      gridImages: Array<{ src: string; srcLight?: string; alt?: string }>;
      featuredImage: { src: string; srcLight?: string; alt?: string };
      caption?: string;
    }
  | { type: "table"; headers: string[]; rows: TableRow[] | string[][] }
  | { type: "pipeline-steps"; steps: PipelineStep[] }
  | {
      type: "video";
      src: string;
      caption?: string;
      autoplay?: boolean; // default: false (click-to-play). true = autoplay + muted (required by browsers)
      loop?: boolean; // default: false. true = video repeats after ending, independent of autoplay
      controls?: boolean; // default: true (shows play/pause/scrub bar). false = hide all native controls
    }
  | {
      type: "video-feature";
      title: string;
      text: string;
      video: string;
      poster?: string;
      reverse?: boolean; // default: video on the left, text on the right. true = swap (text left, video right)
    }
  | { type: "figma"; url: string; title?: string; height?: number; }
  | { type: "divider" };

export interface Project {
  id: string;
  title: string;
  type: "design" | "research";
  description: string;
  timeframe?: string;
  tags?: string[];
  blocks: ContentBlock[];
  sectionTitles?: string[]; // one title per segment, in order, split by "divider" blocks
  thumbnail?: string; // cover image for the project gallery grid. Falls back to the first "image" or "image-row" block if omitted
  thumbnailLight?: string; // optional light-mode variant of thumbnail
}

export const PROJECTS: Project[] = [
  // --- DESIGN PROJECTS ---
  {
    id: "project-1",
    title: "Newtrality",
    type: "design",
    description: "A coordinated digital platform encouraging sustainable operations for Detroit’s Eastern Market through centralized logistics and eco-friendly production practices.",
    timeframe: "September 2025 - December 2025",
    tags: ["Experience Design", "Urban Strategy", "UX Research", "Sustainability"],
    thumbnail: "/images/newtrality/EasternMarket.png",
    sectionTitles: [
      "Market Context & Research",
      "Routing Demo & Pipeline",
      "App Walkthrough",
      "Interactive Prototype",
    ],
    blocks: [
      {
        type: "video",
        src: "/images/newtrality/EasternMarketZoom.mp4",
        autoplay: true,
        controls: false
      },
      {
        type: "text",
        content: "Eastern Market is one of the oldest and most thriving parts of Detroit. Home to numerous active food businesses as well as a massive weekend farmers market, this district is also a short distance from downtown. It serves business owners, shoppers, tailgaters, residents, and more.",
        size: "base" 
      },
      {
        type: "text",
        content: "Eastern Market is one of the oldest and most thriving parts of Detroit. Home to numerous active food businesses as well as a massive weekend farmers market, this district is also a short distance from downtown. It serves business owners, shoppers, tailgaters, residents, and more.",
        size: "base" 
      },
      {
        type: "text",
        content: "With 136 vendors selling everything from street food and artisan goods to fresh produce and local flowers. Farms and florists make up the single largest group on the floor. To sell at the market, vendors pay recurring stall lease rates. Seasonal Saturday leases range from $1,775 for farmers to $3,600 for specialty vendors, along with daily stall fees throughout the season.",
        size: "base" 
      },
      {
        type: "image",
        src: "/images/newtrality/VendorCompositionDark.png",
        srcLight: "/images/newtrality/VendorCompositionBright.png",
        alt: "Vendor Composition at Eastern Market",
        caption: "Breakdown of Eastern Market vendors by categories",
        transparent: true, // <--- Removes container background & border
        width: 600,
      },
      {
        type: "image-row",
        showCaptionInline: true,
        images: [
          {
            src: "/images/newtrality/Vendor1.jpeg",
            alt: "Eastern Market Vendor 1",
            caption: "Eric, 3rd Generation Farmer, 57 years at Eastern Market",
          },
          {
            src: "/images/newtrality/Vendor2.jpeg",
            alt: "Eastern Market Vendor 2",
            caption: "Charity, Clothing Designer, 4 years at Eastern Market",
          },
        ],
      },
      {
        type: "text",
        content: "To support different vendors in adopting relevant sustainable practice. Newtrality outlines a category-specific framework that list out practical, high-impact sustainable operations to their concrete environmental benefits and certifying agencies.",
        size: "base" 
      },
      {
        type: "table",
        headers: ["Category", "Practices", "Impact", "Agency"],
        rows: [
          {
            category: { name: "Dining", icon: "/images/newtrality/DiningIconDark.png", iconLight: "/images/newtrality/DiningIconLight.png"},
            items: [
              {
                practice: "Produce based on previous sales; reduce overproduction and track leftovers",
                impact: "Avoids wasting the water, land, and emissions embedded in producing food"
              },
              {
                practice: "Donate safe unsold meals or ingredients to a food rescue organization",
                impact: "Keeps edible food in use rather than sending it to disposal and can displace production of additional food"
              },
              {
                practice: "Use a BPI-certified compostable fiber/sugarcane clamshell, bowl, or takeout box for customer orders",
                impact: "Reduces plastic waste; can be commercially composted with food scraps"
              },
              {
                practice: "Turn suitable surplus ingredient into another product, e.g. stale bread to croutons",
                impact: "Keeps food in the human food system and avoids wasting the resources used to produce it"
              }
            ],
            agencies: ["/images/newtrality/DiningLogo.png"]
          },
          {
            category: { name: "Art", icon: "/images/newtrality/ArtIconDark.png", iconLight: "/images/newtrality/ArtIconLight.png" },
            items: [
              {
                practice: "Use FSC-certified paper, wood panels, canvas, or wood frames for artwork",
                impact: "Supports responsible forest management and reduces risks associated with unsustainable timber and paper production"
              },
              {
                practice: "Use paint, inks, adhesives, and other art supplies carrying the ACMI AP Seal",
                impact: "Reduce potential exposure to harmful substances and ensure materials meet established safety requirements"
              }
            ],
            agencies: ["/images/newtrality/ArtLogo1.png", "/images/newtrality/ArtLogo2.png"]
          },
          {
            category: { name: "Produce", icon: "/images/newtrality/ProduceIconDark.png", iconLight: "/images/newtrality/ProduceIconLight.png" },
            items: [
              {
                practice: "Grow produce under USDA Certified Organic standards",
                impact: "Support soil health, biodiversity and reduced reliance of synthetic agricultural inputs"
              },
              {
                practice: "Use drip irrigation or micro-irrgation instead of overhead irrigation where appropriate",
                impact: "Delivers water directly to plant roots and can substantially reduce water loss from evaporation"
              },
              {
                practice: "Plant rye, clover, or other cover crops between production seasons",
                impact:"Increase organic matter, reduce soil erosion and nutrient runoff"
              }
            ],
            agencies: ["/images/newtrality/ProduceLogo1.png", "/images/newtrality/ProduceLogo2.png"]
          },
          {
            category: { name: "Flower", icon: "/images/newtrality/FlowerIconDark.png", iconLight: "/images/newtrality/FlowerIconLight.png" },
            items: [
              {
                practice: "Sell flowers grown under SCS Sustainably Grown / Veriflora standards",
                impact: "Cover soil and water protection, responsible agrochemical use, energy efficiency, climate impacts, waste biodiversity and ecosystem protection"
              },
              {
                practice: "Maintain flowering habitat, native plants, hedgerows, or other habitat around the growing area",
                impact: "Provides food and habitat for pollinators and beneficial insects"
              }
            ],
            agencies: ["/images/newtrality/FlowerLogo1.png", "/images/newtrality/FlowerLogo2.png"]
          },
          {
            category: { name: "Baked Good", icon: "/images/newtrality/BakedGoodIconDark.png", iconLight: "/images/newtrality/BakedGoodIconLight.png" },
            items: [
              {
                practice: "Use USDA Organic flour, eggs, dairy, sugar, or fruit ",
                impact: "Supports soil management, crop rotation, and biodiversity"
              },
              {
                practice: "Prioritize ingredients with credible sustainability standards, e.g. Rainforest Alliance-certified cocoa/coffee",
                impact: "Supports farming practices intended to protect forests amd farmer livelihoods"
              },
              {
                practice: "Replace to ENERGY STAR certified commercial ovens, refrigerator, freezers or other applicable equipment",
                impact:"Reduce electricity/natural gas consumption during energy intensive baking and refrigeration stages"
              },
              {
                practice: "Optimize oven loads, avoid unnecessary preheating/idle time, avoid repeatedly heating partially empty ovens",
                impact:"Reduces energy consumed per batch and the operational carbon footprint of baking"
              }
            ],
            agencies: ["/images/newtrality/BakedGoodsLogo1.png", "/images/newtrality/BakedGoodsLogo2.png", "/images/newtrality/BakedGoodsLogo3.png"]
          }
        ]
      },
      {
        type: "text",
        content: "As shown in the illustration, this is a current real-world scenario of a selected group of 20 vendors here at Eastern Market. The thickness of line represents the density of travel. The thicker the line is, the more deliveries pass the same route. As we can see, the density of delivery is quite high along some highways and arterial roads.",
        size: "base" 
      },
      {
        type: "text",
        content: "With the clustered centralized delivery method, the density of travel significantly decreases alongside major routes, which is calculated to actually save vehicular miles traveled and thus carbon footprint when certain amounts of trucks is used for a clustered delivery.",
        size: "base" 
      },
      {
        type: "image-row",
        showCaptionInline: true,
        images: [
          {
            src: "/images/newtrality/Transportation1.png",
            alt: "Transportation1",
            caption: "Vendors Individual Trips",
          },
          {
            src: "/images/newtrality/Transportation2.png",
            alt: "Transportation 2",
            caption: "Clustered Delivery Method",
          },
        ],
      },
      {
        type: "table",
        headers: ["Delivery Model", "Total Distance", "Diesel CO₂ Emissions", "EV CO₂ Emissions"],
        rows: [
          ["Individual Trips (Baseline)", "441.7 km", "242.9 kg", "66.3 kg"],
          ["Clustered Route (Newtrality)", "318.5 km", "175.2 kg", "47.8 kg"],
          ["Total Savings", "123.2 km (-28%)", "67.7 kg (-28%)", "18.5 kg (-28%)"],
        ],
      },
      {
      type: "divider",
      },
      {
        type: "text",
        content: "This video demo shows the interface EM admins would use for fleet routing, with the underlying codebase running locally to simulate live routing calculations. Suppose for this Saturday, they have 4 trucks available for delivery. They typed in 4 in the upper right corner and got a color-coded summary of the routing of each cluster and the distance and carbon dioxide equivalent they saved. They can also see the specific sequence en route they should input into their truck's navigation system and the time taken for each cluster.",
        size: "base" 
      },
      {
        type: "text",
        content: "But here comes an urgent issue: one of their trucks broke down apparently because of the cold weather out there. Don't worry, they just need to input the new amount of trucks needed, 4 in this case, to recalculate the clustering and routing in this scenario. After some wait, the program returns updated saved distance and carbon dioxide equivalent, and the distance and time for each truck for the new scenario.",
        size: "base" 
      },
      {
        type: "video",
        src: "/images/newtrality/TransportationDemo.mp4",
        caption: "Eastern Market Administration View Demo",
      },
      {
        type: "text",
        content: "On the back end, what it does can be briefly summarized into these steps below. Check out for the [full codebase](https://github.com/hardmoneysniper/Newtrality_Transportation_Module) for the solution.",
        size: "base" 
      },
      {
        type: "pipeline-steps",
        steps: [
          {
            num: "01",
            title: "Vendor Data Preparation",
            desc: "Begins with a spreadsheet of 20 sample vendor locations across the Metro Detroit region.",
          },
          {
            num: "02",
            title: "Geocoding",
            desc: "Addresses are converted to geographic coordinates (lat, lon). Queries a geocoding API for any stop lacking pre-existing coordinates.",
          },
          {
            num: "03",
            title: "Building the Road Network",
            desc: "Routes vehicles on a complete drivable road network sourced from OpenStreetMap using the osmnx library.",
          },
          {
            num: "04",
            title: "Calculating Individual Routing",
            desc: "Determines total distance and transit time required under the current system without consolidation.",
          },
          {
            num: "05",
            title: "Clustered Delivery Routing",
            desc: "Consolidates trips using a two-stage routing optimization pipeline:",
            subSteps: [
              {
                tag: "Technique 1",
                name: "Geographic Clustering",
                detail: "Groups vendor locations into clusters of nearby stops using k-means clustering on coordinates so one truck efficiently services proximate locations.",
              },
              {
                tag: "Technique 2",
                name: "Traveling Salesman Problem (TSP) per Cluster",
                detail: "Solves the classic Traveling Salesman Problem per cluster—originating from Eastern Market, visiting every vendor in the cluster once, and returning via the shortest route.",
              },
            ],
          },
        ],
      },
      {
      type: "divider",
      },
      {
        type: "text",
        content: "Newtrality is an app built to encourage farmers market vendors to adopt sustainable practices in their daily operations. It turns green choices into redeemable credits that vendors can trade in for practical perks like discounted stall fees or business support. The home screen gives vendors a clear view of their monthly progress, quick access to log new actions, and simple ways to join shared delivery program.",
        size: "base" 
        },
      {
        type: "image-row",
        showCaptionInline: true,
        images: [
          {
            src: "/images/newtrality/LandingPage1.png",
            alt: "Landing Page 1",
            width: 200,
          },
          {
            src: "/images/newtrality/LandingPage2.png",
            alt: "Landing Page 2",
            width: 200,
          },
          {
            src: "/images/newtrality/LandingPage3.png",
            alt: "Landing Page 3",
            width: 200,
          }
        ],
      },
      {
        type: "video-feature",
        title: "Interactive Onboarding Survey",
        text: "To eliminate friction in initial vendor onboarding, Newtrality introduces an interactive four-question micro-survey that establishes an operational baseline in under two minutes without requiring a complex audit. By gathering targeted data on business category, surplus management, packaging materials, and production scale, the platform's recommendation engine instantly outputs four tailored, high-impact sustainability practices.",
        video: "/images/newtrality/OnboardingSurvey.mp4",
        reverse: true,
      },
      {
        type: "video-feature",
        title: "Practice Verification",
        text: "Verifying a practice is done in just a few seconds on a phone. Vendors tap an action like donating surplus food or switching to compostable packaging, snap a quick photo or upload a receipt, and hit send. The app instantly updates the status so they always know when proof is approved and how many credits are heading their way, removing all the back-and-forth guessing about where a submission stands. Market managers review these submissions directly through an admin view to keep everything accountable, and once approved, credits release instantly into the vendor's balance.",
        video: "/images/newtrality/PracticeVerification.mp4",
      },
      {
        type: "video-feature",
        title: "Shared Delivery Scheduling",
        text: "Scheduling a clustered delivery takes just a few steps. Vendors enter their pickup location and preferred time window, then select cargo details like vendor category, crate counts, and whether refrigeration is required. Once submitted, the app automatically calculates the most efficient shared route and assigns a driver. Vendors get instant confirmation showing their stop order, environmental savings, and the credits earned by scheduling the shared run.",
        video: "/images/newtrality/TransportationSchedule.mp4",
        reverse: true,
      },
      {
        type: "text",
        content: "After earning credits, vendors can track and cash them in on the rewards tab. The dashboard breaks down credit history with an activity log and visual breakdown so vendors see exactly where their earnings come from. When ready to redeem, they can apply credits toward market perks like rent reductions, wellness grants, or branding photography sessions. Everything is bundled into a clear cart summary before confirmation to ensure total control over their balance.",
        size: "base"
      },
      {
        type: "image-row",
        showCaptionInline: false,
        images: [
          {
            src: "/images/newtrality/Reward1.png",
            alt: "Reward Page 1",
            caption: "Overview",
            width: 200
          },
          {
            src: "/images/newtrality/Reward2.png",
            alt: "Reward Page 2",
            caption: "Select and redeem rewards",
            width: 200
          },
        ],
      },
      {
      type: "divider",
      },
      {
        type: "text",
        content: "Interact with the final prototype here",
        size: "xl",
      },
      {
        type: "figma",
        url: "https://www.figma.com/proto/lFwIumg9lETBCJoau8iWAl/Portfolio?node-id=982-1461&t=Di0DXp0VNvvOK3AK-0&scaling=scale-down&content-scaling=fixed&page-id=588%3A374&starting-point-node-id=982%3A1461&show-proto-sidebar=1",
        height: 800, 
      }
    ],
  },
  {
    id: "project-2",
    title: "GrassHop",
    type: "design",
    description: "Grassroots community event discovery platform featuring dynamic distance filtering and 3D map navigation.",
    thumbnail: "/images/grasshop-1.jpg",
    blocks: [
      {
        type: "image",
        src: "/images/grasshop-1.jpg",
        alt: "GrassHop Showcase",
      },
      {
        type: "text",
        content:
          "GrassHop connects local neighborhood organizers and residents through real-time event mapping and micro-sponsorship logistics.",
      },
    ],
  },

  // --- RESEARCH PROJECTS ---
  {
    id: "project-3",
    title: "Māori Population Study",
    type: "research",
    description: "Spatial demographic analysis and custom map rendering exploring regional population trends.",
    thumbnail: "https://picsum.photos/id/1019/1000/600",
    blocks: [
      {
        type: "image",
        src: "https://picsum.photos/id/1019/1000/600",
        alt: "Māori Population Spatial Analysis",
      },
      {
        type: "text",
        content:
          "This study utilizes GIS spatial analysis and custom cartographic data visualizations to map population shifts across urban centers.",
      },
    ],
  },
  {
    id: "project-4",
    title: "Project 4 Title",
    type: "research",
    description: "Brief overview or summary caption describing Project 4.",
    thumbnail: "https://picsum.photos/id/1025/1000/600",
    blocks: [
      {
        type: "image",
        src: "https://picsum.photos/id/1025/1000/600",
        alt: "Project 4 Showcase Image",
      },
      {
        type: "text",
        content:
          "An exploration of socio-technical systems and human-centered design interventions.",
      },
    ],
  },
];
