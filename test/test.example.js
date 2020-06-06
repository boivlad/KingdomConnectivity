const assert = require('assert');
const { performance } = require('perf_hooks');
const countPaths = require('../src/index');

describe('Test basic case', function() {
  let sumTime = 0;
  it('First Test case', function() {
    let start = performance.now()
    const result = countPaths(5, 5, [[1, 2], [2, 4], [2, 3], [3, 4], [4, 5]]);
    let end = performance.now()
    sumTime += end - start;
    assert.strictEqual(result, 2);
  });
  it('Second Test case', function() {
    let start = performance.now()
    const result = countPaths(5, 5, [[1, 2], [4, 2], [2, 3], [3, 4], [4, 5]]);
    let end = performance.now()
    sumTime += end - start
    assert.strictEqual(result, 'INFINITE PATHS');
  });

  after(function() {
    console.log('Test basic case = ' + sumTime)
  });
});
