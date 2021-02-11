---
title: Exception Handling
slug: exception-handling
category: Basics
---

## The *try* Statement

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**try**</span>**:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**except**</span> *expression* <span style="color:#E07A7A">**as**</span> *parameters***:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**else**</span>**:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**finally**</span>**:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span>
</span>

```python
try:
    print(a)
except NameError as e:
    print('a가 없습니다.')
```

<br>

기본적으로 다른 언어들과 같다.

1. 우선 `try`절이 실행된다.
2. 실행되면서 아무런 exception이 발생하지 않으면 `except`절은 무시하고 전체 `try`문이 종료되고 이후 실행문들을 이어서 실행한다.
3. exception이 발생하면 `try`절의 그 이후 동작들은 실행되지 않고, 해당 exception이 명시된 `except`절을 실행하고 전체 `try`문을 종료하며 이후 실행문들을 이어서 실행한다.
4. 해당 exception이 명시된 `except`절이 없는 경우에는 에러메세지가 보여지며 실행이 중단된다.

`try`문은 하나 이상의 `except` 절을 포함하고 있으며, 한 `except`절에서
여러 exception들을 처리할 수도 있다.

```python
except (RuntimeError, TypeError, NameError):
   pass
```

> `except`절들은 `try`절에서 발생하는 exception만을 처리한다.
>
> 즉, `except`절을 실행하면서 발생하는 exception을 처리하지 않는다.

<br>

**The `else` clause** : 아무런 exception이 발생하지 않고 `try`절이 종료되면 실행하는 절

**The `finally` clause** : exception 발생 여부와 상관없이 전체 `try`문이 종료되면 실행하는 절

`else`절과 `finally`절의 동작을 확인하는 예제는 다음과 같다.

```python
def divide(x, y):
   try:
       result = x / y
   except ZeroDivisionError:
       print("division by zero!")
   else:
       print("result is", result)
   finally:
       print("executing finally clause")
```
```python
divide(2, 1)
```
```
result is 2.0
executing finally clause
```
```python
divide(2, 0)
```
```
division by zero!
executing finally clause
```
```python
divide("2", "1")
```
```
executing finally clause
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in divide
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```

<br>


## The *with* Statement

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**with**</span> *expression* <span style="color:#E07A7A">**as**</span> *target***:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span>
</span>

어떤 객체들은 그 객체를 사용하는 과정이 성공하든 실패하든 상관없이 더 이상 해당 객체를 사용하지 않는 경우에 수행되어야 하는 표준 clean-up 조치를 정의하고 있다.

`with`문은 그러한 객체들이 항상 정확하게 clean up 될 수 있게 해준다.

다음과 같이 코드를 작성하면, 실행도중 에러가 발생하더라도 파일 `f`는 항상 닫힌다.

```python
with open("myfile.txt") as f:
    for line in f:
        print(line, end="")
```
