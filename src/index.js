module.exports = function countPaths(n, m, arr) {
  const edges = {};
  for (let i = 1; i <= n; i++) {
    edges[i] = {
      f: [],
      r: []
    };
  }
  for (let i = 0; i < m; i++) {
    edges[arr[i][0]].f.push(arr[i][1]);
    edges[arr[i][1]].r.push(arr[i][0]);
  }
  const visible = Array(n + 1);
  for (let i = 1; i <= n; i++) {
    visible[i] = false;
  }
  dfs(1, edges, visible);
  const ways = Array(n + 1);
  for (let i = 1; i <= n; i++) {
    ways[i] = null;
  }
  ways[1] = 1;
  const result = dfsR(n, edges, ways, visible);
  return result > 0 ? result : 'INFINITE PATHS';
}

function dfs(s, edges, visible) {
  if (visible[s]) {
    return;
  }
  visible[s] = true;
  for (let i = 0; i < edges[s].f.length; i++) {
    dfs(edges[s].f[i], edges, visible);
  }
}
function dfsR(s, edges, ways, visible) {
  if (ways[s] !== null && ways[s] >= 0)
    return ways[s];
  if (ways[s] < 0)
    return -2;
  if (!visible[s]) {
    ways[s] = 0;
    return 0;
  }
  ways[s] = -1;

  let sum = 0;
  for (let i = 0; i < edges[s].r.length; i++) {
    const way = dfsR(edges[s].r[i], edges, ways, visible);

    if (way < 0)
      return way;

    sum += way;
  }
  sum %= 1000000000;
  ways[s] = sum;
  return sum;
}
