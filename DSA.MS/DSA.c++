                                        // #DSA(CODE)
// While loop
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

// do while loop
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

//for loop
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

// Array syntax
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
