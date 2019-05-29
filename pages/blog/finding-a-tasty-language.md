# Call Syntax

Programming languages use a variety of syntax to invoke functions/methods/messages. Probably the most popular is the c style

```lang:c-readonly
a_function(arg0, arg1, arg2);
```
Though familiar, this syntax is actually rather complex. The function is separated from its arguments using brackets. This makes brackets pull double duty as they are also used for operation precedent. For instance in the expression `(a_function())` the outer brackets full-fill a different purpose from the inner ones. Additionally arguments are separated using commas in a tuple like style. This likely makes parsing easier, and in ML based languages the tuple format is taken literally. Compare this to the relatively spartan approach of lisp

```lang:lisp-readonly
(a-function arg0 arg1 arg2)
```

This is the classic S-expression, which roughly composes the entire syntactic structure of lisp. An even more minimal style is offered by ML like languages lake Haskell

```lang:Haskell-readonly
aFunction arg0 arg1 arg2
```

But unlike lisp these languages have additional syntax which makes the compiler work hard to understand expressions. Lisp's simplicity makes it trivial to parse in comparison. There are still alternatives (and extensions). There is a stack based syntax, which is like reverse lisp

```lang:kitten-readonly
arg0 arg1 arg2 aFunction
```

This syntax is also used by Smalltalk and similar languages, except rather than being a function, all invocations are messages to objects, and all arguments are named

```lang:smalltalk-readonly
object a_message_arg0:arg0 arg1:arg1 arg2:arg2
```

This applies to the verbose Objective-C as well

```lang:objc-readonly
[object a_message_arg0:arg0 arg1:arg1 arg2:arg2]
```

This style is also echoed in languages like python and Swift which make the named arguments optional and allow you to mix and match with ordinal arguments

```lang:python-readonly
a_function(arg0, arg1, arg6=arg6)
object.message(arg0, arg1, arg6=arg6)
```

More commonly object oriented languages lose the argument naming entirely, like IO, which adopts the C style calling convention for message arguments

```lang:io-readonly
object message(arg0, arg1, arg2)
```

Which is not unlike the common Object oriented style popularized by Java

```lang:java-readonly
object.message(arg0, arg1, arg2)
```


