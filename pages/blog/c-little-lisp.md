> **Note**
> The source code for C Little Lisp can be found in [this repository](https://github.com/ejrbuss/cll). All cll examples in this post can be edited and run by you! 

# Introduction

I love lisp. I'll freely admit it. It's simplicity to the max. Unfamiliar with this family of languages? Well simply take your typical C style function call

```lang:c-readonly
my_function(arg1, arg2, arg3);
```

Now move the bracket, get rid of all that punctuation, and throw in kebab-case for good measure

```lang:lisp-readonly
(my-function arg1 arg2 arg3)
```

Now you have a lisp! Well, there's a lot more to it then that. Well, it's more that there isn't a lot more to it than that. Where as other programming languages have special syntax for classes, if statements, loops, and more, lisp has the [S-expr](https://en.wikipedia.org/wiki/S-expression), and that's all it has. So imagine if you had to write your C code using only C function calls

```lang:c-readonly
if((and(equal(x, y), greater_than_zero(x)), 
    then_do(add(x, y)),
    else_do(sub(x, y))); 
```

And you can quickly get a sense for why lisp has a reputation for having too many parentheses, it comes not from moving the parentheses to the left, but writing absolutely everything that's possible as an S-expr. The side effect of this design decision is that lisp programs are incredibly easy to parse, interpret, and manipulate.

C Little Lisp (cll) is a minimal lisp I used to explore the basics of lisp programming at a lower level. How can you handle closures in a language like C? What about garbage collection? Is it possible for such a language to be performant. My little language will answer all these questions.

# The Language

Cll borrows syntax from [Clojure](https://clojure.org/), namely it tries to add some syntactic sugar to objects like lists and maps, but mostly we'll be keeping things simple. Clojure is sacrilege to some Schemesters, but I've always like how Clojure looks aesthetically. You'll usually see Lisp tutorials opt for the Scheme design as making a fully fledged Scheme is a perfectly tractable solo project.

So what sorts of things can we do in cll? Well we have basic types like

```lang:cll-evaluator:cllEvaluator
(println "nil:     " nil, ()) 
(println "numbers: " 42, 0xFF, 2.17, pi)
(println "strings: " "Hello," "World!")
(println "keywords:" :x :a-long-keyword)
(println "symbols: " 'x 'a-long-symbol)
```

And these can be combined using a few composite types like

```lang:cll-evaluator:cllEvaluator
(println "lists:        " [1 2 3] (list 1 2 3) (cons 1 (cons 2 (cons 3 nil))))
(println "dictionaries: " { :x 1 :y 2 } (dict :x 1 :y 2))
(println "refs:         " (ref 1))  
```

Lists are the foundation of lisp, and cll uses cons cells to represent them. A cons cell is just a simple structure with two pointers, one to the object contained by the cell, and one to the next cell (or nil if there is no next cell). Cons cells are also used to implement dictionaries in cll. This means that all data in cll except for `ref` and data containing `ref` are immutable. If you add a key to a dictionary, you are just producing a new dictionary.

Functions are called using the format `(function arg1 arg2 arg3)`. In addition to the normal functions, dictionaries or keywords act as lookup functions

```lang:cll-evaluator:cllEvaluator
(println ({ :x 4 :y 7 } :y))
(println (:z { :zebra "zebra" :z "z" }))
```

You may have noticed that there are no booleans in cll. In cll the empty list `()` (also written as `nil`) is the only falser value. All other values are truthy. So if we use the special form `if`

```lang:cll-evaluator:cllEvaluator
(if nil (println "nil is truthy!") (println "nil is falsey!"))
```

We see that only the else branch got evaluated. This introduces another concept for lisp, special forms. Special forms have different evaluation semantics than functions. Basically, your arguments may not be evaluated in the way you expect. Some special forms that cll includes are

```lang:cll-evaluator:cllEvaluator
(println "`def` defines global values")
(def x 36)
(println "x =" x)
 
(println "`fn` creates functions")
(def square (fn [x] (* x x)))
(println "(square x) =" (square x)) 

(println "`do` creates a block that returns its final value")
(println (do 
  (square 1)
  (square 2)
  (square 3)
  (square 4)))

(println "`let` defines local variables and creates a `do` block")
(let { x      27 
       square (fn [y] y) }
  (println "I can do multiple things!") 
  (println "(square x) =" (square x)))

(println "`catch` catches errors")
(catch (throw :Error "Oops!") (fn [err] (println (err :message))))  
```

There are a few more special forms not shown here, like `quote`, `quasi-quote`, `macro` that help in defining macros. There is also a `while` macro which can be used in conjunction with references to create more efficient looping structures.

A final little feature of cll is that function definitions and let expressions allow for the destructuring of lists

```lang:cll-evaluator:cllEvaluator
(let { [x [y z] & rest] [1 [2 3] 4 5] }
  (println "x:" x "y:" y "z:" z "rest:" rest))
((fn [x [y z] & rest]
  (println "x:" x "y:" y "z:" z "rest:" rest))
  1 [2 3] 4 5)
```

The rest of the language is fleshed out in the form of functions and macros. Many common functions are provided like `cons`, `car`, `cdr`, `map`, `each`, and `reduce` for lists. Many math functions like `sin`, `abs`, and `pow` are also available.

# Writing the Interpreter

When starting with a blank C project, lisp can seem a long ways off. Most lisp tutorials lean on implementations of lists and dictionaries provided by higher level languages like Python and JavaScript. More importantly these languages usually provide garbage collection out of the box. With C we have to make some important decisions about how we want to represent lisp object.

## Objects

To simplify our code all lisp objects are represented by a single struct named `obj`. Our goal is to keep `obj` relatively small as it will be used to represent everything from a number to a cons cell. There is one major exception to this representation method, and that is `nil`, which will be mapped to `NULL` in C. 

We will need to know the type of our object so we can handle it correctly so all objects will keep track of their type. The object data can then be kept in a union to try and minimize the overall object size. We could be more clever than this, but this will keep memory management much simpler. A simplified version of the object struct would look like this

```lang:c-readonly
struct obj {
    // The object type
    char type;
    union {
        // Resource types
        char * symbol;
        char * keyword;
        char * string;
        // List types (lists and dicts)
        struct {
            obj * car;
            obj * cdr;
        };
        // All numbers are represented by C doubles
        double number;
        // Refs are just pointers to another object
        obj * ref;
        // A pointer to a native function
        obj * (*native)(obj *);
    };
};
```

In our c code we can use switch statements on the type field to figure out what data fields are safe to access. Now that we have a simple representation for objects we still need a way to allocate them.

## Garbage Collection

Garbage collection is a pretty key feature for lisp. All functions in lisp can be closures and it's very easy for memory usage to get out of hand. A garbage collector keeps track of what objects are still referenced by the program and frees up the rest. Cll uses the classic mark and sweep algorithm, which isn't very efficient, but is easy to implement. 

Every object we allocate we'll wrap in a node which we will place on a "heap". That node will point to the next node and so on, creating a chain that goes through all off our allocated objects. If we run out of room to store objects we will perform mark and sweep. We start with a few root objects, global variables, variables on the stack, etc. and we will mark all objects that those objects can somehow reach. We can cheat a little and just put all our global variables at the top of the stack that way we can have only a single root. We then sweep, iterating over all the objects and free all of the objects that have not been marked. 

The actual cll code has some extra details in it that we haven't covered yet. For instance we use a pool allocator for objects, so we can use that pool allocator to walk the heap. We also have to deal with someway of managing the stack by way off stack returns. Here's the code for this two step process.

```lang:c-readonly
void gc_mark() {
    assert(g_vm != nil);
    pool_node * node = g_vm->stack;
    while (node != nil) {
        obj * o = pool_node_chunk(node);
        // We want to skip over stack returns
        if (o->gc_tag != gc_stack_return) {
            o->gc_tag = gc_unmarked;
            gc_mark_recursive(o);
        }
        node = node->cdr;
    }
}

static void gc_mark_recursive(obj * o) {
    if (o == nil || o->gc_tag == gc_marked) {
        return;
    }
    // A stack return should never be marked, 
    // or have any of its fields inspected
    assert(o->gc_tag != gc_stack_return);
    // Mark the object
    o->gc_tag = gc_marked;
    // Check for referenced objects
    switch (o->type) {
        case type_reference:
            gc_mark_recursive(o->ref);
            break;
        case type_error:
        case type_list:
        case type_dict:
        case type_macro:
        case type_function:
            gc_mark_recursive(o->car);
            gc_mark_recursive(o->cdr);
            break;
        case type_hash_map: {
            int I;
            for (I = 0; I < o->hash_map->size; I++) {
                if (o->hash_map->data[I].key != nil) {
                    gc_mark_recursive(o->hash_map->data[I].ptr);
                }
            }
            break;
        }
        default:
            break;
    }
}

static void gc_sweep() {
    assert(g_vm != nil);
    int c;
    int chunks =  g_vm->obj_pool->chunks;
    for (c = 0; c < chunks; c++) {
        obj * o = pool_iter(g_vm->obj_pool, c);
        switch(o->gc_tag) {
            case gc_marked:
                o->gc_tag = gc_unmarked;
                continue;
            case gc_unmarked:
                free_obj(o);
                continue;
            default:
                continue;
        }
    }
}
```

## Reader/Writer

Now that lisp objects can be represented in C, the next step to creating a lisp is creating a reader and a writer. A reader *reads* through strings and converts them into their object counterparts. A writer does precisely the opposite, given a lisp object it produces a string representation. These functions aren't particularly interesting, but with them you can produce a basic repl (read eval print loop) that just echoes whatever forms you give it. In cll you can access these functions through `read` and `str`.

```lang:cll-evaluator:cllEvaluator
(println (read "(1 2 3 4)"))
(println (str '(1 2 3 4)))
```

## Eval

Where the magic of lisp happens is in the `eval` function. This function takes a lisp object and evaluates it. Most objects just evaluate to themselves, things like numbers, strings, etc. Lists and symbols are special however. Lists are evaluated as functions, and symbols get looked up in a special dictionary called the environment. The cll eval function looks like

```lang:c-readonly
obj * eval(obj * expr, obj * env) {
    if (expr == nil) {
        return nil;
    }
    switch (expr->type) {
        case type_list: {
            obj * result = eval_list(expr, env);
            if (result != nil && result->type == type_error) {
                result = cons(expr, result);
                result->type = type_error;
            }
            return result;
        }
        case type_symbol: return eval_symbol(expr, env);
        default:          return expr;
    }
}
```

You'll notice there is a little extra code to deal with errors, this is so that cll can produce a trace of the error.

This portion of eval is really quite simple, the bulk of the work gets performed by `eval_list`. This function has to handle all of the special forms, evaluate the function and the arguments, and call that function. Here's an abridged version of `eval_list`

```lang:c-readonly
static obj * eval_list(obj * list, obj * env) {
    prepare_stack();

    obj * op   = FAST_CAR(list);
    obj * args = FAST_CDR(list);

    // Special forms go here
    // ...

    // Not a special form, evaluate as a function
    // Eval operator
    op = eval(op, env);

    if (op == nil) {
        return_from_stack(THROW_FN_ARG("eval", 1, "a callable", op));
    }

    // Propagate error
    if (op->type == type_error) {
        return return_from_stack(op);
    }

    // Expand macros
    // ...

    // Eval arguments
    obj * args_head = nil;
    obj * args_tail = nil;
    while (args != nil) {
        obj * next = eval(FAST_CAR(args), env);
        // If an argument is an error we need to propagate it
        RETURN_ON_ERROR(next);
        // Otherwise put it onto the evaluated argument list
        FAST_REV_CONS(args_head, args_tail, next);
        args = FAST_CDR(args);
    }
    // Call operator on evaled arguments
    return return_from_stack(call(op, args_head));
}
```

There's a lot going on here besides just the evaluation. We have to deal with all of the potential error conditions, what if the function we want to call evaluated to an error or to nil? What if one of our arguments evaluated to an error? C is fairly unforgiving for these cases and we could easily produce a segmentation fault if we don't consider them, so we need to try and be thorough. You may have also noticed a number of functions like `FAST_CDR` written in all caps. These were important to performance gains discussed in the next section.

# Performance

Performance was never a priority for cll, however the first iteration of the language was painfully slow. For instance the following code took about 15 seconds on an 8th gen i7. 

```lang:cll-evaluator:cllEvaluator
(defn fib [n]
  (cond
    (= n 0) 0
    (= n 1) 1
    :else   (+ (fib (- n 1)) (fib (- n 2)))))

(println (str-fmt "takes: {}s"(time-it (fib 20))))
```

Hopefully even translated to JavaScript on your phone that performs significantly better. I used the Mac OS Instruments tool to do some basic profiling and figure out what was making cll so brutally slow.

## A Better Allocator

The first thing that stood out when profiling was that for larger programs cll spent all of its time in `malloc`, like 70-80% of its runtime. So clearly constantly mallocing and freeing objects was not the best solution. 

Considering our object model, there are significantly better allocation schemes available. I opted for a pool (sometimes called a refrigerator allocator). The basic idea is that because all our objects are the same size we can have an allocator that manages of chunks of only that size. At startup we allocate our maximum number of chunks and then we just hand them out as we need them. There are a couple of methods to keeping track of a pool allocator, but one method is to just leave room for a pointer at the top of each chunk, this pointer then points to the next chunk. You then stop the first chunk as the "head" of the allocator. To allocate you just return the chunk pointed to by head and move head to point to the next chunk, to free a chunk you make it the new head and have it point to the old one. This method has an added benefit that when a chunk is allocated we have a free pointer that isn't being used. Cll uses this pointer as its garbage collection node.

Here's the generic pool implementation of `pool_alloc` and `pool_free`

```lang:c-readonly
void * pool_alloc(pool * p) {
    assert(p != nil);
    if (!pool_can_alloc(p)) {
        return nil;
    }
    pool_node * node = p->head;
    p->head = p->head->cdr;
    return pool_node_chunk(node);
}

void pool_free(pool * p, void * chunk) {
    assert(p != nil);
    assert(chunk != nil);
    pool_node * node = pool_chunk_node(chunk);
    node->cdr = p->head;
    p->head = node;
    return;
}
```

With the new pool allocator cll performed significantly better. This was by far the greatest performance gain.

## Hash Maps

Looking at the profiler after implementing the pool allocator a large portion of the programs time is spent in `car`, the function that returns the object pointed to by a cons cell. Looking for which functions produce the most calls to `car`, two standout `eval_list` and `eval_symbol`. The latter is a fairly self explanatory culprit. `eval_symbol` is called every time a symbol is evaluated, and it has to check through the entire environment, comparing the evaded symbol with every symbol in the environment, every time. This is horribly inefficient. 

Because most of the objects in the current environment are from the global environment, we can drastically improve performance of lookups overall if we improve global lookup. We can do this by storing globals in a hash map. C doesn't have any standard hash map implementations, but it's not too hard to write our own. We do need to be careful how we manage the objects stored by our hash map, and ensure that we have a way of walking through the hash map to mark all our objects during garbage collection.

Here's the implementation of `hash_map_get` and `hash_map_assoc`

```lang:c-readonly
void * hash_map_get(hash_map * h, char * s) {
    assert(h != nil);
    int I = hash(s) % h->size;	
    while(h->data[I].key) {
        if (FAST_CSTR_EQ(s, h->data[I].key)) {
            return h->data[I].ptr;
        }
        I++;
        I %= h->size;
    }
    return NOT_FOUND;
}

void hash_map_assoc(hash_map * h, char * s, void * ptr) {
    assert(h != nil);
    h->available—;
    // Check if we need more space
    if (h->available < (h->size * RESIZE_FACTOR)) {
        hash_map_resize(h);
    }
    int I = hash(s) % h->size;	
    while(h->data[I].key && !FAST_CSTR_EQ(s, h->data[I].key)) {
        I++;
        I %= h->size;
    }
    int length = strlen(s);
    h->data[I].ptr = ptr;
    if (alloc_str) {
        h->data[I].key = must_malloc(sizeof(char) * (length + 1));
        strcpy(h->data[I].key, s);
    } else {
        h->data[I].key = s;
    }
}
```

With the hash map implementation for global variables time spent in symbol lookup is drastically reduce, but `car` is still taking up a lot of the computation time. A new rival has also showed up, `strcmp` is now taking up a drastic percentage of the compute time (20%+).

## Strings and `FAST`

The final optimization I made to cll was to improve how strings are handled and provide some fast implementations of basic functions. 

The key insight to make is the `strcmp` does more work than necessary if all we want to do is determine if two strings are equal. So we can start with the `strcmp` source code and then produce a faster function like the following

```lang:c-readonly
int FAST_CSTR_EQ(char * cs1, char * cs2) {
    // Check if they are both pointing to the same string
    if (cs1 == cs2) {
        return 1;
    }
    // modified strcmp source https://code.woboq.org/userspace/glibc/string/strcmp.c.html
    char c1;
    char c2;
    do {
        c1 = *cs1++;
        c2 = *cs2++;
        if (c1 == '\0') {
            return c2 == '\0';
        }
    } while (c1 == c2);
    return 0;
}
```

Since our objects are unions, they have a minimum size of two pointers plus two bytes. This means when an object is storing a string we have a whole pointers worth of space to play with. We can use this extra space to store the string length and make equality comparison even faster by checking length first.

We can also have a problem with operations like `car` and `cdr`. Normally we want these functions to check that the object that they receive is a valid type, and handle `nil` nicely, but sometimes we know ahead of time that the object we are giving the function is valid and don't want to pay the performance cost of the checks. To get around this I provide `FAST` functions and macros for some core operations such as

```lang:c-readonly
#define FAST_CAR(o) (o->car)
#define FAST_CDR(o) (o->cdr)
#define FAST_REV_CONS(head, tail, o) if (head == nil) { \
    head = cons(o, head); \
    tail = head; \
} else { \
    tail = rev_cons(tail, o); \
}
#define FAST_SYMBOL_EQ(o, s) (o != nil \
    && o->type == type_symbol \
    && FAST_CSTR_EQ(o->resource, s) \
)
```

With these optimizations made most of cll's compute time is now spent in `eval_list`, which is where it belongs.

# Where to From Here

So what's next for cll? Well I will probably leave the language alone for awhile, but there is still more that could be done. The language itself is only interpreted and code generation would be an interesting project. Additionally there is a nearly working cll in cll implementation in the examples folder. It seems to be able to run all programs except itself, so a true self-hosting implementation is not quite here.

More likely, I will take what I've learned from developing cll and create a new language with different ideas. The journey is the point after all. 

