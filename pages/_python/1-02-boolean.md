---
title: Boolean
slug: boolean
category: Data Types
---

`bool` : 논리값을 나타내는 자료형으로 `True` 또는 `False` 값을 갖는다.

```python
a = True
b = False

print(type(a))
print(type(b))
```
```
<class 'bool'>
<class 'bool'>
```

<br>

> **`bool` 타입 이외의 값에 대한 논리값 검사**
>
> None, 0 또는 빈 문자열이나 빈 collection들은 거짓으로 판정하고,
> 0 이외의 숫자 또는 비어있지 않은 문자열이나 collection들은 참으로 판정한다.
>
> 따라서 `False`로 판정되는 값의 예는 다음과 같다.
>
> `None`
>
> `0`, `0.0`, `0j`
>
> `()`, `[]`, `{}`, `set()`, `range(0)`
>
> `""`
>
> <br>
>
> 아래와 같이 사용이 가능하다.
> ```python
a = 0
if a:
    print('a는 0이 아니다')
else :
    print('a는 0이다')
>    
b = 10.0
if b:
    print('b는 0이 아니다')
else :
    print('b는 0이다')
>    
c = -1j
if b:
    print('c는 0이 아니다')
else :
    print('c는 0이다')
> ```
> ```
a는 0이다
b는 0이 아니다
c는 0이 아니다
> ```
> ```python
a = []
if a:
    print('a는 원소를 가지고 있다')
else :
    print('a는 비어있다')
>    
b = {3}
if b:
    print('b는 원소를 가지고 있다')
else :
    print('b는 비어있다')
> ```
> ```
a는 비어있다
b는 원소를 가지고 있다
> ```


<br>

## Operators (연산자)

### Logical operators (논리 연산자)

> Boolean operators라고도 한다.

<br>

| 연산자 | 설명       | 참고   |
|:------:|:---------- |:------|
| `and`  | 두 명제가 모두 참이면 참, 하나 이상이 거짓이면 거짓을 반환  | 논리곱 |
| `or`   | 두 명제 중 하나 이상이 참이면 참, 모두 거짓이면 거짓을 반환 | 논리합 |
| `not`  | 명제가 참이면 거짓, 거짓이면 참을 반환                     |부정   |

<br>

### 기타 연산

`bool`은 `int`와 같이 정수형 타입의 하위 타입 중 하나로, `False`와 `True`가 각각 `0`과 `1` 처럼 동작한다.

즉, 산술, 비교, 비트, 대입 연산자 모두 사용 가능하며, 결괏값은 `0`과 `1`로 계산하는 것과 동일하다.

<br>

**Arithmetic Operators (산술 연산자)**

```python
print(True + True)
print(False - True)
print(True / True)
print(True * False)
```
```
2
-1
1.0
0
```

<br>

**Comparison Operators (비교 연산자)**

```python
print(True < False)
print(True > False)
```
```
False
True
```

<br>

**Bitwise Operators (비트 연산자)**

```python
a = True    # 0000 0001
b = False   # 0000 0000

print(a & b)    # 0000 0000  -> False
print(a | b)    # 0000 0001  -> True
print(a ^ b)    # 0000 0001  -> True
print(~a)       # 1111 1110  -> -2
print(~b)       # 1111 1111  -> -1
print(a << 2)   # 0000 0100  -> 4
print(a >> 2)   # 0000 0000  -> 0
```
```
False
True
True
-2
-1
4
0
```

<br>
