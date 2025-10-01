const n=`---\r
title: "繰り返し2乗法で高速にべき乗を求めよう"\r
date: "2025-07-17"\r
authorId: "yes_antikiss"\r
excerpt: "べき乗を高速化"\r
imageUrl: "https://placehold.co/400x250/FF851B/FFFFFF?text=a^b"\r
tags: ["C++", "メモ"]\r
---\r
\r
みなさんこんにちは、yesです。\r
今回は整数のべき乗(a^b)を高速に求める方法をまとめようと思います。\r
\r
## 普通に書くと\r
\r
まず初めに思いつくのはこういうコードでしょう。\r
\r
\`\`\`cpp\r
long long power(long long a, long long b){\r
    long long res = 1;\r
    for (long long i = 0; i < b; i++) {\r
        res *= a;\r
    }\r
    return res;\r
};\r
\`\`\`\r
\r
しかしこのコードだと、bが非常に大きい場合(b = 10^9など)の場合非常に時間がかかってしまいます。\r
\r
## 考え方\r
ここで、次の性質を使います。\r
\r
> x^(a+b) = x^a * x^b\r
\r
この性質を使うと、例えば2^23の場合、\r
\r
> 2^23 = 2^16 * 2^4 * 2^2 * 2^1 = 2^(2^4) * 2^(2^2) * 2^(2^1) * 2^(2^0)\r
\r
のように、bを2進数で表現して分割することができます。\r
\r
さらに言い換えると、23=10111(2)というように、1桁目からbitが立っているか(2進数のn桁目が1か？)と表現できるので、次のように書けます。\r
\r
\`\`\`cpp\r
long long integer_pow(long long a, long long b) {\r
    long long res = 1;\r
    long long t = a;\r
    for (int i = 0; i < 63; i++) { // b <= LLONG_MAX = 2^63 - 1\r
        if (b & (1LL << i)) res *= t;\r
        t *= t;\r
    }\r
    return res;\r
};\r
\`\`\`\r
\r
ここで、**b & (1LL << i)** が何をしているのかを説明します。\r
\r
### 1LL << i とは？\r
\r
これは　**1という数をi回左シフト(左にずらす)** ことです。\r
例を挙げると、\r
\r
- i = 0 のとき、**1 << 0 = 1** 2進数だと00001\r
- i = 1 のとき、**1 << 1 = 2** 2進数だと00010\r
- i = 2 のとき、**1 << 2 = 4** 2進数だと00100\r
- i = 3 のとき、**1 << 3 = 8** 2進数だと01000\r
- i = 4 のとき、**1 << 4 = 16** 2進数だと10000\r
\r
見ての通り、1 << xは **1 * 2^x** と対応していることが分かります。\r
(ちなみに、1LLのLLはlong long型にするための接尾辞です)\r
\r
### & とは？\r
\r
**&** は、2つの数を2進数で表したときに、両方の同じ桁が **1** の場合だけ、その桁が **1** になるという計算（論理積）をすることです。\r
\r
### 結局 b & (1LL << i) は何をしているか\r
\r
まず b = 23 とします。\r
そうすると、\r
\r
- i = 0 の時は (10111 & 00001) = **00001** = 1\r
- i = 1 の時は (10111 & 00010) = **00010** = 2\r
- i = 2 の時は (10111 & 00100) = **00100** = 4\r
- i = 3 の時は (10111 & 01000) = **00000** = 0\r
- i = 4 の時は (10111 & 10000) = **10000** = 16\r
\r
となります。\r
\r
C++では整数型の場合0がfalse、それ以外ならtrueと扱うので、桁ごとにbitが立っているかを判定することができます。\r
\r
## 使用例\r
\r
\`\`\`cpp\r
#include <iostream>\r
\r
long long integer_pow(long long a, long long b) {\r
    /* 省略 */\r
};\r
\r
int main() {\r
    std::cout << "10^3 : " << integer_pow(10, 3) << '\\n';\r
    std::cout << "3^10 : " << integer_pow(3, 10) << '\\n';\r
    std::cout << "2^50 : " << integer_pow(2, 50) << '\\n';\r
}\r
\`\`\`\r
\r
### Output\r
\r
\`\`\`\r
10^3 : 1000\r
3^10 : 59049\r
2^50 : 1125899906842624\r
\`\`\`\r
\r
## 改善点\r
\r
この方法で正確に求められますが、数が非常に大きくなりオーバーフローしてしまう可能性があるので、適宜modを取るようにしても良いかなと思います。\r
また、aをdouble型にしたときbを負にしても数を表現出来るので、それに対応するように書いてもいいと思います。\r
\r
## mod をとる場合\r
\r
競技プログラミングではmod 998244353での答えを求めることが多々あるので、次のように書くと便利です。\r
\r
\`\`\`cpp\r
long long mod_pow(long long a, long long b, long long mod = 998244353) {\r
    long long res = 1;\r
    long long t = a % mod;\r
    for (int i = 0; i < 63; i++) { // b <= LLONG_MAX = 2^63 - 1\r
        if (b & (1LL << i)) res = res * t % mod;\r
        t = t * t % mod;\r
    }\r
    return res;\r
};\r
\`\`\`\r
\r
AtCoder Libraryのmodintを使わない人でべき乗をしたい！という方は参考にしてみてください`;export{n as default};
