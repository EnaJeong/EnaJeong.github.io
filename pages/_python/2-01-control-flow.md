---
title: Control Flow Statements
slug: control-flow
category: Basics
---

## if ... elif ... else

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**if**</span> *condition_1* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**elif**</span> *condition_2* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**else**</span>**:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span>
</span>

```python
x = int(input("Please enter an integer: "))

if x < 0:
    print('Negative Integer')
elif x == 0:
    print('Zero')
else:
    print('Positive Integer')
```
```
Please enter an integer: -12
Negative Integer
```
```
Please enter an integer: 0
Zero
```
```
Please enter an integer: 3
Positive Integer
```

```python
x = 10

if x%2 == 1:
    print('odd')
else:
    print('even')
```
```
even
```

```python
x = -9

if x < 0:
    x = -x

print(x)
```
```
9
```

> Python에는 switch문이 없다.

<br>

### Conditional Expressions

<span style="display:block;margin:10px; padding:10px;">
x <span style="color:#E07A7A">**if**</span> *condition* <span style="color:#E07A7A">**else**</span> y
</span>

```python
x = int(input("Please enter an integer: "))

info = "even" if x%2 == 0 else "odd"
print(info)
```
```
Please enter an integer: 6
even
```
```
Please enter an integer: 3
odd
```

> 다른 언어의 "*condition* **?** x **:** y" 와 같다.

<br>


## while

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**while**</span> *condition* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
</span>

```python
a, b = 0, 1
while a < 1000:
    print(a, end=' ')
    a, b = b, a+b
```
```
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
```

> Python에는 **do ... while**문이 없다.

<br>

#### break

```python
a = 1
while a < 100:
    print(a, end=' ')

    if a == 3:
        break

    a += 1
```
```
1 2 3
```

<br>

#### continue

```python
a = 0
while a < 10:
    a += 1

    if a % 2 == 1:
        continue

    print(a, end=' ')
```
```
2 4 6 8 10
```

<br>

### The else Clause

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**while**</span> *condition* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**else**</span>**:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span>
</span>

`while`문의 조건절이 `false`가 되어 `while`문이 종료되면, `else`문을 수행한다.

```python
a = 0
while a < 5:
    a += 1
    print(a)
else:
    print("The else clause executed.")
```
```
1
2
3
4
5
The else clause executed.
```

```python
a = 0
while a < 0:
    a += 1
    print(a)
else:
    print("The else clause executed.")
```
```
The else clause executed.
```

`break`를 통해 `while`문에서 벗어나는 경우에는 'else'문을 실행하지 않는다.

```python
a = 1
while a < 10:
    print(a)

    if a == 3:
        break

    a += 1
else:
    print("The else clause executed.")
```
```
1
2
3
```

<br>


## for

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**for**</span> *target_list* <span style="color:#E07A7A">**in**</span> *iterable* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
</span>

```python
words = ['cat', 'window', 'defenestrate']

for word in words:
    print(word, len(word))
```
```
cat 3
window 6
defenestrate 12
```

```python
basket = {'apple', 'pear', 'banana', 'orange'}

for fruit in basket:
    print(fruit)
```
```
apple
banana
orange
pear
```

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

for name, num in numbers.items():
    print(name, num)
```
```
one 1
two 2
three 3
four 4
```

<br>

반복 순서가 중요하지 않는 단순 반복문에서는 변수를 따로 저장하지 않고 `_`를 입력할 수 있다.

```python
for _ in range(3):
    print("executed")
```
```
executed
executed
executed
```

<br>

#### break

```python
basket = ['apple', 'pear', 'lemon', 'orange']
citrus = {'lemon', 'lime', 'orange'}

for fruit in basket:
    print(fruit, end=' ')

    if fruit in citrus:
        print('is a citrus fruit')
        break

    print('is not a citrus fruit')
```
```
apple is not a citrus fruit
pear is not a citrus fruit
lemon is a citrus fruit
```

<br>

#### continue

```python
basket = ['apple', 'pear', 'lemon', 'orange', 'banana']
citrus = {'lemon', 'lime', 'orange'}

for fruit in basket:
    if fruit in citrus:
        continue

    print(fruit, end=' ')
```
```
apple pear banana
```

<br>

### The else Clause

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**for**</span> *target_list* <span style="color:#E07A7A">**in**</span> *expression_list* **:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span> <br>
<span style="color:#E07A7A">**else**</span>**:** <br>
&nbsp;&nbsp;&nbsp; <span style="color:gray">*suite*</span>
</span>

`for`문이 종료되면, `else`문을 수행한다.

```python
for i in range(3):
    print(i)
else:
    print("The else clause executed.")
```
```
0
1
2
The else clause executed.
```

```python
for i in range(0):
    print(i)
else:
    print("The else clause executed.")
```
```
The else clause executed.
```

`break`를 통해 `for`문에서 벗어나는 경우에는 'else'문을 실행하지 않는다.

```python
for i in range(10):
    if i == 3:
        break

    print(i)
else:
    print("The else clause executed.")
```
```
0
1
2
```

<br>

### enumerate(*iterable*, start=0)

*iterable*의 각 원소의 순서와 원소의 쌍으로 이루어진 튜플들의 모음을 생성한다.

```python
seasons = ['Spring', 'Summer', 'Fall', 'Winter']

print(list(enumerate(seasons)))
print(list(enumerate(seasons, start=1)))
```
```
[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
[(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')]
```

<br>

`for`문을 사용할 때 이를 활용할 수 있다.

```python
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)
```
```
0 tic
1 tac
2 toe
```

```python
numbers = ['one', 'two', 'three', 'four', 'five']

for i, num in enumerate(numbers, 1):
    print(i, num)
```
```
1 one
2 two
3 three
4 four
5 five
```

<br>


## The pass Statement

`if`, `elif`, `else`, `while`, `for`문 모두 아무 것도 실행하지 않더라도 무언가를 적어줘야 에러가 발생하지 않는다. 이때 `pass`를 입력하면 된다.

```python
a = 1
if a > 0:
    pass
```

```python
a = 1
while a < 10:
    pass
```

```python
for _ in range(10):
    pass
```
