#ELEN E6770 Next Gen. Network - Final Project
###Sun-Yi Lin (sl3833), Chia-Hao Hsu (ch3141)

##Unary - A simple efficient way to host events

![Home](http://i.imgur.com/GW0UTeB.png)

Sometimes it's just annoying to host an event: everybody has his own prefer time and it's just an nightmare to find out a slot to fit everyone in.

Unary is a application that radically simplifies the process of scheduling events, meetings, appointments, etc. It lets people mutually agree on a time. It's very convenient, intuitive and interactive. There are some feature of this app:

- Do not need to login to host or join an event.
- An straightforward view to know others availablities.
- Super easy way to invite others.

To achieve this goal, we apply special functions to calculate unique identifier for each created event. People who use our application can easily invite guests by sharing this identifier.

Also, we use a self-explanatory diagram, which we call the "Rainbow Chart", to show others' availablities while a new participant is about to join.

##Environment & Tools
Unary is based on Google App Engine, and coded with ~~mouse and keyboard~~ HTML/CSS, JavaScript, Python and LOVE.

###Front-end
There are two main part of our front-end design.

####How to Use It?
The welcoming page is called *home.html*, and our users can choose to create a new event, or join a existed event by the event identifier.

In the *host.html* page, the user can type in his / her  name, the description of the event, and thier disired dates / times. After a simple click on the submit button, the *create.html* will jump out with you unique link of the event. Share it!

Once other people get this link, they can go to *guest.html* and see the details of the event, plus other participants availabilities with a super clear "Rainbow Chart". Tooltips will pop up when you move over you mouse on the colored blocks to show the corresponding dates / times.

Enter your name, choose your favorite color, pick your available dates / times, the click submit. You'll be redirected to the *join.html*, and see your name is already in the "Rainbow Chart". Super easy.

![Guest](http://imgur.com/HUzQGRS.png)

####Open Source Package & Plug-in
The design of our front-end is using **Bootstrap**, it provides a set of elements including the navigation bar, grid patterns and form entities.

The events is stored in JSON format. The rainbow chart is powered by **D3.js**, which is a JavaScript library for manipulating documents based on data. 

Other JavaScript libraries like **jQuery**, **moment.js**, **jscolor.js** and **bootstrap-datetimepicker.js** is also used in our application.

###Back-end
For the back-end, we use **Google App Engine** with Python SDK to build the platform.

####Platform
![GAE](http://notesbyanerd.com/wp-content/uploads/2015/01/google-app-engine.png)

Google App Engine for Python is based on **WebApp2**. It provides the framework for user to build the website. Our website contains four main routes:

- MainPage
  - create
  - host
  - guest
  - join

And all of the routing is defined and handled in the main program - *unary.py*

####Database
![Google Cloud Datastore](http://i.imgur.com/lICrlpX.png)

For the database part, we use Google Cloud Datastore to store the entire event message.

To simplify the whole process, our Datastore only get two column: event\_id & event\_json, you can see that in *Models/Models.py*. So when a user create an event, we provide an event_id for it, and other one who wants to join the event can use the event\_id to get the information.

After the user provide his own information to join the event, we just modify the JSON and update the corresponding event\_json with the event\_id. Simple!

The only thing needs to take care of is that JSON is not a built-in property for Google Cloud Datastore, so what we do is to use its original TextProperty and modify it as JSONProperty to store our event\_json.


##Release
Our project is open source, please feel free to take a look of our code at [GitHub](https://github.com/lsphate/Unary).

For the deployed application, please visit [Unary](http://unary-eventhost.appspot.com/)

