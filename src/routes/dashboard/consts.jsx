const optionsWrapper = (list) => {
  return list.map((item) => {
    return {
      value: item,
      label: String(item),
      text: String(item),
    };
  });
};

const proficiency = [-2, -1, 0, 1, 2];

export const proficiencyOptions = optionsWrapper(proficiency);

const review = [
  "Round 0: Success",
  "Round 0: Fail",
  "Round 1: Success",
  "Round 1: Fail",
  "Round 2: Success",
  "Round 2: Fail",
  "Round 3: Success",
  "Round 3: Fail",
  "Round 4: Success",
  "Round 4: Fail",
  "Round 5: Success",
  "Round 5: Fail",
];
export const reviewOptions = optionsWrapper(review);

const difficultyList = ["Easy", "Medium", "Hard"];

export const difficultyOptions = optionsWrapper(difficultyList);



const topics = [
  {
    id: "VG9waWNUYWdOb2RlOjU0MA==",
    name: "Array",
    slug: "array",
    translatedName: "数组",
    questionCount: 1576,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1Nw==",
    name: "String",
    slug: "string",
    translatedName: "字符串",
    questionCount: 694,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU0MQ==",
    name: "Hash Table",
    slug: "hash-table",
    translatedName: "哈希表",
    questionCount: 547,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU2Mg==",
    name: "Dynamic Programming",
    slug: "dynamic-programming",
    translatedName: "动态规划",
    questionCount: 507,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1NQ==",
    name: "Math",
    slug: "math",
    translatedName: "数学",
    questionCount: 497,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQyOTU5",
    name: "Sorting",
    slug: "sorting",
    translatedName: "排序",
    questionCount: 363,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1Ng==",
    name: "Depth-First Search",
    slug: "depth-first-search",
    translatedName: "深度优先搜索",
    questionCount: 331,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1MA==",
    name: "Greedy",
    slug: "greedy",
    translatedName: "贪心",
    questionCount: 323,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1Nw==",
    name: "Breadth-First Search",
    slug: "breadth-first-search",
    translatedName: "广度优先搜索",
    questionCount: 265,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1NQ==",
    name: "Tree",
    slug: "tree",
    translatedName: "树",
    questionCount: 263,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1OA==",
    name: "Binary Search",
    slug: "binary-search",
    translatedName: "二分查找",
    questionCount: 256,
  },
  {
    id: "VG9waWNUYWdOb2RlOjI3NDA4",
    name: "Matrix",
    slug: "matrix",
    translatedName: "矩阵",
    questionCount: 231,
  },
  {
    id: "VG9waWNUYWdOb2RlOjEwOTc4",
    name: "Database",
    slug: "database",
    translatedName: "数据库",
    questionCount: 226,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU2OTE=",
    name: "Binary Tree",
    slug: "binary-tree",
    translatedName: "二叉树",
    questionCount: 218,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1Ng==",
    name: "Two Pointers",
    slug: "two-pointers",
    translatedName: "双指针",
    questionCount: 207,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1Mw==",
    name: "Bit Manipulation",
    slug: "bit-manipulation",
    translatedName: "位运算",
    questionCount: 197,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ0NQ==",
    name: "Stack",
    slug: "stack",
    translatedName: "栈",
    questionCount: 168,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjY0",
    name: "Heap (Priority Queue)",
    slug: "heap-priority-queue",
    translatedName: "堆（优先队列）",
    questionCount: 163,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2Mw==",
    name: "Design",
    slug: "design",
    translatedName: "设计",
    questionCount: 151,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2MA==",
    name: "Graph",
    slug: "graph",
    translatedName: "图",
    questionCount: 151,
  },
  {
    id: "VG9waWNUYWdOb2RlOjM1NjQx",
    name: "Prefix Sum",
    slug: "prefix-sum",
    translatedName: "前缀和",
    questionCount: 137,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU3ODc2",
    name: "Simulation",
    slug: "simulation",
    translatedName: "模拟",
    questionCount: 131,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU2Mw==",
    name: "Backtracking",
    slug: "backtracking",
    translatedName: "回溯",
    questionCount: 120,
  },
  {
    id: "VG9waWNUYWdOb2RlOjk5NTY=",
    name: "Counting",
    slug: "counting",
    translatedName: "计数",
    questionCount: 109,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1NA==",
    name: "Linked List",
    slug: "linked-list",
    translatedName: "链表",
    questionCount: 102,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU0NDUw",
    name: "Sliding Window",
    slug: "sliding-window",
    translatedName: "滑动窗口",
    questionCount: 98,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ1OQ==",
    name: "Union Find",
    slug: "union-find",
    translatedName: "并查集",
    questionCount: 87,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2OQ==",
    name: "Recursion",
    slug: "recursion",
    translatedName: "递归",
    questionCount: 66,
  },
  {
    id: "VG9waWNUYWdOb2RlOjMzMTAx",
    name: "Ordered Set",
    slug: "ordered-set",
    translatedName: "有序集合",
    questionCount: 59,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU1OQ==",
    name: "Divide and Conquer",
    slug: "divide-and-conquer",
    translatedName: "分治",
    questionCount: 58,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU3ODc1",
    name: "Monotonic Stack",
    slug: "monotonic-stack",
    translatedName: "单调栈",
    questionCount: 57,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2OA==",
    name: "Binary Search Tree",
    slug: "binary-search-tree",
    translatedName: "二叉搜索树",
    questionCount: 56,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2NQ==",
    name: "Trie",
    slug: "trie",
    translatedName: "字典树",
    questionCount: 56,
  },
  {
    id: "VG9waWNUYWdOb2RlOjE0NDc0",
    name: "Enumeration",
    slug: "enumeration",
    translatedName: "枚举",
    questionCount: 52,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ3NA==",
    name: "Queue",
    slug: "queue",
    translatedName: "队列",
    questionCount: 48,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU4Mjc=",
    name: "Bitmask",
    slug: "bitmask",
    translatedName: "状态压缩",
    questionCount: 43,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ3Mg==",
    name: "Memoization",
    slug: "memoization",
    translatedName: "记忆化搜索",
    questionCount: 42,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2Nw==",
    name: "Segment Tree",
    slug: "segment-tree",
    translatedName: "线段树",
    questionCount: 41,
  },
  {
    id: "VG9waWNUYWdOb2RlOjMxNjM0",
    name: "Number Theory",
    slug: "number-theory",
    translatedName: "数论",
    questionCount: 40,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ5MQ==",
    name: "Geometry",
    slug: "geometry",
    translatedName: "几何",
    questionCount: 39,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2NA==",
    name: "Topological Sort",
    slug: "topological-sort",
    translatedName: "拓扑排序",
    questionCount: 37,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ2Ng==",
    name: "Binary Indexed Tree",
    slug: "binary-indexed-tree",
    translatedName: "树状数组",
    questionCount: 32,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjYz",
    name: "Hash Function",
    slug: "hash-function",
    translatedName: "哈希函数",
    questionCount: 27,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQxODgx",
    name: "Shortest Path",
    slug: "shortest-path",
    translatedName: "最短路",
    questionCount: 26,
  },
  {
    id: "VG9waWNUYWdOb2RlOjE3MzU0",
    name: "Game Theory",
    slug: "game-theory",
    translatedName: "博弈",
    questionCount: 25,
  },
  {
    id: "VG9waWNUYWdOb2RlOjEwOTUz",
    name: "Data Stream",
    slug: "data-stream",
    translatedName: "数据流",
    questionCount: 24,
  },
  {
    id: "VG9waWNUYWdOb2RlOjkwMDU=",
    name: "Combinatorics",
    slug: "combinatorics",
    translatedName: "组合数学",
    questionCount: 22,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ0NDYw",
    name: "String Matching",
    slug: "string-matching",
    translatedName: "字符串匹配",
    questionCount: 21,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjY5",
    name: "Rolling Hash",
    slug: "rolling-hash",
    translatedName: "滚动哈希",
    questionCount: 19,
  },
  {
    id: "VG9waWNUYWdOb2RlOjIyMTQy",
    name: "Interactive",
    slug: "interactive",
    translatedName: "交互",
    questionCount: 18,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ3MA==",
    name: "Brainteaser",
    slug: "brainteaser",
    translatedName: "脑筋急转弯",
    questionCount: 16,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjY4",
    name: "Randomized",
    slug: "randomized",
    translatedName: "随机化",
    questionCount: 14,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjY2",
    name: "Merge Sort",
    slug: "merge-sort",
    translatedName: "归并排序",
    questionCount: 14,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU3ODc0",
    name: "Monotonic Queue",
    slug: "monotonic-queue",
    translatedName: "单调队列",
    questionCount: 13,
  },
  {
    id: "VG9waWNUYWdOb2RlOjEzMDAx",
    name: "Doubly-Linked List",
    slug: "doubly-linked-list",
    translatedName: "双向链表",
    questionCount: 12,
  },
  {
    id: "VG9waWNUYWdOb2RlOjM3NDk3",
    name: "Quickselect",
    slug: "quickselect",
    translatedName: "快速选择",
    questionCount: 11,
  },
  {
    id: "VG9waWNUYWdOb2RlOjIyODMz",
    name: "Iterator",
    slug: "iterator",
    translatedName: "迭代器",
    questionCount: 10,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjY3",
    name: "Probability and Statistics",
    slug: "probability-and-statistics",
    translatedName: "概率与统计",
    questionCount: 9,
  },
  {
    id: "VG9waWNUYWdOb2RlOjkzMTY=",
    name: "Concurrency",
    slug: "concurrency",
    translatedName: "多线程",
    questionCount: 9,
  },
  {
    id: "VG9waWNUYWdOb2RlOjY1Nzk=",
    name: "Bucket Sort",
    slug: "bucket-sort",
    translatedName: "桶排序",
    questionCount: 8,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ0Nzc1",
    name: "Suffix Array",
    slug: "suffix-array",
    translatedName: "后缀数组",
    questionCount: 6,
  },
  {
    id: "VG9waWNUYWdOb2RlOjk5NTc=",
    name: "Counting Sort",
    slug: "counting-sort",
    translatedName: "计数排序",
    questionCount: 6,
  },
  {
    id: "VG9waWNUYWdOb2RlOjI4MzM0",
    name: "Minimum Spanning Tree",
    slug: "minimum-spanning-tree",
    translatedName: "最小生成树",
    questionCount: 5,
  },
  {
    id: "VG9waWNUYWdOb2RlOjU0OTM3",
    name: "Line Sweep",
    slug: "line-sweep",
    translatedName: "扫描线",
    questionCount: 4,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQxNzk0",
    name: "Shell",
    slug: "shell",
    translatedName: null,
    questionCount: 4,
  },
  {
    id: "VG9waWNUYWdOb2RlOjQ3Nw==",
    name: "Reservoir Sampling",
    slug: "reservoir-sampling",
    translatedName: "水塘抽样",
    questionCount: 4,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjYy",
    name: "Eulerian Circuit",
    slug: "eulerian-circuit",
    translatedName: "欧拉回路",
    questionCount: 3,
  },
  {
    id: "VG9waWNUYWdOb2RlOjM3NzE3",
    name: "Radix Sort",
    slug: "radix-sort",
    translatedName: "基数排序",
    questionCount: 3,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjcw",
    name: "Strongly Connected Component",
    slug: "strongly-connected-component",
    translatedName: "强连通分量",
    questionCount: 2,
  },
  {
    id: "VG9waWNUYWdOb2RlOjYxMjYw",
    name: "Biconnected Component",
    slug: "biconnected-component",
    translatedName: "双连通分量",
    questionCount: 2,
  },
  {
    id: "VG9waWNUYWdOb2RlOjUzMDE3",
    name: "Rejection Sampling",
    slug: "rejection-sampling",
    translatedName: "拒绝采样",
    questionCount: 2,
  },
];

const topicsList = topics.map(topic => topic.name)
const classList = ["Sub Sequence"]
const tagList = ["Template", "Important", "New Idea", ...classList, ...difficultyList, ...topicsList]


export const tagOptions = optionsWrapper(tagList)

export const topicOptions = optionsWrapper(topicsList);
