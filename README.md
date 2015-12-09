#ELEN E6770 Next Gen. Network - Final Project
####Sun-Yi Lin (sl3833), Chia-Hao Hsu (ch3141)

##Unary - A simple efficient way to host events

![Home](http://i.imgur.com/GW0UTeB.png)

Sometimes it's just annoying to host an event: everybody has his own prefer time and it's just an nightmare to find out a slot to fit everyone in.

Unary is a application that radically simplifies the process of scheduling events, meetings, appointments, etc. It lets people mutually agree on a time. It's very convenient, intuitive and interactive. There are some feature of this app:

- Do not need to login to host or join an event.
- An straightforward view to know others availablities.
- Super easy way to invite others.

To achieve this goal, we apply special functions to calculate unique identifier for each created event. People who use our application can easily invite guests by sharing this identifier.

Also, we use a self-explanatory diagram, which we call the "rainbow chart", to show others' availablities while a new participant is about to join.

![Guest](http://imgur.com/HUzQGRS.png)

##Environment & Tools
Unary is based on Google App Engine, and coded with ~~mouse and keyboard~~ HTML/CSS, JavaScript, Python and LOVE.

###Front-end
The design of our front-end is using **Bootstrap**, it provides a set of elements including the navigation bar, grid patterns and form entities.

The events is stored in JSON format. The rainbow chart is powered by **D3.js**, which is a JavaScript library for manipulating documents based on data. 

Other JavaScript libraries like **jQuery**, **moment.js**, **jscolor.js** and **bootstrap-datetimepicker.js** is also used in our application.

###Back-end

#### Platform
![GAE](http://notesbyanerd.com/wp-content/uploads/2015/01/google-app-engine.png)

For our backend, we use Google App Engine with Python SDK to build the platform.
Google App Engine for Python is based on WebApp2. It provides the framework for user to build the website. So basically, this website contains four main routes:

- MainPage
  - create
  - host
  - guest
  - join

And all of the routing is defined in the main program - unary.py

#### Database
![Google Cloud Datastore](http://i.imgur.com/lICrlpX.png)

For the database part, we use Google Cloud Datastore to store the entire event message. To simplify the whole process, our Datastore only get two column: event_id & event_json, you can see that in Models/Models.py. So when user create a event, we provide an event_id for the user, and other one who want to join the event can use the event id to get the information. After the user provide his own information to join the event, we just modify the json and update the event_json for the specific event with the event_id. Simple!
The only thing needs to take care of is that JSON is not a built-in property for Google Datastore, so what we do is to use its original TextProperty and modify it as JSONProperty to store our event_json.


##Release
Our project is open source, please feel free to take a look of our code at [GitHub](https://github.com/lsphate/Unary).

For the deployed application, please visit [Unary](http://unary-eventhost.appspot.com/)

