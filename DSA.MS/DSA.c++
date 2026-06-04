// #DATA STRUCTURES AND ALGORITHMS
// Arithmetic operators
#include<iostream>
using namespace std;
int main() {
    int a = 10;
    int b = 20;
    cout << (a + b) << endl; 
    cout << (a - b) << endl; 
    cout << (a * b) << endl; 
    cout << (a / b) << endl; 
    cout << (a % b) << endl; 
    return 0;
}

// Relational operators
#include<iostream>
using namespace std;
int main() {
    int a = 10;
    int b = 20;
    cout << (a == b) << endl;
    cout << (a != b) << endl; 
    cout << (a > b) << endl;  
    cout << (a < b) << endl;  
    cout << (a >= b) << endl; 
    cout << (a <= b) << endl; 
    return 0;
}

// Logical operators
#include<iostream>
using namespace std;
int main() {
    bool a = true;
    bool b = false;
    cout << (a && b) << endl; 
    cout << (a || b) << endl; 
    cout << (!a) << endl;    
    cout << (!b) << endl;    
    return 0;
}

//Bitwise operators 
and,or,xOR,not, leftshift, nightshift

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
