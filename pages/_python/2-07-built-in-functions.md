---
title: Built-in Functions
slug: built-in-functions
category: Basics
---

[document](https://docs.python.org/3.8/library/functions.html)

## filter(function, *iterable*)

*iterables*의 원소 중 'function'을 수행한 결과가 `True`인 원소들의 `iterator`를 생성한다.

> 즉, `item for item in iterable if function(item)`과 같다.


```python
target = [0, 1, 4, 0, 2, 5, 6, 3]

for i in filter(lambda a: a%2==1, target):
    print(i, end=' ')
```

    1 5 3

'function'이 `None`인 경우에는, 원소 중 `False`인 원소들을 거르고 `True`인 원소만 남긴다.

> 이 경우는 `item for item in iterable if item`와 같다.


```python
target = [0, 1, 4, 0, 2, 5, 6, 3]

for i in filter(None, target):
    print(i, end=' ')
```

    1 4 2 5 6 3

<br>


## map(function, *iterable*)

*iterables*의 모든 원소에 'function'을 수행한 결과의 `iterator`를 생성한다.


```python
target = [1, 4, 2, 5, 6, 3]

for i in map(lambda a: a**2, target):
    print(i, end=' ')
```

    1 16 4 25 36 9

인자값으로 여러개의 *iterables*을 전달할 수도 있다.

이때 전달한 *iterables*들의 원소의 개수가 다른 경우, 적은 쪽을 기준으로 종료한다.


```python
target = [1, 4, 2, 5, 6, 3]
target_2 = [3, 7, 8]

for i in map(lambda a, b: a*b, target, target_2):
    print(i, end=' ')
```

    3 28 16

<br>


## zip(*iterables*)

각 *iterables*들의 원소들의 집합을 담은 `iterator`를 생성한다.


```python
x = [1, 2, 3]
y = [4, 5, 6]

for i in zip(x, y):
    print(i)
```

    (1, 4)
    (2, 5)
    (3, 6)



```python
x = [1, 2, 3]
y = [4, 5, 6]
x2, y2 = zip(*zip(x, y))
print(x == list(x2) and y == list(y2))
```

    True


> (1, 4), (2, 5), (3, 6) 세 tuple이 인자값으로 전달하였으므로
>
> x2와 y2에 각각 `1, 2, 3`, `4, 5, 6` iterable이 담긴다.

<br>


## abs(x)

'x'의 절대값을 반환한다.


```python
print(abs(1))
print(abs(-1.65))
```

    1
    1.65

<br>


## round()

소수점 아래 자리를 반올림한 값을 반환한다.


```python
print(round(3.14159265359))
print(round(3.14159265359, 1))
print(round(3.14159265359, 3))
print(round(3.14159265359, 5))
```

    3
    3.1
    3.142
    3.14159


<br>


## hash(object)

hash 값을 반환한다.


```python
print(hash('hash'))
print(hash('has'))
```

    7312771777818959517
    1540758021783419347


<br>


## all(*iterable*)

*iterable*의 모든 원소가 `True`인 경우에만 `True`를 반환한다.


```python
a = [True, True, True]
b = [True, False, True]

print(all(a))
print(all(b))
```

    True
    False


<br>


## any(*iterable*)

*iterable*의 원소 중 하나라도 `True`이면 `True`를 반환한다.


```python
a = [True, True, True]
b = [True, False, True]

print(any(a))
print(any(b))
```

    True
    True


<br>


## dir(), dir(object)

인자값의 속성 목록을 반환하고, 인자값이 없는 경우에는 현재 local scope에 있는 목록을 반환한다.


```python
print(dir((1, 2)))
```

    ['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'count', 'index']
