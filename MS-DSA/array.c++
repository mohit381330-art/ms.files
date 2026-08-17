// Smallest in Array
#include <bits/stdc++.h>
using namespace std;
int main() {
    int num[] = {144, 534, 234, 123, -113, -222};
    int length = sizeof(num) / sizeof(num[0]);
    int smallest = INT_MAX;
    for (int i = 0; i < length; i++) {
        if (num[i] < smallest) {
            smallest = num[i];
        }
    }
    cout << "smallest=" << smallest << endl;
    return 0;
}


// Largest in Array (with index)
#include <bits/stdc++.h>
using namespace std;
int main() {
    int num[] = {144, 534, 234, 123, -113, -222};
    int length = sizeof(num) / sizeof(num[0]);
    int index = 0;
    int largest = INT_MIN;
    for (int i = 0; i < length; i++) {
        if (num[i] > largest) {
            largest = num[i];
            index = i;
        }
    }
    cout << "largest=" << largest << endl;
    cout << "index=" << index << endl;
    return 0;
}


// Linear Search in Array
#include <bits/stdc++.h>
using namespace std;
int main() {
    int arr[] = {4, 5, 6, 8, 10, 12, 14};
    int length = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    int index = -1;
    for (int i = 0; i < length; i++) {
        if (arr[i] == target) {
            index = i;
        }
    }
    cout << index << endl;
    return 0;
}


// Reverse of Array
#include <bits/stdc++.h>
using namespace std;
int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int length = sizeof(arr) / sizeof(arr[0]);
    int start = 0, end = length - 1;
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    for (int i = 0; i < length; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}


// Single Number
#include <bits/stdc++.h>
using namespace std;
int main() {
    int ans = 0;
    int arr[] = {2, 2, 2, 4};
    int length = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < length; i++) {
        ans ^= arr[i]; // XOR operation
    }

    cout << ans << endl;
    return 0;
}


// MSS (Kadane's Algorithm)
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentsum = 0;
        int maxsum = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            currentsum += nums[i];
            maxsum = max(currentsum, maxsum);
            if (currentsum < 0) {
                currentsum = 0;
            }
        }
        return maxsum;
    }
};


// Majority Element (Moore's Voting)
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int repeat = 0, ans = 0;
        for (int i = 0; i < nums.size(); i++) {
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
};


// Compute x^n
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        long long binForm = n;
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
};


// Stock Buy and Sell
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0, bestBuy = prices[0];
        for (int i = 1; i < prices.size(); i++) {
            maxProfit = max(maxProfit, prices[i] - bestBuy);
            bestBuy = min(bestBuy, prices[i]);
        }
        return maxProfit;
    }
};


// Container With Most Water
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size();
        int lp = 0, rp = n - 1, maxwater = 0;
        while (lp < rp) {
            int wd = rp - lp;
            int ht = min(height[lp], height[rp]);
            int currwater = wd * ht;
            maxwater = max(currwater, maxwater);
            if (height[lp] < height[rp]) {
                lp++;
            } else {
                rp--;
            }
        }
        return maxwater;
    }
};


// Product of array except self using O(1)
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 1);

        int suffix = 1;
        // prefix => ans
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
};


// Binary Search
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int st = 0, end = nums.size() - 1;
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
};


// Search in Rotated Sorted Array
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int st = 0, end = nums.size() - 1;
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
};


// Peak Element in Mountain Array
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int st = 1, end = arr.size() - 2;
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
};


// Single Element in Sorted Array
#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0]; // extra safety check

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
                if (nums[mid - 1] == nums[mid]) { // right
                    st = mid + 1;
                } else { // left
                    end = mid - 1;
                }
            }
        }
        return -1;
    }
};


// Book allocation
