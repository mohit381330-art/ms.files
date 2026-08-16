
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
