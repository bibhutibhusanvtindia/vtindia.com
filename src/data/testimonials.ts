export type Testimonial = {
  name: string;
  role?: string;
  quote?: string;
  rating: "Excellent" | "Quote";
};

export const testimonials: Testimonial[] = [
  {
    name: "Akash Mohapatra",
    role: "Safety Manager",
    quote:
      "We are very happy to introduce the Safety Mobile App in our Plant. This is a very unique concept and all the incidents and near miss conditions can be displayed in our mobile at any moment. Thank you team Virtoy for providing us your valuable service.",
    rating: "Quote",
  },
  {
    name: "Asit Mishra",
    role: "Safety Manager",
    quote:
      "Safety affects everyone in every industry. Workplace injuries and illnesses significantly impact employers' profits, workers' health and insurance costs. Accidents are preventable with safety protocols, proper training and safety products. Thanks to Virtoy Technologies Pvt. Ltd. for all the support.",
    rating: "Quote",
  },
  { name: "Manoj Behera", rating: "Excellent" },
  { name: "Mamata Sahu", rating: "Excellent" },
  { name: "Purnima Rath", rating: "Excellent" },
  { name: "Ajay Sahu", rating: "Excellent" },
  { name: "Rajshree Dhal", rating: "Excellent" },
  { name: "Barsha Behera", rating: "Excellent" },
];
