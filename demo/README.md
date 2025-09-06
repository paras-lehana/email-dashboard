# Lehana Mailer - The Smartest Mailer

The full demo is hosted on [YouTube](https://youtu.be/AHAYakYAcQs). The summary is also provided on YouTube to help you navigate features.

## YouTube Timeline

Summary for [Demo - Email Dashboard (Unstop Hackathon)](https://www.youtube.com/watch?v=AHAYakYAcQs). You can click the time to land exactly on the feature. 

Smart Mailing System Demo: Live Email Dashboard Features and AI Categorization Explained

[00:08](https://www.youtube.com/watch?v=AHAYakYAcQs&t=8) Demo of a smart mailing system with authentication features.
- The system allows live email sending with security measures to prevent spamming.
- It includes default authentication credentials and utilizes AI to categorize and recall past user interactions.

[02:10](https://www.youtube.com/watch?v=AHAYakYAcQs&t=130) Demonstration of AI-powered email categorization system.
- The dashboard resets and categorizes emails using AI, ensuring no memory retention of past data.
- Sample emails are processed and stored in the database for future interaction and analysis.

[04:07](https://www.youtube.com/watch?v=AHAYakYAcQs&t=247) The email dashboard utilizes AI for real-time categorization and sentiment analysis.
- The dashboard sorts emails into categories like positive, negative, and neutral, improving organization.
- It features an extraction tool to retrieve information, though its effectiveness may vary based on content.

[06:05](https://www.youtube.com/watch?v=AHAYakYAcQs&t=365) AI email composer with customizable responses enhances customer support.
- The AI can analyze customer emails to extract critical information such as names, companies, and requirements.
- Users can adjust the tone and formality of the AI-generated responses, offering a user-friendly experience before sending.

[08:06](https://www.youtube.com/watch?v=AHAYakYAcQs&t=486) Introduction to the Email Dashboard and its key features.
- The dashboard categorizes emails into urgent, high, medium, and neutral priorities for efficient management.
- Analytics provide insights on email volume, response times, and team performance, enhancing customer support effectiveness.

[10:04](https://www.youtube.com/watch?v=AHAYakYAcQs&t=604) Demo showcases email functionality in an integrated dashboard.
- The application is hosted on Vercel and uses Supabase for database management, facilitating email triggers and updates.
- Users can send emails to a designated address, which populates the dashboard in real time after refreshing.

[12:10](https://www.youtube.com/watch?v=AHAYakYAcQs&t=730) Demonstration of email support functionality in a dashboard.
- The user sends a support request email regarding a server issue to the designated support email address.
- The email system checks for unread messages and updates the interface when new emails are received.

[15:43](https://www.youtube.com/watch?v=AHAYakYAcQs&t=943) AI-driven email response and categorization demo.
- The system identifies user issues like server frustrations and auto-generates empathetic replies.
- The dashboard offers functionality to categorize uncategorized emails and review interaction logs.

## Flow & Features
1. The dashboard fetches data from the given GMAIL account. 
2. The data is fed into Supabase DB. This DB will be used to fetch data into the dashboard. 
3. This DB will also store all the replies from the AI or support team and whole email chain.
4. This is also done as the sample shared was in CSV and to demonstrate that any row added to this DB will be reflected in the dashboard. 
5. You can also inspect the DB with user `pravin@linkenite.com` and password `hackerlehana` as I only had this user details. You can also add emails from here and test the demo as it would be difficult for you add real emails in your GMAIL. 
6. The categorization of emails, sentiment analysis and response generation is done via Groq using Llama model. Many other models are configurable in config file. 

## Technologies Used
1. The frontendis hosted on Versel. 
2. Groq AI is used for LLM generation. The model by default is Llama. 
3. Database is on PG via Supabase. 
4. App is built via Next JS. 
5. For GMAIL, Gmail Auth is used. 


## Demo Instructions

### Open Webapp

1. Demo can be executed by two methods.
2. First one is to deploy it on your local. Read Steps 4-6.
3. Second is to run it via public hosted webapp. Skip to Step 7.  
4. To run it on your local, navigate to frontend/ideas-v0.
5. This is built using Next.js, thus, run `npm run dev`. You may need to install dependences. 
6. The webpage can be access at localhost:3000. 
7. You can also access the demo at  [Lehana Mailer Web App](https://v0-ai-support-dashboard.vercel.app/). This requires no local setup and no dependency nightmare as this is hosted on Vercel with integrated LLM, Supabase DB and Gmail Auth. 
8. The demo credentials are user `lehana` and password `hackerlehana`. 

### Run Demo

1. Once you have logged in, you will see the Inbox by default. 
2. To see analytics switch the tab above from INBOX to ANALYTICS.

## Inbox
1. Inbox will list all the mails from the Supabase DB. The supabase is regularly updated via Gmail. 
2. You can click Refresh to refresh data from Supabase. This is done to show you that if you add any data into supabase db, you would see the data here by clicking refresh.
3. The mails by default are uncategorized to show AI categorization in Demo. 

## AI 
1. Once you click, Categorize by AI, you would see all mails going into respective categories of priority and support type. All this is done via AI. 
2. You can extract contact information from the mail by clicking extract information on the right bar. 
3. You can also generate text by AI, choose your tone, choose from samples, and edit it before sending. 

## Send / Receive Mail
1. You can send mail to support email made for this demo, paraslehana@zohomail.in
2. Once the mail is sent, it will be visible in this dashboard. This may take some time as mail servers itself can be slow. 
3. Once you reply to this mail via the dashboard, you can see receiving the reply back to your mail id from paraslehana@zohomail.in itself. 

