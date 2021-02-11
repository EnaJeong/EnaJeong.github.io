---
title: List
slug: list
category: Data Types
---

`list` : 순서가 있는 데이터들의 모음을 나타내는 자료형


```python
l = [1, 2, 3, 4, 5]
m = ["first", "second", "third", "forth", "fifth"]

print(type(l))
print(type(m))
```
```
<class 'list'>
<class 'list'>
```

<br>

중복된 값의 원소(item)들을 가질 수 있다.

```python
l = ["t", "t", "t", "t", "t"]
print(l)
```
```
['t', 't', 't', 't', 't']
```

<br>

원소(item)들의 타입이 다를 수도 있다.

```python
l = ["first", 2, 3.0, [1, 2, 3, 4]]
print(l)
```
```
['first', 2, 3.0, [1, 2, 3, 4]]
```

<br>

원소가 들어있지 않은 빈 `list`도 생성할 수 있다.

```python
l = []
print(l)
```
```
[]
```

<br>

**List Comprehension**

`for`문을 활용하여 `list`를 생성하는 방법으로 `[]` 안에 `for`문을 넣어준다.

<span style="display:block;margin:10px; padding:10px;">
list = [<span style="color:gray">*expression*</span>
        <span style="color:#E07A7A">**for**</span> <span style="color:gray">*item*</span>
        <span style="color:#E07A7A">**in**</span> <span style="color:gray">*iterable*</span>
        <span style="color:#E07A7A">**if**</span> <span style="color:gray">*condition*</span>]
</span>

`if` 조건절은 특정 조건이 필요한 경우에 추가하고 생략도 가능하다.

이를 활용하면 `list`의 모든 원소를 직접 적지 않고 간단하게 생성할 수 있다.

```python
l = [i for i in range(1, 16)]
print(l)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
```

```python
target = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
l = [i**2 for i in target if i%2 == 1]
print(l)
```
```
[1, 9, 25, 49, 81]
```

변수를 여러 개 사용하는 것도 가능하다.
```python
l = [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
print(l)
```
```
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

다차원 리스트를 생성하는 것도 가능하다.
```python
matrix = [[i + row * 4 for i in range(1, 5)] for row in range(3)]
print(matrix)

transposed  = [[row[i] for row in matrix] for i in range(4)]
print(transposed)
```
```
[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

<br>


## Indexing and Slicing

다음과 같이 변수 `l`에 리스트 [1, 2, 3, 4, 5, 6, 7, 8, 9]를 할당하였다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### Indexing

`l`의 각 원소(item)에 부여된 index는 다음과 같다.

|  1  |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 |
|:---:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|  0  |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 |
| -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 |

기본 인덱스는 0부터 시작하며, 음수 인덱스는 뒤에서 몇 번째 원소인지를 의미한다.

<br>

`l`의 인덱스가 i인 원소를 `l[i]`라고 지칭하여 선택할 수 있다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[0])
print(l[-1])
```
```
1
9
```

<br>

**다차원 리스트의 원소를 선택하는 방법**

`list`의 원소가 `list`인 경우 다차원 행렬의 형태로 이해할 수 있다.

```python
l = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
```
위와 같은 형태의 `list`가 있을 때, `l[0]`은 `[1, 2, 3]`을 가리킨다. 이 또한 `list`이므로 같은 방식으로 인덱스를 통해 원소를 선택할 수 있다. 따라서 `[1, 2, 3]`의 두 번째 원소를 선택하고 싶다면, `l[0]`뒤에 인덱스를 붙여 `l[0][1]`라고 지칭하여 선택할 수 있다.

```python
l = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]

print(l[0])
print(l[0][1])
```
```
[1, 2, 3]
2
```

삼중, 사중 리스트 안의 원소도 동일한 방식으로 확장하여 선택할 수 있다.

```python
l = [[[1, 2, 3]]]
m = [[["first", "second", "third"]]]    # str도 인덱스를 통해 선택 가능

print(l[0][0][-1])
print(m[0][0][1][2])
```
```
3
c
```

> `list`의 원소가 인덱싱이 가능한 경우 모두 동일하게 적용된다.

<br>

### Slicing

`list`에서 필요한 원소들만 선택하는 것을 슬라이싱(slicing)이라고 한다.
> 기본적으로 `str`의 slicing과 같다.

<br>

`list[i:j]` : 인덱스가 i보다 크거나 같고 j보다 작은 원소들을 모두 선택

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[1:3])
```
```
[2, 3]
```

<br>

`list[i:j:k]` : 인덱스가 i보다 크거나 같고 j보다 작으면서 (i + n*k, n은 양의 정수) 값인 원소들을 모두 선택

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[2:7:3])
```
```
[3, 6]
```

<br>

시작 인덱스(`i`)나 마지막 인덱스(`j`)를 지정하지 않을 수 있다.
시작 인덱스를 지정하지 않으면 리스트의 첫 원소부터 선택하고,
마지막 인덱스를 지정하지 않으면 리스트의 끝 원소까지 선택한다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[:5])
print(l[-3:])
print(l[:])
```
```
[1, 2, 3, 4, 5]
[7, 8, 9]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[:-2:3])
print(l[3::2])
print(l[::4])
```
```
[1, 4, 7]
[4, 6, 8]
[1, 5, 9]
```

<br>

`list[i:j:k]`의 `k`값을 음수로 넣는 경우에는 인덱스 `i`가 인덱스 `j`보다 커야 한다.

> 인덱스의 부호가 같은 경우 기준

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(l[6:1:-2])
print(l[-2:-7:-3])
print(l[-3:1:-3])   # 양의 인덱스와 음의 인덱스 혼합 사용 가능
print(l[6::-2])
print(l[:-7:-3])
print(l[::-2])
```
```
[7, 5, 3]
[8, 5]
[7, 4]
[7, 5, 3, 1]
[9, 6]
[9, 7, 5, 3, 1]
```

<br>


## Modification

### Assignment

`list`는 인덱스와 슬라이싱을 이용해 선택한 원소들에 직접 특정 값을 할당하여 원소의 값을 바꿀 수 있다.

<br>

**인덱스를 이용한 원소의 값 변경**

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2] = 13
print(l)
```
```
[1, 2, 13, 4, 5, 6, 7, 8, 9]
```

<br>

**슬라이싱을 이용한 원소들의 값 변경**

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2:4] = [13, 14]
print(l)
```
```
[1, 2, 13, 14, 5, 6, 7, 8, 9]
```

할당하는 값이 `list`일 필요는 없으며, *iterable*하면 된다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2:4] = 13, 14    # tuple을 의미
print(l)
```
```
[1, 2, 13, 14, 5, 6, 7, 8, 9]
```

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2:4] = "hi"
print(l)
```
```
[1, 2, 'h', 'i', 5, 6, 7, 8, 9]
```

Extended slicing을 통해 원소들의 값을 바꾸는 것도 가능하다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[::2] = [11, 13, 15, 17, 19]
print(l)
```
```
[11, 2, 13, 4, 15, 6, 17, 8, 19]
```

<br>

**슬라이싱을 통해 선택한 원소의 개수와 삽입하는 원소의 개수가 다른 경우**

선택한 원소들은 리스트에서 빠지고, 해당 위치에 새로운 원소들이 삽입된다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2:4] = [13]
print(l)
```
```
[1, 2, 13, 5, 6, 7, 8, 9]
```

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l[2:4] = [13, 14, 15]
print(l)
```
```
[1, 2, 13, 14, 15, 5, 6, 7, 8, 9]
```

Extended slicing을 이용해 할당하는 경우에는 선택한 원소의 개수와 삽입하는 원소의 개수가 동일해야만 한다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
l[::2] = [11, 13, 15, 17]
```
```
ValueError: attempt to assign sequence of size 4 to extended slice of size 5
```

<br>

### list.insert(index, x)

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.insert(2, 'x')
print(l)
```
```
[1, 2, 'x', 3, 4, 5, 6, 7, 8, 9]
```

<br>

### list.append(x)

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.append('x')
print(l)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 'x']
```

<br>

### list.extend(*iterable*)

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.extend(['x', 'y', 'z'])
print(l)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 'x', 'y', 'z']
```

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.extend('xyz')
print(l)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 'x', 'y', 'z']
```

<br>

### list.remove(x)

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.remove(3)
print(l)
```
```
[1, 2, 4, 5, 6, 7, 8, 9]
```

해당 값 `x`가 `list`에 없는 경우에는 에러가 발생한다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

l.remove(0)
print(l)
```
```
ValueError: list.remove(x): x not in list
```

<br>

### list.pop(index)

인덱스를 이용해 특정 원소를 추출하고, 리스트에서 삭제한다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

x = l.pop(2)
print(x)
print(l)
```
```
3
[1, 2, 4, 5, 6, 7, 8, 9]
```

인덱스를 지정하지 않는 경우에는 제일 마지막 원소를 추출한다.

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

x = l.pop()
print(x)
print(l)
```
```
9
[1, 2, 3, 4, 5, 6, 7, 8]
```

<br>


## Operations

`list + list` : 두 list를 합친 list를 반환

```python
l = [1, 2, 3] + [4, 5, 6]
print(l)
```
```
[1, 2, 3, 4, 5, 6]
```

<br>

`list * n` : list를 n번 반복하는 list를 반환

```python
l = [1, 2, 3] * 3
print(l)
```
```
[1, 2, 3, 1, 2, 3, 1, 2, 3]
```

<br>

`a in list` : a가 list 안에 있으면 True, 없으면 False 반환

`a not in list` : a가 list 안에 없으면 True, 있으면 False 반환

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(3 in l)
print(0 in l)
print(3 not in l)
print(0 not in l)
```
```
True
False
False
True
```

<br>

`len(list)` : list의 원소(item)의 개수를 반환

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(len(l))
```
```
9
```

<br>

`max(list)` : list의 원소(item) 중 가장 큰 원소를 반환

`min(list)` : list의 원소(item) 중 가장 작은 원소를 반환

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(max(l))
print(min(l))
```
```
9
1
```

```python
l = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

print(max(l))
print(min(l))
```
```
i
a
```

<br>


## Built-in Methods

### list.sort()

```python
l = [7, 3, 9, 4, 8, 6, 5, 1, 2]

l.sort()
print(l)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```python
l = ['d', 'e', 'h', 'c', 'b', 'a', 'i', 'f', 'g']

l.sort()
print(l)
```
```
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
```

입력값을 `reverse=True`로 주어 역순으로 정렬할 수도 있다.

```python
l = [7, 3, 9, 4, 8, 6, 5, 1, 2]

l.sort(reverse=True)
print(l)
```
```
[9, 8, 7, 6, 5, 4, 3, 2, 1]
```

```python
l = ['d', 'e', 'h', 'c', 'b', 'a', 'i', 'f', 'g']

l.sort(reverse=True)
print(l)
```
```
['i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
```

<br>

### list.reverse()

```python
l = [7, 3, 9, 4, 8, 6, 5, 1, 2]

l.reverse()
print(l)
```
```
[2, 1, 5, 6, 8, 4, 9, 3, 7]
```

<br>

### list.count()

```python
l = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]

print(l.count(0))
print(l.count(3))
```
```
0
3
```

<br>

### list.index()

해당 값을 가지는 첫 번째 원소의 인덱스를 반환한다.

```python
l = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

print(l.index(3))
print(l.index(3, 9))      # index 9부터 찾는다
print(l.index(3, 5, 10))  # index 5부터 9까지 범위에서 찾는다
```
```
2
12
7
```

리스트에 없는 값을 찾는 경우에는 에러가 발생한다.

```python
l = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

print(l.index(0))
```
```
ValueError: 0 is not in list
```

<br>

### list.copy()

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
m = l.copy()

print(m)
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

> **`copy()`가 필요한 이유**
>
> `list_2 = list_1`로 복사하는 경우 새로운 객체가 생성되는 것이 아니라, 기존 객체의 주소값을 복사하는 것으로 같은 대상을 참조한다.
>
> ```python
> l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
> m = l.copy()
> n = l
>
> print(m)
> print(id(l) == id(m))
> print(id(l) == id(n))
> ```
> ```
> [1, 2, 3, 4, 5, 6, 7, 8, 9]
> False
> True
> ```
>
> 같은 객체를 참조하기 때문에 `n`의 원소값을 바꾸면 `l`의 원소값을 바꾸는 것과 같다.
>
> ```python
> l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
> m = l.copy()
> n = l
>
> m[0] = 11
> print(m)
> print(l)
>
> n[1] = 12
> print(n)
> print(l)
> ```
> ```
> [11, 2, 3, 4, 5, 6, 7, 8, 9]
> [1, 2, 3, 4, 5, 6, 7, 8, 9]
> [1, 12, 3, 4, 5, 6, 7, 8, 9]
> [1, 12, 3, 4, 5, 6, 7, 8, 9]
> ```
