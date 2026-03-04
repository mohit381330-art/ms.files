import { useState } from "react";

const PROBLEMS = [
  {
    id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays",
    language: ["Python", "JavaScript", "C++", "Java", "Go"],
    acceptance: "49.1%", submissions: "12.3M",
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 <= nums.length <= 10⁴", "-10⁹ <= nums[i] <= 10⁹", "-10⁹ <= target <= 10⁹", "Only one valid answer exists."],
    starterCode: {
      Python: `def twoSum(nums, target):\n    # Your solution here\n    pass`,
      JavaScript: `function twoSum(nums, target) {\n    // Your solution here\n}`,
      "C++": `vector<int> twoSum(vector<int>& nums, int target) {\n    // Your solution here\n}`,
      Java: `public int[] twoSum(int[] nums, int target) {\n    // Your solution here\n}`,
      Go: `func twoSum(nums []int, target int) []int {\n    // Your solution here\n}`,
    },
    hints: ["Try using a hash map to store previously seen values.", "For each element, check if (target - element) exists in the map."],
  },
  {
    id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "33.8%", submissions: "9.1M",
    tags: ["String", "Sliding Window", "Hash Table"],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ["0 <= s.length <= 5 * 10⁴", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      Python: `def lengthOfLongestSubstring(s: str) -> int:\n    # Your solution here\n    pass`,
      JavaScript: `function lengthOfLongestSubstring(s) {\n    // Your solution here\n}`,
      "C++": `int lengthOfLongestSubstring(string s) {\n    // Your solution here\n}`,
      Java: `public int lengthOfLongestSubstring(String s) {\n    // Your solution here\n}`,
    },
    hints: ["Use a sliding window approach.", "Use a set to track characters in the current window."],
  },
  {
    id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "61.2%", submissions: "8.7M",
    tags: ["Linked List", "Recursion"],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in both lists is in [0, 50].", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    starterCode: {
      Python: `def mergeTwoLists(list1, list2):\n    # Your solution here\n    pass`,
      JavaScript: `function mergeTwoLists(list1, list2) {\n    // Your solution here\n}`,
      "C++": `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    // Your solution here\n}`,
      Java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    // Your solution here\n}`,
    },
    hints: ["Consider using a dummy head node.", "Compare the heads of both lists iteratively."],
  },
  {
    id: 4, title: "Maximum Subarray", difficulty: "Medium", topic: "Dynamic Programming",
    language: ["Python", "JavaScript", "C++", "Java", "Go"],
    acceptance: "49.9%", submissions: "10.2M",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 <= nums.length <= 10⁵", "-10⁴ <= nums[i] <= 10⁴"],
    starterCode: {
      Python: `def maxSubArray(nums):\n    # Your solution here\n    pass`,
      JavaScript: `function maxSubArray(nums) {\n    // Your solution here\n}`,
      "C++": `int maxSubArray(vector<int>& nums) {\n    // Your solution here\n}`,
      Java: `public int maxSubArray(int[] nums) {\n    // Your solution here\n}`,
      Go: `func maxSubArray(nums []int) int {\n    // Your solution here\n}`,
    },
    hints: ["Think about Kadane's algorithm.", "At each position, decide: extend current subarray or start a new one."],
  },
  {
    id: 5, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "40.7%", submissions: "7.3M",
    tags: ["String", "Stack"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10⁴", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      Python: `def isValid(s: str) -> bool:\n    # Your solution here\n    pass`,
      JavaScript: `function isValid(s) {\n    // Your solution here\n}`,
      "C++": `bool isValid(string s) {\n    // Your solution here\n}`,
      Java: `public boolean isValid(String s) {\n    // Your solution here\n}`,
    },
    hints: ["Use a stack data structure.", "Push open brackets, pop when you see a closing bracket and verify match."],
  },
  {
    id: 6, title: "Binary Search", difficulty: "Easy", topic: "Binary Search",
    language: ["Python", "JavaScript", "C++", "Java", "Go"],
    acceptance: "55.1%", submissions: "4.1M",
    tags: ["Array", "Binary Search"],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1." },
    ],
    constraints: ["1 <= nums.length <= 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique.", "nums is sorted in ascending order."],
    starterCode: {
      Python: `def search(nums, target):\n    # Your solution here\n    pass`,
      JavaScript: `function search(nums, target) {\n    // Your solution here\n}`,
      "C++": `int search(vector<int>& nums, int target) {\n    // Your solution here\n}`,
      Java: `public int search(int[] nums, int target) {\n    // Your solution here\n}`,
      Go: `func search(nums []int, target int) int {\n    // Your solution here\n}`,
    },
    hints: ["Set left = 0, right = len(nums) - 1.", "Check the middle element and adjust bounds accordingly."],
  },
  {
    id: 7, title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "51.7%", submissions: "6.2M",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "Two ways to climb: 1+1 or 2." },
      { input: "n = 3", output: "3", explanation: "Three ways: 1+1+1, 1+2, 2+1." },
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      Python: `def climbStairs(n: int) -> int:\n    # Your solution here\n    pass`,
      JavaScript: `function climbStairs(n) {\n    // Your solution here\n}`,
      "C++": `int climbStairs(int n) {\n    // Your solution here\n}`,
      Java: `public int climbStairs(int n) {\n    // Your solution here\n}`,
    },
    hints: ["The number of ways to reach step n = ways(n-1) + ways(n-2).", "This is essentially the Fibonacci sequence."],
  },
  {
    id: 8, title: "LRU Cache", difficulty: "Hard", topic: "Design",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "41.4%", submissions: "3.2M",
    tags: ["Hash Table", "Linked List", "Design"],
    description: `Design a data structure that follows the Least Recently Used (LRU) cache constraints.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` — Initialize the LRU cache with positive size capacity.\n- \`int get(int key)\` — Return the value of key if it exists, otherwise return -1.\n- \`void put(int key, int value)\` — Update the value if key exists. Otherwise add it. If number of keys exceeds capacity, evict the least recently used key.\n\nBoth get and put must run in O(1) average time complexity.`,
    examples: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]' },
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10⁴", "0 <= value <= 10⁵", "At most 2 * 10⁵ calls will be made to get and put."],
    starterCode: {
      Python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass`,
      JavaScript: `class LRUCache {\n    constructor(capacity) { }\n    get(key) { }\n    put(key, value) { }\n}`,
      "C++": `class LRUCache {\npublic:\n    LRUCache(int capacity) { }\n    int get(int key) { }\n    void put(int key, int value) { }\n};`,
      Java: `class LRUCache {\n    public LRUCache(int capacity) { }\n    public int get(int key) { }\n    public void put(int key, int value) { }\n}`,
    },
    hints: ["Use a HashMap + Doubly Linked List.", "HashMap gives O(1) access, DLL gives O(1) insertion/deletion."],
  },
  {
    id: 9, title: "Number of Islands", difficulty: "Medium", topic: "Graphs",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "56.9%", submissions: "5.8M",
    tags: ["Array", "DFS", "BFS", "Matrix"],
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starterCode: {
      Python: `def numIslands(grid):\n    # Your solution here\n    pass`,
      JavaScript: `function numIslands(grid) {\n    // Your solution here\n}`,
      "C++": `int numIslands(vector<vector<char>>& grid) {\n    // Your solution here\n}`,
      Java: `public int numIslands(char[][] grid) {\n    // Your solution here\n}`,
    },
    hints: ["Use DFS/BFS from each unvisited land cell.", "Mark visited cells to avoid counting twice."],
  },
  {
    id: 10, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List",
    language: ["Python", "JavaScript", "C++", "Java", "Go"],
    acceptance: "73.1%", submissions: "6.9M",
    tags: ["Linked List", "Recursion"],
    description: `Given the head of a singly linked list, reverse the list and return the reversed list.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
    constraints: ["The number of nodes in the list is in the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    starterCode: {
      Python: `def reverseList(head):\n    # Your solution here\n    pass`,
      JavaScript: `function reverseList(head) {\n    // Your solution here\n}`,
      "C++": `ListNode* reverseList(ListNode* head) {\n    // Your solution here\n}`,
      Java: `public ListNode reverseList(ListNode head) {\n    // Your solution here\n}`,
      Go: `func reverseList(head *ListNode) *ListNode {\n    // Your solution here\n}`,
    },
    hints: ["Use three pointers: prev, curr, next.", "Iteratively reverse the next pointer of each node."],
  },
  {
    id: 11, title: "Word Search", difficulty: "Medium", topic: "Backtracking",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "40.2%", submissions: "3.5M",
    tags: ["Array", "Backtracking", "DFS", "Matrix"],
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: "false" },
    ],
    constraints: ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15"],
    starterCode: {
      Python: `def exist(board, word):\n    # Your solution here\n    pass`,
      JavaScript: `function exist(board, word) {\n    // Your solution here\n}`,
      "C++": `bool exist(vector<vector<char>>& board, string word) {\n    // Your solution here\n}`,
      Java: `public boolean exist(char[][] board, String word) {\n    // Your solution here\n}`,
    },
    hints: ["Use DFS + backtracking from each cell.", "Mark cells as visited during the search and unmark on backtrack."],
  },
  {
    id: 12, title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap",
    language: ["Python", "JavaScript", "C++", "Java"],
    acceptance: "50.3%", submissions: "2.1M",
    tags: ["Two Pointers", "Design", "Sorting", "Heap"],
    description: `The median is the middle value in an ordered integer list.\n\nImplement the MedianFinder class:\n- MedianFinder() — Initializes the object.\n- void addNum(int num) — Adds integer num from the data stream.\n- double findMedian() — Returns the median of all elements so far.`,
    examples: [
      { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]', output: '[null,null,null,1.5,null,2.0]' },
    ],
    constraints: ["-10⁵ <= num <= 10⁵", "At most 5 * 10⁴ calls will be made.", "findMedian will always be called with at least one element."],
    starterCode: {
      Python: `class MedianFinder:\n    def __init__(self):\n        pass\n\n    def addNum(self, num: int) -> None:\n        pass\n\n    def findMedian(self) -> float:\n        pass`,
      JavaScript: `class MedianFinder {\n    constructor() { }\n    addNum(num) { }\n    findMedian() { }\n}`,
      "C++": `class MedianFinder {\npublic:\n    MedianFinder() { }\n    void addNum(int num) { }\n    double findMedian() { }\n};`,
      Java: `class MedianFinder {\n    public MedianFinder() { }\n    public void addNum(int num) { }\n    public double findMedian() { }\n}`,
    },
    hints: ["Use two heaps: a max-heap for lower half and min-heap for upper half.", "Balance the heaps so their sizes differ by at most 1."],
  },
];

const TOPICS = ["All Topics","Arrays","Strings","Linked List","Dynamic Programming","Stack","Binary Search","Graphs","Design","Heap","Backtracking"];
const ALL_LANGUAGES = ["All Languages","Python","JavaScript","C++","Java","Go"];
const DIFFICULTIES = ["All","Easy","Medium","Hard"];
const DC = { Easy:"#00b8a3", Medium:"#ffa116", Hard:"#ff375f" };
const DB = { Easy:"rgba(0,184,163,0.12)", Medium:"rgba(255,161,22,0.12)", Hard:"rgba(255,55,95,0.12)" };

const EXPLORE_CARDS = [
  { title:"Top Interview 150", desc:"Master essential patterns for FAANG interviews", icon:"🎯", count:"150 Problems", color:"#f97316" },
  { title:"LeetCode 75", desc:"Study plan to ace interviews in 75 days", icon:"⚡", count:"75 Problems", color:"#58a6ff" },
  { title:"SQL 50", desc:"Crack any SQL interview with top 50 questions", icon:"🗄️", count:"50 Problems", color:"#bc8cff" },
  { title:"Dynamic Programming", desc:"From beginner to advanced DP patterns", icon:"🧩", count:"40 Problems", color:"#ffa116" },
  { title:"Graph Theory", desc:"Master BFS, DFS, shortest paths and more", icon:"🔗", count:"30 Problems", color:"#ff375f" },
  { title:"Bit Manipulation", desc:"Tricks and techniques using bitwise ops", icon:"💡", count:"25 Problems", color:"#58a6ff" },
];

const CONTEST_DATA = [
  { id:"Weekly Contest 395", date:"Sat, Mar 8 · 2:30 AM", status:"upcoming", participants:"-", problems:4 },
  { id:"Biweekly Contest 130", date:"Sat, Mar 15 · 2:30 AM", status:"upcoming", participants:"-", problems:4 },
  { id:"Weekly Contest 394", date:"Sat, Mar 1 · 2:30 AM", status:"finished", participants:"28,341", problems:4 },
  { id:"Biweekly Contest 129", date:"Sat, Feb 22 · 2:30 AM", status:"finished", participants:"31,204", problems:4 },
];

const DISCUSS_POSTS = [
  { id:1, title:"[Python] Two Sum - O(n) solution using hash map", author:"dev_ninja", likes:342, views:"12.4k", time:"2h ago", tag:"Solution", difficulty:"Easy" },
  { id:2, title:"Comprehensive guide to Dynamic Programming patterns", author:"algo_master", likes:891, views:"45.2k", time:"1d ago", tag:"Guide", difficulty:null },
  { id:3, title:"Why does my sliding window solution get TLE?", author:"coder_learner", likes:23, views:"1.2k", time:"3h ago", tag:"Question", difficulty:"Medium" },
  { id:4, title:"LRU Cache - Clean C++ implementation with explanation", author:"cpp_pro", likes:567, views:"23.1k", time:"2d ago", tag:"Solution", difficulty:"Hard" },
  { id:5, title:"Graph algorithms cheat sheet - BFS, DFS, Dijkstra, Union Find", author:"graph_guru", likes:1204, views:"67.8k", time:"5d ago", tag:"Resource", difficulty:null },
  { id:6, title:"How I went from 0 to clearing Google interview in 3 months", author:"google_hired", likes:3421, views:"189k", time:"1w ago", tag:"Story", difficulty:null },
];

function Tag({ text }) {
  return <span style={{ background:"#1e2634", color:"#8b949e", fontSize:"11px", padding:"2px 8px", borderRadius:"20px", whiteSpace:"nowrap" }}>{text}</span>;
}

function CodeEditor({ value, onChange }) {
  const lines = value.split("\n");
  return (
    <div style={{ display:"flex", background:"#0d1117", height:"100%", fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:"13.5px", lineHeight:"1.65", overflow:"auto" }}>
      <div style={{ background:"#0d1117", color:"#3d4451", padding:"14px 0", textAlign:"right", userSelect:"none", minWidth:"44px", borderRight:"1px solid #1e2634", flexShrink:0 }}>
        {lines.map((_,i) => <div key={i} style={{ padding:"0 10px", fontSize:"12px", lineHeight:"1.65" }}>{i+1}</div>)}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        style={{ flex:1, background:"transparent", color:"#c9d1d9", border:"none", outline:"none", padding:"14px", resize:"none", fontSize:"13.5px", lineHeight:"1.65", fontFamily:"inherit", caretColor:"#58a6ff", tabSize:4, minHeight:"100%" }}
        onKeyDown={e => {
          if (e.key === "Tab") {
            e.preventDefault();
            const s = e.target.selectionStart, en = e.target.selectionEnd;
            const nv = value.substring(0,s) + "    " + value.substring(en);
            onChange(nv);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s+4; }, 0);
          }
        }}
      />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("problems");
  const [activeProblem, setActiveProblem] = useState(null);
  const [selectedLang, setSelectedLang] = useState("Python");
  const [filterTopic, setFilterTopic] = useState("All Topics");
  const [filterLang, setFilterLang] = useState("All Languages");
  const [filterDiff, setFilterDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [solvedSet, setSolvedSet] = useState(new Set());
  const [activeTab, setActiveTab] = useState("description");
  const [hintIndex, setHintIndex] = useState(0);
  const [discussFilter, setDiscussFilter] = useState("All");
  const [contestTab, setContestTab] = useState("upcoming");

  const openProblem = (p) => {
    const lang = p.language[0];
    setActiveProblem(p); setSelectedLang(lang);
    setCode(p.starterCode[lang] || ""); setOutput(null);
    setActiveTab("description"); setHintIndex(0); setView("editor");
  };

  const changeLang = (lang) => {
    setSelectedLang(lang);
    setCode(activeProblem.starterCode[lang] || `// ${lang} solution here`);
    setOutput(null);
  };

  const filtered = PROBLEMS.filter(p => {
    if (filterDiff !== "All" && p.difficulty !== filterDiff) return false;
    if (filterTopic !== "All Topics" && p.topic !== filterTopic) return false;
    if (filterLang !== "All Languages" && !p.language.includes(filterLang)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true); setOutput(null);
    await new Promise(r => setTimeout(r, 1400 + Math.random()*600));
    setOutput({ type:"run", testcases: activeProblem.examples.slice(0,2).map((ex,i) => ({
      input:ex.input, expected:ex.output,
      got: i===0 ? ex.output : (Math.random()>0.3 ? ex.output : "Wrong Answer"),
      passed: i===0 ? true : Math.random()>0.3,
      runtime:`${(Math.random()*50+10).toFixed(0)}ms`,
    })) });
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setIsSubmitting(true); setOutput(null);
    await new Promise(r => setTimeout(r, 2200 + Math.random()*1200));
    const passed = Math.random() > 0.35;
    if (passed) setSolvedSet(prev => new Set([...prev, activeProblem.id]));
    setOutput({ type:"submit", result: passed ? "accepted":"wrong",
      runtime:`${(Math.random()*80+20).toFixed(0)} ms`, memory:`${(Math.random()*5+14).toFixed(1)} MB`,
      runtimeBeat:`${(Math.random()*40+55).toFixed(1)}%`, memoryBeat:`${(Math.random()*30+60).toFixed(1)}%`,
      totalCases:57, passedCases: passed ? 57 : Math.floor(Math.random()*40+10),
      failedCase: passed ? null : activeProblem.examples[1]?.input,
    });
    setIsSubmitting(false);
  };

  const easyTotal = PROBLEMS.filter(p=>p.difficulty==="Easy").length;
  const medTotal = PROBLEMS.filter(p=>p.difficulty==="Medium").length;
  const hardTotal = PROBLEMS.filter(p=>p.difficulty==="Hard").length;
  const easyS = [...solvedSet].filter(id=>PROBLEMS.find(p=>p.id===id)?.difficulty==="Easy").length;
  const medS = [...solvedSet].filter(id=>PROBLEMS.find(p=>p.id===id)?.difficulty==="Medium").length;
  const hardS = [...solvedSet].filter(id=>PROBLEMS.find(p=>p.id===id)?.difficulty==="Hard").length;

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", background:"#0d1117", minHeight:"100vh", color:"#e6edf3", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0d1117}
        ::-webkit-scrollbar-thumb{background:#30363d;border-radius:3px}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeIn 0.2s ease}
        .prow:hover{background:#161b22 !important}
        .card:hover{border-color:#30363d !important;transform:translateY(-2px)}
        .card{transition:all 0.18s}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ background:"#161b22", borderBottom:"1px solid #21262d", padding:"0 20px", height:"52px", display:"flex", alignItems:"center", gap:"2px", position:"sticky", top:0, zIndex:200 }}>
        <div onClick={()=>setView("problems")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", marginRight:"18px" }}>
          <div style={{ width:"28px", height:"28px", background:"linear-gradient(135deg,#f97316,#ef4444)", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:700, color:"white" }}>C</div>
          <span style={{ fontWeight:700, fontSize:"16px", color:"#e6edf3", letterSpacing:"-0.3px" }}>CodeForge</span>
        </div>
        {[{id:"problems",lbl:"Problems"},{id:"explore",lbl:"Explore"},{id:"contest",lbl:"Contest"},{id:"discuss",lbl:"Discuss"},{id:"about",lbl:"About"}].map(n=>(
          <button key={n.id} onClick={()=>{ setView(n.id); }}
            style={{ background:"none", border:"none", borderBottom:(view===n.id||(n.id==="problems"&&view==="editor"))?"2px solid #f97316":"2px solid transparent", color:(view===n.id||(n.id==="problems"&&view==="editor"))?"#f97316":"#8b949e", cursor:"pointer", padding:"0 13px", height:"52px", fontSize:"13.5px", fontWeight:(view===n.id||(n.id==="problems"&&view==="editor"))?600:400, transition:"all 0.15s" }}>
            {n.lbl}
          </button>
        ))}
        <div style={{ flex:1 }} />
        <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"#0d1117", borderRadius:"8px", padding:"5px 12px", border:"1px solid #21262d" }}>
          <div style={{ width:"22px", height:"22px", background:"linear-gradient(135deg,#f97316,#ef4444)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"white" }}>M</div>
          <span style={{ fontSize:"13px", color:"#8b949e" }}>Profile</span>
        </div>
      </nav>

      {/* ── PROBLEMS ── */}
      {view==="problems" && (
        <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"26px 20px", width:"100%" }} className="fade">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"22px" }}>
            {[{lbl:"Total Solved",val:solvedSet.size,total:PROBLEMS.length,color:"#58a6ff"},{lbl:"Easy",val:easyS,total:easyTotal,color:"#00b8a3"},{lbl:"Medium",val:medS,total:medTotal,color:"#ffa116"},{lbl:"Hard",val:hardS,total:hardTotal,color:"#ff375f"}].map(s=>(
              <div key={s.lbl} style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"10px", padding:"14px 18px" }}>
                <div style={{ fontSize:"11px", color:"#6e7681", marginBottom:"7px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.lbl}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:"4px" }}>
                  <span style={{ fontSize:"26px", fontWeight:700, color:s.color }}>{s.val}</span>
                  <span style={{ fontSize:"13px", color:"#484f58" }}>/ {s.total}</span>
                </div>
                <div style={{ background:"#0d1117", borderRadius:"3px", height:"3px", marginTop:"10px", overflow:"hidden" }}>
                  <div style={{ background:s.color, height:"100%", width:`${s.total?(s.val/s.total)*100:0}%`, borderRadius:"3px", transition:"width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:"8px", marginBottom:"12px", flexWrap:"wrap", alignItems:"center" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search problems..."
              style={{ flex:1, minWidth:"180px", background:"#161b22", border:"1px solid #21262d", borderRadius:"8px", padding:"8px 13px", color:"#e6edf3", fontSize:"13.5px", outline:"none" }} />
            {[{val:filterDiff,set:setFilterDiff,opts:DIFFICULTIES},{val:filterTopic,set:setFilterTopic,opts:TOPICS},{val:filterLang,set:setFilterLang,opts:ALL_LANGUAGES}].map((f,i)=>(
              <select key={i} value={f.val} onChange={e=>f.set(e.target.value)}
                style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"8px", padding:"8px 11px", color:"#e6edf3", fontSize:"13px", cursor:"pointer", outline:"none" }}>
                {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            ))}
            <span style={{ color:"#6e7681", fontSize:"12.5px" }}>{filtered.length} problems</span>
          </div>

          <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"10px", overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"44px 1fr 110px 100px 110px", padding:"9px 16px", borderBottom:"1px solid #21262d", gap:"10px" }}>
              {["#","Title","Difficulty","Acceptance","Topic"].map((h,i)=>(
                <span key={h} style={{ fontSize:"11px", color:"#6e7681", textTransform:"uppercase", letterSpacing:"0.6px", fontWeight:600, textAlign:i>1?"center":"left" }}>{h}</span>
              ))}
            </div>
            {filtered.length===0
              ? <div style={{ padding:"48px", textAlign:"center", color:"#484f58" }}>No problems match your filters.</div>
              : filtered.map(p=>(
              <div key={p.id} onClick={()=>openProblem(p)} className="prow"
                style={{ display:"grid", gridTemplateColumns:"44px 1fr 110px 100px 110px", alignItems:"center", padding:"11px 16px", borderBottom:"1px solid #0d1117", gap:"10px", cursor:"pointer", transition:"background 0.1s" }}>
                <span style={{ color:solvedSet.has(p.id)?"#00b8a3":"#484f58", fontSize:"13px", fontWeight:600 }}>{solvedSet.has(p.id)?"✓":p.id}</span>
                <div>
                  <div style={{ color:"#e6edf3", fontSize:"13.5px", fontWeight:500, marginBottom:"4px" }}>{p.title}</div>
                  <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>{p.tags.slice(0,2).map(t=><Tag key={t} text={t}/>)}</div>
                </div>
                <span style={{ color:DC[p.difficulty], background:DB[p.difficulty], fontSize:"12px", padding:"3px 10px", borderRadius:"20px", textAlign:"center", display:"block" }}>{p.difficulty}</span>
                <span style={{ color:"#6e7681", fontSize:"12.5px", textAlign:"center" }}>{p.acceptance}</span>
                <span style={{ color:"#6e7681", fontSize:"12.5px", textAlign:"center" }}>{p.topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EDITOR ── */}
      {view==="editor" && activeProblem && (
        <div style={{ display:"flex", flex:1, height:"calc(100vh - 52px)", overflow:"hidden" }}>
          {/* Left */}
          <div style={{ width:"42%", minWidth:"290px", borderRight:"1px solid #21262d", display:"flex", flexDirection:"column", overflow:"hidden" }}>
            <div style={{ padding:"11px 16px", borderBottom:"1px solid #21262d", background:"#161b22" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px" }}>
                <button onClick={()=>setView("problems")} style={{ background:"none", border:"none", color:"#6e7681", cursor:"pointer", fontSize:"18px", padding:0 }}>←</button>
                <span style={{ color:"#e6edf3", fontWeight:600, fontSize:"14px" }}>{activeProblem.title}</span>
              </div>
              <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
                <span style={{ color:DC[activeProblem.difficulty], background:DB[activeProblem.difficulty], fontSize:"11.5px", padding:"2px 10px", borderRadius:"20px" }}>{activeProblem.difficulty}</span>
                {activeProblem.tags.map(t=><Tag key={t} text={t}/>)}
              </div>
            </div>
            <div style={{ display:"flex", borderBottom:"1px solid #21262d", background:"#161b22" }}>
              {["description","hints","submissions"].map(tab=>(
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  style={{ background:"none", border:"none", borderBottom:activeTab===tab?"2px solid #f97316":"2px solid transparent", color:activeTab===tab?"#f97316":"#6e7681", cursor:"pointer", padding:"9px 15px", fontSize:"13px", fontWeight:activeTab===tab?600:400, textTransform:"capitalize" }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
              {activeTab==="description" && (
                <div className="fade">
                  <p style={{ color:"#c9d1d9", lineHeight:1.75, fontSize:"13.5px", marginBottom:"18px", whiteSpace:"pre-wrap" }}>{activeProblem.description}</p>
                  {activeProblem.examples.map((ex,i)=>(
                    <div key={i} style={{ marginBottom:"14px" }}>
                      <div style={{ color:"#e6edf3", fontWeight:600, fontSize:"13px", marginBottom:"6px" }}>Example {i+1}:</div>
                      <div style={{ background:"#0d1117", border:"1px solid #21262d", borderRadius:"8px", padding:"10px 13px", fontFamily:"'JetBrains Mono',monospace", fontSize:"12.5px" }}>
                        <div><span style={{ color:"#6e7681" }}>Input: </span><span style={{ color:"#c9d1d9" }}>{ex.input}</span></div>
                        <div><span style={{ color:"#6e7681" }}>Output: </span><span style={{ color:"#c9d1d9" }}>{ex.output}</span></div>
                        {ex.explanation && <div style={{ color:"#8b949e", marginTop:"4px", fontSize:"12px" }}>Explanation: {ex.explanation}</div>}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:"16px" }}>
                    <div style={{ color:"#e6edf3", fontWeight:600, fontSize:"13px", marginBottom:"8px" }}>Constraints:</div>
                    <ul style={{ paddingLeft:"16px" }}>
                      {activeProblem.constraints.map((c,i)=>(
                        <li key={i} style={{ color:"#8b949e", fontSize:"12.5px", marginBottom:"4px", fontFamily:"'JetBrains Mono',monospace" }}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display:"flex", gap:"16px", marginTop:"16px", fontSize:"12px", color:"#6e7681" }}>
                    <span>Acceptance: <span style={{ color:"#8b949e" }}>{activeProblem.acceptance}</span></span>
                    <span>Submissions: <span style={{ color:"#8b949e" }}>{activeProblem.submissions}</span></span>
                  </div>
                </div>
              )}
              {activeTab==="hints" && (
                <div className="fade">
                  <p style={{ color:"#6e7681", fontSize:"13px", marginBottom:"12px" }}>Reveal hints one by one when you're stuck.</p>
                  {activeProblem.hints.map((hint,i)=>(
                    <div key={i} style={{ marginBottom:"9px" }}>
                      {i<=hintIndex ? (
                        <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"8px", padding:"10px 13px", color:"#c9d1d9", fontSize:"13.5px", lineHeight:1.65 }}>
                          <span style={{ color:"#f97316", fontWeight:600, marginRight:"6px" }}>Hint {i+1}:</span>{hint}
                        </div>
                      ) : (
                        <button onClick={()=>setHintIndex(i)}
                          style={{ background:"#161b22", border:"1px dashed #30363d", borderRadius:"8px", padding:"9px 13px", color:"#484f58", fontSize:"13px", cursor:"pointer", width:"100%", textAlign:"left" }}>
                          🔒 Reveal Hint {i+1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeTab==="submissions" && (
                <div className="fade" style={{ textAlign:"center", padding:"40px 0" }}>
                  {solvedSet.has(activeProblem.id) ? (
                    <><div style={{ fontSize:"42px", marginBottom:"10px" }}>✅</div>
                    <div style={{ color:"#00b8a3", fontWeight:700, fontSize:"16px" }}>Accepted!</div>
                    <div style={{ color:"#6e7681", fontSize:"13px", marginTop:"5px" }}>You have a successful submission.</div></>
                  ) : (
                    <><div style={{ fontSize:"36px", marginBottom:"10px" }}>📋</div>
                    <div style={{ color:"#6e7681", fontSize:"13.5px" }}>No submissions yet.</div>
                    <div style={{ color:"#484f58", fontSize:"12px", marginTop:"5px" }}>Write your solution and click Submit.</div></>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right - Code Editor */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"#0d1117" }}>
            {/* Toolbar */}
            <div style={{ padding:"7px 14px", borderBottom:"1px solid #21262d", background:"#161b22", display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
              {/* Dropdown language selector */}
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ color:"#6e7681", fontSize:"12px" }}>Language:</span>
                <select value={selectedLang} onChange={e=>changeLang(e.target.value)}
                  style={{ background:"#0d1117", border:"1px solid #30363d", borderRadius:"7px", padding:"5px 10px", color:"#e6edf3", fontSize:"13px", cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                  {activeProblem.language.map(lang=><option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              {/* Pill language switcher */}
              <div style={{ display:"flex", gap:"2px", background:"#0d1117", borderRadius:"7px", padding:"3px", border:"1px solid #21262d" }}>
                {activeProblem.language.map(lang=>(
                  <button key={lang} onClick={()=>changeLang(lang)}
                    style={{ background:selectedLang===lang?"#21262d":"transparent", border:selectedLang===lang?"1px solid #30363d":"1px solid transparent", borderRadius:"5px", color:selectedLang===lang?"#e6edf3":"#484f58", cursor:"pointer", padding:"3px 10px", fontSize:"12px", fontWeight:selectedLang===lang?600:400, transition:"all 0.1s" }}>
                    {lang}
                  </button>
                ))}
              </div>
              <div style={{ flex:1 }} />
              <button onClick={()=>{ setCode(activeProblem.starterCode[selectedLang]||""); setOutput(null); }}
                style={{ background:"none", border:"1px solid #21262d", borderRadius:"6px", color:"#6e7681", cursor:"pointer", padding:"5px 12px", fontSize:"12px" }}>
                ↺ Reset
              </button>
            </div>

            {/* Editor */}
            <div style={{ flex:1, overflow:"auto" }}>
              <CodeEditor value={code} onChange={setCode} />
            </div>

            {/* Output */}
            {output && (
              <div style={{ borderTop:"1px solid #21262d", maxHeight:"220px", overflowY:"auto", background:"#0a0d12" }} className="fade">
                {output.type==="run" && (
                  <div style={{ padding:"12px 15px" }}>
                    <div style={{ color:"#e6edf3", fontWeight:600, fontSize:"13px", marginBottom:"10px" }}>Test Results</div>
                    {output.testcases.map((tc,i)=>(
                      <div key={i} style={{ marginBottom:"8px", background:"#161b22", borderRadius:"8px", padding:"9px 12px", border:`1px solid ${tc.passed?"#1e3a2f":"#3d1a1a"}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                          <span style={{ fontSize:"12px", color:"#8b949e" }}>Case {i+1}</span>
                          <div style={{ display:"flex", gap:"10px" }}>
                            <span style={{ fontSize:"11px", color:"#6e7681" }}>{tc.runtime}</span>
                            <span style={{ color:tc.passed?"#00b8a3":"#ff375f", fontSize:"12.5px", fontWeight:600 }}>{tc.passed?"✓ Passed":"✗ Wrong"}</span>
                          </div>
                        </div>
                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11.5px", color:"#8b949e" }}>Input: {tc.input}</div>
                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11.5px" }}>
                          <span style={{ color:"#6e7681" }}>Expected: </span><span style={{ color:"#00b8a3" }}>{tc.expected}</span>
                          {!tc.passed && <><span style={{ color:"#6e7681" }}> · Got: </span><span style={{ color:"#ff375f" }}>{tc.got}</span></>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {output.type==="submit" && (
                  <div style={{ padding:"14px 17px" }}>
                    {output.result==="accepted" ? (
                      <div style={{ display:"flex", gap:"20px", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ color:"#00b8a3", fontSize:"18px", fontWeight:700 }}>✓ Accepted</div>
                          <div style={{ color:"#6e7681", fontSize:"12px", marginTop:"2px" }}>{output.passedCases}/{output.totalCases} test cases passed</div>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", flex:1 }}>
                          {[{lbl:"Runtime",val:output.runtime,beat:output.runtimeBeat},{lbl:"Memory",val:output.memory,beat:output.memoryBeat}].map(s=>(
                            <div key={s.lbl} style={{ background:"#161b22", borderRadius:"8px", padding:"9px 12px", border:"1px solid #21262d" }}>
                              <div style={{ color:"#6e7681", fontSize:"11px", marginBottom:"2px" }}>{s.lbl}</div>
                              <div style={{ color:"#e6edf3", fontSize:"15px", fontWeight:600 }}>{s.val}</div>
                              <div style={{ color:"#f97316", fontSize:"11px" }}>Beats {s.beat} of users</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color:"#ff375f", fontSize:"17px", fontWeight:700, marginBottom:"3px" }}>✗ Wrong Answer</div>
                        <div style={{ color:"#6e7681", fontSize:"12px", marginBottom:"8px" }}>{output.passedCases}/{output.totalCases} test cases passed</div>
                        {output.failedCase && <div style={{ background:"#1a0d0d", border:"1px solid #3d1a1a", borderRadius:"8px", padding:"9px 12px", fontFamily:"'JetBrains Mono',monospace", fontSize:"12px" }}>
                          <span style={{ color:"#6e7681" }}>Failed on: </span><span style={{ color:"#ff7b7b" }}>{output.failedCase}</span>
                        </div>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={{ padding:"9px 14px", borderTop:"1px solid #21262d", background:"#161b22", display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ flex:1 }} />
              <button onClick={handleRun} disabled={isRunning||isSubmitting}
                style={{ background:"#21262d", border:"1px solid #30363d", borderRadius:"7px", color:isRunning?"#484f58":"#e6edf3", cursor:isRunning?"not-allowed":"pointer", padding:"7px 18px", fontSize:"13px", fontWeight:500, display:"flex", alignItems:"center", gap:"6px" }}>
                {isRunning?<><span style={{ display:"inline-block",width:"12px",height:"12px",border:"2px solid #484f58",borderTopColor:"#8b949e",borderRadius:"50%",animation:"spin 0.8s linear infinite" }}/>Running...</>:"▶  Run"}
              </button>
              <button onClick={handleSubmit} disabled={isRunning||isSubmitting}
                style={{ background:isSubmitting?"#1a2a1a":"linear-gradient(135deg,#f97316,#ef4444)", border:"none", borderRadius:"7px", color:isSubmitting?"#484f58":"white", cursor:isSubmitting?"not-allowed":"pointer", padding:"7px 20px", fontSize:"13px", fontWeight:600, display:"flex", alignItems:"center", gap:"6px" }}>
                {isSubmitting?<><span style={{ display:"inline-block",width:"12px",height:"12px",border:"2px solid #3d6b3d",borderTopColor:"#5cb85c",borderRadius:"50%",animation:"spin 0.8s linear infinite" }}/>Submitting...</>:"Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPLORE ── */}
      {view==="explore" && (
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"30px 20px", width:"100%" }} className="fade">
          <div style={{ marginBottom:"24px" }}>
            <h1 style={{ fontSize:"22px", fontWeight:700, color:"#e6edf3", marginBottom:"5px" }}>Explore</h1>
            <p style={{ color:"#6e7681", fontSize:"14px" }}>Curated study plans and topic-focused problem sets to accelerate your preparation.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"14px", marginBottom:"30px" }}>
            {EXPLORE_CARDS.map(c=>(
              <div key={c.title} className="card" style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"12px", padding:"20px", cursor:"pointer" }}>
                <div style={{ fontSize:"30px", marginBottom:"10px" }}>{c.icon}</div>
                <div style={{ color:"#e6edf3", fontWeight:600, fontSize:"14.5px", marginBottom:"5px" }}>{c.title}</div>
                <div style={{ color:"#8b949e", fontSize:"12.5px", lineHeight:1.6, marginBottom:"14px" }}>{c.desc}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:c.color, fontSize:"12px", fontWeight:600, background:`${c.color}18`, padding:"3px 10px", borderRadius:"20px" }}>{c.count}</span>
                  <span style={{ color:"#484f58", fontSize:"13px" }}>→</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"12px", padding:"22px 26px" }}>
            <h2 style={{ color:"#e6edf3", fontSize:"15px", fontWeight:600, marginBottom:"14px" }}>Browse by Topic</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {TOPICS.filter(t=>t!=="All Topics").map(t=>(
                <button key={t} onClick={()=>{ setFilterTopic(t); setView("problems"); }}
                  style={{ background:"#0d1117", border:"1px solid #21262d", borderRadius:"8px", padding:"7px 15px", color:"#c9d1d9", fontSize:"13px", cursor:"pointer", transition:"all 0.15s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#f97316";e.currentTarget.style.color="#f97316";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#21262d";e.currentTarget.style.color="#c9d1d9";}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTEST ── */}
      {view==="contest" && (
        <div style={{ maxWidth:"880px", margin:"0 auto", padding:"30px 20px", width:"100%" }} className="fade">
          <div style={{ marginBottom:"22px" }}>
            <h1 style={{ fontSize:"22px", fontWeight:700, color:"#e6edf3", marginBottom:"5px" }}>Contests</h1>
            <p style={{ color:"#6e7681", fontSize:"14px" }}>Compete with developers worldwide. New contests every week.</p>
          </div>
          <div style={{ display:"flex", borderBottom:"1px solid #21262d", marginBottom:"18px" }}>
            {["upcoming","finished"].map(tab=>(
              <button key={tab} onClick={()=>setContestTab(tab)}
                style={{ background:"none", border:"none", borderBottom:contestTab===tab?"2px solid #f97316":"2px solid transparent", color:contestTab===tab?"#f97316":"#6e7681", cursor:"pointer", padding:"10px 20px", fontSize:"13.5px", fontWeight:contestTab===tab?600:400, textTransform:"capitalize" }}>
                {tab==="upcoming"?"Upcoming":"Past Contests"}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {CONTEST_DATA.filter(c=>contestTab==="upcoming"?c.status==="upcoming":c.status==="finished").map(c=>(
              <div key={c.id} className="card" style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"10px", padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                <div>
                  <div style={{ color:"#e6edf3", fontWeight:600, fontSize:"15px", marginBottom:"5px" }}>{c.id}</div>
                  <div style={{ color:"#6e7681", fontSize:"13px", display:"flex", gap:"16px", flexWrap:"wrap" }}>
                    <span>📅 {c.date}</span>
                    <span>📝 {c.problems} Problems</span>
                    {c.participants!=="-" && <span>👥 {c.participants} participants</span>}
                  </div>
                </div>
                {c.status==="upcoming"
                  ? <button style={{ background:"linear-gradient(135deg,#f97316,#ef4444)", border:"none", borderRadius:"7px", color:"white", padding:"8px 20px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Register</button>
                  : <button style={{ background:"#21262d", border:"1px solid #30363d", borderRadius:"7px", color:"#8b949e", padding:"8px 16px", fontSize:"13px", cursor:"pointer" }}>View Results</button>
                }
              </div>
            ))}
          </div>
          <div style={{ marginTop:"26px", background:"#161b22", border:"1px solid #21262d", borderRadius:"12px", padding:"20px 24px" }}>
            <h2 style={{ color:"#e6edf3", fontSize:"15px", fontWeight:600, marginBottom:"14px" }}>Your Contest Stats</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
              {[{lbl:"Attended",val:"0"},{lbl:"Rating",val:"—"},{lbl:"Global Rank",val:"—"},{lbl:"Top %",val:"—"}].map(s=>(
                <div key={s.lbl} style={{ background:"#0d1117", borderRadius:"8px", padding:"12px 14px", border:"1px solid #21262d" }}>
                  <div style={{ color:"#6e7681", fontSize:"11px", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.lbl}</div>
                  <div style={{ color:"#e6edf3", fontSize:"20px", fontWeight:700 }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DISCUSS ── */}
      {view==="discuss" && (
        <div style={{ maxWidth:"930px", margin:"0 auto", padding:"30px 20px", width:"100%" }} className="fade">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"22px", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <h1 style={{ fontSize:"22px", fontWeight:700, color:"#e6edf3", marginBottom:"5px" }}>Discuss</h1>
              <p style={{ color:"#6e7681", fontSize:"14px" }}>Share solutions, ask questions, and learn from the community.</p>
            </div>
            <button style={{ background:"linear-gradient(135deg,#f97316,#ef4444)", border:"none", borderRadius:"8px", color:"white", padding:"9px 20px", fontSize:"13.5px", fontWeight:600, cursor:"pointer" }}>+ New Post</button>
          </div>
          <div style={{ display:"flex", gap:"6px", marginBottom:"16px", flexWrap:"wrap" }}>
            {["All","Solution","Guide","Question","Discussion","Resource","Story"].map(f=>(
              <button key={f} onClick={()=>setDiscussFilter(f)}
                style={{ background:discussFilter===f?"#f97316":"#161b22", border:`1px solid ${discussFilter===f?"#f97316":"#21262d"}`, borderRadius:"20px", color:discussFilter===f?"white":"#8b949e", padding:"5px 14px", fontSize:"12.5px", cursor:"pointer", transition:"all 0.15s" }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {DISCUSS_POSTS.filter(p=>discussFilter==="All"||p.tag===discussFilter).map(post=>(
              <div key={post.id} className="prow" style={{ background:"#161b22", borderRadius:"8px", padding:"14px 17px", border:"1px solid #21262d", cursor:"pointer", transition:"background 0.1s" }}>
                <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"6px", flexWrap:"wrap" }}>
                  <span style={{ background:"#0d1117", border:"1px solid #21262d", borderRadius:"4px", color:"#8b949e", fontSize:"11px", padding:"2px 7px" }}>{post.tag}</span>
                  {post.difficulty && <span style={{ color:DC[post.difficulty], background:DB[post.difficulty], fontSize:"11px", padding:"2px 7px", borderRadius:"4px" }}>{post.difficulty}</span>}
                </div>
                <div style={{ color:"#e6edf3", fontSize:"14px", fontWeight:500, marginBottom:"7px", lineHeight:1.4 }}>{post.title}</div>
                <div style={{ display:"flex", gap:"14px", fontSize:"12px", color:"#6e7681" }}>
                  <span style={{ color:"#58a6ff" }}>@{post.author}</span>
                  <span>❤ {post.likes}</span>
                  <span>👁 {post.views}</span>
                  <span>{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      {view==="about" && (
        <div style={{ maxWidth:"660px", margin:"48px auto", padding:"0 20px" }} className="fade">
          <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:"16px", padding:"36px 40px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px", paddingBottom:"26px", borderBottom:"1px solid #21262d" }}>
              <div style={{ width:"66px", height:"66px", background:"linear-gradient(135deg,#f97316,#ef4444)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px", fontWeight:700, color:"white", flexShrink:0 }}>M</div>
              <div>
                <h1 style={{ fontSize:"22px", fontWeight:700, color:"#e6edf3", marginBottom:"5px" }}>Mohit</h1>
                <a href="mailto:mohit381330@gmail.com" style={{ color:"#58a6ff", fontSize:"13.5px", textDecoration:"none" }}>✉ mohit381330@gmail.com</a>
              </div>
            </div>
            <div style={{ marginBottom:"22px" }}>
              <h2 style={{ color:"#e6edf3", fontSize:"15px", fontWeight:600, marginBottom:"10px" }}>About CodeForge</h2>
              <p style={{ color:"#8b949e", lineHeight:1.8, fontSize:"13.5px" }}>CodeForge is a full-featured competitive programming and interview preparation platform. With support for multiple programming languages, topic-specific filtering, realistic code editor, contest mode, and community discussions — it mirrors the experience of top-tier platforms.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"22px" }}>
              {[{icon:"⚡",lbl:"Problems",val:`${PROBLEMS.length}+`},{icon:"🌐",lbl:"Languages",val:"5"},{icon:"📚",lbl:"Topics",val:"11+"},{icon:"🏆",lbl:"Difficulty Tiers",val:"3"}].map(s=>(
                <div key={s.lbl} style={{ background:"#0d1117", borderRadius:"10px", padding:"14px 16px", border:"1px solid #21262d" }}>
                  <div style={{ fontSize:"20px", marginBottom:"5px" }}>{s.icon}</div>
                  <div style={{ fontSize:"20px", fontWeight:700, color:"#e6edf3" }}>{s.val}</div>
                  <div style={{ fontSize:"11.5px", color:"#6e7681" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop:"1px solid #21262d", paddingTop:"20px" }}>
              <h2 style={{ color:"#e6edf3", fontSize:"14px", fontWeight:600, marginBottom:"11px" }}>Features</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                {["Multi-language Editor","Language Selector","Topic Filtering","Difficulty Levels","Hint System","Test Runner","Submission Judging","Progress Tracking","Contest Mode","Discussion Forum","Explore Plans"].map(f=>(
                  <span key={f} style={{ background:"#0d1117", border:"1px solid #21262d", borderRadius:"20px", padding:"4px 11px", fontSize:"12px", color:"#8b949e" }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
