import type { Project } from "./types";

export const DESIGN_PROJECTS: Project[] = [
  // --- DESIGN PROJECTS ---
  {
    id: "project-1",
    title: "Newtrality",
    type: "design",
    description: "A coordinated digital platform encouraging sustainable operations for Detroit’s Eastern Market through centralized logistics and eco-friendly production practices.",
    timeframe: "August 2025 - December 2025",
    tags: ["Experience Design", "Urban Strategy", "UX Research", "Sustainability"],
    thumbnail: "/images/newtrality/EasternMarket.png",
    sectionTitles: [
      "Introduction",
      "Context & Motivation",
      "Production Practice",
      "Transportation",
      "Reward System",
      "Live Prototype",
    ],
    blocks: [
      {
        type: "heading",
        content: "Introduction",
      },
      {
        type: "image-feature",
        text: "Newtrality is an app built to encourage farmers market vendors to adopt sustainable production and transportation practices in their daily operations. It turns green choices into redeemable credits that vendors can trade in for practical perks like discounted stall fees or business support.",
        showPrototypeButton: true,
        images: [
          { src: "/images/newtrality/LandingPage1.png", alt: "Newtrality welcome screen" },
          { src: "/images/newtrality/LandingPage3.png", alt: "Newtrality home dashboard" },
        ],
      },
      {
      type: "divider",
      },
      {
        type: "heading",
        content: "Site Context",
      },
      {
        type: "video-text",
        src: "/images/newtrality/EasternMarketZoom.mp4",
        loopDelayMs: 6000,
        text: "Eastern Market is one of the oldest and most thriving parts of Detroit. Home to numerous active food businesses as well as a massive weekend farmers market, this district is also a short distance from downtown. It serves business owners, shoppers, tailgaters, residents, and more.",
      },
      {
        type: "vendor-chart",
        description: "With 136 vendors selling everything from street food and artisan goods to fresh produce and local flowers. Farms and florists make up the single largest group on the floor. To sell at the market, vendors pay recurring stall lease rates. Seasonal Saturday leases range from $1,775 for farmers to $3,600 for specialty vendors, along with daily stall fees throughout the season.",
      },
      {
        type:"heading",
        content:"Motivation"
      },
      {
        type: "interview-insights",
        src: "/images/newtrality/EasternMarketCEO.jpeg",
        alt: "Eastern Market CEO at the market",
        caption: "Katy Trudeau, CEO of the Eastern Market Development Corporation",
        insights: [
          "Operations are too decentralized.",
          "Vendor deliveries are difficult to coordinate during busy market hours.",
          "Desire for Eastern Market's'operations to be more sustainable.",
        ],
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
      type: "divider",
      },
      {
        type: "heading",
        content: "Sustainable Production Practice Research",
        sidebarTitle: "Research",
      },
      {
        type: "text",
        content: "To support different vendors in adopting relevant sustainable practice. Newtrality outlines a category-specific framework that list out practical, high-impact sustainable operations to their concrete environmental benefits and certifying agencies.",
        size: "base" 
      },
      {
        type: "table",
        headers: ["Category", "Practices", "Impact", "Agency"],
        autoCycleMs: 6000,
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
        type:"heading",
        content:"Vendor App Features",
        sidebarTitle: "App Feature",
      },
      {
        type: "video-feature",
        title: "Simple Questionnaire",
        text: "Newtrality uses a quick multiple choice questionnaire to understand each vendor’s operation and sustainability needs. The questions adapt depending on their responses, keeping the process short and relevant.\n\nBased on the answers, the platform recommends sustainability practices that are the best fit for that vendor to adopt. Vendors can then select and add the practices they wish to adopt.",
        video: "/images/newtrality/OnboardingSurvey.mp4",
        reverse: true,
      },
      {
        type: "video-feature",
        title: "Practice Verification",
        text: "After adopting a sustainability practice, vendors can quickly submit proof by snapping a photo or uploading a receipt. The submission is then sent to the market manager for review.\n\nVendors can track the status of each submission directly in the app, and once it is approved, the corresponding credits are added to their balance.",
        video: "/images/newtrality/PracticeVerification.mp4",
      },
      { type: "divider" },
      { type: "heading", content: "Shared Delivery Research", sidebarTitle: "Research" },
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
        type: "delivery-comparison",
        images: [
          {
            src: "/images/newtrality/Transportation1.png",
            alt: "Individual vendor delivery routes around Detroit",
            caption: "Individual Trips",
          },
          {
            src: "/images/newtrality/Transportation2.png",
            alt: "Shared delivery routes around Detroit",
            caption: "Shared Delivery",
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
        type:"heading",
        content:"Vendor App Features",
        sidebarTitle: "App Feature",
      },
      {
        type: "video-feature",
        title: "Shared Delivery Scheduling",
        text: "Scheduling a shared delivery takes just a few steps. Vendors enter their pickup location, preferred time window, and cargo details such as vendor category, crate count, and refrigeration needs.\n\nThe market administration then collects the submitted requests and calculates an efficient shared delivery route across participating vendors. Once the route is finalized, vendors receive a confirmation showing their scheduled pickup, stop order, environmental savings, and credits earned from joining the shared run.",
        video: "/images/newtrality/TransportationSchedule.mp4",
        reverse: true,
      },
      {
        type:"heading",
        content:"How does Market Administration Plan the route?",
        sidebarTitle: "Admin Demo",
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
        type: "video-feature",
        title: "Reward System",
        text: "After earning credits, vendors can track and cash them in on the rewards tab. The dashboard breaks down credit history with an activity log and visual breakdown so vendors see exactly where their earnings come from. When ready to redeem, they can apply credits toward market perks like rent reductions, wellness grants, or branding photography sessions. Everything is bundled into a clear cart summary before confirmation to ensure total control over their balance.",
        video: "/images/newtrality/RewardRedemption.mp4",
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
    timeframe: "November 2024 - January 2025",
    tags: ["Experience Design", "UX Research", "Community Building", "Sustainability"],
    thumbnail: "/images/grasshop/GrassHopLanding.png",
    sectionTitles: ["Introduction", "Motivation", "Competitive Analysis", "User Research", "App Features", "Live Prototype"],
    blocks: [
      {
        type: "heading",
        content: "Introduction",
      },
      {
        type: "image-feature",
        text:
          "GrassHop connects local neighborhood organizers and residents through real-time event mapping and micro-sponsorship logistics.",
        showPrototypeButton: true,
        images: [
          { src: "/images/grasshop/Landing1.png", alt: "GrassHop landing screen 1" },
          { src: "/images/grasshop/Landing2.png", alt: "GrassHop landing screen 2" },
        ],
      },
      { type: "divider" },
      { type: "heading", content: "Motivation"},
      {
        type: "text",
        size: "base",
        content: "Neighborhood level community events such as pickup games, group runs, swaps, cleanups, and small gatherings are often hard to discover unless you already know the right people or follow the right local accounts. GrassHop focuses on two primary goals:",
        orderedItems: [
          "Let people explore nearby grassroot events based on their desired travel time and mode of transportation.",
          "Give local organizers intuitive tools to share locations, instructions, and resource needs.",
        ],
      },
      { type: "divider" },
      { type: "heading", content: "Existing Event Discovery Platforms", sidebarTitle: "Competitors" },
      {
        type: "competitor-table",
        headers: ["Primary Discovery Model", "Primary User Behavior", "Key Features"],
        logos: {
          Eventbrite: "/images/grasshop/AppLogo/EventBrite.png",
          Meetup: "/images/grasshop/AppLogo/Meetup.png",
          Luma: "/images/grasshop/AppLogo/Luma.png",
          Partiful: "/images/grasshop/AppLogo/Partiful.png",
          Facebook: "/images/grasshop/AppLogo/Facebook.png",
          Instagram: "/images/grasshop/AppLogo/Instagram.png",
        },
        rows: [
          ["Eventbrite","Search-led event marketplace. People browse by destination, date, and category, narrowing a broad catalog to events that match a planned outing.","Search for an activity, compare listings, review timing and ticket options, then register. Following organizers and saving events supports return visits and future planning.","Structured event pages, ticket purchasing, saved events, and organizer following connect discovery with booking. Its strength is helping users evaluate an event and commit to attending."],
          ["Meetup","Interest-led community discovery. Events are connected to groups built around shared hobbies, activities, or identities, making the community a central entry point.","Find a relevant group or event, RSVP, and get to know people through repeated participation. The journey encourages an ongoing relationship with a community beyond a single gathering.","Group profiles, event listings, RSVPs, and location-based recommendations support recurring participation. A strong reference for building community continuity around shared interests."],
          ["Luma","Calendar-led discovery with city and category browsing. Following curated calendars creates a stream of upcoming events from communities and hosts that users choose.","Explore events, follow relevant calendars, and register for gatherings. Calendar subscriptions and personal calendar syncing help people keep track of future plans.","Public event calendars, registration pages, personalized discovery, and calendar syncing connect event promotion with planning. Its strength is maintaining a relationship between hosts and their audiences."],
          ["Partiful","Invitation-led social discovery. Shared event links and friends’ attendance create entry points, while Explore also surfaces local events and new communities.","Open an invitation, review the gathering, RSVP, and coordinate with the host. Seeing friends’ plans can help people decide which events they want to join.","Customizable invitations, RSVP tracking, guest questionnaires, and text updates simplify informal hosting. Social context and lightweight coordination are useful references for neighborhood gatherings."],
          ["Facebook","Social-network and group-led discovery. Events circulate through community groups, pages, and personal connections, alongside recommendations for nearby activities.","Encounter an event through a group or shared post, review the details, and discuss plans with others. Existing community relationships can give a gathering context before someone attends.","Group events and public or private event visibility support different community needs. Its strength is distributing event information through established networks; discovery is part of a broader social experience."],
          ["Instagram","Visual and social discovery. Organizers introduce events through posts, Reels, and Stories; reposts and location-tagged content create additional paths to local activities.","Notice an event while browsing, share it with friends, and look for details from the organizer. This journey often begins with the appeal of the content rather than an explicit event search.","Visual promotion, reposts, messaging, and location-tagged content help events spread socially. Instagram Map also supports place-based content discovery, offering a useful reference for connecting local activity with location."],
        ],
      },
      { type: "heading", content: "Limitations of current Event Discovery Platform", sidebarTitle: "Limitations" },
      {
        type: "image-feature",
        title: "Lack of Spatial Discovery",
        highlightTitle: true,
        text: "Traditional list views force you to scroll through events one by one instead of showing what’s actually happening around you. When you turn a real neighborhood into a flat vertical feed, you lose all sense of place. It becomes almost impossible to see what is down the street, spot busy local hubs, or stumble upon small community events happening right around the corner.",
        src: "/images/grasshop/Limitation1.png",
        alt: "Lack of spatial discovery: a scrolling Eventbrite feed presents events one by one without showing their neighborhood context, making nearby events and local hubs harder to discover.",
        caption: "Eventbrite Discover Page",
      },
      { type: "annotated-limitations" },
      {
        type: "image-feature-pair",
        title: "Outdated Radius Filtering",
        text: "Standard distance filters rely on a simple circle, treating space as if cities are flat and frictionless. In reality, travel is shaped by transit lines, rivers, and highway barriers. By prioritizing straight-line miles over actual travel time, these filters create artificial blind spots—hiding highly accessible events just outside an arbitrary circle while recommending closer venues that are far harder to reach.",
        images: [
          { src: "/images/grasshop/Limitation3(1).png", alt: "Meetup filter screen with an enlarged Distance slider set to 5 miles.", caption: "Meetup Filter Page" },
          { src: "/images/grasshop/Limitation3(2).png", alt: "Meetup map view showing nearby events across New York neighborhoods.", caption: "Meetup Map View" },
        ],
      },
      { type: "divider" },
      { type: "heading", content: "User Research"},
      { type: "divider" },
      { type: "heading", content: "Key Features of GrassHop"},
      {
        type: "video-feature",
        title: "Dynamic Locality Filtering",
        text: "Most apps use a fixed radius to show what is “nearby.” GrassHop instead lets users choose how much time they have and their mode of transportation then shows events they can realistically reach within that window.",
        video: "/images/grasshop/DynamicLocality.mp4",
        reverse: true,
      },
      {
        type: "video-feature",
        title: "Precise Location",
        demos: [
          { src: "/images/grasshop/PinpointLocationOrganizer.mp4", label: "Organizer", text: "Alongside entering a traditional street address, organizers can choose to drop a pin directly on the map to mark the exact meeting spot. They can also add custom arrival instructions so attendees know exactly where to go."},
          { src: "/images/grasshop/PinpointLocationAttendee.mp4", label: "Attendee", text: "On the event page, attendees and explorers can easily see both the exact location pin and the arrival message before heading there." },
        ],
      },
      {
        type: "video-feature",
        title: "Logistic Request",
        reverse: true,
        demos: [
          { src: "/images/grasshop/LogisticRequestOrganizer.mp4", label: "Organizer", text: "When creating an event, organizers can add a simple list of supplies or support they need, such as water, speakers, equipment, or first-aid kits. This makes it easier to share the work of putting an grassroot event together instead of leaving everything to one person."},
          { src: "/images/grasshop/LogisticRequestAttendee.mp4", label: "Attendee", text:"Attendees can see what is still needed on the event page and volunteer to bring an item. Once someone claims a request, it is marked accordingly, helping the group coordinate before the event and avoid duplicate contributions." },
        ],
      },
      { type: "divider" },
      { type: "heading", content: "Interact with the final prototype here"}
    ],
  },
];
