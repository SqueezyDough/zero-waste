// source: https://github.com/JulesBlm/RailAmsterdam

/* eslint-disable no-undef */
export { drawMap };

function drawMap () {
  // // #region AMS MAP D3
  // const mapSvg = d3.select('#map');
  // const mapWidth = +mapSvg.attr('width');
  // const mapHeight = +mapSvg.attr('height');

  // const projection = d3.geoAlbers()
  //   .center([4.9, 52.366667])
  //   .parallels([51.5, 51.49])
  //   .rotate(120)
  //   .scale(250000)
  //   .translate([mapWidth / 2, mapHeight / 2]);

  // const path = d3.geoPath()
  //   .projection(projection);

  // const district = { A: 'Centrum', B: 'Westpoort', E: 'West', M: 'Oost', K: 'Zuid', F: 'Nieuw west', N: 'Noord', T: 'Zuidoost' };

  // const colorDistricts = d3.scaleLinear()
  //   .domain([0, 50000000])
  //   .range(['#fff', '#ffb500']);

  // d3.queue()
  //   .defer(d3.json, './static/data/output/wasteByDistrict.json')
  //   .await(UpdateMap);

  // // #endregion

  // function UpdateMap (error, jsonMapData) {
  //   if (error) throw error;

  //   /* Districts */
  //   const districts = topojson.feature(jsonMapData, jsonMapData.objects.buurten).features;

  //   // Draw neighborhoods
  //   mapSvg.selectAll('.neighborhood')
  //     .data(districts)
  //     .enter().insert('g')
  //     .append('path')
  //     .attr('class', 'neighborhood')
  //     .attr('d', path)
  //     .attr('fill', function (d) {
  //       // console.log(d.properties.waste.total);
  //       return colorDistricts(d.properties.waste.total);
  //     })
  //     .append('title')
  //     .text(function (d) { return `${district[d.properties.Stadsdeel_code]}: ${d.properties.Buurtcombinatie}, Totaal: ${d.properties.waste.total}`; });

  //   // Draw borders neighborhoods
  //   mapSvg.append('path')
  //     .attr('class', 'neighborhood-borders')
  //     .attr('d', path(topojson.mesh(jsonMapData, jsonMapData.objects.buurten, function (a, b) { return a !== b; })));
  // };
}
