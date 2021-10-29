# Halloween Word Guess

Dust off your dictionaries, welcome to the Halloween Word Graveyard! 

This is a challenging word guess with a **s p o o k y** word list and theme!

Words are derived from a curated spooky word list node package created in part by github user [melissamcewen](https://github.com/melissamcewen).
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments-Attributions](#acknowledgments-attributions)

## Overview

### The challenge

Users should be able to:

- Input words
- Guess using click or pressing `enter`
- Receive an error message when the `letter input form` is submitted if:
  - The `input` field is empty
  - More than one letter was submitted
  - If the letter is not in the English alphabet
- Get into the Halloween Spirit
- Learn a new spooky word or two
- Create some undead words

### Screenshot
![halloween-word-graveyard screenshot](https://user-images.githubusercontent.com/19538219/139377291-1464ff88-abc3-4427-9b07-06d2bb5c49ef.jpg)


### Links

- Live Site URL: [Halloween Word Graveyard Live site](https://sadiejay.github.io/halloween-word-guess/)
- Github URL: [Halloween Word Graveyard Github Repo](https://github.com/sadiejay/halloween-word-guess)

## My Inspiration
- Halloween!
- Creepy styling
- I was inspired by [Kevin Powell's glitch screen for creepy loading](https://www.youtube.com/watch?v=RIDA6elhmBU)
- I wanted to get a lil more js practice and API practice.
- Replacing ES5 JS with ES6!
- Creating a voice with the responses


## My process

#### - Convert ES5  to ES6


#### - Spooky design
  - changed background colors
  - added video background and gradient from inspiration

#### - Update the font styles


#### - Configure the API using the github page
  - Go to spooky words github
  - get the url for the different word lists
  - create API
    - can there be more than 1 API?
      - If yes:
        - create an array with the list
        - add the arraies together to get a big list
        - use that pool
      - if no:
        - maybe different pages for each list?

#### - Add second span class in index
  - Update the js to hide and add the span classes as needed
    - Second class should follow the same rules as `remainingWordsSpan` for the big change events
    - Otherwise it doesn't have to be tooled with
  - I thought there would be a more elegant way to select 2+ elements with the same class? But in the time I had I couldn't figure out the issue and made a third class for the remaining paragraph.

#### - Update text responses


### Partly Shelved / Sheleved for v2
 #### - Functionality
  - have answer reveled in both graveyard and message area
  - hide text input area and message 
  - Now that I've added the lists together, I want to add the option to choose either word length or word list?
    - HTML option menu
    - it would open and hide when not active
    - wait for user input to do something
      - if user choses 8 letters then change `word.length` 
      - users choses "teams" then tie response to `getTeamsData` and remove others from `wordArray`

  #### - Add a "splash screen / loading screen"
   - rewatch kevin powell CSS glitch screen
   - find resource on delay loading
   - how could i have it done just once tho and not every time?
    - on first visit load screen?

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Library
- Flexbox
- JS
- APIs

### What I learned
A ton but I'll try to keep it one for each language.

- HTML video background hero
  - I think I would have tried to wrap the whole video around the content. Instead of creating a hero section.

- CSS 
  - Reduced motion blur and button accessibility. I also wonder how the coffins will be read on screen readers.

- JS
  - The huge async function is my proudest moment. 

  #### code snippets

```html
<!-- not wrapping the video tag is a win -->
<div class="hero">
      <video class="video-bg" autoplay muted loop src="video/hero-video.mp4" type="video/mp4"></video>
      .
      .
      .
 </div>     
```


  ```css
  /*so overused in this case but I think it adds to the eerieness. It wins CSS' MVP*/
text-shadow: 2px 4px 8px var(--l-orange);
```

```js
// SO glad this even worked. I'm curious about wrapping the package up and doing some backend work
Promise.all([ 
  (async () => {
    ... 
   }
  ]);
```


### Continued development

- I think I could make this into a react app where the words update automatically after hitting play again? Without a page refresh?
- Add some way to change the list users are playing from would be cool
- And max number of words option
- Max number of guesses
- Reveal a random letter hint 
- Interested in added a dripping goo load animation.
  - was thinking of doing sometihng like this: 
    - [Add Full Screen Video foreground while window is loading](https://stackoverflow.com/questions/37947254/add-full-screen-video-foreground-while-window-is-loading) with this [Drippy Drip Animation Video](https://www.youtube.com/watch?v=X5sWkb5RASU)
 - [Ghost Agency](https://dribbble.com/shots/14464637-Ghost-Agency-The-Pumpkin-Free-Illustration-Kit) - Change button to this shape or something similar
- Would love to figure out how to reveal the letters from under the coffin. I tried:
```js
const revealWordEnding = [];
   for (const letter of upperWord) {
        revealWordEnding.push(letter.toUpperCase());
        // console.log(revealWordEnding);
      }
    wordIP.innerText = revealWordEnding.join("");
```
 but I can't understand how to remove the coffins. When I run the included log, they don't show in the array.
### Useful resources
- [Elementor Halloween Web Design](https://elementor.com/blog/halloween-web-design/) - Def liked the assets and the video background idea!
- [How to create a background video | HTML & CSS tutorial](https://www.youtube.com/watch?v=RIDA6elhmBU) - Was also made aware of reduced motion
- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) - Helped me understand the multiple awaits in async function. 
- [How to handle multiple awaits in async function](https://stackoverflow.com/questions/58815415/how-to-handle-multiple-awaits-in-async-function) - I modeled the awaits after this function.
- [How to make your fancy SVG button accessible](https://www.freecodecamp.org/news/how-to-make-your-fancy-svg-button-accessible-83c9172c3c15/) - Didn't use it, but I thought it'd be helpful if I wanted to make a custom shape button
- [Emoji Favicons > coffin](https://favicon.io/emoji-favicons/coffin) - emoji favicon maker
- [CSS Shake](https://elrumordelaluz.github.io/csshake/) - Hover shake animation
- [An Introduction to the Reduced Motion Media Query](https://css-tricks.com/introduction-reduced-motion-media-query/) - Unfortunately, I wasn't able to figure out how to turn off the shake feature for reduced motion users. I left the code in however, in case someone gets it. I def wanted to include this resource as a future reminder.
- Other background options I considered
    - [Option 1 Purple & Black](https://www.vecteezy.com/vector-art/3260064-halloween-seamless-pattern-background-vector-illustration)
    - [Opt 2 Orange & Black](https://www.vecteezy.com/vector-art/3492938-halloween-seamless-pattern-background-vector-illustration)
    - [Opt 3 Grey & Black Pumpkins](https://www.vecteezy.com/vector-art/3646760-pumpkin-halloween-seamless-pattern-horrible-pumpkin-vector-illustration-in-flat-style)
    - [Opt 4 Cat eyes](https://www.vecteezy.com/vector-art/464245-cat-eyes-halloween-seamless-pattern-flat-design-with-clipping-mask)

## Author

- Github - [@sadiejay](https://www.twitter.com/yourusername)


## Acknowledgments-Attributions

- [Spooky Words npm package](https://github.com/melissamcewen/spooky-words/tree/main)

- [Color Scheme](https://www.schemecolor.com/halloween-purple-and-orange-color-scheme.php)

- [Rain Background](https://www.youtube.com/watch?v=Q1GTZ6JSSFk)

- [Virtual Coffee Member](https://virtualcoffee.io/) - Taiwo has piqued my interested in backend dev :eyes-emoji:

- [Skillcrush]() - Helping me build the skeleton of the project :)




