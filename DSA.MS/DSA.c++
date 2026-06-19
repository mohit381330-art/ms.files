                                        // #DSA(CODE)
// loops understanding
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    int i=1;
    while(i<=n) {
        cout<<i<<" ";
        i++;
    }
    return 0;
}

#include <iostream>
using namespace std;

int main() {
    int i = 1;
    
    do {
        cout << i << " ";
        i++;
    } while (i <= 5);
    
    return 0;
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=1;i<=n;i++) {
        cout<<i;
    }
    return 0;
}

// Square Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            cout<<j;
        }
        cout<<endl;
    }
    return 0;
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            cout<<"*";
        }
        cout<<endl;
    }
    return 0;
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        char ch='A'; 
        for(int j=0;j<n;j++) {
            cout<<ch;
            ch++;
        }
        cout<<endl;
    }
    return 0;
}

#include<iostream>
using namespace std;
int main() {
    int n;
    int num=1;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            cout<<" "<<num;
            num++;
        }
        cout<<endl;
    }
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    char ch='A';
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            cout<<ch;
            ch++;
        }
        cout<<endl;
    }
    return 0;
}

// Traingle Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<i+1 ;j++) {
            cout<<"*"<<" ";
        }
        cout<<endl;
    }
    return 0;
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    int num=1;
    for(int i=0;i<n;i++) {
        for(int j=0;j<i+1;j++) {
            cout<<i+1;
            num++;
        }
        cout<<endl;
    }
    return 0;
} 

#include<iostream>
using namespace std;
int main() {
    char ch='A';
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<i+1;j++) {
            cout<<ch;
        }
        cout<<endl;
            ch++;
    }
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=1;j<i+1;j++) {
            cout<<j;
        }
        cout<<endl;
    }
    return 0;
}

// Reverse Traingle Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=i+1;j>0;j--) {
            cout<<j;
        }
        cout<<endl;
    }
    return 0;
}

// Floyd's Traingle Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    int num=1;
    for(int i=0;i<n;i++) {
        for(int j=0;j<i+1;j++) {
            cout<<num<<" ";
            num++;
        }
        cout<<endl;
    }
}

#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    char ch='A';
    for(int i=0;i<n;i++) {
        for(int j=0;j<i+1;j++) {
            cout<<ch<<" ";
            ch++;
        }
        cout<<endl;
    }
}

//Inverted Traingle Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<i;j++) {
            cout<<" ";
        }
        for(int j=0;j<n-i;j++) {
            cout<<i+1;
        }
        cout<<endl;
    }
    return 0;
}

// Pyramid Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=0;i<n;i++) {
        for(int j=0;j<n-i-1;j++) {
            cout<<" ";
        }
        for(int j=1;j<=i+1;j++) {
            cout<<j;
        }
        for(int j=i;j>=1;j--) {
            cout<<j;
        }
        cout<<endl;
    }
    return 0;
}

//Hollow Diamond Pattern
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    //Top
    for(int i=0;i<n;i++) {
        for(int j=0;j<n-i-1;j++) {
            cout<<" ";
        }
        cout<<"*";
        if(i!=0) {
            for(int j=0;j<2*i-1;j++) {
                cout<<" ";
            }
            cout<<"*";
        }
        cout<<endl;
    }
    //Bottom
  for(int i=0;i<n-2;i++) {
    cout<<"*";
    if(i!=n-1) {
        for(int j=0;j<2*(n-i)-5;j++) {
            cout<<" ";
        }
        cout<<"*";
    }
    cout<<endl;
  }  
    return 0;
}

//Function understanding
#include<iostream>
using namespace std;
int sum(int n) {
    int sum=0;
    for(int i=1;i<=n;i++) {
        sum+=i;
    }
    return sum;
}
int main() {
    cout<<sum(100)<<endl;
    cout<<sum(500)<<endl;
    cout<<sum(1000)<<endl;
}

#include<iostream>
using namespace std;
long long fact(int n) {
    long long fact=1;
    for(int i=1;i<=n;i++) {
        fact*=i;
    }
    return fact;
}
int main() {
    int n;
    cin>>n;
    cout<<fact(n)<<endl;
    return 0;
}

// Array Syntax
#include<iostream>
using namespace std;
int main() {
    int marks[5]={11,32,44,55,64};
    cout<<marks[0]<<endl;
    cout<<marks[1]<<endl;
    cout<<marks[2]<<endl;
    cout<<marks[3]<<endl;
    return 0;
}

// loops in Array
#include<iostream>
using namespace std;
int main() {
    int marks[5]={22,44,55,66};
    int length=4;
    for(int i=0;i<length;i++) {
        cout<<marks[i]<<endl;
    }
    return 0;
}

// Smallest or Largest in Array
#include<iostream>
#include<climits>
using namespace std;
int main() {
    int num[6]={144,534,234,123,-113,-222};
    int length=6;
    int smallest=INT_MAX;
    for(int i=0;i<length;i++) {
        if(num[i]<smallest) {
            smallest=num[i];
        }
    }
    cout<<"smallest="<<smallest<<endl;
    return 0;
}

#include<iostream>
#include<climits>
using namespace std;
int main() {
    int num[6]={144,534,234,123,-113,-222};
    int length=6;
    int index;
    int largest=INT_MIN;
    for(int i=0;i<length;i++) {
        if(num[i]>largest) {
            largest=num[i];
            index=i;                //to print the index of largest num
        }
    }
    cout<<"largest="<<largest<<endl;
    cout<<"index="<<index<<endl;      //to print the index of largest num
    return 0;
}

// Pass by reference in Array
#include<iostream>
using namespace std;
void changeArr(int arr[],int length) {
    for(int i=0;i<length;i++) {
        arr[i]=2*arr[i];
    }
}
int main() {
    int arr[]={11,24,55};
    changeArr(arr,3);
    for(int i=0;i<3;i++) {
        cout<<arr[i]<<" ";
    }
    cout<<endl;
    return 0;  
}

// Linear Search In Array
 #include<iostream>
 using namespace std;
 int linearSearch(int arr[],int length, int target) {
    for(int i=0;i<length;i++) {
        if(arr[i]==target)
        return i;
    }
    return -1;
 }
 int main() {
    int arr[]={4,5,6,8,10,12,14};
    int length=7;
    int target=10;
    cout<<linearSearch(arr,length,target);
    return 0;
 }

// Reverse of Array
#include<iostream>
using namespace std;
void reverseArr(int arr[],int length) {
   int start=0,end=length-1;
   while(start<end) {
      swap(arr[start],arr[end]);
      start++,end--;
   }
}
int main() { 
   int arr[7]={1,2,3,4,5,6,7};
   int length=7;
   reverseArr(arr,length);
   for(int i=0;i<length;i++) {
      cout<<arr[i]<<endl;
   }
   cout<<endl;
   return 0;
}

// Vector Syntax
#include<iostream>
#include<vector>
using namespace std;
int main() {
   vector<int> vec={1,2,3};
   cout<<vec[2]<<endl;
   return 0;
}

// loops in vector
#include<iostream>
#include<vector>
using namespace std;
int main() {
    vector<int> vec{1,2,3,4,5,6};
    for(int i:vec) {
        cout<<i<<endl;
    }
    return 0;
}

// MSS(Basics)
#include<iostream>
using namespace std;
int main() {
    int n=5;
    int arr[5]={1,2,3,4,5};
    for(int st=0;st<n;st++) {
        for(int end=st;end<n;end++) {
            for(int i=st;i<=end;i++) {
                cout<<arr[i];
            }
            cout<<" ";
        }
        cout<<endl;
    }
    return 0;
}

// MSS(BRUTE FORCE)
#include<iostream>
#include<climits>
using namespace std;
int main() {
    int n=5;
    int arr[5]={1,-33,-55,30,25};
    int maxSum=INT_MIN;
    for(int st=0;st<n;st++) {
        int currentSum=0;
        for(int end=st;end<n;end++) {
             currentSum+=arr[end];
            maxSum=max(currentSum,maxSum);
        }
    }
    cout<<"Max sum="<<maxSum<<endl;
    return 0;
}

// MSS(Kadane's Algorithm)
#include<iostream>
#include<climits>
using namespace std;
int main() {
    int arr[7]={1,2,-3,4,-6,7,-8};
    int n=7;
    int currentSum=0;
    int maxSum=INT_MIN;
    for(int i=0;i<n;i++) {
        currentSum+=arr[i];
        maxSum=max(currentSum,maxSum);
    }
    if(currentSum<0) {
        currentSum=0;
    }
    cout<<"MSS:"<<maxSum<<endl;
    return 0;
}

// Pair Sum (Brute-Force)
#include<iostream>
#include<vector>
using namespace std;
vector<int> pairSum(vector<int>nums,int target) {
    vector<int> ans;
    int n=4;
    for(int i=0;i<n;i++) {  
        for(int j=i+1;j<n;j++) {
            if(nums[i]+nums[j]==target) {
                ans.push_back(i);
                ans.push_back(j);
                return ans;
            }
        }
    }
}
int main() {
    vector<int> nums={2,7,11,15};
    int target=26;
    vector<int> ans=pairSum(nums,target);
    cout<<ans[0]<<", "<<ans[1]<<endl;
    return 0;
}

// Pair Sum(optimal)
#include<iostream>
#include<vector>
using namespace std;
vector<int>pairSum(vector<int>nums,int target) {
    vector<int>ans;
    int n=3;
    int i=0 ,j=n-1;
    while(i<j) {
        int pairSum=nums[i]+nums[j];
        if(pairSum>target) {
            j--;
        }
        else if(pairSum<target) {
            i++;
        } 
        else{
            ans.push_back(i);
            ans.push_back(j);
            return ans;
        }
    }
}
int main() { 
    vector<int>nums{12,32,56};
    int target=68;
    vector<int>ans=pairSum(nums,target);
    cout<<ans[0]<<", "<<ans[1]<<endl;
    return 0;
}

