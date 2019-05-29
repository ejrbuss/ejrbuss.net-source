# Forward

I now have over 40 repositories and that number is only likely to increase in the coming years. Since joining GitHub in 2015 it became my home for code, as it has for many people. Being a student, and therefore bleeding money, it makes no sense *to write anything but open source software*. Okay, so maybe that's not quite true, but regardless, it is the case that I *have* written a lot of open source software whether advantageous or not, and with only a few exceptions GitHub has been where I put that software. 

Part of creating a website for myself is an attempt to better document my life, if only for my own sanity, and this page is part of that. I am going to go through a selection of my 39 public GitHub repositories. I will be intentionally leaving out projects that are linked on my [work](/work) page or projects that I have (or plan to) write individual blog posts for.

So enough preamble lets look around, going backwards through time.

# rust-tracer (2018)

This was a my second attempt at a ray tracer. I followed along with [Peter Shirley's books](http://in1weekend.blogspot.com/2016/01/ray-tracing-in-one-weekend.html) on the subject which really make ray tracing quite accessible. I also wanted to learn Rust and so I adopted his C++ code to the new language. Compared to a simpler ray tracer I had written a year prior, in C++ for a University course, this produced significantly better looking renders in much less time.

![ray trace](/static/blog/github-catalog/rust-tracer.png)

There are still plenty of features left to be implemented. I had just begun to implement non-ambient light when I stopped working on the project. Hopefully I will revisit this project someday.

*[GitHub link](https://github.com/ejrbuss/rust-tracer)* 

# vorld (2017)

As part of a University course we had to develop a simple terrain generation program. I recall this project exploding over one night and before I knew it I was trying to render little procedurally generated planets with water and clouds. The results aren't amazing, but it was the first time I had ever any written real amount of shader code. 

All of the actual procedural generation is performed in the shader using a simplex noise algorithm and the planets themselves are generated on a cube which is then mapped to spherical coordinates. 

![procedural planet](/static/blog/github-catalog/vorld.png)

*[GitHub link](https://github.com/ejrbuss/vorld)* 

# schema-reflector (2017)

This was another University course project, this time a group effort. We built a web application for exploring a SQL schema. We wanted to use the clustering algorithm from [this paper](https://www.sciencedirect.com/science/article/pii/S0167642302000576) to produce abstract (and hopefully more understandable) views of large databases. In particular we were focused on analyzing the [OSCAR EMR database](https://oscar-emr.com/). Additionally, we did some static analysis work and could extract semantic data from annotated ORM Java files. It was a little bit finicky, but again we were focused on extracting the data from the OSCAR EMR source, and worried less about how it handled other projects. Here's a screenshot of the type of diagrams the system would produce

![schema reflector](/static/blog/github-catalog/schema-reflector.png)

*[GitHub link](https://github.com/ejrbuss/schema-reflector)* 

# RDP (2017)

RDP, short for Reliable Datagram Protocol, was a final project for a third year Networking course. The basic ideas was to reimplement many off the valuable features of TCP, namely control flow and error control, over top of UDP. Alongside providing this functionality the implementation also had to track statistics for connections.

The implementation made use of a 15 byte header, specified by the course administrators

```nolines
     1(6b)       2(1b)       3(4b)      4(2b)      5(2b)
+----------+--------------+-----------+---------+----------+
|          |  |R|R|D|F|A|S|           | Window/ |          |
| "CSC361" |00|E|S|A|I|C|Y| Seq/Ack # | Payload | Checksum |
|          |  |S|T|T|N|K|N|           |   Size  |          |
+----------+--------------+-----------+---------+----------+
```

This was a fun and interesting project to debug. I remember distinctly testing to see how much packet drop the protocol could withstand. Increasing packet loss on a router beyond 20% would usually breakdown the ssh connection leading to all sorts of shenanigans.

*[GitHub link](https://github.com/ejrbuss/RDP)*

# SWS (2017)

SWS, short for Simple Web Server was a school project to create a simple static file server, a fun little project and my first introduction to socket programming.

*[GitHub link](https://github.com/ejrbuss/SWS)* 

# HTMLmini (2016)

So this project is a little embarrassing, and teaches an important lesson: do your research. I started this project around the time I was just learning web technologies and had just begun to realize my fascination with programming languages. When confronted with HTML I was disgusted, lets be honest, I still am, and so sought to create a programming language that would solve those problems. So I devised a simple syntax. Elements nested using whitespace (ala Python), and element creation like CSS selectors, so for example this

```lang:HTMLmini
div#my-app.app
    h1.title | Hello World
    p | Welcome to the world
```

Would produce this

```lang:html-readonly
<div id="my-app" class="app">
    <h1 class="title">Hello World</h1>
    <p>Welcome to the world</p>
</div>
```

If you haven't realized it already, I was recreating [Pug](https://pugjs.org/language/attributes.html), a far superior version of my idea. After discovering Pug my interest in HTMLmini disappeared. Looking at the code nowadays it's not even that bad, and certainly an improvement from the previous two projects.

*[GitHub link](https://github.com/ejrbuss/HTMLmini)* 

# JI (2016)

This is another project inspired by a young Java programmer encountering Python. I wanted a Java REPL so immensely I tried to write one. Now that [Java 9](https://www.baeldung.com/java-9-repl) is a thing Java has a real REPL, which is pretty cool. My approach was a lot less sophisticated.

The basic idea is to manage a source file behind the scenes. Every time you type a new line of Java code that line is added to an approbate spot in a Java file *template* and then that file is written, compiled, and run. Obviously an inefficient technique, but it worked surprisingly well. I recall being able to use it for a couple second year Computer Science courses, and since it produced an actual Java file, your work was effectively *saved* in a convenient manner. By providing a `.java` file on the command line JI would compile that file too and keep it in the same directory, making it easy to interact with the file. Using some abusive regexes, and sneaky `System.out.println`s features like multiline code segments and the P in REPL were possible.

Here's the Java file template in all its glory
```lang:python-readonly
# The template format for JI.java
template = """
`imports`
public class JI {
    public static void main( String[] args ) {
        `statements`
        `expression`
    }
    `methods`
}
"""
```

*[GitHub link](https://github.com/ejrbuss/ji)* 

# retro (2016)

Oh goodness, this is an old one. Python was the first language I learned after Java, and it was a beautiful discovery. The pitch here is Java Swing, for the command line, written in Python. Yeah, it's about as terrible as it sounds. I never really got that far with the project as a whole, performance became a problem quite quickly, even with a lot of (what a younger me called "clever") caching.

I learned a lot from this project about terminals, and how horrible they can be to work with. Just trying to run this now it crashes for 3 different reasons on 3 on 3 different machines. Go figure that `Fetch multi-platform implementation` is not nearly multi-platform enough.

*[GitHub link](https://github.com/ejrbuss/retro)* 







