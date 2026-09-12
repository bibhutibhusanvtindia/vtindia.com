// GENERATED from the live vtindia.com source. Do not hand-edit names, links or
// images without re-checking against the old site — see docs/CLIENT_INVENTORY.md.
//
// linkStatus values:
//   "ok"          - destination verified reachable
//   "unavailable" - URL published by VT India but confirmed unreachable after 3
//                   attempts; the URL is preserved here, the click is disabled
//   "none"        - the old site published no URL (href="#") for this client

export type LinkStatus = "ok" | "unavailable" | "none";

export type PortfolioItem = {
  name: string;
  location?: string;
  image: string;
  link: string | null;
};

/**
 * The 6 projects featured in the old homepage "Our Work Portfolio" grid.
 * No category is recorded: the old site's filter buttons are non-functional and
 * its markup carries no category tag per item, so any classification would be
 * inferred rather than sourced. `location` is taken from the old .item-category
 * span, which holds a city name.
 */
export const portfolio: PortfolioItem[] = [
  { name: "Salipur Autonomous College", location: "Salipur", image: "/images/portfolio/portfolio25.jpg", link: "https://salipurcollege.ac.in/" },
  { name: "ATLC", location: "Bhubaneswar", image: "/images/portfolio/ATLC.png", link: "https://atlcodisha.in/" },
  { name: "U.B.S.S", location: "Bhubaneswar", image: "/images/portfolio/portfolio13.jpg", link: "https://ubssseva.org/" },
  { name: "All Odisha Tax Advocates Association", location: "Cuttack", image: "/images/portfolio/portfolio16.jpg", link: "https://odishataxadvocates.in/" },
  { name: "Aarti steels limited", location: "Athagarh", image: "/images/portfolio/portfolio3.jpg", link: null },
  { name: "Baliyatra", location: "Cuttack", image: "/images/portfolio/4.jpg", link: null },
];

export type ClientEntry = {
  name: string;
  location?: string;
  category: string;
  image: string | null;
  link: string | null;
  linkStatus: LinkStatus;
};

/** All 84 clients recovered from every category tab of the old /home/clients page. */
export const clients: ClientEntry[] = [
  { name: "SALIPUR AUTONOMOUS COLLEGE", location: "Salipur", category: "Educational", image: "/images/clients/portfolio25.jpg", link: "https://salipurcollege.ac.in/", linkStatus: "ok" },
  { name: "SARANKUL COLLEGE", location: "Nayaagarh", category: "Educational", image: "/images/clients/portfolio27.jpg", link: "https://sarankulcollege.org/", linkStatus: "ok" },
  { name: "LNP SCHOOL", location: "Sahara", category: "Educational", image: "/images/clients/portfolio30.jpg", link: "https://lnpschool.org/", linkStatus: "unavailable" },
  { name: "NALANDA PUBLIC SCHOOL", location: "Cuttack", category: "Educational", image: "/images/clients/portfolio31.jpg", link: "https://nalandapublicschool.in/", linkStatus: "ok" },
  { name: "Govt. college sundargarh", location: "Sundargarh", category: "Educational", image: "/images/clients/govt_college_sng_2.png", link: "https://govtcollegesundargarh.ac.in/", linkStatus: "unavailable" },
  { name: "Banki autonomous collge", location: "Cuttack", category: "Educational", image: "/images/clients/banki_autonomous_college_2.png", link: "https://bankicollege.ac.in/", linkStatus: "ok" },
  { name: "Aryan English Medium School", location: "Rayagada", category: "Educational", image: "/images/clients/a2.png", link: "https://aryangrouprayagada.in", linkStatus: "ok" },
  { name: "Dhenkanal Autonomous College", location: "Dhenkanal", category: "Educational", image: "/images/clients/b.png", link: "https://dhenkanalcollege.ac.in", linkStatus: "ok" },
  { name: "Government Science College,Chatrapur", location: "Ganjam", category: "Educational", image: "/images/clients/a7.png", link: "https://gscc.ac.in/", linkStatus: "ok" },
  { name: "Indira Gandhi Mahila Mahavidyalaya", location: "Udala", category: "Educational", image: "/images/clients/a8.png", link: "https://igmm.ac.in/home/", linkStatus: "ok" },
  { name: "Kerala English Medium School", location: "Jharkhand", category: "Educational", image: "/images/clients/a11.png", link: "https://kemsjnp.org/", linkStatus: "ok" },
  { name: "K.B.D.A.V College, Nirakarpur", location: "Nirakarpur", category: "Educational", image: "/images/clients/a10.png", link: "https://kbdav.ac.in/", linkStatus: "ok" },
  { name: "Laxmi Narayan Public School", location: "sahada", category: "Educational", image: "/images/clients/a121.png", link: "https://lnpschool.org/", linkStatus: "unavailable" },
  { name: "RMD Degree College", location: "Patia", category: "Educational", image: "/images/clients/a20.png", link: "https://rmddc.ac.in/", linkStatus: "ok" },
  { name: "Rajsunakhala College", location: "Nayagarh", category: "Educational", image: "/images/clients/a19.png", link: "https://rajsunakhalacollege.ac.in/", linkStatus: "unavailable" },
  { name: "R.S Mahavidyalaya Odagaon", location: "Nayagarh", category: "Educational", image: "/images/clients/a21.png", link: "https://rsmodagaon.org.in/", linkStatus: "ok" },
  { name: "Sri Aurobindo's Rourkela School", location: "Rourkela, Odisha, India", category: "Educational", image: "/images/clients/a24.png", link: "https://sarsrkl.org/", linkStatus: "ok" },
  { name: "Samanta Chandrasekhar Institute of Technology and Management", location: "KORAPUT", category: "Educational", image: "/images/clients/a25.png", link: "https://scitm.ac.in/", linkStatus: "ok" },
  { name: "Sarbati Devi Women's College", location: "Rajgangpur", category: "Educational", image: "/images/clients/a26.png", link: "https://sdwcrgp.ac.in/", linkStatus: "ok" },
  { name: "Tihidi Degree College", location: "Tihidi,Bhadrak", category: "Educational", image: "/images/clients/A30.png", link: "https://tdctihidi.ac.in/", linkStatus: "ok" },
  { name: "Vikash Degree College", location: "Barahaguda Canal Chowk", category: "Educational", image: "/images/clients/a31.png", link: "https://vdcbargarh.ac.in/home/", linkStatus: "ok" },
  { name: "Vikash Institute of Technology", location: "Barahaguda Canal Chowk", category: "Educational", image: "/images/clients/a32.png", link: "https://vitbargarh.ac.in/", linkStatus: "ok" },
  { name: "srigurutrust", location: "Jagatpur", category: "Educational", image: "/images/clients/a41.png", link: "https://srigurutrust.org/", linkStatus: "ok" },
  { name: "Sacred Roots Public School", location: "Cuttack", category: "Educational", image: "/images/clients/a42.png", link: "https://srpsctc.in/", linkStatus: "ok" },
  { name: "ekamracollege", location: "Bhubaneswar", category: "Educational", image: "/images/clients/ekamra.jpeg", link: "https://www.ekamracollege.edu.in/", linkStatus: "ok" },
  { name: "saisbasundhara", location: "Cuttack", category: "Educational", image: "/images/clients/blank2.jpg", link: "https://www.saisbasundhara.org/", linkStatus: "ok" },
  { name: "shivangineeinstitute", location: "Angul", category: "Educational", image: "/images/clients/shivangee1.png", link: "https://www.shivangineeinstitute.org/", linkStatus: "ok" },
  { name: "baliyatra", location: "Cuttack", category: "Events", image: "/images/clients/portfolio5.jpg", link: null, linkStatus: "none" },
  { name: "MPSO", location: "Bhubaneswar", category: "Events", image: "/images/clients/mpso_(1)1.png", link: "https://play.google.com/store/apps/details?id=com.mpso.xperience&pcampaignid=web_share", linkStatus: "unavailable" },
  { name: "Highcourt Bar Association", location: "Cuttack", category: "NGO/Society", image: "/images/clients/portfolio7.jpg", link: "https://highcourtbar.org/", linkStatus: "ok" },
  { name: "O.M.S.A.", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/portfolio9.jpg", link: "https://omsa.org.in/", linkStatus: "ok" },
  { name: "Orissa Chemical Socitey", location: "Sambalpur", category: "NGO/Society", image: "/images/clients/portfolio1011.jpg", link: "https://orchemsoc.in/", linkStatus: "ok" },
  { name: "OAS ASSOCIATION", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/portfolio12.jpg", link: "https://oasaodisha.in/", linkStatus: "ok" },
  { name: "U.B.S.S", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/portfolio13.jpg", link: "https://ubssseva.org/", linkStatus: "ok" },
  { name: "CLAP", location: "Cuttack", category: "NGO/Society", image: "/images/clients/portfolio1411.jpg", link: "https://clapindia.org/", linkStatus: "ok" },
  { name: "ALL ODISHA TAX ADVOCATES ASSOCIATION", location: "Cuttack", category: "NGO/Society", image: "/images/clients/portfolio16.jpg", link: "https://odishataxadvocates.in/", linkStatus: "ok" },
  { name: "IADVL ODISHA", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/portfolio19.jpg", link: "https://iadvlorissa.org/", linkStatus: "ok" },
  { name: "jana", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/janasadan211.png", link: "https://janasadhana.org.in/", linkStatus: "ok" },
  { name: "Basundhara cuttack", location: "Cuttack", category: "NGO/Society", image: "/images/clients/basundhana211.png", link: "https://basundhara.org.in/", linkStatus: "ok" },
  { name: "Madani Welfare Association", location: "Jharapada", category: "NGO/Society", image: "/images/clients/p.png", link: "https://madaniwelfare.org/home/index", linkStatus: "ok" },
  { name: "OGAPA", location: "Bapuji Nagar", category: "NGO/Society", image: "/images/clients/a14.png", link: "https://ogapa.org/index.php", linkStatus: "unavailable" },
  { name: "Odisha Industries Association", location: "Jagatpur", category: "NGO/Society", image: "/images/clients/a15.png", link: "https://oiajagatpur.org/", linkStatus: "ok" },
  { name: "ORRA", location: "Khordha", category: "NGO/Society", image: "/images/clients/a16.png", link: "https://orraodisha.org/", linkStatus: "ok" },
  { name: "Research & Analysis Consultants", location: "Saheed Nagar", category: "NGO/Society", image: "/images/clients/a18.png", link: "https://racorissa.org/", linkStatus: "ok" },
  { name: "Sardar Vallabhbhai Patel Post Graduate Institute of Paediatrics", location: "Cuttack", category: "NGO/Society", image: "/images/clients/a50.png", link: "https://svppgip.org/", linkStatus: "ok" },
  { name: "Utkal Bipanna Sahayata Samiti", location: "Estate, BBSR", category: "NGO/Society", image: "/images/clients/a51.png", link: "https://ubssseva.org/", linkStatus: "ok" },
  { name: "ITI Techno Argo", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/logo_(1).png", link: "https://ititechnoagro.com/", linkStatus: "unavailable" },
  { name: "Lall odisha", location: "Jagatsingapur", category: "NGO/Society", image: "/images/clients/lall3.png", link: "https://www.lallodisha.org/", linkStatus: "ok" },
  { name: "Asoo", location: "Cuttack", category: "NGO/Society", image: "/images/clients/logo-white.png", link: "https://www.asoo.in/", linkStatus: "ok" },
  { name: "orissabotanicalsoceity", location: "Bhubaneswar", category: "NGO/Society", image: "/images/clients/botany.png", link: "https://orissabotanicalsoceity.in", linkStatus: "unavailable" },
  { name: "Swami Bichitrananda Kalyan Ashram", location: "Cuttack", category: "NGO/Society", image: "/images/clients/SBKA2lipsa.png", link: "https://sbka.org.in/", linkStatus: "ok" },
  { name: "NIKI SKINCARE", location: "Bhubaneswar", category: "Health", image: "/images/clients/portfolio211.jpg", link: "https://nikiskincare.com/", linkStatus: "unavailable" },
  { name: "Favnox Pharmaceuticals Private Limited", location: "Hyderabad", category: "Health", image: "/images/clients/a5_(1).png", link: "https://favnox.in/", linkStatus: "ok" },
  { name: "Pediadent", location: "Nayapalli,Bhubaneswar", category: "Health", image: "/images/clients/a17.png", link: "https://pediadent.in/", linkStatus: "ok" },
  { name: "Utkal poly Clinic", location: "Bhubaneswar", category: "Health", image: "/images/clients/a521.png", link: "https://utkalpolyclinic.in/", linkStatus: "ok" },
  { name: "shuvadarsinihospital", location: "West Bengal", category: "Health", image: "/images/clients/subha.png", link: "https://www.shuvadarsinihospital.com/", linkStatus: "unavailable" },
  { name: "Hotel Dionyx", location: "Saheed Nagar", category: "Hotel", image: "/images/clients/a3_(1).png", link: "https://dionyx.in/", linkStatus: "ok" },
  { name: "Shertineco Resort", location: "Bhubaneswar", category: "Hotel", image: "/images/clients/blank4.jpg", link: "https://www.shertoneco.com/", linkStatus: "ok" },
  { name: "ojashotel", location: "Durgapur", category: "Hotel", image: "/images/clients/ojas.png", link: "https://vtdemo.in/ojashotel/", linkStatus: "unavailable" },
  { name: "Sand Castel", location: "Konark", category: "Hotel", image: "/images/clients/sand_castel.jpeg", link: "https://sandcastlekonark.com/", linkStatus: "ok" },
  { name: "Paradeep phosphates ltd.", location: "Paradeep", category: "Corporate", image: "/images/clients/portfolio210.jpg", link: null, linkStatus: "none" },
  { name: "Aarti steels limited", location: "Athagarh", category: "Corporate", image: "/images/clients/portfolio32.jpg", link: null, linkStatus: "none" },
  { name: "Cold Storage India Odisha", location: "Cuttack", category: "Corporate", image: "/images/clients/Group_2113.png", link: "https://fematek.in/", linkStatus: "ok" },
  { name: "Saitronix", location: "Bahagada", category: "Corporate", image: "/images/clients/a231.png", link: "https://saitronix.co.in/index.php", linkStatus: "ok" },
  { name: "Srushti Commercials", location: "Bhubaneswar", category: "Corporate", image: "/images/clients/a33.png", link: "https://srushticommercials.com/", linkStatus: "ok" },
  { name: "Shristi", location: "Bharatpur Bhubaneswar", category: "Corporate", image: "/images/clients/a40.png", link: "https://shristiodisha.org/", linkStatus: "ok" },
  { name: "DFL SafetyApp", location: "Dangote", category: "Corporate", image: "/images/clients/dangote.jpg", link: null, linkStatus: "none" },
  { name: "Surakhya Chintan", location: "S R RUNGTA GROUP", category: "Corporate", image: "/images/clients/rungta.jpg", link: null, linkStatus: "none" },
  { name: "Safety Mobile App", location: "NAVA", category: "Corporate", image: "/images/clients/SAFETY.jpg", link: null, linkStatus: "none" },
  { name: "Safety Mobile App", location: "IFGL", category: "Corporate", image: "/images/clients/1000000116.jpg", link: null, linkStatus: "none" },
  { name: "AR & VR", location: "Agriculture", category: "Corporate", image: "/images/clients/ar121.jpg", link: null, linkStatus: "none" },
  { name: "Animal Husbandry", location: "Experience Zone", category: "Corporate", image: "/images/clients/animal.jpg", link: null, linkStatus: "none" },
  { name: "feintechnik", location: "KOLKATA", category: "Corporate", image: "/images/clients/logo3.png", link: "https://feintechnik.in/", linkStatus: "ok" },
  { name: "sunconsultancyandservices", location: "Bhubaneswar", category: "Corporate", image: "/images/clients/su.jpg", link: "https://sunconsultancyandservices.com/", linkStatus: "ok" },
  { name: "PC Patra & Sons", location: "Bhubaneswar", category: "Industry", image: "/images/clients/portfolio231.jpg", link: null, linkStatus: "none" },
  { name: "Wallace Apparels", location: "Cuttack", category: "Industry", image: "/images/clients/a34.png", link: "https://wallaceapparels.com/", linkStatus: "ok" },
  { name: "Chautali", location: "Bhubaneswar", category: "Industry", image: "/images/clients/final_logo.png", link: "https://chautali.in/", linkStatus: "ok" },
  { name: "Esscons", location: "Bhubaneswar", category: "Industry", image: "/images/clients/blank.jpg", link: "https://www.esscons.com/", linkStatus: "ok" },
  { name: "wintry", location: "Bhubaneswar", category: "Industry", image: "/images/clients/win.jpg", link: "https://wintry.co.in/", linkStatus: "ok" },
  { name: "MAA CUTTACK CHANDI", location: "Cuttack", category: "Others", image: "/images/clients/portfolio241.jpg", link: "https://maacuttackchandi.in/", linkStatus: "ok" },
  { name: "Eminence Real Estate", location: "Saheed Nagar", category: "Others", image: "/images/clients/a4.png", link: "https://eminencecorp.in/", linkStatus: "ok" },
  { name: "Eminenza", location: "Bhubaneswar", category: "Others", image: "/images/clients/logo.png", link: "https://eminenza.in/", linkStatus: "ok" },
  { name: "Anup patnaik", location: "Bhubaneswar", category: "Others", image: "/images/clients/anup.png", link: "http://anuppatnaik.com/", linkStatus: "ok" },
  { name: "Sai Higher Secondary School", location: "Baripada", category: "Educational", image: "/images/clients/Sai_College.png", link: "https://saihss.in/index.php", linkStatus: "unavailable" },
];

export const clientCategories = ["All", "Educational", "NGO/Society", "Corporate", "Industry", "Health", "Hotel", "Events", "Others"] as const;
