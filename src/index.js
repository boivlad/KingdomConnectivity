let outgoingEdges, incomingEdges, topSortArr, visited, cycle, startTime, endTime, time;

function init() {
  outgoingEdges = [];
  incomingEdges = [];
  topSortArr = [];
  visited = {};
  cycle = false;
  startTime = [];
  endTime = [];
  time = 0;
}

function dfs(from, n) {
  let to, mayBeCycle = false;
  if (visited[from] === 1) {
    return true;
  }
  if (visited[from] === 2) {
    return false;
  }

  startTime[from] = ++time;
  visited[from] = 1;
  for (to in outgoingEdges[from]) {
    mayBeCycle = dfs(to, n) || mayBeCycle;
  }
  visited[from] = 2;
  endTime[from] = ++time;
  if (mayBeCycle && visited[n] && (startTime[from] <= startTime[n]) && (endTime[from] >= endTime[n])) {
    cycle = true;
  }

  topSortArr.push(parseInt(from));
  return false;
}

function topSort(n) {
  dfs(1, n);
  return topSortArr.reverse();
}

function getNumOfPaths(topSortedOrder, startVertex, n) {
  let total;
  const numOfPaths = [];

  for (let i = 0; i <= n; i++) {
    numOfPaths[i] = 0;
  }
  numOfPaths[1] = 1;

  for (let i = 1; i < topSortedOrder.length; i++) {
    let vertex = topSortedOrder[i];
    let incoming = incomingEdges[vertex];
    total = 0;
    for (let j in incoming) {
      total += (numOfPaths[j] * outgoingEdges[j][vertex]);
      total %= 1e9;
    }
    numOfPaths[vertex] = total;
  }

  return numOfPaths[n];
}

function kingdomConnectivity(n, m, arr) {
  init();
  for (let i = 1; i <= n; i++) {
    outgoingEdges[i] = {};
    incomingEdges[i] = {};
  }
  let pairArr = [];
  for (let i = 1; i <= m; i++) {
    pairArr[0] = arr[i - 1][0];
    pairArr[1] = arr[i - 1][1];
    let from = pairArr[0];
    let to = pairArr[1];
    if (!outgoingEdges[from][to]) {
      outgoingEdges[from][to] = 1;
    } else {
      outgoingEdges[from][to]++;
    }
    incomingEdges[to][from] = true;
  }
  pairArr = topSort(n);
  return cycle ? "INFINITE PATHS" : getNumOfPaths(pairArr, 1, n);
}

module.exports = kingdomConnectivity;
