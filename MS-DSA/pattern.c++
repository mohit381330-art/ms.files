// Square Pattern (numbers 1..n-1 repeated in rows)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 1; j < n; j++) {
            cout << j;
        }
        cout << endl;
    }
    return 0;
}

// Square Pattern (stars)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}

// Square Pattern (letters, resets each row)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        char ch = 'A';
        for (int j = 0; j < n; j++) {
            cout << ch;
        }
        ch++;
        cout << endl;
    }
    return 0;
}

// Square Pattern (continuous numbers)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int num = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << " " << num;
            num++;
        }
        cout << endl;
    }
    return 0;
}

// Square Pattern (continuous letters)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    char ch = 'A';
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << ch;
            ch++;
        }
        cout << endl;
    }
    return 0;
}

// Triangle Pattern (stars)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    return 0;
}

// Triangle Pattern (row number repeated)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int num = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            cout << (i + 1);
            num++;
        }
        cout << endl;
    }
    return 0;
}

// Triangle Pattern (letters)
#include <iostream>
using namespace std;
int main() {
    char ch = 'A';
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            cout << ch;
        }
        cout << endl;
        ch++;
    }
    return 0;
}

// Triangle Pattern (incrementing numbers per row)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 1; j < i + 1; j++) {
            cout << j;
        }
        cout << endl;
    }
    return 0;
}

// Reverse Triangle Pattern
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j > 0; j--) {
            cout << j;
        }
        cout << endl;
    }
    return 0;
}

// Floyd's Triangle Pattern (numbers)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int num = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            cout << num << " ";
            num++;
        }
        cout << endl;
    }
    return 0;
}

// Floyd's Triangle Pattern (letters)
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    char ch = 'A';
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i + 1; j++) {
            cout << ch << " ";
            ch++;
        }
        cout << endl;
    }
    return 0;
}

// Inverted Triangle Pattern
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            cout << " ";
        }
        for (int j = 0; j < n - i; j++) {
            cout << (i + 1);
        }
        cout << endl;
    }
    return 0;
}

// Pyramid Pattern
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            cout << " ";
        }
        for (int j = 1; j <= i + 1; j++) {
            cout << j;
        }
        for (int j = i; j >= 1; j--) {
            cout << j;
        }
        cout << endl;
    }
    return 0;
}

// Hollow Diamond Pattern
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    // Top
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            cout << " ";
        }
        cout << "*";
        if (i != 0) {
            for (int j = 0; j < 2 * i - 1; j++) {
                cout << " ";
            }
            cout << "*";
        }
        cout << endl;
    }
    // Bottom
    for (int i = 0; i < n - 2; i++) {
        cout << "*";
        if (i != n - 1) {
            for (int j = 0; j < 2 * (n - i) - 5; j++) {
                cout << " ";
            }
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}