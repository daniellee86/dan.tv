## Welcome to Dan.tv

my video social media application.

https://dan-tv.vercel.app/

<img src="./public/logo.png" alt="logo image">

---

Features and functionalities include;

- Account and profile creation.

- Video Uploads.

- Commenting and Liking.

- Search functionality; query against both user account names and video descriptions

- Page transitions and micro-interactions. My favourite being the 'heart beat' interaction when a user 'likes' a video.

I wanted to do something a little different with this project. Initially I intended to create some sort of algorithm and process in which users where rewarded and prometed for posting longer-form content and for leaving more detailed comments.
I noticed how platforms such as youtube are dominated by younger people and that the most popular content tends to be very short form.
There is absolute gold on youtube in terms of content quality when accessing it from an intellectual or cultural standpoint; Videos ranging from lectures by asteemed professors to documentaries that where ground-breaking in thier time of release but have long since forgotten about. However, these types of video seemed to be drowned out but the likes of mr.beast and reaction videos.
To summarize, I wanted to create a platform that allowed high qualtity content to be brought to the fore and quality would be determined on factors such as video length, amounts of comments and average length of comment.

When building the project I started to realise that my initial concept would be extremely hard to implement as I would need to have large datasets in order to build the algorithms and processes needed. I would have to manually create lots of different accounts, upload lots of videos, leave tons of comments etc.
The priority with my projects is always leanring outcomes and to implement this concept I would have to spend a whole load of time just creating 'content'.

I still wanted to create a social media video sharing app similar to tiktok so I decided I would try to focus on making my app 'fun!'. This meant I would build something that looked and felt great to use. I focussed on nice page transitions, fun micro-interactions and in particular the look and feel of the navigation panel; I used neumorphism on the side panel to give it a tangible feel, like the user wasn't interacting with an app but more like a handheld device like a game-boy or tamogotchi. In the future I am going to add more to this project such as sounds, elaborate animations, more interactive elements and something like a rewards system. I will realy try to gameify the experience.

This was a great project to build, I had a lot of fun. There are some extra features I could implement; comment editing/deleting etc but at the time of deployment I had reached the stage of diminishing returns in terms of learning, which I try to prioritise.

<img src="./public/one.png" alt="ui image">
<img src="./public/two.png" alt="ui image">

---

The front end was built using Next.js, TypeScript, Tailwind CSS and Framer-Motion.
Middleware was implemented using a combination of Next.js API and Sanity.IO's own GROQ (Graph-Relational Object Queries) Query language.
This project features a Sanity.io CMS backend; Content can be entered manually by an ADMIN through the sanity studio or by users; uploading content via the UI.
Authentication and session management is handled using google's new oAuth 2.0.

<img src="./public/three.png" alt="ui image">
<img src="./public/four.png" alt="ui image">

---

Post deployment I noticed some bugs on mobile; IOS doesnt preview video the same way as desktop, so on mobile the videos dont appear until you click on them and they start playing. There are also some minor conflicts between tailwind and ios with some images not fully rendering.

---
