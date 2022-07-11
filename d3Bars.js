function drawBar(data, svgName, color) {
  const margin = { top: 30, right: 30, bottom: 250, left: 60 },
    width = 1000 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select(svgName)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .padding(0.2);
  // Y axis
  const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybarShounen")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => x(d.name))
    .attr("y", (d) => y(d.rating))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.rating))
    .attr("fill", color); //#eb459d
}
