---
title: Numbers
slug: numbers
category: Data Types
---

`int` : 정수(integer)를 나타내는 자료형

```python
x = 1
print(type(x))
```
```
<class 'int'>
```

<br>

> **다른 진법을 활용한 정수 표현**
> ```python
b = 0b10011
o = 0o17
h = 0x1F
>
> print(b, type(b))
> print(o, type(o))
> print(h, type(h))
> ```
> ```
> 19 <class 'int'>
> 15 <class 'int'>
> 31 <class 'int'>
> ```

<br>

`float` : 실수를 부동소수점 방식으로 나타내는 자료형 (floating point numbers)

> C나 Java 처럼 float, double로 구분하지 않고 float만 존재하며, 다른 언어의 double과 같다.

```python
y = 1.0
print(type(y))
```
```
<class 'float'>
```

<br>

> **Infinity (∞, 무한대) 표현하기**
>
> Conversion 함수인 `float()`에 변수로 "inf" 또는 "infinity"를 넣어서 만들 수 있으며, 대소문자를 구분하지 않는다.
>
> ```python
> a = float("inf")
> b = float("infinity")
> c = float("INF")
> d = float("iNfINity")
>
> print(a, b, c, d)
> ```
> ```
inf inf inf inf
> ```
>
> 문자열에 앞에 부호 `+`와 `-`를 추가하여 양의 무한대와 음의 무한대를 구분해 생성할 수 있다.
>
> ```python
a = float("+inf")   # float("inf")와 동일
b = float("-inf")
print(a, b)
> ```
> ```
inf -inf
> ```
>
> 무한대를 이용한 사칙연산 및 비교연산이 가능하며, 이를 이용해 음의 무한대를 생성할 수도 있다.
> ```python
a = -float("inf")
print(a)
> ```
> ```
-inf
> ```

<br>

`complex` : 복소수(complex number)를 나타내는 자료형

```python
z = 1 + 2j
print(type(z))
```
```
<class 'complex'>
```

<br>

실수 부분(real part)과 허수 부분(imaginary part) 계수를 읽어올 수도 있다.
```python
z = 1 + 2j

print(z.real)
print(z.imag)
```
```
1.0
2.0
```
<br>

## Operators (연산자)

### Arithmetic Operators (산술 연산자)

| 연산자 | 이름     | 사용법   | 결과 |
|:------:|:-------:|:--------:|:----:|
| `+`    | 더하기   | `2 + 3`  | 5    |
| `-`    | 빼기     | `2 - 3`  | -1   |
| `*`    | 곱하기   | `2 * 3`  | 6    |
| `/`    | 나누기   | `9 / 4`  | 2.25 |
| `//`   | 몫       | `9 // 4` | 2    |
| `%`    | 나머지   | `9 % 4`  | 1    |
| `**`   | 거듭제곱 | `2 ** 3` | 8    |

<br>

> **$$ \begin{aligned} x^y \end{aligned} $$을 계산하는 방법**
>
>`x ** y` 또는 `pow(x, y)`를 사용할 수 있다.
>
> ```python
> a, b = -1j, 2
>
> print(a ** b)
> print(pow(a, b))
> ```
> ```
(-1+0j)
(-1+0j)
> ```

<br>

> **나머지와 몫을 한 번에 구하는 방법**
>
> `divmod(x, y)`를 사용할 수 있다.
>
> ```python
> a, b = 11, 3
>
> print(a//b)
> print(a%b)
> print(divmod(a, b))
> ```
> ```
3
2
(3, 2)
> ```

<br>

### Comparison Operators (비교 연산자)

| 연산자 | 사용법    | 결과  |
|:------:|:--------:|:-----:|
| `<`    | `2 < 3`  | True  |
| `<=`   | `2 <= 3` | True  |
| `>`    | `2 > 3`  | False |
| `>=`   | `2 >= 3` | False |
| `==`   | `2 == 3` | False |
| `!=`   | `2 != 3` | True  |

<br>

> **Identity Operators (객체 비교 연산자)**
>
> 두 객체가 서로 갖거나 다른지 비교하는 `is` 와 `is not` 연산자로 숫자형 객체들을 비교하는 경우에는 각각 `==`, `!=`와 동일하게 동작한다.
>
> ```python
> # 숫자인 경우
>
> a = 1
> b = 1
>
> print(a == b)
> print(a != b)
> print(a is b)
> print(a is not b)
> ```
> ```
True
False
True
False
> ```
> ```python
> # 숫자가 아닌 경우
>
> a = []
> b = []
>
> print(a == b)
> print(a != b)
> print(a is b)
> print(a is not b)
> ```
> ```
True
False
False
True
> ```

<br>

### Bitwise Operators (비트 연산자)

비트 연산은 이진수 형태에서 비트 단위로 적용하기 때문에 정수형만 연산이 가능하다.

| 연산자 | 이름         | 사용법   | 설명  | 참고 |
|:------:|:-----------:|:--------:|:------|:------|
| `&`    | AND         | `x & y`  | 비트별로 AND 연산  | |
| `|`    | OR          | `x | y`  | 비트별로 OR 연산 | |
| `^`    | XOR         | `x ^ y`  | 비트별로 exclusive or 연산 | |
| `~`    | NOT         | `~x`     | x의 각 비트를 반전  | |
| `<<`   | Left Shift  | `x << n` | x를 n비트만큼 왼쪽으로 옮긴다 | n은 0 이상 |
| `>>`   | Right Shift | `x >> n` | x를 n비트만큼 오른쪽으로 옮긴다  | n은 0 이상 |


<br>

### Assignment Operators (대입 연산자)

| 연산자 | 사용법    | 의미         |
|:-----:|:---------:|:------------:|
| `+=`  | `x += 3`  | x = x + 3  |
| `-=`  | `x -= 3`  | x = x - 3  |
| `*=`  | `x *= 3`  | x = x * 3  |
| `/=`  | `x /= 3`  | x = x / 3  |
| `%=`  | `x %= 3`  | x = x % 3  |
| `//=` | `x //= 3` | x = x // 3 |
| `**=` | `x **= 3` | x = x ** 3 |
| `&=`  | `x &= 3`  | x = x & 3  |
| `|=`  | `x |= 3`  | x = x \| 3  |
| `^=`  | `x ^= 3`  | x = x ^ 3  |
| `>>=` | `x >>= 3` | x = x >> 3 |
| `<<=` | `x <<= 3` | x = x << 3 |
