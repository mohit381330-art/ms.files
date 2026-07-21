// Pointer
#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int *ptr = &a;      
    cout << "a = " << a << endl;
    cout << "*ptr (value at ptr) = " << *ptr << endl;
    *ptr = 20;           
    cout << "a after *ptr=20 -> " << a << endl;
    return 0;
}

// Pointer to Pointer (
#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int *ptr1 = &a;        
    int **ptr2 = &ptr1;    
    cout << "a = " << a << endl;
    cout << "*ptr1 = " << *ptr1 << endl;
    cout << "**ptr2 = " << **ptr2 << endl;
    **ptr2 = 99;            
    cout<< a << endl;
    return 0;
}

// Dereference
#include <iostream>
using namespace std;
int main() {
    int a = 5;
    int *ptr = &a;
    cout << "ptr (address) = " << ptr << endl;
    cout << *(ptr) << endl;
    return 0;
}

// Null Pointer
#include <iostream>
using namespace std;
int main() {
    int *ptr = nullptr;   
    if (ptr == nullptr) {
        cout << "Ptr khaali hai, kisi address ko point nahi karta" << endl;
    }
    int a = 50;
    ptr = &a;               
    if (ptr != nullptr) {
        cout << "Ab ptr valid hai, value = " << *ptr << endl;
    }
    return 0;
}

// pointer arithmatic
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;   
    cout << "ptr address: " << ptr << endl;
    cout << "ptr+1 address: " << (ptr + 1) << endl;
    cout << "ptr+1 address: " << (ptr + 2) << endl;
    cout << "ptr+1 address: " << (ptr + 3) << endl;
    return 0;
}

// pointer increament
#include <iostream>
using namespace std;
int main() {
    int arr[3] = {100, 200, 300};
    int *ptr = arr;
    cout << "*ptr = " << *ptr << endl;   
    ptr++;   
    cout << "*ptr after ptr++ = " << *ptr << endl;   
    ptr++;
    cout << "*ptr after ptr++ = " << *ptr << endl;
    return 0;
}

// Difference of pointers
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr1 = &arr[1];   
    int *ptr2 = &arr[4];
    cout << "Elements between ptr1 and ptr2 = " << (ptr2 - ptr1) << endl;
    return 0;
}

// array traversing
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *ptr = arr;
    int *end = arr + 5;   // last element ke baad wali (imaginary) location
    cout << "Array elements using pointer: ";
    while (ptr < end) {
        cout << *ptr << " ";
        ptr++;
    }
    cout << endl;
    return 0;
}

// pass by reference
#include <iostream>
using namespace std;
void doubleIt(int &x) {   
    x = x * 2;
}
int main() {
    int a = 5;
    cout << "Before: a = " << a << endl;
    doubleIt(a);
    cout << "After: a = " << a << endl;   // original a change ho gaya!
    return 0;
}

// by alias
#include <iostream>
using namespace std;
int main() {
    int a = 100;
    int &b = a;    
    cout << "a = " << a << ", b = " << b << endl;
    b = 200;        
    cout << "After b=200 -> a = " << a << ", b = " << b << endl;
    a = 300;        
    cout << "After a=300 -> a = " << a << ", b = " << b << endl;
    return 0;
}

