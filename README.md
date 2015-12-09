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

##Release
Our project is open source, please feel free to take a look of our code at [GitHub](https://github.com/lsphate/Unary).

For the deployed application, please visit [Unary](http://unary-eventhost.appspot.com/)

