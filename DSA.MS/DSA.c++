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

// Pattern
