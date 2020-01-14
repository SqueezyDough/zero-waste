/* eslint-disable no-undef */
export { draw };

function draw () {
  // set the dimensions and margins of the graph
  var width = 420;
  var height = 420;
  var margin = 20;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select('#dataSharedChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Create dummy data
  var data = { shared: 15, notShared: 85 };

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(['#ffb500', '#fffadd']);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function (d) { return d.value; })
    .sort(function (a, b) { return d3.ascending(a.value, b.value); });
  var dataReady = pie(d3.entries(data));
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('mySlices')
    .data(dataReady)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function (d) { return (color(d.data.key)); })
    .attr('stroke', 'white')
    .attr('transform', function (d) {
      if (d.data.key === 'shared') { return 'scale(1.1)'; }
    })
    .style('stroke-width', '2px');

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll('mySlices')
    .data(dataReady)
    .enter()
    .append('text')
    .text(function (d) {
      if (d.data.key === 'shared') { return `${d.data.value}%`; }
    })
    .attr('fill', 'white')
    .attr('transform', function (d) { return 'translate(' + arcGenerator.centroid(d) + ')'; })
    .style('text-anchor', 'middle')
    .style('font-size', 28);
}
