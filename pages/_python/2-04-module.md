---
title: Module and Package
slug: module
category: Basics
---

## Module

**Module** : 변수, 함수, 클래스 등을 정의한 Python 파일 (*.py)

<br>

모듈은 다른 모듈이나 메인 모듈에 import시켜 사용할 수 있다.

'module.py'라는 파일이 있다면 다음과 같이 import 시킨다.

```python
import module
```

이제 `module.item`을 통해 *module*이 가지고 있는 변수나 함수 등의 속성을 사용할 수 있다.

<br>

해당 모듈의 속성들을 import할 수도 있다.

```python
from module import item
```

이제 *module*에서 정의한 `item`을 직접 사용할 수 있다.

> *module*을 import한 것이 아니므로 `module.item`이 아니라 `item`으로 해당 속성을 사용한다.

<br>

해당 모듈의 속성을 여러 개 import하고 싶은 경우 `,`로 구분하여 적어준다.

```python
from module import item_1, item_2
```

<br>

해당 모듈의 모든 속성을 import하고 싶은 경우에는 `*`을 사용한다.

```python
from module import *
```

<br>


### Alias

사용하고 싶은 이름을 지정하여 모듈을 import할 수도 있다.

```python
import module as mod
```

이 경우, import된 *module*의 이름은 `module`이 아니라 `mod`이다. 따라서 `mod.item`으로 속성에 접근할 수 있다.

<br>

속성을 import하는 경우에도 이름을 지정하는 것이 가능하다.

```python
from module import item as it
```
이 경우 또한, import된 *item*의 이름은 `item`이 아니라 `it`이다.

<br>


### \_\_name\_\_

모듈은 자동으로 `__name__`이라는 변수를 갖으며, 이 변수 값을 해당 모듈의 파일 이름이다.

이는 내장 모듈을 사용하여 쉽게 확인 가능하다.

```python
import sys

print(s.__name__)
```
```
sys
```

```python
import sys as s

print(s.__name__)
```
```
sys
```

<br>

현재 실행 중인 모듈도 `__name__`이라는 변수를 가지고 있으며, 이 변수 값은 `__main__`이다.

```python
print(__name__)
```
```
__main__
```

<br>

이 변수는 현재 메인 파일로서 실행중인지, import된 모듈로서 실행중인지를 구분하는 데에 이용 가능하다.

모듈을 import하는 경우, 해당 파일이 실행되는 것이다. 따라서 만약 모듈로서 사용되는 경우에 실행되지 않아야 할 구문들을 구분할 필요가 있으며, 다음과 같이 `__name__`이 `__main__`인 경우에만 실행하도록 해야 한다.

```python
if __name__ == "__main__":
    print("I will be executed when this module is a main file.")
```

<br>


## Package

**Package** : 모듈의 구조화된 모음

<br>

다음과 같은 구조의 package가 있다고 하자.

```
package/                        Top-level package
      __init__.py
      sub_1/                    Subpackage
              __init__.py
              module_1.py
              module_2.py
              module_3.py
              ...
      sub_2/                    Subpackage
              __init__.py
              module_11.py
              module_12.py
              ...
```

이때, `package.sub_1`은 subpackage인 *sub_1*을 지칭하며, `package.sub_1.module_1`은 submodule인 *module_1*을 지칭한다.

<br>

패키지 역시 import시켜서 사용이 가능하며, 기본적인 사용법은 모듈과 같다.

```python
import package
```
*package*의 하위 모듈들을 모두 이용 가능하며, 각 모듈에는 `package.subpackage.module`로 접근한다.

<br>

패키지 역시 alias를 지정하여 import할 수도 있다.

```python
import package as alias
```
이 경우, import한 *package*의 이름은 `alias`이며, 각 모듈에는 `alias.subpackage.module`로 접근한다.

<br>

패키지 또한 필요한 subpackage, submodule, submodule의 속성만을 import할 수도 있다.

```python
import package.sub_1
```

```python
import package.sub_1.module_1
```

```python
from package.sub_1 import module_1
```

```python
from package.sub_1.module_1 import item
```

<br>


###  Importing * From a Package

```python
from package import *
```

각 패키지 안에 있는 '\_\_init\_\_.py' 파일이 `__all__` 이라는 `list`변수를 정의한 경우에만 사용이 가능하다.

<br>

위의 구조에서 'package/sub_1/\_\_init\_\_.py'이 다음과 같은 코드를 가지고 있다고 하자.

```python              
__all__ = ["module_1", "module_2"]
```

이때 `from package.sub_1 import *`를 실행하면, *module_1*과 *module_2*를 import할 것이다.
