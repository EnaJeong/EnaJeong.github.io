---
title: String
slug: string
category: Data Types
---

`str` : 문자열(문자의 순서가 있는 나열)을 나타내는 자료형

> Python은 'char' 형이 없다.

<br>

Python에서는 작은 따옴표와 큰 따옴표 모두 문자열을 만들 때 사용한다.

```python
a = "Hello"
b = 'Hello'

print(type(a))
print(type(b))
```
```
<class 'str'>
<class 'str'>
```

<br>

하나의 변수에 여러 줄의 문자열을 넣고 싶으면 작은 따옴표 3개(`'''`)나 큰 따옴표 3개(`"""`)를 사용할 수 있다.

```python
a = """Hello
I have 2 lines"""

print(a)
print(type(a))
```
```
Hello
I have 2 lines
<class 'str'>
```
```python
b = '''Hello
I have 2 lines'''

print(b)
print(type(b))
```
```
Hello
I have 2 lines
<class 'str'>
```

<br>

## Indexing and Slicing

`str`은 일종의 'immutable sequence'로 취급되어 indexing과 slicing이 가능하다.

<br>

다음과 같이 변수 `a`에 문자열 "immutable sequence"를 할당하였다.

```python
a = "immutable sequence"
```

<br>

### Indexing

변수 `a`에 할당된 문자열에 **0**부터 시작하는 번호를 매기면 다음과 같다.

| i | m | m | u | t | a | b | l | e |   |  s |  e |  q |  u |  e |  n |  c |  e |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |

이때 각 문자에 매겨진 번호가 해당 문자의 **인덱스(index)**를 의미하고,

각 문자에 인덱스를 부여하는 것을 **인덱싱(indexing)**이라고 한다.

<br>

`a`의 인덱스가 i인 문자를 `a[i]`라고 지칭하여 읽을 수 있다.

```python
a = "immutable sequence"
print(a[3])
```
```
u
```

<br>

음수도 인덱스로 사용 가능하며, 이는 뒤에서 부터 몇 번째 문자인지를 의미한다.

위의 변수 `a`에 할당된 문자열의 인덱스는 다음과 같다.

|  i  |  m  |  m  |  u  |  t  |  a  |  b  |  l  |  e  |    |  s |  e |  q |  u |  e |  n |  c |  e |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
| -18 | -17 | -16 | -15 | -14 | -13 | -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 |

```python
a = "immutable sequence"
print(a[-3])
```
```
n
```
<br>

### Slicing

문자열에서 필요한 부분만 잘라서 선택하는 것을 슬라이싱(slicing)이라고 한다.

<br>

`a[i:j]` : 인덱스가 i보다 크거나 같고 j보다 작은 문자들을 모두 선택

```python
a = "immutable sequence"

print(a[1:5])   # index 1, 2, 3, 4
```
```
mmut
```

시작 인덱스(`i`)나 마지막 인덱스(`j`)를 지정하지 않을 수 있다.
시작 인덱스를 지정하지 않으면 문자열의 첫 문자부터 선택하고,
마지막 인덱스를 지정하지 않으면 문자열의 끝 문자까지 선택한다.

```python
a = "immutable sequence"

print(a[:5])    # index 처음(0) ~ 4
print(a[10:])   # index 10 ~ 끝(17)
print(a[:])     # index 처음(0) ~ 끝(17)
```
```
immut
sequence
immutable sequence
```

음수 인덱스 역시 사용 가능하다.

```python
a = "immutable sequence"

print(a[-5:-1])
print(a[-5:])
print(a[:-14])
print(a[6:-8])
print(a[-12:10])
```
```
uenc
uence
immu
ble
ble
```

<br>

**Extended Slicing**

"step" parameter인 `k`가 추가되어, 인덱스를 등차수열 형태로 가리킨다.

`a[i:j:k]` : 인덱스가 i보다 크거나 같고 j보다 작으면서 (i + n*k, n은 양의 정수) 값인 문자들을 모두 선택

```python
a = "immutable sequence"

print(a[1:10:2])
print(a[-7:-2:2])
print(a[:10:3])
print(a[-10::3])
print(a[::2])
```
```
mual
eun
iub
eeee
imtbesqec
```

`k`값을 음수로 넣는 경우에는 인덱스 `i`가 인덱스 `j`보다 커야 한다.

> 인덱스의 부호가 같은 경우 기준

```python
a = "immutable sequence"

print(a[10:1:-2])
print(a[-4:-9:-3])
print(a[-4:2:-3])   # 양의 인덱스와 음의 인덱스 혼합 사용 가능
print(a[10::-2])
print(a[:-9:-3])
print(a[::-2])
```
```
sebtm
ee
eeea
sebtmi
eee
enue laum
```

<br>

> **Slicing 이해**
>
> 인덱스가 가리키는 위치가 각 문자의 사이, 지칭하는 문자의 앞이라고 보면 된다.
>
> 문자열 "Slicing"의 인덱스를 예로 들면 다음과 같다.
>
> ```
>  +---+---+---+---+---+---+---+
>  | S | l | i | c | i | n | g |
>  +---+---+---+---+---+---+---+
>  0   1   2   3   4   5   6   7
> -7  -6  -5  -4  -3  -2  -1
> ```
>
> 따라서 `[1:3]`은 인덱스 `1`과 `3` 사이에 있는 문자인 `li`를 지칭한다.
>
> 인덱스 `i`와 `j`의 차이만큼의 개수의 문자를 선택한다고 볼 수 있다.

<br>


## Operations

`str + str` : 두 문자열을 합친 문자열을 반환

```python
s = "im" + "mutable"
print(s)
```
```
immutable
```

<br>

`str * n` : 문자열을 n번 반복하는 문자열을 반환

```python
s = "*" * 5
print(s)
```
```
*****
```

<br>

`a in b` : a가 b 안에 있으면 True, 없으면 False 반환

`a not in b` : a가 b 안에 없으면 True, 있으면 False 반환

```python
a = "immutable sequence"
word_1 = "mutable"
word_2 = "queque"

print(word_1 in a)
print(word_2 in a)
print(word_1 not in a)
print(word_2 not in a)
```
```
True
False
False
True
```

<br>

`len(str)` : 문자열이 포함하고 있는 문자의 개수를 반환

```python
a = "immutable sequence"
print(len(a))
```
```
18
```

<br>


## Formatting

문자열을 포매팅 하는 방법은 세 가지가 있다.

<br>

**f-string** (Formatted string literals)
```python
name = "Ena"

print(f"I said my name is {name}.")
print(F"I said my name is {name}.")
```
```
I said my name is Ena.
I said my name is Ena.
```
> Python 버전 3.6이상 지원

<br>

**str.format** (Format string syntax)
```python
name, friend = "Ena", 'Fred'

print("My name is {}. {} is my friend".format(name, friend))
print("My name is {1}. {0} is my friend".format(name, friend))
print("My name is {mine}. {yours} is my friend".format(yours=friend, mine=name))
```
```
My name is Ena. Fred is my friend
My name is Fred. Ena is my friend
My name is Ena. Fred is my friend
```

<br>

**% Operation** (printf-style)
```python
name, friend = "Ena", 'Fred'

print("I said my name is %s." %name)
print("My name is %s. %s is my friend" %(name, friend))
print("My name is %(name)s. %(friend)s is my friend" %{'friend' : "Fred", 'name' : "Ena"})
```
```
I said my name is Ena.
My name is Ena. Fred is my friend
My name is Ena. Fred is my friend
```

<br>


## Built-in Methods

`str`의 모든 메소드(method)들은 원 문자열을 바꾸지 않고 새로운 값을 반환한다.

<br>

### str.upper()

```python
s = "i want to be upper case"
print(s.upper())
```
```
I WANT TO BE UPPER CASE
```

<br>

### str.lower()

```python
s = "I WANT TO BE LOWER CASE"
print(s.lower())
```
```
i want to be lower case
```

<br>

### str.strip()

```python
s ="   I have many blanks.    "
print(s.strip())
```
```
I have many blanks.
```

<br>

### str.replace(old, new)

```python
s = "I+ +h+a+v+e+ +m+a+n+y+ +p+l+u+s+ +s+i+g+n+s+."
print(s.replace('+', '-'))
print(s.replace('+', ''))
```
```
I- -h-a-v-e- -m-a-n-y- -p-l-u-s- -s-i-g-n-s-.
I have many plus signs.
```

<br>

### str.split()

```python
s = "I have many plus signs"
print(s.split())
print(s.split(' '))

s = "I+ +h+a+v+e+ +m+a+n+y+ +p+l+u+s+ +s+i+g+n+s"
print(s.split("+"))
```
```
['I', 'have', 'many', 'plus', 'signs']
['I', 'have', 'many', 'plus', 'signs']
['I', ' ', 'h', 'a', 'v', 'e', ' ', 'm', 'a', 'n', 'y', ' ', 'p', 'l', 'u', 's', ' ', 's', 'i', 'g', 'n', 's']
```

<br>

### str.count()

```python
s = "Do you know how many 'o's I have?"
print(s.count('o'))
```
```
5
```

<br>

### str.find()

```python
s = "Do you know where the first 'o' is?"
print(s.find('o'))
print(s.find('z'))   # 없는 문자를 찾는 경우

print(s.find('o', 2))      # index 2부터 찾는다
print(s.find('o', 5, 10))  # index 5부터 9까지 범위에서 찾는다
print(s.find('o', 5, 9))   # index 5부터 8까지 범위에서 찾는다
```
```
1
-1
4
9
-1
```

<br>

### str.index()

>  `find`와의 차이는 없는 문자열의 인덱스를 찾게하면 error가 발생한다는 점이다

```python
s = "Do you know where the first 'o' is?"
print(s.index('o'))
print(s.index('o', 2))      # index 2부터 찾는다
print(s.index('o', 5, 10))  # index 5부터 9까지 범위에서 찾는다

# print(s.index('z'))   # ValueError: substring not found
```
```
1
4
9
```

<br>

### str.join()

```python
s = " "
print(s.join("test"))
print(s.join(["I", "need", "blanks"]))
print(s.join(("I", "need", "blanks")))

print(s.join({"I", "need", "blanks"}))    # 순서를 장담할 수 없다
```
```
t e s t
I need blanks
I need blanks
I blanks need
```

<br>
