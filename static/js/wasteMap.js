// source: https://github.com/JulesBlm/RailAmsterdam

/* eslint-disable no-undef */
export { drawMap };

function drawMap () {
  const svg = d3.select('#map');
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const projection = d3.geoAlbers()
    .center([4.9, 52.366667])
    .parallels([51.5, 51.49])
    .rotate(120)
    .scale(250000)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath()
    .projection(projection);

  const district = { A: 'Centrum', B: 'Westpoort', E: 'West', M: 'Oost', K: 'Zuid', F: 'Nieuw west', N: 'Noord', T: 'Zuidoost' };

  const colorDistricts = d3.scaleLinear()
    .domain([0, 50000000])
    .range(['#fffadd', '#ffb500']);

  d3.queue()
    .defer(d3.json, './static/data/output/wasteByDistrict.json')
    .await(ready);

  function ready (error, jsonMapData) {
    if (error) throw error;

    /* Districts */
    const districts = topojson.feature(jsonMapData, jsonMapData.objects.buurten).features;

    // Draw neighborhoods
    svg.selectAll('.neighborhood')
      .data(districts)
      .enter().insert('g')
      .append('path')
      .attr('class', 'neighborhood')
      .attr('d', path)
      .attr('fill', function (d) {
        // console.log(d.properties.waste.total);
        return colorDistricts(d.properties.waste.total);
      })
      .append('title')
      .text(function (d) { return `${district[d.properties.Stadsdeel_code]}: ${d.properties.Buurtcombinatie}, Totaal: ${d.properties.waste.total}`; });

    // Draw borders neighborhoods
    svg.append('path')
      .attr('class', 'neighborhood-borders')
      .attr('d', path(topojson.mesh(jsonMapData, jsonMapData.objects.buurten, function (a, b) { return a !== b; })));
  };
}
