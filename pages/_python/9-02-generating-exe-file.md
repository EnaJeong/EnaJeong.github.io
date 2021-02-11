---
title: 실행파일 하나로 생성하기
slug: generating-exe-file
category: Others
---

> 먼저 PyInstaller가 설치되어 있어야 한다.
>
> ```
> > pip install pyinstaller
> ```

<br>

예제용 디렉토리 구성은 다음과 같다.

![example file tree](/assets/images/python/calculator-directory-tree.png){: width="175" height="88"}

다음 명령어들을 Prompt 창에서 실행하면 되고, 쉽게 파이참 하단의 Terminal을 이용해도 된다.

<br>

## .qrc 파일을 .py 파일로 변환

> qrc 파일은 이미 있다고 가정한다.

<span style="display:block;margin:10px; padding:10px;">
**pyrcc5** *file_name***.qrc -o** *new_file_name***.py**
</span>

```
> pyrcc5 calculator.qrc -o calculator_rc.py
```

생성한 .py 파일을 가져와 메인 모듈에 import하면 된다.

PyQt에서 만든 .qrc 파일로 .ui가 해당 .qrc 파일을 이용해 만들었고 그 .ui 파일을 사용하는 경우에는 따로 import하지 않아도 된다. 대신, 생성한 .py 파일의 이름이 기존 .qrc 파일명 뒤에 '_rc'를 붙인 형태여야만 한다.

<br>

## .ui 파일을 .py 파일로 변환

<span style="display:block;margin:10px; padding:10px;">
**pyuic5 -x** *file_name***.ui -o** *new_file_name***.py**
</span>

```
> pyuic5 -x calculator.ui -o calculator_ui.py
```

최종 디렉토리 구성은 다음과 같다.

![example file tree](/assets/images/python/calculator-directory-tree-updated.png){: width="172" height="129"}

이제 코드에서 생성한 .py 파일을 import하고 UI를 상속받는 부분을 수정해 준다.

```python
# 기존 코드
from PyQt5 import uic

[code]

form_class = uic.loadUiType('./calculator.ui')[0]

[code]

class Calculator(QWidget, form_class):
```

```python
import calculator_ui
# from PyQt5 import uic    # 삭제

[code]

# form_class = uic.loadUiType('./calculator.ui')[0]    # 삭제

[code]

class Calculator(QWidget, calculator_ui.Ui_Form):
```

<br>

## 실행파일 생성

<span style="display:block;margin:10px; padding:10px;">
**pyinstaller -w -F -n** *(name)* **-** *(icon.ico)* *(file_name)***.py**
</span>

- -w : 콘솔창 출력 X
- -F : 실행파일 하나만 생성
- -n : 실행파일 이름 지정
- -i : 아이콘 적용

> 옵션은 더 많이 있다.
> [\[참고문서\]](https://pyinstaller.readthedocs.io/en/stable/usage.html)

```
> pyinstaller -w -F -n Calculator --icon=images/calculator.ico calculator.py
```

명령어를 실행하면 현재 폴더의 'dist' 폴더 안에 해당 파일이 지정한 이름과 아이콘으로 생성된다.
