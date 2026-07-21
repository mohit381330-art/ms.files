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
    cout << "a after **ptr2=99 -> " << a << endl;
    return 0;
}
