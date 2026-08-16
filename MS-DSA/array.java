
//  Smallest in Array
public class Main {
    public static void main(String[] args) {
        int[] num = {144, 534, 234, 123, -113, -222};
        int length = num.length;
        int smallest = Integer.MAX_VALUE; // INT_MAX की जगह
        for (int i = 0; i < length; i++) {
            if (num[i] < smallest) {
                smallest = num[i];
            }
        }
        System.out.println("smallest=" + smallest);
    }
}


//  Largest in Array (with index)
public class Main {
    public static void main(String[] args) {
        int[] num = {144, 534, 234, 123, -113, -222};
        int length = num.length;
        int index = 0;
        int largest = Integer.MIN_VALUE; // INT_MIN की जगह
        for (int i = 0; i < length; i++) {
            if (num[i] > largest) {
                largest = num[i];
                index = i;
            }
        }
        System.out.println("largest=" + largest);
        System.out.println("index=" + index);
    }
}


//  Linear Search in Array
public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 5, 6, 8, 10, 12, 14};
        int length = arr.length;
        int target = 10;
        int index = -1;
        for (int i = 0; i < length; i++) {
            if (arr[i] == target) {
                index = i;
            }
        }
        System.out.println(index);
    }
}


//  Reverse of Array
public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        int length = arr.length;
        int start = 0, end = length - 1;
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
        for (int i = 0; i < length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}


// Single Number
public class Main {
    public static void main(String[] args) {
        int ans = 0;
        int[] arr = {2, 2, 2, 4}; // जावा में एरे का सिंटैक्स
        
        for (int i : arr) {
            ans ^= i; // XOR ऑपरेशन
        }
        
        System.out.println(ans);
    }
}

//  MSS (Kadane's Algorithm)
class Solution {
    public int maxSubArray(int[] nums) {
        int currentsum = 0;
        int maxsum = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            currentsum += nums[i];
            maxsum = Math.max(currentsum, maxsum); // Math.max का उपयोग
            if (currentsum < 0) {
                currentsum = 0;
            }
        }
        return maxsum;
    }
}

//  Majority Element (Moore's Voting)
class Solution {
    public int majorityElement(int[] nums) {
        int repeat = 0, ans = 0;
        for (int i = 0; i < nums.length; i++) {
            if (repeat == 0) {
                ans = nums[i];
            }
            if (ans == nums[i]) {
                repeat++;
            } else {
                repeat--;
            }
        }
        return ans;
    }
}


//  Compute x^n
class Solution {
    public double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        long binForm = n; // long long की जगह केवल long
        if (binForm < 0) {
            x = 1 / x;
            binForm = -binForm;
        }
        double ans = 1;
        while (binForm > 0) {
            if (binForm % 2 == 1) {
                ans *= x;
            }
            x *= x;
            binForm /= 2;
        }
        return ans;
    }
}


//  Stock Buy and Sell
class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0, bestBuy = prices[0];
        for (int i = 1; i < prices.length; i++) {
            maxProfit = Math.max(maxProfit, prices[i] - bestBuy);
            bestBuy = Math.min(bestBuy, prices[i]);
        }
        return maxProfit;
    }
}


//  Container With Most Water
class Solution {
    public int maxArea(int[] height) {
        int n = height.length;
        int lp = 0, rp = n - 1, maxwater = 0;
        while (lp < rp) {
            int wd = rp - lp;
            int ht = Math.min(height[lp], height[rp]);
            int currwater = wd * ht;
            maxwater = Math.max(currwater, maxwater);
            if (height[lp] < height[rp]) {
                lp++;
            } else {
                rp--;
            }
        }
        return maxwater;
    }
}


//Product of array except self using O(n)
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        int[] prefix = new int[n];
        int[] suffix = new int[n];
        
        // Arrays.fill की जगह मैन्युअल डिफॉल्ट 1 असाइन करना या लूप लगाना
        java.util.Arrays.fill(ans, 1);
        java.util.Arrays.fill(prefix, 1);
        java.util.Arrays.fill(suffix, 1);
        
        // prefix
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] * nums[i - 1];
        }
        // suffix
        for (int i = n - 2; i >= 0; i--) {
            suffix[i] = suffix[i + 1] * nums[i + 1];
        }
        // ans
        for (int i = 0; i < n; i++) {
            ans[i] = prefix[i] * suffix[i];
        }
        return ans;
    }
}


//Product of array except self using O(1)
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        java.util.Arrays.fill(ans, 1);
        
        int prefix = 1;
        int suffix = 1;
        // prefix=>ans
        for (int i = 1; i < n; i++) {
            ans[i] = ans[i - 1] * nums[i - 1];
        }
        // suffix
        for (int i = n - 2; i >= 0; i--) {
            suffix *= nums[i + 1];
            ans[i] *= suffix;
        }
        return ans;
    }
}


// binary search
class Solution {
    public int search(int[] nums, int target) {
        int st = 0, end = nums.length - 1;
        while (st <= end) {
            int mid = st + (end - st) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] > target) {
                end = mid - 1;
            } else {
                st = mid + 1;
            }
        }
        return -1;
    }
}


// search in rotated sorted array
class Solution {
    public int search(int[] nums, int target) {
        int st = 0, end = nums.length - 1;
        while (st <= end) {
            int mid = st + (end - st) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            // If left half sorted 
            if (nums[st] <= nums[mid]) {
                if (nums[st] <= target && target <= nums[mid]) {
                    end = mid - 1;
                } else {
                    st = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] <= target && target <= nums[end]) {
                    st = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        }
        return -1;
    }
}


// peak element in mountain array
class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        int st = 1, end = arr.length - 2;
        while (st <= end) {
            int mid = st + (end - st) / 2;
            if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
                return mid;
            } else if (arr[mid - 1] < arr[mid]) {
                st = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return -1;
    }
}


// single element in sorted array
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0]; // एक्स्ट्रा सेफ्टी चेक
        
        int st = 0, end = n - 1;

        while (st <= end) {
            int mid = st + (end - st) / 2;

            if (mid == 0 && nums[0] != nums[1]) return nums[mid];
            if (mid == n - 1 && nums[n - 1] != nums[n - 2]) return nums[mid];

            if (nums[mid - 1] != nums[mid] && nums[mid] != nums[mid + 1]) return nums[mid];

            if (mid % 2 == 0) { // even
                if (nums[mid - 1] == nums[mid]) { // left
                    end = mid - 1;
                } else { // right
                    st = mid + 1;
                }
            } else { // odd
                if (nums[mid - 1] == nums[mid]) { // right (A की जगह nums)
                    st = mid + 1;
                } else { // left
                    end = mid - 1; // यहाँ बग था (mid + 1 से इनफिनिट लूप बन जाता), इसे mid - 1 किया
                }
            }
        }
        return -1;
    }
}


// Book allocation
