// All content recovered from the live vtindia.com team page (/home/team) and homepage.
// Photo filenames map 1:1 to the source order verified in the page markup.
// Kailash Patnaik appears on the homepage "Our Professionals" block, not the team page.
// Two further photos exist in the old source (chetan.png, Mr_Jahid.png) but are inside
// HTML comments — VT India removed them from the live site, so they are NOT migrated.

export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  extendedBio?: string;
  photo?: string;
  featured?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Mr. Anup Patnaik",
    title: "Co-founder",
    bio: "Mr. Anup Patnaik, Co-Founder of Virtoy Technologies Pvt. Ltd., is the driving force behind the company's vision and innovation. With a strong passion for technology and entrepreneurship, Anup Patnaik played a key role in building the foundation of the company from the ground up.",
    extendedBio:
      "As a co-founder, Anup Patnaik not only focuses on the technical side of things but also shapes the company's culture — promoting collaboration, continuous learning, and innovation. With a deep understanding of market needs and emerging technologies, Anup Patnaik ensures that the company remains agile and future-ready.",
    photo: "/images/team/Mr_ANUP.png",
    featured: true,
  },
  {
    name: "Mr. Pritiranjan Sahu",
    title: "CEO",
    bio: "Mr. Pritiranjan Sahu, the Chief Executive Officer of Virtoy Technologies Pvt. Ltd., is a visionary leader driving innovation in the ever-evolving world of information technology. With a background in computer science and over a decade of experience in the tech industry, Pritiranjan Sahu has transformed Virtoy Technologies into a powerhouse of digital solutions, catering to clients globally.",
    photo: "/images/team/Mr_PRITIRANJAN.png",
    featured: true,
  },
  {
    name: "Mrs. Piyali Sahu",
    title: "COO",
    bio: "Chief Operating Officer driving operational excellence and strategic growth at Virtoy Technology Pvt. Ltd.",
    photo: "/images/team/Mrs_PIYALI.png",
    featured: true,
  },
  {
    name: "Mr. Kailash Patnaik",
    title: "Sr. Consultant, NAAC",
    bio: "NAAC Consultant guiding institutions towards seamless accreditation and growth.",
    photo: "/images/team/Mr_KAILASH.png",
    featured: true,
  },
  {
    name: "Niranjan Sahu",
    title: "Sr. Software Developer",
    bio: "Leading development teams, designing scalable software solutions, and ensuring high-quality code delivery.",
    photo: "/images/team/Mr_Niranjan.png",
  },
  {
    name: "Ashwin Yadav",
    title: "Mobile App Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Mr_Ashwin.png",
  },
  {
    name: "Ajay Maharana",
    title: "Sr. Software Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Mr_Ajay.png",
  },
  {
    name: "Namita Pattanayak",
    title: "Sr. Software Developer",
    bio: "Supportive leadership, growth-oriented environment, challenging projects, and a flexible work culture.",
    photo: "/images/team/Namita_Pattanayak.png",
  },
  {
    name: "Sk Riyaj Uddin",
    title: "Business Analyst",
    bio: "Supportive leadership, growth-oriented environment, challenging projects, and a flexible work culture.",
    photo: "/images/team/Mr_Riyaz.png",
  },
  {
    name: "Prabin Bala",
    title: "Sr. Software Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Mr_Prabin.png",
  },
  {
    name: "Srutipragnya Mohapatra",
    title: "Software Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Ms_Sruti.png",
  },
  {
    name: "Sibajyoti Pradhan",
    title: "Software Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Mr_Sibajyoti.png",
  },
  {
    name: "Abinash Mohanty",
    title: "Software Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Mr_Abinash.png",
  },
  {
    name: "Priyanka Behera",
    title: "Web Developer",
    bio: "Supportive team, great learning environment, challenging projects, flexible work culture.",
    photo: "/images/team/Ms_Priyanka.png",
  },
];

export const featuredTeam = team.filter((member) => member.featured);
