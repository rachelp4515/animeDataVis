function drawPie(data, svgName) {
  const pieWidth = 800;
  const pieHeight = 700;
  const pieMargin = 40;

  const radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin;
  // const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

  const svg = d3
    .select(svgName)
    .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

  const color = d3.scaleOrdinal().range(d3.schemeSet2);

  // Compute the position of each group on the pie:
  const pie = d3.pie().value(function (d) {
    return d[1];
  });
  const data_ready = pie(Object.entries(data));
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      return color(d.data[0]);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);


    const labels = svg
  .append('g')

//   labels
//   .selectAll('#mySlices')
//   .data(data)
//   .enter()
//   .append('circle')
//   .attr('r', '5')
//   .attr('cx', 10)
//   .attr('cy', (d, i) => (i * 20) + 15)
//   .attr('fill', (d, i) => color(i))
//   labels
//   .selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(function (d) {
//           return d.data[0];
//         })
//   .attr('x', 20)
//   .attr('y', (d, i) => (i * 20) + 20)
//   Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      return d.data[0];
    })
    .attr("transform", function (d) {
        const c = arcGenerator.centroid(d);
        return "translate(" + c[0]*2.1 +"," + c[1]*2.1 + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);
}
