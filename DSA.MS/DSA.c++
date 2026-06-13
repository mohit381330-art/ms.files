                                        // #DSA(SOURCE-CODE)
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

// nCr calculation program
#include<iostream>
using namespace std;
int factorial(int n) {
    int fact=1;
    for(int i=1;i<=n;i++) {
         fact*=i;
    }
    return fact;
}
int nCr(int n,int r) {
    int fact_n=factorial(n);
    int fact_r=factorial(r);
    int fact_nmr=factorial(n-r);
    return fact_n/(fact_r*fact_nmr);
}
int main() {
    int n=10,r=2;
    cout<<nCr(n,r)<<endl;
    return 0;
}
