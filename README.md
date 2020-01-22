# Zero Waste
![](https://github.com/SqueezyDough/zero-waste/blob/master/lib/github-files/intro.png?)
![](https://github.com/SqueezyDough/zero-waste/blob/master/lib/github-files/map.png?)
![](https://github.com/SqueezyDough/zero-waste/blob/master/lib/github-files/bars.png?)
![](https://github.com/SqueezyDough/zero-waste/blob/master/lib/github-files/routes.png?)

## Install
### Create directory
Create a directory where you want to clone the repository on your computer.

### Move to directory
```
// Open up your terminal (Mac OS) or command prompt (Windows) and type the following
cd <path to your directory>

// Clone repository
git clone https://github.com/SqueezyDough/zero-waste.git```

// Install packages
npm install

// Start application
npm run start
```

## Development
```
// Install application
Make sure you've done all the steps above, but don't start the application yet.

// Start application via nodemon
npm run dev

// Start scss watcher
npm run watch

// View application
Type `http://localhost:3000` in your browser

// View browsersync control panel
Type `http://localhost:3001` in your browser
```

## Frameworks and libraries
* Express: Create a new json file from combined datasets to increase client side performance.
* Express-handlebars: Create modular html templates
* Gulp/sass: Create modular css files
* EsLint: Detect code style errors
* Nodemon: Auto-refresh js changes
* Browsersync: Auto-refresh css changes
* D3.js: Create dynamic data visualizations
* bodymovin: Export crisp svg animations

## Data
### Used datasets
* Client dataset containg 30.000+ records of generated waste per address in Amsterdam. (Private dataset)
* Geolocations dataset of Amsterdam containing all districts in Amsterdam. Can be used to create a map of Amsterdam. Contains 99 records. (Public dataset)

### Server side pre-processed data
The client dataset contains over 30.000 records. Processinng this data in the client takes a lot of load time during runtime. 
Therefore, the majority of the data is pre-processed on the server. It adds the sum of all addresses (per day) in a district to the district in the Geolocations dataset. This reduces the size from 7,2MB to only 97KB and significantly reduces the load time. It also makes it easier to transform the data for d3.js. 

## Client side processing
I calculate thing like the total sum per day in a district and the total average from all available data.

## Sources
### Choropleth map example
https://github.com/JulesBlm/RailAmsterdam

### Pie chart example
https://www.d3-graph-gallery.com/graph/pie_annotation.html

### Form input hints
https://jsfiddle.net/273ntk5s/2/
