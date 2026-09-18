import { VoiceLanguage } from "@/lib/sound";

export interface LocalizedServiceData {
  slug: string;
  oldPath: string;
  name: string;
  heading: string;
  summary: string;
  body: string[];
  highlights: string[];
  icon: string;
}

export const LOCALIZED_SERVICES: Record<VoiceLanguage, LocalizedServiceData[]> = {
  en: [
    {
      slug: "software-development",
      oldPath: "/home/softwaredevelopment",
      name: "Software Development",
      heading: "Custom Software Services",
      summary: "Innovative, robust, and high-performance software solutions for diverse industries.",
      body: [
        "Virtoy Technologies is a premium Information Technology company providing world-class IT solutions to customers across Eastern India, the UAE, and the UK. The firm was established by IIT alumni and engineering professionals focused on innovation, integrity, and technical excellence.",
        "We blend technical expertise with strategic insight to solve real-world problems through cutting-edge technology, ensuring solutions are scalable and secure while remaining aligned with the unique goals of each client.",
        "Our services span web applications, mobile apps, enterprise systems, and automation tools — backed by a growing global footprint and a reputation for reliability, transparency and measurable results.",
      ],
      highlights: ["Web applications", "Mobile apps", "Enterprise systems", "Automation tools"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      oldPath: "/home/webapplication",
      name: "Web Application",
      heading: "Maintenance and Support Strategy",
      summary: "Custom-built, scalable, and efficient web solutions tailored to your business needs.",
      body: [
        "With over 13 years of experience and roughly 300 clients worldwide, our web application team pairs extensive development experience with world-class professionals and consultants.",
        "Every engagement starts with business analysis to understand your processes and requirements, followed by elaborate research and market study to analyze competition before development begins.",
        "Security is built into the design and architecture from day one — protecting against unauthorized access and vulnerabilities such as SQL injection — while our design practice treats every website as a professionally crafted, standards-based experience.",
      ],
      highlights: ["Business analysis", "Market & competitor research", "Security-first architecture", "Modern design standards"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      oldPath: "/home/digitalmarketing",
      name: "Digital Marketing",
      heading: "Essential Digital Marketing Strategies",
      summary: "Strategic online growth through SEO, social media, and advertising.",
      body: [
        "Internet usage keeps growing, and it plays a crucial role in earning customer trust. We help you reach your audience where they already spend their time — Facebook, ad placements, video marketing or a fully-fledged website — delivered globally at affordable rates.",
        "Our customized internet marketing solutions engage your targeted audience for better online visibility and increased brand awareness, converting visitors into leads that regularly turn into new customers.",
      ],
      highlights: ["Social & video marketing", "Paid advertising", "Lead generation", "Brand visibility"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      oldPath: "/home/seoconsulting",
      name: "SEO Consulting",
      heading: "Optimize Visibility and Grow Your Traffic",
      summary: "Expert guidance to improve visibility, fix technical issues, and attract the right audience.",
      body: [
        "We begin every engagement with a full website audit — surfacing technical issues, content gaps and missed opportunities that shape a custom SEO plan tailored to your goals.",
        "From there, keyword research ensures your content targets the terms your customers are already searching for, while on-page work (structure, headings, metadata, internal linking) and off-page work (backlinks, local SEO) build authority.",
        "We continuously analyze performance — technical structure, user experience, and ranking blockers — to keep improving long-term, organic growth.",
      ],
      highlights: ["Website audits", "Keyword research", "On-page & off-page SEO", "Performance analysis"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      oldPath: "/home/internetmarketing",
      name: "Internet Marketing",
      heading: "Smart Marketing Strategies",
      summary: "Driving brand visibility and engagement through strategic internet marketing solutions.",
      body: [
        "Internet marketing uses digital channels — SEO, social media, email and paid ads — to promote businesses online, reach targeted audiences and drive engagement, leads and sales.",
        "It goes beyond having a website: it's about building an online presence that attracts, engages and converts your audience, connecting you directly with the people who matter, tracking results in real time, and adapting quickly to changing trends.",
      ],
      highlights: ["SEO & social media", "Email campaigns", "Pay-per-click ads", "Real-time tracking"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      oldPath: "/home/mobileappconsulting",
      name: "Mobile App Consulting",
      heading: "Empowering Your Mobile App Journey",
      summary: "Expert guidance for seamless, user-friendly, and scalable mobile solutions.",
      body: [
        "Mobile app consulting helps teams turn complex ideas into functional, user-friendly applications. We guide architecture, platform selection and security — ensuring efficient development, smooth deployment and alignment with business goals while minimizing risk and maximizing ROI.",
        "Through expert analysis and strategic planning, we streamline workflows, integrate backend systems and optimize app performance — helping you deliver high-quality apps faster, with scalability and long-term success built in.",
      ],
      highlights: ["Architecture & platform strategy", "Security guidance", "Backend integration", "Performance optimization"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      oldPath: "/home/projectmanagement",
      name: "Project Management",
      heading: "Streamlining Projects for Maximum Success",
      summary: "Strategic planning and execution to ensure timely and successful project delivery.",
      body: [
        "Project management brings structure, accountability and clear direction to every initiative, keeping teams focused and efficient across the project lifecycle — better control over scope, timelines and cost, and smoother stakeholder communication.",
        "We apply methodologies like Agile, Scrum and Waterfall depending on the engagement, treat risk management as a critical, ongoing discipline, and turn ideas into actionable plans without losing structural clarity.",
      ],
      highlights: ["Agile / Scrum / Waterfall", "Risk management", "Stakeholder communication", "Scope & timeline control"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      oldPath: "/home/naacnba",
      name: "NAAC & NBA Accreditation Consulting",
      heading: "NAAC / NBA Accreditation Consulting",
      summary: "Guiding institutions toward seamless accreditation and growth.",
      body: [
        "We support institutions preparing for the NAAC and NBA accreditation journey, helping them assess readiness ahead of new frameworks and awards.",
        "Our team connects institutions with assessment professionals, mentors and advisors, and provides an in-house-developed ERP tool that supports the institutional internal quality assurance (IQAC) workflow from conception through the award of accreditation — so leadership can visualize a predictive accreditation outcome well in advance.",
      ],
      highlights: ["Readiness assessment", "IQAC workflow ERP", "Mentor & advisor access", "Predictive accreditation insight"],
      icon: "GraduationCap",
    },
  ],

  hi: [
    {
      slug: "software-development",
      oldPath: "/home/softwaredevelopment",
      name: "सॉफ्टवेयर विकास",
      heading: "कस्टम सॉफ्टवेयर इंजीनियरिंग सेवाएं",
      summary: "विविध उद्योगों के लिए आधुनिक, मजबूत और उच्च प्रदर्शन वाले सॉफ्टवेयर समाधान।",
      body: [
        "वर्टोय टेक्नोलॉजीज एक प्रीमियम सूचना प्रौद्योगिकी कंपनी है जो पूर्वी भारत, यूएई और यूके में विश्वस्तरीय आईटी समाधान प्रदान करती है। इसकी स्थापना आईआईटी पूर्व छात्रों और समर्पित इंजीनियरिंग विशेषज्ञों द्वारा की गई थी।",
        "हम वास्तविक दुनिया की व्यावसायिक चुनौतियों को सुलझाने के लिए तकनीकी विशेषज्ञता और रणनीतिक सोच का संयोजन करते हैं, जिससे समाधान सुरक्षित, स्केलेबल और प्रभावी बनते हैं।",
        "हमारी सेवाओं में वेब अनुप्रयोग, मोबाइल ऐप, एंटरप्राइज सिस्टम और ऑटोमेशन टूल शामिल हैं — जो पारदर्शिता और उच्च गुणवत्ता के साथ वितरित किए जाते हैं।",
      ],
      highlights: ["वेब अनुप्रयोग", "मोबाइल ऐप्स", "एंटरप्राइज सिस्टम", "ऑटोमेशन टूल्स"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      oldPath: "/home/webapplication",
      name: "वेब एप्लिकेशन विकास",
      heading: "स्केलेबल वेब सिस्टम एवं मेंटेनेंस रणनीति",
      summary: "आपकी व्यावसायिक जरूरतों के अनुसार कस्टम, सुरक्षित और उच्च क्षमता वाले वेब समाधान।",
      body: [
        "13 से अधिक वर्षों के अनुभव और वैश्विक स्तर पर 300 से अधिक सफल ग्राहकों के साथ, हमारी वेब टीम अत्याधुनिक तकनीक और परामर्श प्रदान करती है।",
        "प्रत्येक प्रोजेक्ट की शुरुआत विस्तृत व्यावसायिक विश्लेषण और बाजार अनुसंधान के साथ होती है ताकि प्रतिस्पर्धा में बढ़त हासिल हो सके।",
        "सुरक्षा और प्रदर्शन हमारे आर्किटेक्चर के मूल में है — जो एसक्यूएल इंजेक्शन और अनधिकृत एक्सेस से सुरक्षा सुनिश्चित करते हुए प्रीमियम यूजर अनुभव देता है।",
      ],
      highlights: ["बिजनेस प्रोसेस विश्लेषण", "बाजार एवं प्रतिस्पर्धा शोध", "सुरक्षा-प्रथम आर्किटेक्चर", "आधुनिक डिजाइन मानक"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      oldPath: "/home/digitalmarketing",
      name: "डिजिटल मार्केटिंग",
      heading: "रणनीतिक ऑनलाइन विकास एवं ब्रांड निर्माण",
      summary: "एसईओ, सोशल मीडिया और लक्षित विज्ञापनों के माध्यम से रणनीतिक ऑनलाइन विकास।",
      body: [
        "इंटरनेट का बढ़ता उपयोग ग्राहकों का विश्वास जीतने में महत्वपूर्ण भूमिका निभाता है। हम आपके ब्रांड को सही दर्शकों तक पहुँचाते हैं — सोशल मीडिया, वीडियो मार्केटिंग और उच्च-रूपांतरण लैंडिंग पेज के जरिए।",
        "हमारे अनुकूलित मार्केटिंग समाधान ऑनलाइन दृश्यता बढ़ाते हैं और आगंतुकों को सक्रिय ग्राहकों में बदलने में सहायता करते हैं।",
      ],
      highlights: ["सोशल एवं वीडियो मार्केटिंग", "पेड विज्ञापन अभियान", "लीड जनरेशन", "ब्रांड दृश्यता"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      oldPath: "/home/seoconsulting",
      name: "एसईओ परामर्श",
      heading: "सर्च इंजन विजिबिलिटी और ऑर्गेनिक ट्रैफिक वृद्धि",
      summary: "सर्च इंजन रैंकिंग सुधारने, तकनीकी कमियां ठीक करने और सही दर्शकों को आकर्षित करने हेतु विशेषज्ञ सलाह।",
      body: [
        "हम संपूर्ण वेबसाइट ऑडिट के साथ शुरुआत करते हैं — तकनीकी बाधाओं और कंटेंट अंतराल की पहचान कर एक अनुकूलित एसईओ रोडमैप तैयार करते हैं।",
        "कीवर्ड रिसर्च और ऑन-पेज व ऑफ-पेज ऑप्टिमाइजेशन के माध्यम से आपकी वेबसाइट को गूगल के शीर्ष परिणामों में स्थान दिलाते हैं।",
        "हम लगातार प्रदर्शन और रैंकिंग मेट्रिक्स का विश्लेषण करते हैं ताकि दीर्घकालिक ऑर्गेनिक विकास सुनिश्चित हो सके।",
      ],
      highlights: ["वेबसाइट ऑडिट", "कीवर्ड रिसर्च", "ऑन-पेज एवं ऑफ-पेज एसईओ", "परफॉर्मेंस ट्रैकिंग"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      oldPath: "/home/internetmarketing",
      name: "इंटरनेट मार्केटिंग",
      heading: "स्मार्ट एवं डेटा-संचालित मार्केटिंग रणनीतियां",
      summary: "रणनीतिक ऑनलाइन अभियानों द्वारा ब्रांड पहचान, जुड़ाव और बिक्री में निरंतर वृद्धि।",
      body: [
        "इंटरनेट मार्केटिंग एसईओ, सोशल मीडिया, ईमेल और पीपीसी विज्ञापनों के जरिए सही दर्शकों को आकर्षित और संलग्न करती है।",
        "यह केवल एक वेबसाइट रखने से कहीं अधिक है: यह एक सक्रिय डिजिटल उपस्थिति बनाने के बारे में है जो वास्तविक व्यावसायिक परिणाम लाती है।",
      ],
      highlights: ["एसईओ एवं सोशल मीडिया", "ईमेल अभियान", "पे-पर-क्लिक (PPC)", "रीयल-टाइम एनालिटिक्स"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      oldPath: "/home/mobileappconsulting",
      name: "मोबाइल ऐप कंसल्टिंग",
      heading: "सफल मोबाइल ऐप विकास एवं आर्किटेक्चर रोडमैप",
      summary: "उपयोगकर्ता-अनुकूल, स्केलेबल और आधुनिक मोबाइल समाधानों के लिए विशेषज्ञ मार्गदर्शन।",
      body: [
        "हम जटिल व्यावसायिक विचारों को सहज और उच्च प्रदर्शन वाले मोबाइल ऐप में बदलने में मदद करते हैं। सही टेक स्टैक, सुरक्षा और स्केलेबिलिटी सुनिश्चित करते हैं।",
        "बैकएंड सिस्टम इंटीग्रेशन और परफॉर्मेंस ऑप्टिमाइजेशन के साथ ऐप को समय पर और बजट के भीतर लॉन्च किया जाता है।",
      ],
      highlights: ["प्लेटफ़ॉर्म व आर्किटेक्चर रणनीति", "सुरक्षा मार्गदर्शन", "बैकएंड एकीकरण", "परफॉर्मेंस ऑप्टिमाइज़ेशन"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      oldPath: "/home/projectmanagement",
      name: "प्रोजेक्ट मैनेजमेंट",
      heading: "सटीक निष्पादन एवं समयबद्ध प्रोजेक्ट डिलीवरी",
      summary: "समय पर और सफल डिलीवरी सुनिश्चित करने के लिए रणनीतिक योजना और पारदर्शी निष्पादन।",
      body: [
        "हम एजाइल, स्क्रम और वाटरफॉल पद्धतियों का उपयोग करके प्रोजेक्ट की प्रगति, समयसीमा और बजट पर पूर्ण नियंत्रण रखते हैं।",
        "जोखिम प्रबंधन और स्टेकहोल्डर संचार के माध्यम से प्रोजेक्ट को बिना किसी रुकावट के सफलतापूर्वक पूरा किया जाता है।",
      ],
      highlights: ["एजाइल / स्क्रम / वाटरफॉल", "जोखिम प्रबंधन", "स्टेकहोल्डर संचार", "स्कोप एवं समय नियंत्रण"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      oldPath: "/home/naacnba",
      name: "NAAC एवं NBA प्रत्यायन परामर्श",
      heading: "शैक्षणिक संस्थानों के लिए NAAC / NBA मान्यता मार्गदर्शन",
      summary: "उच्च शिक्षण संस्थानों को सुचारू प्रत्यायन और उच्चतम ग्रेडिंग की दिशा में पूर्ण मार्गदर्शन।",
      body: [
        "हम NAAC और NBA प्रत्यायन प्रक्रिया के लिए संस्थानों की तत्परता का मूल्यांकन और संपूर्ण डेटा डिजिटलीकरण में सहायता करते हैं।",
        "हमारा आंतरिक आईक्यूएसी (IQAC) ईआरपी सॉफ्टवेयर संस्थान को मूल्यांकन से लेकर मान्यता प्राप्ति तक भविष्यसूचक अंतर्दृष्टि प्रदान करता है।",
      ],
      highlights: ["तैयारी का मूल्यांकन", "IQAC वर्कफ़्लो ERP", "विशेषज्ञ परामर्श", "भविष्यसूचक एक्रिडिटेशन विश्लेषण"],
      icon: "GraduationCap",
    },
  ],

  or: [
    {
      slug: "software-development",
      oldPath: "/home/softwaredevelopment",
      name: "ସଫ୍ଟୱେର୍ ବିକାଶ",
      heading: "କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟରିଂ ସେବା",
      summary: "ବିଭିନ୍ନ ଶିଳ୍ପ ପାଇଁ ଅତ୍ୟାଧୁନିକ, ସୁରକ୍ଷିତ ଏବଂ ଉଚ୍ଚ କାର୍ଯ୍ୟଦକ୍ଷତା ବିଶିଷ୍ଟ ସଫ୍ଟୱେର୍ ସମାଧାନ।",
      body: [
        "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ଏକ ଅଗ୍ରଣୀ ଆଇଟି କମ୍ପାନୀ ଯାହା ପୂର୍ବ ଭାରତ, ୟୁଏଇ ଏବଂ ୟୁକେରେ ବିଶ୍ୱସ୍ତରୀୟ ସମାଧାନ ପ୍ରଦାନ କରେ। ଏହା ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର ଏବଂ ବରିଷ୍ଠ ଇଞ୍ଜିନିୟରଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ।",
        "ଆମେ ବାସ୍ତବ ବ୍ୟବସାୟିକ ଆହ୍ୱାନର ସମାଧାନ ପାଇଁ ଉଚ୍ଚ ବୈଷୟିକ ଜ୍ଞାନକୌଶଳ ବ୍ୟବହାର କରୁ, ଯାହା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ ଓ ଦୀର୍ଘସ୍ଥାୟୀ।",
        "ଆମର ସେବାଗୁଡ଼ିକ ମଧ୍ୟରେ ୱେବ୍ ଆପ୍ଲିକେସନ୍, ମୋବାଇଲ୍ ଆପ୍, ଏଣ୍ଟରପ୍ରାଇଜ୍ ସିଷ୍ଟମ୍ ଏବଂ ଅଟୋମେସନ୍ ସାମିଲ।",
      ],
      highlights: ["ୱେବ୍ ଆପ୍ଲିକେସନ୍", "ମୋବାଇଲ୍ ଆପ୍ସ", "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସିଷ୍ଟମ୍", "ଅଟୋମେସନ୍ ଟୁଲ୍ସ"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      oldPath: "/home/webapplication",
      name: "ୱେବ୍ ଆପ୍ଲିକେସନ୍ ବିକାଶ",
      heading: "ସୁରକ୍ଷିତ ୱେବ୍ ଆର୍କିଟେକ୍ଚର ଓ ରକ୍ଷଣାବେକ୍ଷଣ",
      summary: "ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ କଷ୍ଟମ୍-ବିଲ୍ଟ, ସ୍ୱୟଂଚାଳିତ ଏବଂ ଉଚ୍ଚ ମାନର ୱେବ୍ ସମାଧାନ।",
      body: [
        "୧୩ ବର୍ଷରୁ ଅଧିକ ଅଭିଜ୍ଞତା ଏବଂ ବିଶ୍ୱବ୍ୟାପୀ ୩୦୦+ ଗ୍ରାହକଙ୍କ ସହ, ଆମର ୱେବ୍ ଟିମ୍ ଉଚ୍ଚମାନର ୱେବ୍ ସଲ୍ୟୁସନ୍ ପ୍ରଦାନ କରେ।",
        "ପ୍ରତ୍ୟେକ ପ୍ରକଳ୍ପ ଆରମ୍ଭ ପୂର୍ବରୁ ଆମେ ବ୍ୟବସାୟିକ ଆବଶ୍ୟକତା ଓ ପ୍ରତିଯୋଗିତା ଉପରେ ଗଭୀର ଗବେଷଣା କରୁ।",
        "ପ୍ରଥମ ଦିନରୁ ହିଁ ସୁରକ୍ଷା ଓ ଉଚ୍ଚ ଗୁଣବତ୍ତା ଉପରେ ଗୁରୁତ୍ୱ ଦିଆଯାଏ ଯାହା ଡାଟା ଚୋରି ଓ ଅନଧିକୃତ ପ୍ରବେଶକୁ ରୋକିଥାଏ।",
      ],
      highlights: ["ବ୍ୟବସାୟ ବିଶ୍ଳେଷଣ", "ବଜାର ଓ ପ୍ରତିଯୋଗିତା ଗବେଷଣା", "ସୁରକ୍ଷା-ପ୍ରଥମ ଆର୍କିଟେକ୍ଚର", "ଆଧୁନିକ ଡିଜାଇନ୍ ମାନଦଣ୍ଡ"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      oldPath: "/home/digitalmarketing",
      name: "ଡିଜିଟାଲ୍ ମାର୍କେଟିଂ",
      heading: "ବ୍ରାଣ୍ଡ ପ୍ରଚାର ଓ ଡିଜିଟାଲ୍ ଅଭିବୃଦ୍ଧି ରଣନୀତି",
      summary: "SEO, ସୋସିଆଲ୍ ମିଡିଆ ଏବଂ ଟାର୍ଗେଟେଡ୍ ବିଜ୍ଞାପନ ମାଧ୍ୟମରେ ଅନଲାଇନ୍ ଅଭିବୃଦ୍ଧି।",
      body: [
        "ଆଜିର ଡିଜିଟାଲ୍ ଯୁଗରେ ଗ୍ରାହକଙ୍କ ବିଶ୍ୱାସ ଜିତିବା ଅତ୍ୟନ୍ତ ଜରୁରୀ। ଆମେ ସଠିକ୍ ଦର୍ଶକଙ୍କ ନିକଟରେ ଆପଣଙ୍କ ବ୍ରାଣ୍ଡ ପହଞ୍ଚାଉ।",
        "ଆମର ମାର୍କେଟିଂ ରଣନୀତି ଆପଣଙ୍କ ୱେବସାଇଟ୍ କୁ ଆସୁଥିବା ଲୋକଙ୍କୁ ନିୟମିତ ଗ୍ରାହକରେ ପରିଣତ କରିବାରେ ସାହାଯ୍ୟ କରେ।",
      ],
      highlights: ["ସୋସିଆଲ୍ ଓ ଭିଡିଓ ମାର୍କେଟିଂ", "ବିଜ୍ଞାପନ ଅଭିଯାନ", "ଲିଡ୍ ଜେନେରେସନ୍", "ବ୍ରାଣ୍ଡ ପ୍ରସାର"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      oldPath: "/home/seoconsulting",
      name: "SEO ପରାମର୍ଶ",
      heading: "ସର୍ଚ୍ଚ ଇଞ୍ଜିନ୍ ର‍୍ୟାଙ୍କିଙ୍ଗ୍ ଓ ଟ୍ରାଫିକ୍ ବୃଦ୍ଧି",
      summary: "ଗୁଗୁଲ୍ ରେ ଉଚ୍ଚ ସ୍ଥାନ ହାସଲ କରିବା ଏବଂ ଟେକ୍ନିକାଲ୍ ତ୍ରୁଟି ସଂଶୋଧନ ପାଇଁ ବିଶେଷଜ୍ଞ ପରାମର୍ଶ।",
      body: [
        "ପ୍ରଥମେ ଆମେ ୱେବସାଇଟ୍ ର ସମ୍ପୂର୍ଣ୍ଣ ଅଡିଟ୍ କରି ସମସ୍ତ ତ୍ରୁଟି ଚିହ୍ନଟ କରୁ ଏବଂ କଷ୍ଟମ୍ SEO ଯୋଜନା ପ୍ରସ୍ତୁତ କରୁ।",
        "କୀୱାର୍ଡ ରିସର୍ଚ୍ଚ, ଅନ୍-ପେଜ୍ ଏବଂ ଅଫ୍-ପେଜ୍ SEO ମାଧ୍ୟମରେ ୱେବସାଇଟ୍ ର ଗୁଣବତ୍ତା ବୃଦ୍ଧି କରାଯାଏ।",
        "ଦୀର୍ଘକାଳୀନ ଅର୍ଗାନିକ୍ ଟ୍ରାଫିକ୍ ବୃଦ୍ଧି ପାଇଁ ଆମେ ନିରନ୍ତର ପରଫରମାନ୍ସ ଅନୁଧ୍ୟାନ କରୁ।",
      ],
      highlights: ["ୱେବସାଇଟ୍ ଅଡିଟ୍", "କୀୱାର୍ଡ ଗବେଷଣା", "ଅନ୍-ପେଜ୍ ଓ ଅଫ୍-ପେଜ୍ SEO", "କାର୍ଯ୍ୟଦକ୍ଷତା ବିଶ୍ଳେଷଣ"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      oldPath: "/home/internetmarketing",
      name: "ଇଣ୍ଟରନେଟ୍ ମାର୍କେଟିଂ",
      heading: "ସ୍ମାର୍ଟ ଅନଲାଇନ୍ ମାର୍କେଟିଂ ରଣନୀତି",
      summary: "ଅନଲାଇନ୍ ବିଜ୍ଞାପନ ଓ ପ୍ରଚାର ମାଧ୍ୟମରେ ବ୍ରାଣ୍ଡ ପରିଚିତି ଓ ବିକ୍ରି ବୃଦ୍ଧି।",
      body: [
        "ଇଣ୍ଟରନେଟ୍ ମାର୍କେଟିଂ ଦ୍ୱାରା ଆପଣ ଉପଯୁକ୍ତ ଗ୍ରାହକଙ୍କ ସହ ସିଧାସଳଖ ଯୋଡ଼ି ହୋଇପାରିବେ ଏବଂ ଫଳାଫଳ ଟ୍ରାକ୍ କରିପାରିବେ।",
        "କେବଳ ଏକ ୱେବସାଇଟ୍ ଯଥେଷ୍ଟ ନୁହେଁ, ବରଂ ଏକ ସକ୍ରିୟ ଡିଜିଟାଲ୍ ଉପସ୍ଥିତି ସୃଷ୍ଟି କରିବା ଆମର ଲକ୍ଷ୍ୟ।",
      ],
      highlights: ["SEO ଓ ସୋସିଆଲ୍ ମିଡିଆ", "ଇମେଲ୍ ଅଭିଯାନ", "ପେ-ପର୍-କ୍ଲିକ୍ (PPC)", "ରିଅଲ୍-ଟାଇମ୍ ଟ୍ରାକିଂ"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      oldPath: "/home/mobileappconsulting",
      name: "ମୋବାଇଲ୍ ଆପ୍ କନସଲ୍ଟିଂ",
      heading: "ମୋବାଇଲ୍ ଆପ୍ ବିକାଶ ଓ ଆର୍କିଟେକ୍ଚର ପରାମର୍ଶ",
      summary: "ସୁବିଧାଜନକ, ଦ୍ରୁତ ଏବଂ ଉନ୍ନତ ମୋବାଇଲ୍ ଆପ୍ ନିର୍ମାଣ ପାଇଁ ବିଶେଷଜ୍ଞ ମାର୍ଗଦର୍ଶନ।",
      body: [
        "ଜଟିଳ ଧାରଣାକୁ ସରଳ ଏବଂ ସୁରକ୍ଷିତ ମୋବାଇଲ୍ ଆପ୍‌ରେ ପରିଣତ କରିବା ପାଇଁ ଆମେ ଉପଯୁକ୍ତ ପ୍ଲାଟଫର୍ମ ଓ ସୁରକ୍ଷା ନିର୍ଦ୍ଦେଶନା ଦେଉ।",
        "ବ୍ୟାକଏଣ୍ଡ ଇଣ୍ଟିଗ୍ରେସନ୍ ଏବଂ ଆପ୍ କାର୍ଯ୍ୟଦକ୍ଷତା ବୃଦ୍ଧି କରି ଦ୍ରୁତ ଓ ସଫଳ ଡେଲିଭରି ସୁନିଶ୍ଚିତ କରୁ।",
      ],
      highlights: ["ଆର୍କିଟେକ୍ଚର ଓ ପ୍ଲାଟଫର୍ମ ରଣନୀତି", "ସୁରକ୍ଷା ମାର୍ଗଦର୍ଶନ", "ବ୍ୟାକଏଣ୍ଡ ସଂଯୋଗ", "କାର୍ଯ୍ୟଦକ୍ଷତା ସୁଧାର"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      oldPath: "/home/projectmanagement",
      name: "ପ୍ରୋଜେକ୍ଟ ମ୍ୟାନେଜମେଣ୍ଟ",
      heading: "ସଫଳ ଓ ସମୟାନୁବର୍ତ୍ତୀ ପ୍ରକଳ୍ପ ସମ୍ପାଦନ",
      summary: "ସମୟାନୁବର୍ତ୍ତୀ ଓ ସଫଳ ପ୍ରକଳ୍ପ ଡେଲିଭରି ପାଇଁ ସୁନିୟୋଜିତ ଯୋଜନା ଓ କାର୍ଯ୍ୟାନ୍ୱୟନ।",
      body: [
        "ପ୍ରୋଜେକ୍ଟ ମ୍ୟାନେଜମେଣ୍ଟ ଦ୍ୱାରା ଦଳୀୟ କାର୍ଯ୍ୟ ସୁବ୍ୟବସ୍ଥିତ ରହେ ଏବଂ ବଜେଟ୍ ତଥା ସମୟସୀମା ମଧ୍ୟରେ କାର୍ଯ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ ହୁଏ।",
        "ଆଜାଇଲ୍ ଏବଂ ସ୍କ୍ରମ୍ ପଦ୍ଧତି ଅବଲମ୍ବନ କରି ବିପଦ ନିୟନ୍ତ୍ରଣ ଓ ସ୍ପଷ୍ଟ ଯୋଗାଯୋଗ ରକ୍ଷା କରାଯାଏ।",
      ],
      highlights: ["ଆଜାଇଲ୍ / ସ୍କ୍ରମ୍ / ୱାଟରଫଲ୍", "ରିସ୍କ ମ୍ୟାନେଜମେଣ୍ଟ", "ସ୍ପଷ୍ଟ ଯୋଗାଯୋଗ", "ସମୟ ଓ ବଜେଟ୍ ନିୟନ୍ତ୍ରଣ"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      oldPath: "/home/naacnba",
      name: "NAAC ଓ NBA ସ୍ୱୀକୃତି ପରାମର୍ଶ",
      heading: "ଶିକ୍ଷାନୁଷ୍ଠାନ ପାଇଁ NAAC / NBA ସ୍ୱୀକୃତି ମାର୍ଗଦର୍ଶନ",
      summary: "ଉଚ୍ଚ ଶିକ୍ଷାନୁଷ୍ଠାନଗୁଡ଼ିକୁ ସହଜ ସ୍ୱୀକୃତି ଓ ଉଚ୍ଚ ଗ୍ରେଡିଂ ହାସଲ କରିବା ଦିଗରେ ସମ୍ପୂର୍ଣ୍ଣ ସହାୟତା।",
      body: [
        "ଆମେ NAAC ଏବଂ NBA ପ୍ରକ୍ରିୟା ପାଇଁ କଲେଜ ଓ ବିଶ୍ୱବିଦ୍ୟାଳୟମାନଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ଡିଜିଟାଇଜେସନ୍ ଓ ମୂଲ୍ୟାୟନରେ ସାହାଯ୍ୟ କରୁ।",
        "ଆମର ନିଜସ୍ୱ IQAC ERP ଟୁଲ୍ ସାହାଯ୍ୟରେ ସଂସ୍ଥାର କାର୍ଯ୍ୟକଳାପ ସୁପରିଚାଳିତ ହୁଏ ଏବଂ ଭବିଷ୍ୟତ ଫଳାଫଳ ପୂର୍ବାନୁମାନ କରାଯାଇପାରେ।",
      ],
      highlights: ["ପ୍ରସ୍ତୁତି ମୂଲ୍ୟାୟନ", "IQAC ୱାର୍କଫ୍ଲୋ ERP", "ବିଶେଷଜ୍ଞ ପରାମର୍ଶ", "ପ୍ରିଡିକ୍ଟିଭ୍ ଏକ୍ରିଡିଟେସନ୍ ଦୃଷ୍ଟିକୋଣ"],
      icon: "GraduationCap",
    },
  ],
};

export function getLocalizedServices(lang: VoiceLanguage): LocalizedServiceData[] {
  return LOCALIZED_SERVICES[lang] || LOCALIZED_SERVICES.en;
}

export function getLocalizedService(slug: string, lang: VoiceLanguage): LocalizedServiceData | undefined {
  const list = getLocalizedServices(lang);
  return list.find((s) => s.slug === slug) || LOCALIZED_SERVICES.en.find((s) => s.slug === slug);
}
