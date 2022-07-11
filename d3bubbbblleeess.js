function drawBubble(data, svgName) {
  console.log(data)
  const width = 900;
  const height = 850;
  const padding = 35;

  const colorScale = d3
    .scaleSequential(d3.interpolateViridis)
    .domain(d3.extent(data, (d) => d.views));

  const num_f = d3.format(".2s");

  const root = d3.hierarchy({ children: data }).sum((d) => d.views);

  const pack = d3
    .pack()
    .size([width, height]) // Set the size of the area
    .padding(padding); // define some padding between each circle

    const rootNode = pack(root) // Must call sum() first! 

    const div = d3.select(svgName)


  div.append('svg')
  .style('border', '1px solid')
  .style('width', width)
  .style('height', height)
  // Create a group for each element
  .selectAll('g')
  // Data is the leaves of the hierarchical root node
  .data(rootNode.leaves())
  .join('g') // Join your group. 
  // Position each node using x and y 
  .attr('transform', (d) => `translate(${d.x}, ${d.y })`)
  // Add a circle to each group
  .append('circle')
  // Set the radius
  .attr('r', d => d.r + 10)
  // Set the color of each circle
  .attr('fill', d => {
    return colorScale(d.data.views)
  })


  // div.select("svg")
  // .selectAll('g')
  // .data(rootNode.leaves())
  // .join('g')
  // .append('text')
  // .text((d) => `${d.data.name}`)
  // .attr('font-family', 'Helvetica')
  // .attr('font-size', '0.7em')
  // .style('text-anchor', 'middle')
  // .style('alignment-baseline', 'middle')
  // .style('mix-blend-mode', 'difference')
  // .style('fill', 'white')

div.select("svg")
  // find each group
  .selectAll('g')
  .data(rootNode.leaves())
  .join('g')
  // Add a text node
  .append('text')
  // Set the text
  .text(d => num_f(d.data.views))
  // Set the font 
  .attr('font-family', 'Helvetica')
  // Position the text in the center
  .style('text-anchor', 'middle')
  .style('alignment-baseline', 'middle')
  .style('mix-blend-mode', 'difference')
  .style('fill', 'white')
}
