## Welcome to Dant.tv

Welcome to my video social media application. The front end was built using Next.js, TypeScript, Tailwind CSS and Framer-Motion.
The middleware was implemented using a combination of Next.js API and Sanity.IO's own GROQ (Graph-Relational Object Queries) Query language.
This project features a sanity.io CMS backend. Content can be entered manually by an ADMIN through the sanity studio or by users; uploading content via the UI.
Authentication and session management is handled using google's new oAuth 2.0.

THe application features and functionalities include; account / profile creation, video upload, commenting and liking. With page transitions and micro-interactions throughout.
This was a great project to build, I had a lot of fun. There are some extra features I could implement; comment editing/deleting, key svg animations for functionalities like video upload etc but at the time of deployment I had reached the stage of diminishing returns in terms of learning, which I try to prioritise.

Post deployment I noticed some bugs on mobile; IOS doesnt preview video the same way as desktop, so on mobile the videos dont appear until you click on them and they start playing. There are also some minor conflicts between tailwind and ios with some images not fully rendering.
