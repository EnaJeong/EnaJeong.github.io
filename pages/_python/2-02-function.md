---
title: Function
slug: function
category: Basics
---

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**def**</span> *funcion_name* **(***parameters***)** **:** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span>
</span>

```python
# Fibonacci Series
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

fib(2000)
```
```
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
```

<br>

`return`값이 없는 경우에는 `None`을 반환한다.

```python
def cal_square(n):
    return n**2

def print_square(n):
    print(n**2)

re_cal = cal_square(3)
print("return value of cal_square :", re_cal)

re_print = print_square(3)
print("return value of print_square :", re_print)
```
```
return value of cal_square : 9
9
return value of print_square : None
```

<br>

매개변수(*parameters*)는 없을 수도 있고 여러 개일 수도 있다.

```python
def say_hello():
    print('Hello!')

def add(a, b):
    print(a + b)

say_hello()
add(2, 4)
```
```
Hello!
6
```

<br>

> Python은 overloading을 지원하지 않는다.

<br>


## Default Argument Values

```python
def say(something="Hi"):
    print(something)

say("Hello")
say()
```
```
Hello
Hi
```

```python
# Fibonacci Series
def fib(stop, first=0, second=1):
    while first < stop:
        print(first, end=' ')
        first, second = second, first+second
    print()

fib(100)
fib(100, 1)
fib(100, 2, 2)
```
```
0 1 1 2 3 5 8 13 21 34 55 89
1 1 2 3 5 8 13 21 34 55 89
2 2 4 6 10 16 26 42 68
```

<br>

이때, default값을 지정하지 않는 인자들을 default값을 지정하는 인자들보다 먼저 적어야 한다.

```python
def fib(first=0, second=1, stop):
    while first < stop:
        print(first, end=' ')
        first, second = second, first+second
    print()
```
```
SyntaxError: non-default argument follows default argument
```

<br>


## Keyword Arguments

함수를 호출할 때, 매개변수의 keyword를 이용해 인자 값을 전달할 수 있다. 이때 keyword를 지정하는 인자들의 순서는 중요하지 않으나, keyword로 지정하지 않는 인자들이 keyword로 지정하는 인자들보다 앞에 있어야 한다.

```python
# Fibonacci Series
def fib(stop, first=0, second=1):
    while first < stop:
        print(first, end=' ')
        first, second = second, first+second
    print()
```

```python
fib(stop=100)
fib(stop=100, first=1)
fib(first=2, stop=100)
fib(100, second=2)
```
```
0 1 1 2 3 5 8 13 21 34 55 89
1 1 2 3 5 8 13 21 34 55 89
2 1 3 4 7 11 18 29 47 76
0 2 2 4 6 10 16 26 42 68
```

```python
fib(first=2, 100)
```
```
SyntaxError: positional argument follows keyword argument
```

<br>


## Special Parameters `/` `*`

> `/`는 Python 3.8에서 추가되었다.

함수를 호출할 때 각 매개변수에 인자값을 전달하는 방법은 매개변수의 위치에 해당하는 인자값을 넣어주는 방법과 매개변수의 키워드를 이용해 지정하는 방법이 있다.

인자값을 전달받는 방법따라 매개변수의 종류를 다음과 같이 구분한다.

- positional-only
- positional-or-keyword
- keyword-only

함수를 선언할 때, `/`나 `*`를 이용하여 이러한 매개변수(parameter)의 종류를 구분할 수 있다.

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**def**</span> f(*pos1*, *pos2*, **/**, *pos_or_kwd*, **\***, *kwd1*, *kwd2*):
</span>

`/`나 `*`가 없는 경우에는 'positional-or-keyword' 타입이 되고, `/`나 `*`가 있는 경우에는 매개변수의 종류를 다음과 같이 구분한다.

```
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only
```

<br>

**Positional-or-Keyword Parameters**

```python
def standard_arg(arg):
    print(arg)

standard_arg(2)
standard_arg(arg=2)
```
```
2
2
```

<br>

**Positional-Only Parameters**

```python
def pos_only_arg(arg, /):
    print(arg)

pos_only_arg(2)
```
```
2
```
```python
pos_only_arg(arg=2)
```
```
TypeError: pos_only_arg() got some positional-only arguments passed as keyword arguments: 'arg'
```

<br>

**Keyword-Only Parameters**

```python
def kwd_only_arg(*, arg):
    print(arg)

kwd_only_arg(arg=2)
```
```
2
```
```python
kwd_only_arg(2)
```
```
TypeError: kwd_only_arg() takes 0 positional arguments but 1 was given
```

<br>

**Combined Examples**

```python
def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)

combined_example(1, 2, kwd_only=3)
combined_example(1, standard=2, kwd_only=3)
# combined_example(1, 2, 3)                                 # TypeError
# combined_example(pos_only=1, standard=2, kwd_only=3)      # TypeError
```
```
1 2 3
1 2 3
```

```python
def combined_2(pos_only, /, *, kwd_only):
    print(pos_only, kwd_only)

combined_2(1, kwd_only=3)
# combined_2(pos_only=1, kwd_only=3)      # TypeError
# combined_2(1, 3)                        # TypeError
```
```
1 3
```

```python
def combined_3(standard, *, kwd_only):
    print(standard, kwd_only)

combined_3(2, kwd_only=3)
combined_3(standard=2, kwd_only=3)
```
```
2 3
2 3
```

<br>


## Arbitrary Argument Lists

매개변수로 `*args`를 넣어주면, 임의의 개수의 인자를 전달 받을 수 있다. 이 인자들은 `tuple`에 담긴다.

```python
def arbitrary_test(*args):
    print(args)

arbitrary_test("earth", "mars", "venus")
```
```
('earth', 'mars', 'venus')
```

> 변수 이름이 args일 필요는 없다.

<br>

`*args`는 다른 일반 매개변수들보다 뒤에 위치하나, ‘keyword-only’ 매개변수 앞에 위치한다. 또한 `*args`가 있는 경우에는 구분자인 `*`가 필요하지 않다.

```python
def arb_position(standard, *args):
    print(standard, args)

arb_position(2, "earth", "mars", "venus")
```
```
2 ('earth', 'mars', 'venus')
```

```python
def arb_position(pos_only, /, standard, *args, kwd_only):
    print(standard, args)

arb_position(1, 2, "earth", "mars", "venus", kwd_only=3)
```
```
1 2 3 ('earth', 'mars', 'venus')
```

<br>

여기서 주의해야할 점은 `*args`인자들은 모든 `keyword-only` 인자들보다 앞에 위치해야하기 때문에, `positional-or-keyword` 타입이더라도 keyword를 이용해서 인자를 전달할 수 없다는 점이다.

```python
def arb_position(pos_only, /, standard, *args, kwd_only):
    print(pos_only, standard, kwd_only, args)

arb_position(1, standard=2, "earth", "mars", "venus", kwd_only=3)
```
```
SyntaxError: positional argument follows keyword argument
```

```python
def arb_position(pos_only, /, standard, *args, kwd_only):
    print(pos_only, standard, kwd_only, args)

arb_position(1, "earth", "mars", "venus", standard=2, kwd_only=3,)
```
```
TypeError: arb_position() got multiple values for argument 'standard'
```

> "earth"가 'standard' 인자가 되었기 때문에 'standard'를 두 개 전달한 것으로 판단한다.

<br>


### Arbitrary Keyword Argument Lists

매개변수로 `**keywords`를 넣어주면, 임의의 개수의 키워드 인자를 전달 받을 수 있다. 이 인자들은 `dict`에 담긴다.

```python
def keywords_test(**keywords):
    print(keywords)

keywords_test(one=1, two=2, three=3, four=4, five=5)
```
```
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

> 변수 이름이 keywords일 필요는 없다.

<br>

`*keywords`는 다른 모든 매개변수들보다 뒤에 위치한다.

```python
def keywords_test(*, kwd_only, **keywords):
    print(kwd_only, keywords)

keywords_test(kwd_only=0, one=1, two=2, three=3, four=4, five=5)
```
```
0 {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

```python
def position_test(*args, **keywords):
    for arg in args:
        print(arg, end=' ')
    print('')

    for key, value in keywords.items():
        print("(", key, ":", value, ")", end=' ')

position_test("earth", "mars", "venus", one=1, two=2, three=3)
```
```
earth mars venus
( one : 1 ) ( two : 2 ) ( three : 3 )
```

<br>


## Unpacking Argument Lists

전달할 인자들이 sequence type 변수들에 담겨있다면, 해당 변수 앞에 `*`를 붙여 원소들을 unpack하여 인자로 전달할 수 있다.

```python
# Fibonacci Series
def fib(stop, first=0, second=1):
    while first < stop:
        print(first, end=' ')
        first, second = second, first+second
    print()

args = (2000, 1, 1)
fib(*args)
```
```
1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
```

```python
print(*range(3, 6))
```
```
3 4 5
```

<br>

전달할 인자의 키워드와 인자값 쌍이 `dict`에 담겨있다면, 해당 변수 앞에 `**`를 붙여 원소들을 unpack하여 키워드 인자로 전달할 수 있다.

```python
def fruits(red, yellow, green):
    print('A red fruit is', red)
    print('A yellow fruit is', yellow)
    print('A green fruit is', green)

basket = {'red': 'apple', 'green': 'lime', 'yellow': 'lemon'}
fruits(**basket)
```
```
A red fruit is apple
A yellow fruit is lemon
A green fruit is lime
```

<br>


## Lambda Expression

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**lambda**</span> *parameters* **:** *expression*
</span>

```python
def make_incrementor(n):
    return lambda x: x + n

f_42 = make_incrementor(42)
print(f_42(1))

print(make_incrementor(40)(1))
```
```
43
41
```

<br>

주로 일회용 함수를 만들 때 사용한다.

```python
pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]

pairs.sort(key=lambda pair: pair[1])
print(pairs)
```
```
[(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

<br>


## Documentation Strings

```python
print(print.__doc__)
```
```
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)

Prints the values to a stream, or to sys.stdout by default.
Optional keyword arguments:
file:  a file-like object (stream); defaults to the current sys.stdout.
sep:   string inserted between values, default a space.
end:   string appended after the last value, default a newline.
flush: whether to forcibly flush the stream.
```

```python
def my_function():
    """Do nothing, but document it.

No, really, it doesn't do anything."""

    pass

print(my_function.__doc__)
```
```
Do nothing, but document it.

No, really, it doesn't do anything.
```
