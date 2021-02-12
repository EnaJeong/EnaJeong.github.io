---
title: Class
slug: class
category: Basics
---

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**class**</span> *ClassName* **:** <br>
    <span style="color:gray">
    &nbsp; &nbsp; &nbsp; &nbsp;statement-1 <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;statement-N
    </span>
</span>

```python
# a class object
class MyClass:
    """A simple example class"""   # a valid attribute, __doc__
    v = 12345

    def f(self):
        return 'hello world'


print(MyClass.v)        # MyClass.v is a valid attribute reference, returning an integer
print(MyClass.f)        # MyClass.f is a valid attribute reference, returning a function object
print(MyClass.__doc__)  # returning the docstring belonging to the class
```
```
12345
<function MyClass.f at 0x000001DFDAF17550>
A simple example class
```

<br>

### Class instantiation

<span style="display:block;margin:10px; padding:10px;">
*var* = *ClassName*()
</span>

클래스의 인스턴스를 생성하고 그 객체를 변수 *var*에 할당한다.

```python
class MyClass:
    """A simple example class"""
    v = 12345

    def f(self):
        return 'hello world'


i = MyClass()       # create a new instance of the class and assign this object to i
print(i.v)          # data attribute
print(i.f())        # method
print()
```
```
12345
hello world
```

<br>


### Initialization

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**def**</span> **__init__ (**<span style="color:#E07A7A">**self**</span>, *parameters***):** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span>
</span>

`__init__` method는 인스턴스를 생성하고 'caller'(호출자)에게 반환하기 전에 자동으로 호출된다. 따라서 인스턴스를 특정 초기 상태로 커스터마이즈하는 데에 사용한다.

`self`는 해당 인스턴스 객체를 지칭하며, 생성자의 첫번재 매개변수는 무조건 `self`여야 한다. 하지만 `self`인자는 생성되는 객체가 자동으로 전달되기 때문에 생성자를 호출할 때 인자로 전달할 필요는 없다.

> 변수 이름이 `self`일 필요는 없지만 관례적으로 `self`라고 한다.

```python
class MyClass:

    def __init__(self):
        print("The init executed.")


i = MyClass()
```
```
The init executed.
```

```python
class InitTest:
    a = None

    def __init__(self, a):
        self.a = a


i = InitTest(1)
print(i.a)
print(InitTest.a)
```
```
1
None
```

```python
class Complex:
    def __init__(self, realpart, imagpart):
        self.r = realpart
        self.i = imagpart


x = Complex(3.0, -4.5)
print(x.r, x.i)
```
```
3.0 -4.5
```

<br>


### Method

객체에 속해있는 함수

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**def**</span> *method_name*
**(**<span style="color:#E07A7A">**self**</span>, *parameters***):** <br>
&nbsp; &nbsp; &nbsp; &nbsp;<span style="color:gray">*suite*</span>
</span>

`__init__`과 마찬가지로 `self`는 해당 인스턴스 객체를 지칭하며, 생성자의 첫번재 매개변수는 무조건 `self`여야 한다. 하지만 `self`인자는 해당 method를 호출하는 객체가 자동으로 전달되기 때문에 인자로 전달할 필요는 없다.

```python
class MyClass:
    def say_hello(self):
        print("Hello!")

a = MyClass()
a.say_hello()
```
```
Hello!
```

```python
class Calculator:
    def add(self, x, y):
        return x + y


c = Calculator()
print(c.add(2,3))
```
```
5
```

<br>


**Data Attributes (Instance Variables)** : 객체의 변수

```python
class Dog:

    kind = 'canine'         # class variable shared by all instances

    def __init__(self, name):
        self.name = name    # instance variable unique to each instance


fido = Dog('Fido')
buddy = Dog('Buddy')

print(fido.kind)
print(buddy.kind)
print(fido.name)
print(buddy.name)

print('')
print(Dog.kind)
# print(Dog.name)  # AttributeError: type object 'Dog' has no attribute 'name'
```
```
canine
canine
Fido
Buddy

canine
```

<br>

`list`나 `dict`등의 변하는 collection들을 변수로 만드는 경우,  `__init__` 함수에서 생성하지 않으면 같은 객체를 참조하므로 주의해야 한다.

```python
class VarTest:
    shared = []  # class variable

    def __init__(self):
        self.nonshared = []  # instance variable


a = VarTest()
b = VarTest()

a.shared.append(0)

print("a.shared :", a.shared)
print("b.shared :", b.shared)
print("VarTest.shared :", VarTest.shared, "\n")

a.nonshared.append(1)
b.nonshared.append(2)

print("a.nonshared :", a.nonshared)
print("b.nonshared :", b.nonshared)
```
```
a.shared : [0]
b.shared : [0]
VarTest.shared : [0]

a.nonshared : [1]
b.nonshared : [2]
```

<br>

클래스와 인스턴스에 같은 이름의 속성이 있는 경우에는, 인스턴스의 속성이 우선순위를 갖는다.

```python
class Warehouse:
    purpose = 'storage'
    region = 'west'

w1 = Warehouse()
print(w1.purpose, w1.region)    # class variables
print(id(w1.purpose) == id(Warehouse.purpose), id(w1.region) == id(Warehouse.region))

w2 = Warehouse()
w2.region = 'east'              # instance variable
print(w2.purpose, w2.region)    # class variable / instance variable
print(id(w2.purpose) == id(Warehouse.purpose), id(w2.region) == id(Warehouse.region))
```
```
storage west
True True
storage east
True False
```

<br>


## Inheritance (상속)

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**class**</span> *DerivedClassName* **(***BaseClassName***):** <br>
    <span style="color:gray">
    &nbsp; &nbsp; &nbsp; &nbsp;statement-1 <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;statement-N
    </span>
</span>

파생클래스는 기본클래스의 모든 속성을 물려받으며, 새로운 속성을 추가할 수 있다.

```python
class Parent:
    last_name = 'Parker'

    def say_name(self):
        print("I'm", self.last_name)


class Child(Parent):
    first_name = 'Peter'

    def say_hi(self):
        print("Hi")


c = Child()

print(c.last_name)
c.say_name()
```
```
Parker
I'm Parker
```

<br>

#### Overriding

파생클래스는 상속받은 속성들을 재정의할 수 있다.

```python
class Parent:
    first_name = 'Richard'
    last_name = 'Parker'

    def say_name(self):
        print("I'm", self.first_name, self.last_name)

class Child(Parent):
    first_name = 'Peter'

    def say_name(self):
        print("I'm", self.first_name)


c = Child()

print(c.first_name)
print(c.last_name)
c.say_name()
```
```
Peter
Parker
I'm Peter
```

<br>

#### super()

`super()`를 활용하여 파생클래스의 속성과 같은 이름을 가진 기본클래스의 속성을 사용할 수 있다.

```python
class Parent:
    first_name = 'Richard'
    last_name = 'Parker'

    def say_name(self):
        print("I'm", self.first_name, self.last_name)

class Child(Parent):
    first_name = 'Peter'

    def say_name(self):
        super().say_name()
        print("I'm a child of", super().first_name)


c = Child()
c.say_name()
```
```
I'm Peter Parker
I'm a child of Richard
```

<br>

#### __init__

기본클래스가 `__init__` method를 가지고 있다면, 파생클래스의 `__init__` method는 `super().__init__()`를 통해 명시적으로 해당 method를 호출해야한다.

```python
class Base():

    def __init__(self):
        print("Base's __init__ excuted.")

class Derived(Base):

    def __init__(self):
        super().__init__()
        print("Derived's __init__ excuted.")


c = Derived()
```
```
Base's __init__ excuted.
Derived's __init__ excuted.
```

<br>


### Built-in Functions

#### isinstance(*object*, *classinfo*)

첫 번째 인자인 *object*가 두 번째 인자인 *classinfo* 또는 *classinfo*의 파생 클래스의 객체이면 `True` 아니면 `False`를 반환한다.
인자 *classinfo*로는 클래스 객체 하나 또는 객체들의 담긴 `tuple`일 수 있다. 인자가 `tuple`인 경우에는 원소 중 하나라도 해당 type이 있다면 `True`를 반환한다.

```python
class Parent():
    pass

class Aunt():
    pass

class Child(Parent):
    pass


c = Child()
print(isinstance(c, Child))
print(isinstance(c, Parent))
print(isinstance(c, Aunt))
print(isinstance(c, (Parent, Aunt)))
```
```
True
True
False
True
```

<br>

#### issubclass(*class*, *classinfo*)

첫 번째 인자인 *class*가 두 번째 인자인 *classinfo*의 파생 클래스면 `True` 아니면 `False`를 반환한다.
인자 *classinfo*로는 클래스 객체 하나 또는 객체들의 담긴 `tuple`일 수 있다. 인자가 `tuple`인 경우에는 원소 중 하나라도 해당 type이 있다면 `True`를 반환한다.

```python
class GrandParent:
    pass

class Parent(GrandParent):
    pass

class Aunt(GrandParent):
    pass

class Child(Parent):
    pass


print(issubclass(Child, Parent))
print(issubclass(Child, GrandParent))
print(issubclass(Child, Aunt))
print(issubclass(Child, (Parent, Aunt)))
```
```
True
True
False
True
```

<br>


### Multiple Inheritance (다중상속)

<span style="display:block;margin:10px; padding:10px;">
<span style="color:#E07A7A">**class**</span> *DerivedClassName* **(***Base1*, *Base2*, *Base3***):** <br>
    <span style="color:gray">
    &nbsp; &nbsp; &nbsp; &nbsp;statement-1 <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;. <br>
    &nbsp; &nbsp; &nbsp; &nbsp;statement-N
    </span>
</span>

```python
class Father:
    last_name = 'Parker'

    def say_name(self):
        print("I'm", self.last_name)


class Mother:
    eye_color = 'Green'

    def say_hi(self):
        print("Hi")   


class Child(Father, Mother):
    pass


c = Child()

print(c.last_name)
print(c.eye_color)

c.say_name()
c.say_hi()
```
```
Parker
Green
I'm Parker
Hi
```

> 기본클래스들 중 속성을 찾을 때 왼쪽에 적은 클래스부터 찾는다.

<br>


## Static Method

다음과 같이 method위에 `@staticmethod`를 붙여 static method를 생성할 수 있다.

```python
class C:
    @staticmethod
    def f(arg1, arg2, ...): ...
```

<br>

Static method는 `self` 인자를 필요로 하지 않으며, class나 인스턴스에서 호출 가능하다.

```python
class Calculator:

    @staticmethod
    def add(a, b):  
        return a + b


print(Calculator.add(1, 2))

c = Calculator()
print(c.add(1, 2))
```
```
3
3
```

> `@staticmethod`가 없었다면 첫번째 인자인 `a`는 `self`인자 역할을 할 것이다.

<br>


## Class Method

다음과 같이 method위에 `@classmethod`를 붙여 class method를 생성할 수 있다.

```python
class C:
    @classmethod
    def f(cls, arg1, arg2, ...): ...
```

<br>

Class method는 첫번째 인자로 class를 받으며, 이 인자는 `self`와 마찬가지로 자동으로 전달되기 때문에 인자로 직접 전달할 필요는 없다. 그리고 Class method 또한 class나 인스턴스에서 호출 가능하다.

```python
class Calculator:
    base_num = 1

    @classmethod
    def add(cls, a, b):  
        return cls.base_num + a + b

class SubCalculator(Calculator):
    base_num = 2


print(Calculator.add(1, 2))
print(SubCalculator.add(1, 2))

c = Calculator()
print(c.add(1, 2))

sc = SubCalculator()
print(sc.add(1, 2))
```
```
4
5
4
5
```

<br>


## Special method

클래스에 특별한 이름을 가진 method를 정의함으로써, 클래스가 산술연산자나 슬라이싱 등과 같이 특정 syntax에 의해 호출되는 연산들을 수행할 수 있다.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # print()
    def __str__(self):
       return f'({self.x},{self.y})'   # The return value must be a string object.

    # len()
    def __len__(self):
        return self.x**2 + self.y**2  # Should return the length of the object, an integer >= 0.

    # Slice
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        else :
            return


p = Point(3,4)

print(p)
print(len(p))
print(p[0], p[1])
```
```
(3,4)
25
3 4
```

```python
class Mod17:

    __n = 17

    def __init__(self, x):
        self.x = x % Mod17._Mod17__n

    # print()
    def __str__(self):
       return str(self.x)

    # +
    def __add__(self, num):
        new_x = (self.x + num.x) % Mod17._Mod17__n
        return Mod17(new_x)

    # -    
    def __sub__(self, num):
        new_x = (self.x - num.x) % Mod17._Mod17__n
        return Mod17(new_x)

    # *
    def __mul__(self, num):
        new_x = (self.x * num.x) % Mod17._Mod17__n
        return Mod17(new_x)

    # -
    def __truediv__(self, num):
        new_x = None
        for i in range(Mod17._Mod17__n):
            if (i * num.x) % Mod17._Mod17__n == self.x:
                 new_x = i

        return Mod17(new_x)


x, y = Mod17(30), Mod17(15)

print(x, y)
print(x + y)
print(x - y)
print(x * y)
print(x / y)
```
```
13 15
11
15
8
2
```

> 참고 : [Python Documentation](https://docs.python.org/3.8/reference/datamodel.html#special-method-names)
