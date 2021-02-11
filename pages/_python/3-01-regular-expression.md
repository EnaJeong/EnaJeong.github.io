---
title: Regular Expression
slug: regular-expression
category: Library
---

```python
import re
```

### Performing Matches

<table>
  <tr>
    <th>re.match(pattern, string)</th>
    <td>Determine if the RE matches at the beginning of the string</td>
  </tr>
  <tr>
    <th>re.fullmatch(pattern, string)</th>
    <td>Determine if the RE matches the whole string</td>
  </tr>
  <tr>
    <th>re.search(pattern, string)</th>
    <td>Scan through a string, looking for any location where this RE matches</td>
  </tr>
  <tr>
    <th>re.findall(pattern, string)</th>
    <td>Find all substrings where the RE matches, and returns them as a list</td>
  </tr>
  <tr>
    <th>re.finditer(pattern, string)</th>
    <td>Find all substrings where the RE matches, and returns them as an iterator</td>
  </tr>
</table>



### Modifying Strings


<table>
  <tr>
    <th>re.split(pattern, string)</th>
    <td>Split the string into a list, splitting it wherever the RE matches</td>
  </tr>
  <tr>
    <th>re.sub(pattern, replc, string)</th>
    <td>Find all substrings where the RE matches, and replace them with a different string</td>
  </tr>
  <tr>
    <th>re.subn(pattern, replc, string)</th>
    <td>Does the same thing as sub(), but returns the new string and the number of replacements</td>
  </tr>
</table>


> MULTILINE 모드로 검사하고 싶은 경우에는 세 번째 인자로 `re.MULTILINE`를 전달한다.

<br>


## Syntax

### Metacharacters (메타 문자)

| 문자       | 의미                            | 사용 예                                         |
|:----------:|--------------------------------|-------------------------------------------------|
| []         | 문자 집합                       | `[abc]` `[a-c]`                                 |
| [^ ]       | 집합 안의 문자를 제외한 문자     | `[^abc]` `[^a-c]`                               |
| .          | 임의의 문자 (newline 제외)       | `te.t` => 'test', 'text', ...                  |
| ^	         | 처음	                           | `^Re`                                           |
| $	         | 끝	                            | `sion$`                                         |
| *	         | 0번 이상 (*greedy*)	             | `ba*` => 'b', 'ba', 'baa', 'baaa', ...          |
| +	         | 한 번 이상 (*greedy*)	          | `ba+` => 'ba', 'baa', 'baaa', ...               |
| ?	         | 0번이나 한 번	(*greedy*)          | `files?` => 'file', 'files'                    |
| {*m*}      | *m*번 반복                        | `a{2}` => 'aa'                                 |
| {*m*, *n*} | *m*번 이상 *n*번 이하 (*greedy*)  |  `a{2,4}` => 'aa', 'aaa', 'aaaa'                |
| \|         | Either or (선택)	                 | `lemon|apple` => 'lemon', 'apple'                 |
| \          | Special Indicator                |                                                    |
| ()         | Group (시작과 끝 지정)            |                                                    |
| \*n*       | *n*번째 group과 일치하는 문자 반복 | `(1|2)(3|4)\2\1` => '1331', '1441', '2332', '2442' |

> **[]**
>
> - 문자를 하나하나 나열할 수 있다. (`[abc]`)
> - 두 문자 사이의 모든 문자를 지정하고 싶은 경우 '-'를 두 문자 사이에 넣어준다. (`[0-9A-Fa-f]`)
> - Metacharacters(메타 문자)들이 일반 문자처럼 사용된다.
> - 문자 '-'를 표현하고 싶은 경우에는 '\-'라고 입력한다.
> - 문자 ']'를 표현하고 싶은 경우에는 '\]'라고 입력한다.
> - `\w`나 `\S` 깉은 문자집합은 사용할 수 있다.

> **\*, +, ? vs. \*?, +?, ??**
>
> `\*`, `+`, `?` 는 *'greedy'*하기 때문에 정규식을 만족하는 가장 긴 텍스트와 일치하지만,
> 뒤에 `?`를 붙은 `\*?`, `+?`, `??`는 *'non-greedy'*하게 최소 길이에 대응한다.
>
> ```python
> text = "<a> b <c>"
>
> print(re.search(r'<.*>', text))
> print(re.search(r'<.*?>', text))
> print(re.findall(r'<.*>', text))
> print(re.findall(r'<.*?>', text))
> ```
> ```
> <re.Match object; span=(0, 9), match='<a> b <c>'>
> <re.Match object; span=(0, 3), match='<a>'>
> ['<a> b <c>']
> ['<a>', '<c>']
> ```

> **{m,n} vs. {m,n}?**
>
> {m,n}는 *'greedy'*하기 때문에 n번 반복되는 패턴이 있다면 n번 반복하는 텍스트와 일치하지만,
> {m,n}?는 *'non-greedy'*하게 n번 반복되더라도 m번 반복하는 텍스트와 일치한다.
>
> ```python
> text = "aaaaaa"
>
> print(re.search(r'a{2,4}', text))
> print(re.search(r'a{2,4}?', text))
> ```
> ```
> <re.Match object; span=(0, 4), match='aaaa'>
> <re.Match object; span=(0, 2), match='aa'>
> ```


<br>

### Special Sequences

| \d | 숫자                        | [0-9]          |
| \D | 숫자가 아닌 문자             | [^0-9]         |
| \s | 공백 문자                    | [ \t\n\r\f\v]  |
| \S | 공백이 아닌 문자             | [^ \t\n\r\f\v] |
| \w | 알파벳 + 숫자 + '_'          | [a-zA-Z0-9_]   |
| \W | 알파벳, 숫자, '_'가 아닌 문자 | [^a-zA-Z0-9_]  |

| \A | 문자열의 시작                    |
| \Z | 문자열의 끝                      |
| \b | 단어의 시작이나 끝인 빈 문자      |
| \B | 단어의 시작이나 끝이 아닌 빈 문자 |

> **\A, \Z vs. ^, $**
>
> MULTILINE 모드에서 다음과 같이 매치된다.
>
> | ^  | Matches the beginning of **a line**.     |
> | $  | Matches the end of **a line**.           |
> | \A | Matches the beginning of **the string**. |
> | \z | Matches the end of **the string**.       |
>
> ```python
> target = """bdva
> abdv
> """
>
> print(re.findall(r'^a', target, re.MULTILINE))
> print(re.findall(r'\Aa', target, re.MULTILINE))
>
> print(re.findall(r'a$', target, re.MULTILINE))
> print(re.findall(r'a\Z', target, re.MULTILINE))
> ```

<br>

### Extension Expressions

**(?...)** : an extension notation

| (?aiLmsux)                          | setting the flags               | 각 flag의 의미는 하단 참조                               |
| (?:...)                             | non-capturing version           | the substring matched by the group cannot be retrieved  |
| (?aiLmsux-imsx:...)                 | setting or removing the flags   | 각 flag의 의미는 하단 참조                               |
| (?P<name>...)                       | group name                      |   |
| (?P=name)                           | backreference to a named group  |   |
| (?#...)                             | comment                         |   |
| (?=...)                             | lookahead assertion             | `Isaac(?= Asimov)` => 'Isaac' only when 'Isaac Asimov'   |
| (?!...)                             | negative lookahead assertion    | `Isaac(?! Asimov)` => 'Isaac' (X) when 'Isaac Asimov'    |
| (?<=...)                            | positive lookbehind assertion   | `(?<=Isaac )Asimov` => 'Asimov' only when 'Isaac Asimov' |
| (?<!...)                            | negative lookbehind assertion   | `(?<!Isaac )Asimov` => 'Asimov' (X) when 'Isaac Asimov'  |
| (?(id/name)yes-pattern\|no-pattern) | conditional expression          | 'no-pattern' is optional                                 |


> **(?aiLmsux) Flags**
>
> - a : re.A (ASCII-only matching)
> - i : re.I (ignore case)
> - L : re.L (locale dependent)
> - m : re.M (multi-line)
> - s : re.S (dot matches all)
> - u : re.U (Unicode matching)
> - x: re.X (verbose)
>
>  Flags should be used first in the expression string.

<br>

```python
text = '2373'

# print(re.search(r'(?:1|2)(3|4)\1\2', text))  # error: invalid group reference 2
print(re.search(r'(?:1|2)(3|4)7\1', text))  # 1이 두 번째 그룹의 id이다.
```
```
<re.Match object; span=(0, 4), match='2373'>
```

```python
pattern = r'(?P<first>1|2)(?P<second>3|4)(?P=second)(?P=first)'
text_1 = "1331"
text_2 = "1341"
text_3 = "2442"

print(re.search(pattern, text_1))
print(re.search(pattern, text_2))
print(re.search(pattern, text_3))
```
```
<re.Match object; span=(0, 4), match='1331'>
None
<re.Match object; span=(0, 4), match='2442'>
```

```python
text = "Isaac Asimov Isaac Newton"

print(re.search(r'Isaac(?= Asimov)', text))
print(re.search(r'Isaac(?! Asimov)', text))
```
```
<re.Match object; span=(0, 5), match='Isaac'>
<re.Match object; span=(13, 18), match='Isaac'>
```

```python
text = "Peter Parker Ben Parker"

print(re.search(r'(?<=Peter )Parker', text))
print(re.search(r'(?<!Peter )Parker', text))
```
```
<re.Match object; span=(6, 12), match='Parker'>
<re.Match object; span=(17, 23), match='Parker'>
```

```python
pattern = '(<)?(\w+@\w+(?:\.\w+)+)(?(1)>|$)'
text_1 = "<user@host.com>"
text_2 = "user@host.com"
text_3 = "<user@host.com"
text_4 = "user@host.com>"

print(re.search(pattern, text_1))
print(re.search(pattern, text_2))
print(re.search(pattern, text_3))
print(re.search(pattern, text_4))
```
```
<re.Match object; span=(0, 15), match='<user@host.com>'>
<re.Match object; span=(0, 13), match='user@host.com'>
<re.Match object; span=(1, 14), match='user@host.com'>
None
```

<br>


## Complied Regular Expression Objects

re.**compile(**pattern**)** : 정규식 'pattern'을 정규식 객체로 컴파일한다.

| Methods                                    | 참고                       |
|--------------------------------------------|----------------------------|
| Pattern.match(string, *pos*, *endpos*)     | *pos*, *endpos*는 optional |
| Pattern.fullmatch(string, *pos*, *endpos*) | *pos*, *endpos*는 optional |
| Pattern.search(string, *pos*, *endpos*)    | *pos*, *endpos*는 optional |
| Pattern.findall(string, *pos*, *endpos*)   | *pos*, *endpos*는 optional |
| Pattern.finditer(string, *pos*, *endpos*)  | *pos*, *endpos*는 optional |
| Pattern.split(string, maxsplit=0)          |  |
| Pattern.sub(repl, string, count=0)         |  |
| Pattern.subn(repl, string, count=0)        |  |

<br>

```python
pattern = re.compile("d")

print(pattern.search("dog"))
print(pattern.search("dog", 1))
print(pattern.findall("Why do dogs dig?"))
print(pattern.findall("Why do dogs dig?", 4, 11))
```
```
<re.Match object; span=(0, 1), match='d'>
None
['d', 'd', 'd']
['d', 'd']
```

```python
pattern = re.compile("o")

print(pattern.match("dog"))
print(pattern.match("dog", 1))
print(pattern.fullmatch("dog"))
print(pattern.fullmatch("dog", 1, 2))
```
```
None
<re.Match object; span=(1, 2), match='o'>
None
<re.Match object; span=(1, 2), match='o'>
```

```python
pattern = re.compile(" ")

print(pattern.split("lemon lime orange grapefruit"))
print(pattern.split("lemon lime orange grapefruit", 2))
print(pattern.sub(", ", "lemon lime orange grapefruit"))
print(pattern.sub(", ", "lemon lime orange grapefruit", 1))
print(pattern.subn(", ", "lemon lime orange grapefruit"))
print(pattern.subn(", ", "lemon lime orange grapefruit", 1))
```
```
['lemon', 'lime', 'orange', 'grapefruit']
['lemon', 'lime', 'orange grapefruit']
lemon, lime, orange, grapefruit
lemon, lime orange grapefruit
('lemon, lime, orange, grapefruit', 3)
('lemon, lime orange grapefruit', 1)
```

<br>


## Match Objects

### match.group()

```python
m = re.search(r"(\w+) (\w+)", "Isaac Newton, physicist")

print(m.group())
print(m.group(0))       # The entire match
print(m.group(1))       # The first parenthesized subgroup.
print(m.group(2))       # The second parenthesized subgroup.
print(m.group(1, 2))    
```
```
Isaac Newton
Isaac Newton
Isaac
Newton
('Isaac', 'Newton')
```

```python
m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Malcolm Reynolds")

print(m.group('first_name'))
print(m.group('last_name'))
print(m.group(1))
print(m.group(2))
```
```
Malcolm
Reynolds
Malcolm
Reynolds
```

<br>

### Match.__getitem__(g)

```python
m = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist")

print(m[0])       # The entire match
print(m[1])       # The first parenthesized subgroup.
print(m[2])       # The second parenthesized subgroup.
```
```
Isaac Newton
Isaac
Newton
```

<br>

### Match.groups(default=None)

```python
m = re.match(r"(\d+)\.(\d+)", "24.1632")
print(m.groups())

m = re.match(r"(\d+)\.?(\d+)?", "24")
print(m.groups())      # Second group defaults to None.
print(m.groups('0'))   # Now, the second group defaults to '0'.
```
```
('24', '1632')
('24', None)
('24', '0')
```

<br>

### Match.groupdict(default=None)

```python
m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Malcolm Reynolds")

print(m.groupdict())
```
```
{'first_name': 'Malcolm', 'last_name': 'Reynolds'}
```
