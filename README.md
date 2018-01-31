Landbot v0.0.1
====

![](https://imgur.com/B5mLCYs.gif)

### Installation
```
npm i && npm run dev
```

### Stages format

`src/stages.js` keeps list of named stages, that describes bot conversation logic.

Each key name of stage object used to link stages with actions.
```js
{
    initial: [
        {
            text: 'Hi there!'
        },
        {
            delay: 200,
            typing: 500,
            text: 'Do you want to join party ?',
            actions: [
                {
                    text: 'Yes, shure',
                    link: 'join',
                    type: 'action'
                },
                {
                    text: 'No, thanks',
                    link: 'end'
                }
            ]
        }
    ],
    join: [
        {
            text: 'Welcome!'
        },
        {
            text: 'See ya!'
            redirect: 'end'
        }
    ],
    end: [
        {
            text: 'Ok, bye ;)'
        }
    ]
}

```

#### Stage
Every stage is an array, that contains one or several steps, that describes bot messages.

  * `text` – message
  * `[component]` – function, that return component(DOM element), that will placed in chat in circle(click to open).
  > NOTE: be sure you get imported components to bundle to use it.
  * `[delay]` (in ms) – time before step will be activated
  * `[typing]` (in ms) – time to show tying animation
  * `[actions]` – array of actions, that available for user after message appeared

#### Actions

  * `text` – action button text
  * `[type]` – button type. For exmaple value `'action'` paint action button in green color
  * `[link]` – stage name, that activated when action is used
  * `[redirect]` – stage name, that activated immedialty after current stage

