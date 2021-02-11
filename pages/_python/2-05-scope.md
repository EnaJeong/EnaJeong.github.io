---
title: Scope
slug: scope
category: Basics
---

scope : 코드상에서 변수가 유효성을 갖는 영역

> **'어느 namespace에 직접 접근이 가능한 코드 상의 영역'**이라고 정의한다.
>
> namespace : a mapping from names to objects
>
> - the set of built-in names
> - the global names in a module
> - the local names in a function invocation
> - the set of attributes of an object
>
> 같은 이름이더라도 다른 namespace에 있다면 서로 관련이 없으며 다르게 사용할 수 있다.
>
> 실행하는 동안 매 순간 다음과 같은 3, 4개의 중첩되는 scope를 갖는다.
>
> - the innermost scope contains the local names
> - the scopes of any enclosing functions contains non-local, but also non-global names
> - the next-to-last scope contains the current module’s global names
> - the outermost scope is the namespace containing built-in names

<br>


변수의 할당이나 다른 모듈의 import가 일어나는 곳은 다음 세 군데이다.

- 클래스 정의 block 안
- 함수 정의 block 안
- 메인 module 단

일반적으로 어느 block 안의 변수는 그 block의 'local 변수'이고, 'main module'단에 있는 변수가 'global 변수'이다.

다만 변수를 생성할 때 `global` 또는 `nonlocal`로 선언해 다른 scope의 변수를 생성할 수도 있다.

> 메인모듈의 변수는 'local'이자 'global'이다.

<br>


정의되지 않은 변수가 사용된다면, 그 변수는 'free variable'(자유변수)이다.

<br>


## local

일반적으로 block안에서 선언되는 변수는 'local 변수'로, 해당 block 안에서만 접근할 수 있다.

```python
def local_test():
    local_v = 2

local_test()
print(local_v)  # scope밖에서 local 변수에 접근 시도
```
```
NameError: name 'local_v' is not defined
```

다른 namespace에 있는 이름을 변수명으로 사용할 수 있으며, 그 둘은 서로 구분된다.

```python
def local_test():
    a = 2     # local 변수, global 변수와 이름만 같다.
    print(a)  # local 변수의 scope안에서는 local 변수에 접근

a = 1  # global 변수
local_test()
print(a)
```
```
2
1
```

해당 변수가 local namespace에 없는 경우에는 global 변수에 접근한다.

```python
def local_test():
    print(a)

a = 1
local_test()
```
```
1
```

변수의 scope는 해당 블락안이기 때문에, 같은 이름의 global 변수와 함께 사용할 수 없다.

```python
def local_test():
    print(a)  # 아래에서 local 변수를 생성하기 때문에, global 변수 사용 불가능

    a = 2
    print(a)

a = 1
local_test()
print(a)
```
```
UnboundLocalError: local variable 'a' referenced before assignment
```

global 변수에 어디에서든 접근할 수 있는 것처럼, 해당 블록 안에서는 어디에서든 접근할 수 있다.

```python
def local_test():        # ------
    a = 2                #      |
                         #      |
    def inner_func():    #      | `a`의 scope     
        print(a)         #      |
                         #      |
    inner_func()         # ------

local_test()
```
```
2
```

<br>


## global

코드 block안에서 변수명 앞에 `global`을 붙여 선언하는 경우에는 'global 변수'가 되고, 해당 변수명이 없었다면 새로 선언된다.

```python
def global_test():
    global global_v
    global_v = 2

global_test()
print(global_v)
```
```
2
```

```python
def global_test():
    global a
    print("In global_test:", a)
    a = 2
    print("In global_test:", a)

a = 3
print("In module: ", a)
global_test()
print("In module: ", a)
```
```
In module:  3
In global_test: 3
In global_test: 2
In module:  2
```

```python
def global_test():

    def inner_func():
        global a
        print("In inner_func", a)
        a = 4
        print("In inner_func", a)

    a = 1
    print("In global_test:", a)
    inner_func()
    print("In global_test:", a)


a = 3
print("In module: ", a)
global_test()
print("In module: ", a)
```
```
In module:  3
In global_test: 1
In inner_func 3
In inner_func 4
In global_test: 1
In module:  4
```
<br>


## nonlocal

변수를 선언할 때 앞에 `nonlocal`을 붙여 선언하는 경우에는, 'nonlocal 변수'가 된다.

이때 'nonlocal'이란 상위 scope에 있는 변수를 지칭한다.

```python
def nonlocal_test():
    def inner_func():
        nonlocal nonlocal_v
        nonlocal_v = 7

    nonlocal_v = 6
    inner_func()
    print(nonlocal_v)

nonlocal_test()
```
```
7
```

`global`과 달리 `nonlocal`은 해당 변수가 먼저 선언되어 있어야 한다.

아무 곳에도 선언되어 있지 않은 경우, 어느 scope에 선언해야 하는지 알 수 없기 때문이다.

```python
def nonlocal_test():
    def inner_func():
        def inin_func():      
            nonlocal nonlocal_v
            nonlocal_v = 7
        inin_func()

    nonlocal_v = 6
    inner_func()
    print(nonlocal_v)

nonlocal_test()
```
```
7
```

```python
def nonlocal_test():
    def inner_func():
        def inin_func():      
            nonlocal nonlocal_v
            print("In inin_func:", nonlocal_v)
            nonlocal_v = 7
            print("In inin_func:", nonlocal_v)

        nonlocal_v = 6
        print("In inner_func:", nonlocal_v)
        inin_func()
        print("In inner_func:", nonlocal_v)

    nonlocal_v = 5
    print("In nonlocal_test:", nonlocal_v)
    inner_func()
    print("In nonlocal_test:", nonlocal_v)

nonlocal_test()
```
```
In nonlocal_test: 5
In inner_func: 6
In inin_func: 6
In inin_func: 7
In inner_func: 7
In nonlocal_test: 5
```

또한 'global 변수'에는 사용할 수 없다.

```python
global_v = 3

def nonlocal_test():
    nonlocal global_v
    print(global_v)
```
```
SyntaxError: no binding for nonlocal 'global_v' found
```

<br>


## Example

```python
def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)
```
```
After local assignment: test spam
After nonlocal assignment: nonlocal spam
After global assignment: nonlocal spam
In global scope: global spam
```

1. The local assignment didn’t change `scope_test`’s binding of `spam`.
2. The nonlocal assignment changed `scope_test`’s binding of `spam`
3. The global assignment changed the module-level binding.
4. There was no previous binding for `spam` before the global assignment.
