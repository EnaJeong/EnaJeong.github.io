---
title: Dictionary
slug: dictionary
category: Data Types
---

`dict` : 'key'와 'value' 쌍으로 이루어진 데이터들의 모음을 나타내는 자료형

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

print(type(numbers))
```
```
<class 'dict'>
```

<br>

이때 'key'값이 'value'에 접근할 수 있는 인덱스가 되며, `dict` `a`의 인덱스가 k인 원소를 `a[k]`라고 지칭하여 선택할 수 있다.


```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

print(numbers["two"])
```
```
2
```

'key'는 인덱스 역할을 하기 때문에 중복된 값을 가질 수가 없으며, 동일한 'key'에 값을 넣는 경우 나중에 넣은 값으로 덮어씌어진다.

```python
basket = {'red': 'apple', 'yellow': 'banana', 'green': 'lime', 'yellow': 'lemon'}

print(basket)
```
```
{'red': 'apple', 'yellow': 'lemon', 'green': 'lime'}
```

숫자를 'key'로 사용하는 경우 같은 값인지 비교하는 기준은 실제 숫자값이다. 따라서 1과 1.0처럼 타입이 다르더라도 같은 숫자를 의미하면 같은 'key'로 판단한다.

```python
one = {1: "int_one", 1.0: "float_one", 1+0j: "complex_one"}

print(one)
print(one[1.0])
```
```
{1: 'complex_one'}
complex_one
```

```python
one = {1.0: "float_one", 1: "int_one", 1+0j: "complex_one"}

print(one)
print(one[1+0j])
```
```
{1.0: 'complex_one'}
complex_one
```
> 'key'는 제일 처음에 넣은 값으로 표현되는 것도 확인할 수 있다.


<br>

원소가 들어있지 않은 빈 `dict`도 생성할 수 있다.

```python
d = {}

print(d)
print(type(d))
```
```
{}
<class 'dict'>
```

<br>

**Key 조건**

변하지 않는 값만 'key'로 사용될 수 있다. 따라서 `list`나 `set`과 같이 변할 수 있는 값은 `key`로 사용할 수 없으며, `tuple`이더라도 변할 수 있는 값을 원소로 가지고 있다면 'key'로 사용할 수 없다.

```python
d = {[1]: "one"}
```
```
unhashable type: 'list'
```

```python
d = {(0, {1, 2}): "test"}
```
```
unhashable type: 'set'
```

<br>

**Dict Comprehension**

`for`문을 활용하여 `dict`를 생성하는 방법으로 `{}` 안에 `for`문을 넣어준다.

<span style="display:block;margin:10px; padding:10px;">
dict = **{**<span style="color:gray">*key expression*</span> **:** <span style="color:gray">*value expression*</span>
            <span style="color:#E07A7A">**for**</span> <span style="color:gray">*item*</span>
            <span style="color:#E07A7A">**in**</span> <span style="color:gray">*iterable*</span>
            <span style="color:#E07A7A">**if**</span> <span style="color:gray">*condition*</span>**}**
</span>

`if` 조건절은 특정 조건이 필요한 경우에 추가하고 생략도 가능하다.

이를 활용하면 `dict`의 모든 원소를 직접 적지 않고 간단하게 생성할 수 있다.

```python
d = {x: x**2 for x in (2, 4, 6)}
print(d)
```
```
{2: 4, 4: 16, 6: 36}
```

```python
target = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squared = {i:i**2 for i in target if i%2 == 1}
print(squared)
```
```
{1: 1, 3: 9, 5: 25, 7: 49, 9: 81}
```

변수를 여러 개 사용하는 것도 가능하다.

```python
power = {(x, y): x**y for x in range(2,4) for y in range(1,4)}
print(power)
```
```
{(2, 1): 2, (2, 2): 4, (2, 3): 8, (3, 1): 3, (3, 2): 9, (3, 3): 27}
```

<br>


## Modification

### Assignment

인덱스인 'key'를 통해 선택한 원소에 직접 특정 값을 할당하여 'value'값을 바꿀 수 있다.

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

numbers["one"] = 11
print(numbers)
```
```
{'one': 11, 'two': 2, 'three': 3, 'four': 4}
```

해당 'key'를 가진 원소가 없다면, 새로운 원소가 추가된다.

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

numbers["five"] = 5
print(numbers)
```
```
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

<br>

### dict.update()

'key'와 'value' 쌍의 모음을 인자로 받아, 각 'key' 별로 해당 'key'가 있으면 'value'를 업데이트하고 없으면 새로운 원소를 추가한다.

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

numbers.update({"five": 5, "one": 11})
print(numbers)
```
```
{'one': 11, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

매개변수가 'key', 'value' 쌍만 만족하면 된다.

```python
numbers = {"one": 1, "two": 2, "three": 3, "four": 4}

numbers.update([("five", 5), ("one", 11)])
print(numbers)
```
```
{'one': 11, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

<br>

### dict.pop(key)

인덱스인 'key'를 이용해 특정 원소의 'value'를 추출하고, 해당 원소를 삭제한다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

one = numbers.pop('one')
print(one)
print(numbers)
```
```
1
{'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

해당 'key'가 없는 경우 에러가 발생한다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

six = numbers.pop('six')
```
```
KeyError: 'six'
```

해당 'key'가 없는 경우 에러를 발생시키지 않고 반환할 default값을 설정할 수 있다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

six = numbers.pop('six', 6)
print(six)
```
```
6
```

<br>

### dict.popitem()

마지막으로 삽입된 원소를 추출하고, 'dict'에서 삭제한다.

> 3.7 이전 버전에서는  임의의 원소를 추출한다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

item = numbers.popitem()
print(item)
print(numbers)
```
```
('five', 5)
{'one': 1, 'two': 2, 'three': 3, 'four': 4}
```

<br>

### dict.clear()

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

numbers.clear()
print(numbers)
```
```
{}
```

<br>


## Operations

`key in dict` : dict가 key를 가지고 있으면 True, 아니면 False 반환

`key not in dict` : dict가 key를 가지고 있지 않으면 True, 있으면 False 반환

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print('one' in numbers)
print('zero' in numbers)
print('one' not in numbers)
print('zero' not in numbers)
```
```
True
False
False
True
```

<br>


`len(dict)` : dict의 요소(item)의 개수를 반환

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(len(numbers))
```
```
5
```

<br>


## Built-in Methods

### dict.get(key[, default])

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.get('one'))
print(numbers.get('zero'))
print(numbers.get('zero', 0))
```
```
1
None
0
```

<br>

### dict.setdefault()

'dict'안에 해당 'key'가 있으면 그 'value'를 반환하고, 없으면 그 'default'값을 반환하며 해당 'key'와 'default'로 지정한 값의 쌍을 원소로 추가한다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.setdefault('one', 11))
print(numbers)
print(numbers.setdefault('zero', 0))
print(numbers)
```
```
1
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
0
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'zero': 0}
```

인자로 'default'값을 지정하지 않으면 `None`이 'dafault'값이 된다.

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.setdefault('one'))
print(numbers)
print(numbers.setdefault('zero'))
print(numbers)
```
```
1
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
None
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'zero': None}
```

<br>

### dict.keys()

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.keys())
```
```
dict_keys(['one', 'two', 'three', 'four', 'five'])
```

<br>

### dict.values()

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.values())
```
```
dict_values([1, 2, 3, 4, 5])
```

<br>

### dict.items()

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}

print(numbers.items())
```
```
dict_items([('one', 1), ('two', 2), ('three', 3), ('four', 4), ('five', 5)])
```

<br>

### dict.copy()

```python
numbers = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
copied = numbers.copy()

print(copied)
```
```
{'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
```

<br>

### dict.fromkeys(*iterable*[, *value*])

모든 'value'값이 고정인 `dict`를 생성한다.

```python
numbers = ['one', 'two', 'three', 'four', 'five']

new_d = dict.fromkeys(numbers)
print(new_d)
```
```
{'one': None, 'two': None, 'three': None, 'four': None, 'five': None}
```

```python
numbers = ['one', 'two', 'three', 'four', 'five']

new_d = dict.fromkeys(numbers, 0)
print(new_d)
```
```
{'one': 0, 'two': 0, 'three': 0, 'four': 0, 'five': 0}
```
