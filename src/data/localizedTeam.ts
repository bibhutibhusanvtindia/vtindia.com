import { VoiceLanguage } from "@/lib/sound";

export interface LocalizedTeamMember {
  name: string;
  title: string;
  bio: string;
  extendedBio?: string;
  photo?: string;
  featured?: boolean;
}

export const LOCALIZED_TEAM: Record<VoiceLanguage, LocalizedTeamMember[]> = {
  en: [
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
      bio: "Specializing in native Flutter & iOS applications, with expertise in interactive UI and real-time synchronization.",
      photo: "/images/team/Mr_Ashwin.png",
    },
    {
      name: "Ajay Maharana",
      title: "Sr. Software Developer",
      bio: "Architecting backend microservices and high-concurrency database systems across enterprise projects.",
      photo: "/images/team/Mr_Ajay.png",
    },
    {
      name: "Namita Pattanayak",
      title: "Sr. Software Developer",
      bio: "Full-stack engineer delivering responsive web interfaces and secure REST API services.",
      photo: "/images/team/Namita_Pattanayak.png",
    },
    {
      name: "Sk Riyaj Uddin",
      title: "Business Analyst",
      bio: "Bridging business requirements with technical delivery, ensuring exact institutional alignment.",
      photo: "/images/team/Mr_Riyaz.png",
    },
    {
      name: "Prabin Bala",
      title: "Sr. Software Developer",
      bio: "Developing robust enterprise modules and automated deployment pipelines for campus ERP systems.",
      photo: "/images/team/Mr_Prabin.png",
    },
    {
      name: "Srutipragnya Mohapatra",
      title: "Software Developer",
      bio: "Building performant frontend modules and clean user interfaces for education portals.",
      photo: "/images/team/Ms_Sruti.png",
    },
    {
      name: "Sibajyoti Pradhan",
      title: "Software Developer",
      bio: "Specializing in database architecture, reporting workflows, and secure web services.",
      photo: "/images/team/Mr_Sibajyoti.png",
    },
    {
      name: "Abinash Mohanty",
      title: "Software Developer",
      bio: "Engineering custom features, API endpoints, and real-time notification microservices.",
      photo: "/images/team/Mr_Abinash.png",
    },
    {
      name: "Priyanka Behera",
      title: "Web Developer",
      bio: "Crafting modern, accessible web applications with rich user experience and responsive styling.",
      photo: "/images/team/Ms_Priyanka.png",
    },
  ],

  hi: [
    {
      name: "श्री अनूप पटनायक",
      title: "सह-संस्थापक (Co-Founder)",
      bio: "वर्टोय टेक्नोलॉजीज के सह-संस्थापक श्री अनूप पटनायक कंपनी के विजन और तकनीकी नवाचार के प्रमुख सूत्रधार हैं। उन्होंने कंपनी की मजबूत तकनीकी नींव रखने में महत्वपूर्ण भूमिका निभाई है।",
      extendedBio:
        "सह-संस्थापक के रूप में, वे कंपनी की कार्यसंस्कृति — निरंतर सीखने, सहयोग और तकनीकी उत्कृष्टता को दिशा देते हैं, जिससे कंपनी भविष्य के लिए सदैव तत्पर रहती है।",
      photo: "/images/team/Mr_ANUP.png",
      featured: true,
    },
    {
      name: "श्री प्रीतिरंजन साहु",
      title: "मुख्य कार्यकारी अधिकारी (CEO)",
      bio: "वर्टोय टेक्नोलॉजीज के मुख्य कार्यकारी अधिकारी श्री प्रीतिरंजन साहु एक दूरदर्शी तकनीकी नेतृत्वकर्ता हैं। एक दशक से अधिक के अनुभव के साथ, उन्होंने वर्टोय को डिजिटल समाधानों के अग्रणी केंद्र में बदल दिया है।",
      photo: "/images/team/Mr_PRITIRANJAN.png",
      featured: true,
    },
    {
      name: "श्रीमती पियाली साहु",
      title: "मुख्य परिचालन अधिकारी (COO)",
      bio: "वर्टोय टेक्नोलॉजीज में परिचालन उत्कृष्टता, मानव संसाधन और रणनीतिक विकास का नेतृत्व।",
      photo: "/images/team/Mrs_PIYALI.png",
      featured: true,
    },
    {
      name: "श्री कैलाश पटनायक",
      title: "वरिष्ठ सलाहकार, NAAC",
      bio: "एनएएसी (NAAC) सलाहकार जो उच्च शिक्षण संस्थानों को प्रत्यायन और उच्चतम ग्रेडिंग की दिशा में मार्गदर्शन करते हैं।",
      photo: "/images/team/Mr_KAILASH.png",
      featured: true,
    },
    {
      name: "निरंजन साहु",
      title: "वरिष्ठ सॉफ्टवेयर डेवलपर",
      bio: "डेवलपमेंट टीमों का नेतृत्व, स्केलेबल आर्किटेक्चर डिजाइन और उच्च गुणवत्ता वाले कोड का वितरण।",
      photo: "/images/team/Mr_Niranjan.png",
    },
    {
      name: "अश्विन यादव",
      title: "मोबाइल ऐप डेवलपर",
      bio: "फ़्लटर एवं आईओएस ऐप विकास में विशेषज्ञता, आधुनिक यूजर इंटरफेस और रीयल-टाइम डेटा सिंक्रोनाइज़ेशन।",
      photo: "/images/team/Mr_Ashwin.png",
    },
    {
      name: "अजय महाराणा",
      title: "वरिष्ठ सॉफ्टवेयर डेवलपर",
      bio: "एंटरप्राइज प्रोजेक्ट्स हेतु बैकएंड माइक्रोसर्विसेज और उच्च-प्रदर्शन डेटाबेस आर्किटेक्चर।",
      photo: "/images/team/Mr_Ajay.png",
    },
    {
      name: "नमिता पटनायक",
      title: "वरिष्ठ सॉफ्टवेयर डेवलपर",
      bio: "फुल-स्टैक इंजीनियर जो आधुनिक वेब इंटरफेस और सुरक्षित एपीआई सेवाओं का निर्माण करती हैं।",
      photo: "/images/team/Namita_Pattanayak.png",
    },
    {
      name: "एसके रियाज उद्दीन",
      title: "बिजनेस एनालिस्ट",
      bio: "व्यावसायिक आवश्यकताओं का विश्लेषण और तकनीकी टीमों के साथ सटीक समन्वय।",
      photo: "/images/team/Mr_Riyaz.png",
    },
    {
      name: "प्रबीन बाला",
      title: "वरिष्ठ सॉफ्टवेयर डेवलपर",
      bio: "कैंपस ईआरपी सिस्टम के लिए मजबूत एंटरप्राइज मॉड्यूल और स्वचालित पाइपलाइन का विकास।",
      photo: "/images/team/Mr_Prabin.png",
    },
    {
      name: "श्रुतिप्रज्ञा महापात्र",
      title: "सॉफ्टवेयर डेवलपर",
      bio: "शिक्षा पोर्टल्स हेतु उत्तरदायी वेब मॉड्यूल और स्वच्छ यूजर इंटरफ़ेस का निर्माण।",
      photo: "/images/team/Ms_Sruti.png",
    },
    {
      name: "शिबज्योति प्रधान",
      title: "सॉफ्टवेयर डेवलपर",
      bio: "डेटाबेस आर्किटेक्चर, रिपोर्टिंग वर्कफ़्लो और सुरक्षित वेब सेवाओं में विशेषज्ञ।",
      photo: "/images/team/Mr_Sibajyoti.png",
    },
    {
      name: "अविनाश महांति",
      title: "सॉफ्टवेयर डेवलपर",
      bio: "कस्टम फीचर्स, एपीआई एंडपॉइंट्स और रीयल-टाइम नोटिफिकेशन सिस्टम का विकास।",
      photo: "/images/team/Mr_Abinash.png",
    },
    {
      name: "प्रियंका बेहेरा",
      title: "वेब डेवलपर",
      bio: "आधुनिक, सुलभ और उत्तरदायी वेब अनुप्रयोगों का निर्माण।",
      photo: "/images/team/Ms_Priyanka.png",
    },
  ],

  or: [
    {
      name: "ଶ୍ରୀ ଅନୂପ ପଟ୍ଟନାୟକ",
      title: "ସହ-ପ୍ରତିଷ୍ଠାତା (Co-Founder)",
      bio: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ର ସହ-ପ୍ରତିଷ୍ଠାତା ଶ୍ରୀ ଅନୂପ ପଟ୍ଟନାୟକ କମ୍ପାନୀର ବୈଷୟିକ ଦୂରଦୃଷ୍ଟି ଓ ନବସୃଜନର ମୁଖ୍ୟ କର୍ଣ୍ଣଧାର। ସେ କମ୍ପାନୀର ଶକ୍ତିଶାଳୀ ମୂଳଦୁଆ ସ୍ଥାପନ କରିବାରେ ପ୍ରମୁଖ ଭୂମିକା ଗ୍ରହଣ କରିଛନ୍ତି।",
      extendedBio:
        "ସହ-ପ୍ରତିଷ୍ଠାତା ଭାବେ ସେ କମ୍ପାନୀରେ ସହଯୋଗ, ନିରନ୍ତର ଶିକ୍ଷା ଓ ଉଦ୍ଭାବନର ସଂସ୍କୃତି ଗଢ଼ି ତୋଳିଛନ୍ତି, ଯାହା କମ୍ପାନୀକୁ ସର୍ବଦା ଆଗୁଆ ରଖିବାରେ ସାହାଯ୍ୟ କରେ।",
      photo: "/images/team/Mr_ANUP.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀ ପ୍ରୀତିରଞ୍ଜନ ସାହୁ",
      title: "ମୁଖ୍ୟ କାର୍ଯ୍ୟନିର୍ବାହୀ ଅଧିକାରୀ (CEO)",
      bio: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ର ମୁଖ୍ୟ କାର୍ଯ୍ୟନିର୍ବାହୀ ଅଧିକାରୀ ଶ୍ରୀ ପ୍ରୀତିରଞ୍ଜନ ସାହୁ ଏକ ଦୂରଦର୍ଶୀ ନେତୃତ୍ୱ। ଏକ ଦଶନ୍ଧିରୁ ଅଧିକ ଅଭିଜ୍ଞତା ସହ ସେ ଭର୍ଚ୍ଚୋଏକୁ ବିଶ୍ୱସ୍ତରୀୟ ଡିଜିଟାଲ୍ ସମାଧାନର କେନ୍ଦ୍ରରେ ପରିଣତ କରିଛନ୍ତି।",
      photo: "/images/team/Mr_PRITIRANJAN.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀମତୀ ପିୟାଲୀ ସାହୁ",
      title: "ମୁଖ୍ୟ ପରିଚାଳନା ଅଧିକାରୀ (COO)",
      bio: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ରେ ପରିଚାଳନା ଦକ୍ଷତା, ମାନବ ସମ୍ବଳ ଏବଂ ରଣନୈତିକ ଅଭିବୃଦ୍ଧିର ମୁଖ୍ୟ।",
      photo: "/images/team/Mrs_PIYALI.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀ କୈଳାସ ପଟ୍ଟନାୟକ",
      title: "ବରିଷ୍ଠ ପରାମର୍ଶଦାତା, NAAC",
      bio: "ନାକ୍ (NAAC) ପରାମର୍ଶଦାତା ଯିଏ ଶିକ୍ଷାନୁଷ୍ଠାନଗୁଡ଼ିକୁ ସ୍ୱୀକୃତି ଓ ଉଚ୍ଚ ଗ୍ରେଡ୍ ହାସଲ କରିବା ଦିଗରେ ମାର୍ଗଦର୍ଶନ କରନ୍ତି।",
      photo: "/images/team/Mr_KAILASH.png",
      featured: true,
    },
    {
      name: "ନିରଞ୍ଜନ ସାହୁ",
      title: "ବରିଷ୍ଠ ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "ଡେଭଲପମେଣ୍ଟ ଟିମର ନେତୃତ୍ୱ, ସୁରକ୍ଷିତ ସଫ୍ଟୱେର୍ ଆର୍କିଟେକ୍ଚର ନିର୍ମାଣ ଓ ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ।",
      photo: "/images/team/Mr_Niranjan.png",
    },
    {
      name: "ଅଶ୍ୱିନ ଯାଦବ",
      title: "ମୋବାଇଲ୍ ଆପ୍ ଡେଭଲପର୍",
      bio: "ଫ୍ଲଟର୍ ଓ ଆଇଓଏସ୍ ଆପ୍ ବିକାଶରେ ବିଶେଷଜ୍ଞ, ଲାଇଭ୍ ଡାଟା ସିଙ୍କ୍ରୋନାଇଜେସନ୍ ଓ ସୁନ୍ଦର ୟୁଆଇ ନିର୍ମାଣ।",
      photo: "/images/team/Mr_Ashwin.png",
    },
    {
      name: "ଅଜୟ ମହାରଣା",
      title: "ବରିଷ୍ଠ ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ପ୍ରକଳ୍ପ ପାଇଁ ବ୍ୟାକଏଣ୍ଡ ମାଇକ୍ରୋସର୍ଭିସେସ୍ ଏବଂ ଡାଟାବେସ୍ ଆର୍କିଟେକ୍ଚର।",
      photo: "/images/team/Mr_Ajay.png",
    },
    {
      name: "ନମିତା ପଟ୍ଟନାୟକ",
      title: "ବରିଷ୍ଠ ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "ଫୁଲ୍-ଷ୍ଟାକ୍ ଇଞ୍ଜିନିୟର ଯିଏ ଉନ୍ନତ ୱେବ୍ ଇଣ୍ଟରଫେସ୍ ଓ ସୁରକ୍ଷିତ ଏପିଆଇ ସେବା ପ୍ରସ୍ତୁତ କରନ୍ତି।",
      photo: "/images/team/Namita_Pattanayak.png",
    },
    {
      name: "ଏସକେ ରିୟାଜ ଉଦ୍ଦିନ",
      title: "ବିଜନେସ୍ ଆନାଲିଷ୍ଟ",
      bio: "ବ୍ୟବସାୟିକ ଆବଶ୍ୟକତା ବିଶ୍ଳେଷଣ ଏବଂ ଟେକ୍ନିକାଲ୍ ଟିମ୍ ସହ ସଠିକ୍ ସମନ୍ୱୟ।",
      photo: "/images/team/Mr_Riyaz.png",
    },
    {
      name: "ପ୍ରବୀଣ ବଳା",
      title: "ବରିଷ୍ଠ ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "କଲେଜ ଇଆରପି ସିଷ୍ଟମ୍ ପାଇଁ ଶକ୍ତିଶାଳୀ ଏଣ୍ଟରପ୍ରାଇଜ୍ ମଡ୍ୟୁଲ୍ ବିକାଶ।",
      photo: "/images/team/Mr_Prabin.png",
    },
    {
      name: "ଶ୍ରୁତିପ୍ରଜ୍ଞା ମହାପାତ୍ର",
      title: "ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "ଶିକ୍ଷା ପୋର୍ଟାଲ୍ ପାଇଁ ସୁନ୍ଦର ଓ ଦ୍ରୁତ ୱେବ୍ ମଡ୍ୟୁଲ୍ ନିର୍ମାଣ।",
      photo: "/images/team/Ms_Sruti.png",
    },
    {
      name: "ଶିବଜ୍ୟୋତି ପ୍ରଧାନ",
      title: "ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "ଡାଟାବେସ୍ ଆର୍କିଟେକ୍ଚର, ରିପୋର୍ଟିଂ ଏବଂ ସୁରକ୍ଷିତ ୱେବ୍ ସେବାରେ ବିଶେଷଜ୍ଞ।",
      photo: "/images/team/Mr_Sibajyoti.png",
    },
    {
      name: "ଅବିନାଶ ମହାନ୍ତି",
      title: "ସଫ୍ଟୱେର୍ ଡେଭଲପର୍",
      bio: "କଷ୍ଟମ୍ ଫିଚର୍ସ, ଏପିଆଇ ଏବଂ ରିଅଲ୍-ଟାଇମ୍ ନୋଟିଫିକେସନ୍ ସିଷ୍ଟମ୍ ବିକାଶ।",
      photo: "/images/team/Mr_Abinash.png",
    },
    {
      name: "ପ୍ରିୟଙ୍କା ବେହେରା",
      title: "ୱେବ୍ ଡେଭଲପର୍",
      bio: "ଆଧୁନିକ, ସହଜ ଓ ରେସପନସିଭ୍ ୱେବ୍ ଆପ୍ଲିକେସନ୍ ନିର୍ମାଣ।",
      photo: "/images/team/Ms_Priyanka.png",
    },
  ],
};

export function getLocalizedTeam(lang: VoiceLanguage): LocalizedTeamMember[] {
  return LOCALIZED_TEAM[lang] || LOCALIZED_TEAM.en;
}
