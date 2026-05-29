// #DATA STRUCTURES AND ALGORITHMS
// Data types and type casting 
#include <iostream>
using namespace std;
int main()
{
    int a = 123;
    int x=3.0/2;
    char b = 'w';
    int size_a = sizeof(a);
    int size_b = sizeof(b);
    bool bl = true;
    float f = 21.22;
    double d = 123.44;
    int c = 'c';
    cout << "Hello Mohit" << endl;
    cout << a << endl;
    cout << b << endl; 
    cout << bl << endl;
    cout << f << endl;
    cout << d << endl;
    cout << "size of a:" << size_a << endl;
    cout << "size of b:" << size_b << endl;
    cout<<-5<<endl;
    cout << c << endl;
    cout<<x<<endl;
    cout<<3.0/2<<endl;
    return 0;
}

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
