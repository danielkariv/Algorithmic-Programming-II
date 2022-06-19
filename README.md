# Algorithmic-Programming-II

This repository contains project made for Algorithmic Programming II course.
The project is a type of Whatsapp clone, with multiple clients (web,mobile and desktop) and a server.

Team Members:
- Daniel Yanovsky [@dani020799](https://github.com/dani020799)
- Daniel Kariv [@danielkariv](https://github.com/danielkariv)

## Android App(Part 3):
In this part we were asked to create:
- Chat app running on Android using our backend server.
- Support Firebase for notification, and update chats with newer messages/contacts.

![android preview](https://user-images.githubusercontent.com/38776931/174488348-42dfe3b5-7d7c-4d2c-bba8-9b5c53bc30cf.png)

### How to run:
For running locally, open android project (MyApplication), and run it. </br>
Open backend server (Messenger-WebAPI) and run it. </br>
Note: you can also open react webapp (web-app) and run it so you can chat with browser client. </br>
From here create account, add new contacts and talk with each other. </br>

Bouns Feature:
For running on university server, it requires some changes. </br>
First, the server is setup under user 'karivda1' in AdvancedProgrammingII/ folder. </br>
You can running it with dotnet run --project <Project_Path>. </br>
If you run tunnel to your local PC (like shown in docs), Android app and Web app will work (as long as it points to localhost:5123 locally, and 10.0.2.2:5123 in Android).  </br>
You can also run it using Ngrok which will expose it to internet. I have set it up in karivda1/ngrok folder, so all needed to run is './ngrok http 5123'. </br>
But with Ngrok, there is a small issue. It runs the connection over HTTPS, while till now all the project was running on HTTP. </br>
the API we were asked to implement can't handle it well (api doesn't return what protocol contact server is on). </br>
Both web app and android app needs some code changes to switch from http only to https only. </br>
In case of Android app there are 3 spots in class 'ChatAPI.java' that need to be changed:
- line 44, change "http://" to "https://".
- line 284, change "http://" to "https://".
- line 319, change "http://" to "https://".
![android changes](https://user-images.githubusercontent.com/38776931/174488377-7434cbb9-a9d2-4e79-8e14-6cd3574e4176.png)

After those changes, the android app can now change server url (in Options menu), and successfuly connect and talk with our backend. </br>

## Back-End (Part 2):
In this part we were asked to create:
- Reviews list page where you can add, edit and remove reviews (Reviews-WebApp). 
- API backend that allows the front end to work with it (Messenger-WebAPI project).
- Add SignalR, which adds real time commucation support (HubForProject project).
- Fix the front end website to work with API and SignalR (web-app project).

### How to run:
For the reviews website, it is a standalone app. So all it is needed is to open Reviews-WebApp project, and run it (which will start the browser and open a browser with the website).

For the rest of the project, you will need to:
- Download/Clone this repo, and get into /part-2.
- Like in Part 1, get to web-app folder and run npm install, and afterward run npm start.
- Open Messenger-WebAPI project and run it. It will open a server and a browser with an API testing website (ignore it but don't close it).
- Open HubForProject prject and run it. It will open a server and a browser with demo website (ignore it but don't close it).
- Notice: no users made beforehand, so create your own when testing.

## Front-End (Part 1):
We were asked to make a chat application using React, and Bootstrap. </br>
the backend is hardcoded for now, and is running in client side for this part. </br>
Our chat application has support for:
- login and register users.
- send messages with text or with files (audio, video or image).
- support viewing files in application, in a popup.

We used those packages in this part:
- [react-router](https://reactrouter.com/)
- [react-bootstrap](https://react-bootstrap.github.io/)

![Screen Shot 2022-04-27 at 00 40 01](https://user-images.githubusercontent.com/38776931/165397331-f9b1184c-d301-44c4-a38a-dc4a13321079.png)

### How to run:
- Download/Clone this repo, and get into /part-1/web-app/.
- run npm install (download needed packages).
- run npm start.
- option: use DanielY account in login to view an account with multiple chat members and different types of messages.
