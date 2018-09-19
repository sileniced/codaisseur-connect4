module.exports.generate = function(rows, cols) {
  let row = [], grid = [];
  for (let i = 0; i < cols; i++) row.push(0)
  for (let i = 0; i < rows; i++) grid.push([...row])
  return grid;
};