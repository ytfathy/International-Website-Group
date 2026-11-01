/* ============================================================
   CONTENT FILE — edit ONLY this file to update the website.
   ADD A VIDEO: add one line to `videos` with grade, subject, title, url.
   It appears automatically in the right place. Any subject without
   a video shows "Coming Soon".
   ============================================================ */
window.SITE = {
  name: "International Education Egypt",

  grades: [
    { id: "8", name: "Grade 8", emoji: "🚀", color: "purple", blurb: "Science, Math, German, Arabic and Social Studies demos." },
    { id: "6", name: "Grade 6", emoji: "🔭", color: "blue",   blurb: "Science, Math, German, Arabic and Social Studies demos." }
  ],

  subjects: [
    { id: "science", name: "Science",        emoji: "🔬", color: "turquoise" },
    { id: "math",    name: "Math",           emoji: "➗", color: "coral" },
    { id: "german",  name: "German",         emoji: "🇩🇪", color: "yellow" },
    { id: "arabic",  name: "Arabic",         native: "لغة عربية", emoji: "📖", color: "purple" },
    { id: "social",  name: "Social Studies", native: "دراسات اجتماعية", emoji: "🌍", color: "blue" }
  ],

  // ---- VIDEOS: grade + subject + title + description + url ----
  // Use subject: "review" for the special Grade 8 Quarter 1 review card.
  videos: [
    { grade: "6", subject: "social",  title: "Grade 6 – Social Studies", description: "Demonstration video of the Grade 6 Social Studies educational app.", url: "https://youtu.be/Cu2fVLRio4g" },
    { grade: "6", subject: "math",    title: "Grade 6 – Math",           description: "Demonstration video of the Grade 6 Math educational app.",           url: "https://youtu.be/ykXs_INvgls" },
    { grade: "6", subject: "science", title: "Grade 6 – Science",        description: "Demonstration video of the Grade 6 Science educational app.",        url: "https://youtu.be/vYZcpDHHGPQ" },
    { grade: "6", subject: "german",  title: "Grade 6 – German Story",   description: "A German story video from the Grade 6 German content.",              url: "https://youtube.com/shorts/UhSF4krLZBc" },

    { grade: "8", subject: "social",  title: "Grade 8 – Social Studies", description: "Demonstration video of the Grade 8 Social Studies educational app.", url: "https://youtu.be/ZYvCkvvRLgc" },
    { grade: "8", subject: "arabic",  title: "Grade 8 – Arabic",         description: "Demonstration video of the Grade 8 Arabic educational app.",         url: "https://youtu.be/kvJYI8cK8QM" },
    { grade: "8", subject: "math",    title: "Grade 8 – Math",           description: "Demonstration video of the Grade 8 Math educational app.",           url: "https://youtu.be/xX4NGvdm_TI" },
    { grade: "8", subject: "science", title: "Grade 8 – Science",        description: "Demonstration video of the Grade 8 Science educational app.",        url: "https://youtu.be/O2yNPHb1-eI" },

    { grade: "8", subject: "review",  title: "Grade 8 – Quarter 1 All Subjects Review", description: "A review video covering all Grade 8 subjects for Quarter 1.", url: "https://youtube.com/shorts/5TarldqwIUA" }
  ],

  // ---- KIDS ZONE GAME: place your original file at games/math-mission.html ----
  game: {
    title: "Math Mission: Multiplication Heroes",
    file: "games/math-mission.html",
    description: "A multiplication adventure with missions across five islands (3, 6, 7, 8 and 9), questions and scoring, mental math tips, and read-aloud audio."
  },

  // ---- OUR ADS: add { title, category, description, url } ----
  ads: [
    // { title: "Back to School Campaign", category: "Campaigns", description: "Short description.", url: "https://youtu.be/XXXXXXXXXXX" }
  ],
  adCategories: ["All", "Campaigns", "Apps", "Games"],
  adPlaceholders: 3,

  // ---- CONTACT / SOCIAL: a link only appears when its value is filled in ----
  contact: { email: "", phone: "", facebook: "", instagram: "", youtube: "", tiktok: "" }
};
