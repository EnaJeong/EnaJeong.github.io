---
title: Range
slug: range
category: Data Types
---

`range` : 수열을 나타내는 자료형

```python
r = range(0, 20, 2)

print(r)
print(type(r))
```
```
range(0, 20, 2)
<class 'range'>
```

<br>

**range(***stop***)**

<span style="display:block;margin:10px; padding:10px;">
r[i] = i where i >= 0 and r[i] < *stop*.
</span>

```python
print(list(range(10)))
```
```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

**range(***start*, *stop***)**

<span style="display:block;margin:10px; padding:10px;">
r[i] = *start* + i where i >= 0 and r[i] < *stop*.
</span>

```python
print(list(range(1, 11)))
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

<br>

**range(***start*, *stop*, *step***)**

(1) *step*이 양수인 경우,

<span style="display:block;margin:10px; padding:10px;">
r[i] = *start* + *step* * i where i >= 0 and r[i] < *stop*
</span>

```python
print(list(range(0, 30, 5)))
```
```
[0, 5, 10, 15, 20, 25]
```

(2) *step*이 음수인 경우

<span style="display:block;margin:10px; padding:10px;">
r[i] = *start* + *step* * i where i >= 0 and r[i] > *stop*
</span>

```python
print(list(range(0, -10, -1)))
```
```
[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```

*step* 변수를 0으로 지정하면 에러가 발생한다.

```python
print(list(range(0, 30, 0)))
```
```
ValueError: range() arg 3 must not be zero
```

<br>


빈 `range`를 생성할 수도 있다.

```python
print(list(range(0)))
```
```
[]
```

```python
print(list(range(1, 0)))
```
```
[]
```

```python
print(list(range(1, 3, -1)))
```
```
[]
```

<br>

> **The advantage of the range type**
>
> `range` 객체는 수열의 크기에 상관없이 `start`, `stop`, `step` 변수만을 저장하기 때문에 `list`나 `tuple`과 달리 항상 같은 크기의 메모리만을 사용한다.

<br>


## Indexing and Slicing

`range`는 sequence type으로 `list`와 `tuple`처럼 인덱싱과 슬라이싱이 가능하다.

```python
r = range(0, 20, 2)

print(r[5])
print(r[-1])
```
```
10
18
```

```python
r = range(0, 20, 2)

print(r[:5])
print(r[2:])
print(r[::2])
print(r[::-2])
```
```
range(0, 10, 2)
range(4, 20, 2)
range(0, 20, 4)
range(18, -2, -4)
```

<br>


## Operations

`a in range` : a가 range 안에 있으면 True, 없으면 False 반환

`a not in range` : a가 range 안에 없으면 True, 있으면 False 반환

```python
r = range(0, 20, 2)

print(10 in r)
print(11 in r)
print(10 not in r)
print(11 not in r)
```
```
True
False
False
True
```

<br>

`len(range)` : range의 원소(item)의 개수를 반환

```python
r = range(0, 20, 2)

print(len(r))
```
```
10
```

<br>

`max(range)` : range의 원소(item) 중 가장 큰 원소를 반환

`min(range)` : range의 원소(item) 중 가장 작은 원소를 반환

```python
r = range(0, 20, 2)

print(max(r))
print(min(r))
```
```
18
0
```

```python
r = range(20, 0, -2)

print(max(r))
print(min(r))
```
```
20
2
```

<br>

`range == range` : 두 range가 나타내는 수열이 같으면 True, 다르면 False 반환

`range != range` : 두 range가 나타내는 수열이 다르면 True, 같으면 False 반환

> `range`를 생성할 때 입력한 start, stop, step 값이 다르더라도 지칭하는 수열이 같으면 같은 것으로 간주한다.

```python
r = range(0)
s = range(2, 1, 3)

print(r)
print(s)
print(r == s)
```
```
range(0, 0)
range(2, 1, 3)
True
```

```python
r = range(0, 3, 2)
s = range(0, 4, 2)

print(r)
print(s)
print(r == s)
```
```
range(0, 3, 2)
range(0, 4, 2)
True
```

<br>


## Built-in Methods

### range.index()

해당 숫자의 순서(인덱스)를 반환한다.

```python
r = range(0, 20, 2)

print(r.index(10))
```
```
5
```

range에 없는 값을 찾는 경우에는 에러가 발생한다.

```python
r = range(0, 20, 2)

print(r.index(11))
```
```
ValueError: 11 is not in range
```

<br>


### range.count()

```python
r = range(0, 20, 2)

print(r.count(0))
print(r.count(1))
```
```
1
0
```
