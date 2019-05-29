# Introduction

My original site went live in 2017. I meant to create a place that I could link my projects together, post the occasional blog, and link potential employers to my resume. While I had some nifty ideas I never got around to finishing the site. In May of 2019 I decided to revisit the site and reimagine it. You can learn a lot in two years and I believe the new site reflects that.

Like many websites out there my site is built off a foundation of other technologies. The Open Source community has made incredible tools for developers. I have a lot of love and thanks for all of the technologies I used for this project (and all those I considered and ultimately decided against, I'm looking at you [Vue](https://vuejs.org/)).

# Technologies

## Next.js

[Next.js](https://nextjs.org/) is pretty hot right now, and it is not hard to see why. Essentially Next.js is a wrapper around [React](https://reactjs.org/) and [webpack](https://webpack.js.org/) that includes its own routing, server-side rendering, and code splitting. What makes Next.js so special though is how easy it is to use. It may just have the best tutorial of any web technology ever. The development experience is fast and snappy, with react hot-loading, and easy static exports. Without a doubt if I hear someone wants to make a static site using React, Next.js is where I point them.

## Less

The [Less](http://lesscss.org/) [Sass](https://sass-lang.com/) war has been going on for awhile now, and at this point it seems like despite a significant lead on the Sass side, both are here to stay. I personally have a slight preference for the slightly simpler Less. I'm not particularly interested in writing code in my CSS, I really just need a few color variables and mixins to throw around.

## Spectre.css

I've played with a lot of CSS frameworks, but I keep coming back to [Spectre.css](https://picturepan2.github.io/spectre/). It's so inoffensive, simple, and yet gorgeous that nothing else has taken its place for me. I look to CSS frameworks to give me a *reasonable default*, and I feel like that's exactly what Spectre.css is.

## Font Awesome

[Font Awesome](https://fontawesome.com/) is the defacto icon provider for the web. What can you say besides the fact that they provide a ridiculous number of gorgeous icons `icon:fas fa-question`

## highlight.js

No code block would be complete without highlighting and [highlight.js](https://highlightjs.org/) has been making that easy for years. Maybe the most set and forget libraries I have ever used, that manages to produce beautiful results with good performance. I am proud of the quality of code blocks my site offers, and a lot of that quality is thanks to highlight.js.

```lang:js-readonly
if (hljs.isAwesome()) {
    return 'Thanks hightlightjs!';
}
```

## Animate.css

[Animate.css](https://daneden.github.io/animate.css/) provides just that little extra to a webpage. I've used it in just about every website I have ever made. It's job here is just to add the occasional fade when the page loads, but that's enough to remember how valuable and simple it is.

# The Old Site

When I started the old site my dislike of JSX was strong enough to push me away from React to trying to build my own pure JavaScript component model. I actually came up with a DSL that wasn't horrible, code looked something like

```lang:js-readonly
document.body.appendChild(
    div({ id:'content' },
        html,
        div({ class:classJoin('centered', classes.center) },
            canvas({ class:classes.canvas })
        ),
        div({ class:'container' },
            div({ class:'columns' },
                div({ class:'column hide-md col-1' }),
                div({ class:'column hide-md col-2' })))));
```

It's an idea I style want to revisit, but likely in the form of a new programming language that prioritizes making DSLs.

The old site had a rather cool design for the main page. I used [three.js](https://threejs.org/) to render a 3d version of my logo that would break into smaller squares as your mouse moved to the edge of the screen. I liked it quite a bit, except that every time you visited the site your computer would start to hum and heat up.

![old site main page](/static/blog/site-history/old-main-page.png)

You can see a lot of the new site in the old about page, the stark minimalist aesthetic. The content itself has only changed a little too. It was lacking polish, but did feature a simple game of Tetris!

![old site about page](/static/blog/site-history/old-about-page.png)
