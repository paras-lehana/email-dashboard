# Lehana Mailer - The Smartest Mailer

The full demo is hosted on [YouTube](https://youtu.be/AHAYakYAcQs). 

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

