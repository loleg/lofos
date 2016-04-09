# Lófos

Electric mobility makes it easy and fun to get from point A to point B, but our range is limited by battery capacities. Personal mobility devices use lightweight batteries and need regular charging. Users of such devices have to rely on the availability of power outlets along the way to further destinations.

At the Energy Hackdays 2016 we have sketched and made a basic app prototype to show some of the functionality we are thinking of. We are also proposing a set of open/crowdsourced datasets that together with a mobile/augmented app would allow users of personal mobility new levels of freedom of movement. We will continue further developing this project with additional research (see notes further down) into the latest data sources for enhancing urban mobility.

[Public concerns](http://bridgeport.dailyvoice.com/news/hoverboard-fires-spark-concerns-about-electric-skateboards/610235/) about "electronic mobility aids" catching fire in transport have led to bans on most [flight carriers](https://www.aircanada.com/en/news/151208.html)

The prototype is made using [Ionic Framework](http://ionicframework.com/docs/), [Raphaël](https://en.wikipedia.org/wiki/Rapha%C3%ABl_(JavaScript_library)) and [Google Maps Elevation API](https://developers.google.com/maps/documentation/elevation/intro).

Demo: http://soda.camp/workshops/2016/lofos
Info: http://github.com/loleg/lofos

## Next data sources

Our next steps are plug in open data sources and/or create a crowdsourced databases to collect the following information:

**Elevation data**

Currently we use Google Maps API to obtain accurate elevation profiles of streets. We would welcome suggestions of other sources of such information. Users of apps like [Ride With GPS](https://ridewithgps.com/) help to create accurate GPS profiles, but this data is not shared with third parties.

**Electric Vehicle battery data**

While there are plenty of individual community projects (e.g. [Segway Battery FAQ](http://www.spinfoot.com/SegwayBatteryFAQ.html)), there does not seem to be any wider effort underway to collect specifications about the power characteristics of personal mobility. Information such as the different ranges, top speeds, drive system (motor) power (wattage), maximum inclines, could be compiled and cross-referenced.

**Public electric sockets**

[PlugShare](http://www.plugshare.com/) ("the world's largest electric vehicle (EV) charging network with a database of 50,000+ charging stations" -[FAQ](http://faq.plugshare.com/article/7-why-should-i-use-plugshare)) connects EV users with charging locations. According to [data.gov](https://www.data.gov/energy/blog/who-uses-open-data), much of the data is sourced in the USA from the Energy Department's Application Programming Interface (API) for the [Alternative Fuels Data Center](http://www.afdc.energy.gov/locator/stations/). We would like to encourage similar open databases worldwide.

**Traffic**

Construction sites and other obstacles to personal mobility, status of traffic lights, special lanes for electric vehicles - there is a world of data possibilities in this area. The engagement of the Opendata.ch [Transport Working Group](http://transport.opendata.ch) in Switzerland and similar efforts worldwide should help to open data sources to enrich applications like ours.

### Next interfaces

We are fascinated by data visualisation in Virtual/Augmented/3D/Printed/QR/NFC and other "tangible" contexts, and are keen to explore interfaces for our application that allow viewing such information on the go. Here are some inspiring commercial and research projects which make this connection of personal mobility and new data sources and new data interfaces: [Daqri](http://hardware.daqri.com/), [RideOnVision](https://www.rideonvision.com/), [Catapult](http://www.dailydot.com/technology/augmented-reality-bike-helmet-future-cities-catapult/) (dailydot), [In-place Augmented Reality](https://www.researchgate.net/publication/221221338_In-Place_Augmented_Reality) (researchgate.net)

## Team

- [Oleg](http://loleg.github.io)
- [Didier](http://www.eco-villages.ch/forum/hackathon-2016)

### Trivia

**Sidenote:** the name of the project comes from the Greek λόφος, meaning 'hills'. We are inspired by [Odysseus](http://polasekj.sweb.cz/photo.htm) and his hilly birthplace [Ithaka](https://en.wikipedia.org/wiki/Ithaca).

[![Port Bathy and Capital of Ithaca](https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Port_Bathy_and_Capital_of_Ithaca.jpg/1200px-Port_Bathy_and_Capital_of_Ithaca.jpg)](Port Bathy and Capital of Ithaca) by Edward Dodwell, Public Domain.
