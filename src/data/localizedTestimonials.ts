import { VoiceLanguage } from "@/lib/sound";

export interface LocalizedTestimonial {
  name: string;
  role?: string;
  quote?: string;
  rating: string;
}

export const LOCALIZED_TESTIMONIALS: Record<VoiceLanguage, LocalizedTestimonial[]> = {
  en: [
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
  ],

  hi: [
    {
      name: "आकाश महापात्र",
      role: "सुरक्षा प्रबंधक (Safety Manager)",
      quote:
        "हम अपने संयंत्र में सेफ़्टी मोबाइल ऐप को लागू करके अत्यंत प्रसन्न हैं। यह एक बहुत ही अनूठी अवधारणा है और सभी घटनाओं तथा संभावित जोखिमों को किसी भी क्षण मोबाइल पर देखा जा सकता है। वर्टोय टीम को उनकी मूल्यवान सेवा के लिए हार्दिक धन्यवाद।",
      rating: "Quote",
    },
    {
      name: "असित मिश्रा",
      role: "सुरक्षा प्रबंधक (Safety Manager)",
      quote:
        "सुरक्षा हर उद्योग में सभी को प्रभावित करती है। कार्यस्थल पर होने वाली दुर्घटनाएं रोकी जा सकती हैं यदि उचित सुरक्षा प्रोटोकॉल और प्रशिक्षण हो। वर्टोय टेक्नोलॉजीज के उत्कृष्ट सहयोग के लिए धन्यवाद।",
      rating: "Quote",
    },
    { name: "मनोज बेहेरा", rating: "उत्कृष्ट (Excellent)" },
    { name: "ममता साहु", rating: "उत्कृष्ट (Excellent)" },
    { name: "पूर्णिमा रथ", rating: "उत्कृष्ट (Excellent)" },
    { name: "अजय साहु", rating: "उत्कृष्ट (Excellent)" },
    { name: "राजश्री ढल", rating: "उत्कृष्ट (Excellent)" },
    { name: "वर्षा बेहेरा", rating: "उत्कृष्ट (Excellent)" },
  ],

  or: [
    {
      name: "ଆକାଶ ମହାପାତ୍ର",
      role: "ସୁରକ୍ଷା ମ୍ୟାନେଜର (Safety Manager)",
      quote:
        "ଆମ ପ୍ଲାଣ୍ଟରେ ସେଫ୍ଟି ମୋବାଇଲ୍ ଆପ୍ ବ୍ୟବହାର କରି ଆମେ ଅତ୍ୟନ୍ତ ଖୁସି। ଏହା ଏକ ଅତୁଳନୀୟ ଧାରଣା ଏବଂ ସମସ୍ତ ସୁରକ୍ଷା ଘଟଣାକୁ ଯେକୌଣସି ମୁହୂର୍ତ୍ତରେ ମୋବାଇଲ୍‌ରେ ଦେଖାଯାଇପାରୁଛି। ଭର୍ଚ୍ଚୋଏ ଟିମ୍‌କୁ ସେମାନଙ୍କର ଉତ୍କୃଷ୍ଟ ସେବା ପାଇଁ ଅଶେଷ ଧନ୍ୟବାଦ।",
      rating: "Quote",
    },
    {
      name: "ଅସିତ ମିଶ୍ର",
      role: "ସୁରକ୍ଷା ମ୍ୟାନେଜର (Safety Manager)",
      quote:
        "କାର୍ଯ୍ୟସ୍ଥଳରେ ନିରାପତ୍ତା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ଉପଯୁକ୍ତ ସୁରକ୍ଷା ନିୟମ ଓ ତାଲିମ ଦ୍ୱାରା ଦୁର୍ଘଟଣା ରୋକାଯାଇପାରିବ। ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌କୁ ସେମାନଙ୍କର ନିରନ୍ତର ସହଯୋଗ ପାଇଁ ଧନ୍ୟବାଦ।",
      rating: "Quote",
    },
    { name: "ମନୋଜ ବେହେରା", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
    { name: "ମମତା ସାହୁ", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
    { name: "ପୂର୍ଣ୍ଣିମା ରଥ", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
    { name: "ଅଜୟ ସାହୁ", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
    { name: "ରାଜଶ୍ରୀ ଢଳ", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
    { name: "ବର୍ଷା ବେହେରା", rating: "ଅତ୍ୟୁତ୍ତମ (Excellent)" },
  ],
};

export function getLocalizedTestimonials(lang: VoiceLanguage): LocalizedTestimonial[] {
  return LOCALIZED_TESTIMONIALS[lang] || LOCALIZED_TESTIMONIALS.en;
}
