---
title: Tuple
slug: tuple
category: Data Types
---

`tuple` : 순서가 있는 데이터들의 모음으로 변하지 않는 자료형

> `tuple`은 생성한 이후 바꿀 수 없는 `list`라고 생각하면 된다.
>
> 처음에 선언한 값을 바꿀 수 없다는 점을 제외하고 `list`와 동일하다.

```python
t = (1, 2, 3, 4, 5)
u = ("first", 2, 3.0, [1, 2], (3, 4))   # 원소의 타입이 다를 수 있다.
v = ()                                  # 빈 튜플을 생성할 수 있다.

print(type(t))
print(type(u))
print(type(v))
```
```
<class 'tuple'>
<class 'tuple'>
<class 'tuple'>
```

<br>

`tuple` 역시 중복된 값의 원소(item)들을 가질 수 있다.

```python
t = ("t", "t", "t", "t", "t")
print(t)
```
```
('t', 't', 't', 't', 't')
```

<br>

원소가 하나인 `tuple`을 만드는 경우 주의가 필요하다.

`()`는 일반적으로 표현식의 그룹을 구분하기 위해 사용하기 때문에, `tuple`을 생성하기 위해서는 `,`를 명시해 주어야 한다.  

```python
n = (1)
t = (1,)

print(n)
print(type(n))
print(t)
print(type(t))
```
```
1
<class 'int'>
(1,)
<class 'tuple'>
```

<br>

`tuple`을 만들 때 `()`는 생략이 가능하다.

```python
t = 1, 2, 3
u = 1,

print(t)
print(u)
```
```
(1, 2, 3)
(1,)
```

<br>


## Packing and Unpacking

### Packing

<span style="display:block;margin:10px; padding:10px;"> tuple = x**,** y**,** z <span>

`tuple`을 생성할 때 `()`는 생략이 가능하다.

이렇게 `x`, `y`, `z`를 하나의 튜플로 묶어주는 것을 **packing**이라고 한다.

<br>

### Unpacking

'Packing'의 반대 연산 역시 가능하며, 이를 **unpacking**이라고 한다.

<span style="display:block;margin:10px; padding:10px;"> x**,** y**,** z = tuple<span>

이 때, 할당받을 변수의 개수와 할당할 원소의 개수가 같아야 한다.

```python
x, y, z = (1, 2, 3)

print(x)
print(y)
print(z)
```
```
1
2
3
```

'Packing'과 달리 'unpacking'은 모든 sequence가 지원한다.

```python
x, y, z = [1, 2, 3]

print(x)
print(y)
print(z)
```
```
1
2
3
```

```python
a, b, c, d, e, f = 'Python'

print(a)
print(b)
print(c)
print(d)
print(e)
print(f)
```
```
P
y
t
h
o
n
```

<br>

### Multiple Assignment

패킹과 언패킹을 같이 사용하면 한 번에 여러 개의 변수에 값을 할당할 수 있으며, 이를 **multiple assignment**라고 한다.

```python
x, y, z = 12345, 54321, 'hello!'

print(x)
print(y)
print(z)
```
```
12345
54321
hello!
```

> 즉, Python의 특징 중 하나인 다중 할당은 tuple packing과 sequence unpacking의 조합이다.

<br>


## Indexing and Slicing

> `list`의 인덱싱, 슬라이싱과 동일하다.

<br>

다음과 같이 변수 `t`에 튜플 (1, 2, 3, 4, 5, 6, 7, 8, 9)를 할당하였다.

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)
```

<br>

### Indexing

`t`의 각 원소(item)에 부여된 index는 다음과 같다.

|  1  |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 |
|:---:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|  0  |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 |
| -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 |

기본 인덱스는 0부터 시작하며, 음수 인덱스는 뒤에서 몇 번째 원소인지를 의미한다.

<br>

`t`의 인덱스가 i인 원소를 `t[i]`라고 지칭하여 선택할 수 있다.

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[0])
print(t[-1])
```
```
1
9
```

<br>

**다차원 튜플의 원소를 선택하는 방법**

`tuple`의 원소가 `tuple`인 경우 다차원 행렬의 형태로 이해할 수 있다.

```python
t = ((1, 2, 3), (4, 5), (6, 7, 8, 9))
```
위와 같은 형태의 `tuple`이 있을 때, `t[0]`은 `(1, 2, 3)`을 가리킨다. 이 또한 `tuple`이므로 같은 방식으로 인덱스를 통해 원소를 선택할 수 있다. 따라서 `(1, 2, 3)`의 두 번째 원소를 선택하고 싶다면, `t[0]`뒤에 인덱스를 붙여 `t[0][1]`라고 지칭하여 선택할 수 있다.

```python
t = ((1, 2, 3), (4, 5), (6, 7, 8, 9))

print(t[0])
print(t[0][1])
```
```
(1, 2, 3)
2
```

삼중, 사중 튜플 안의 원소도 동일한 방식으로 확장하여 선택할 수 있다.

```python
t = (((1, 2, 3),),)
u = ((("first", "second", "third"),),)

print(t[0][0][-1])
print(u[0][0][1][2])
```
```
3
c
```

> `tuple` 역시 `tuple`의 원소가 인덱싱이 가능한 경우 모두 동일하게 적용된다.

<br>

### Slicing

`tuple`에서 필요한 원소들만 선택하는 것을 슬라이싱(slicing)이라고 한다.

<br>

`tuple[i:j]` : 인덱스가 i보다 크거나 같고 j보다 작은 원소들을 모두 선택

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[1:3])
```
```
(2, 3)
```

<br>

`tuple[i:j:k]` : 인덱스가 i보다 크거나 같고 j보다 작으면서 (i + n*k, n은 양의 정수) 값인 원소들을 모두 선택

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[2:7:3])
```
```
(3, 6)
```

<br>

시작 인덱스(`i`)나 마지막 인덱스(`j`)를 지정하지 않을 수 있다.
시작 인덱스를 지정하지 않으면 리스트의 첫 원소부터 선택하고,
마지막 인덱스를 지정하지 않으면 리스트의 끝 원소까지 선택한다.

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[:5])
print(t[-3:])
print(t[:])
```
```
(1, 2, 3, 4, 5)
(7, 8, 9)
(1, 2, 3, 4, 5, 6, 7, 8, 9)
```

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[:-2:3])
print(t[3::2])
print(t[::4])
```
```
(1, 4, 7)
(4, 6, 8)
(1, 5, 9)
```

<br>

`tuple[i:j:k]`의 `k`값을 음수로 넣는 경우에는 인덱스 `i`가 인덱스 `j`보다 커야 한다.

> 인덱스의 부호가 같은 경우 기준

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(t[6:1:-2])
print(t[-2:-7:-3])
print(t[-3:1:-3])   # 양의 인덱스와 음의 인덱스 혼합 사용 가능
print(t[6::-2])
print(t[:-7:-3])
print(t[::-2])
```
```
(7, 5, 3)
(8, 5)
(7, 4)
(7, 5, 3, 1)
(9, 6)
(9, 7, 5, 3, 1)
```

<br>


## Operations

`tuple + tuple` : 두 tuple을 합친 tuple을 반환

```python
t = (1, 2, 3) + (4, 5, 6)
print(t)
```
```
(1, 2, 3, 4, 5, 6)
```

<br>

`tuple * n` : tuple을 n번 반복하는 tuple을 반환

```python
t = (1, 2, 3) * 3
print(t)
```
```
(1, 2, 3, 1, 2, 3, 1, 2, 3)
```

<br>

`a in tuple` : a가 tuple 안에 있으면 True, 없으면 False 반환

`a not in tuple` : a가 tuple 안에 없으면 True, 있으면 False 반환

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(3 in t)
print(0 in t)
print(3 not in t)
print(0 not in t)
```
```
True
False
False
True
```

<br>

`len(tuple)` : tuple의 원소(item)의 개수를 반환

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(len(t))
```
```
9
```

<br>

`max(tuple)` : tuple의 원소(item) 중 가장 큰 원소를 반환

`min(tuple)` : tuple의 원소(item) 중 가장 작은 원소를 반환

```python
t = (1, 2, 3, 4, 5, 6, 7, 8, 9)

print(max(t))
print(min(t))
```
```
9
1
```
```python
t = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')

print(max(t))
print(min(t))
```
```
i
a
```

<br>


## Built-in Methods

### tuple.count()

```python
t = (1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5)

print(t.count(0))
print(t.count(3))
```
```
0
3
```

<br>

### tuple.index()

```python
t = (1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5)

print(t.index(3))
print(t.index(3, 9))      # index 9부터 찾는다
print(t.index(3, 5, 10))  # index 5부터 9까지 범위에서 찾는다
```
```
2
12
7
```
튜플에 없는 값을 찾는 경우에는 에러가 발생한다.
```python
l = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

print(l.index(0))
```
```
ValueError: 0 is not in list
```
