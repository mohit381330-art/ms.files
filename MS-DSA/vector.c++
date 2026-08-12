// Vector Syntax
import java.util.ArrayList;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        // C++: vector<int> vec = {1, 2, 3};
        ArrayList<Integer> vec = new ArrayList<>(Arrays.asList(1, 2, 3));
        
        // C++: vec[2]
        System.out.println(vec.get(2)); 
    }
}


// Loops in Vector
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> vec = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        
        // For-Each Loop (बिल्कुल C++ जैसा ही है)
        for (int i : vec) {
            System.out.println(i);
        }
    }
}


// Single Number
public class Main {
    public static void main(String[] args) {
        int ans = 0;
        int[] arr = {2, 2, 2, 4}; // जावा में एरे का सिंटैक्स
        
        for (int i : arr) {
            ans ^= i; // XOR ऑपरेशन
        }
        
        System.out.println(ans);
    }
}
