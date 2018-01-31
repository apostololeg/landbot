import VideoPlayer from './VideoPlayer'

export default {
    initial: [
        {
            content: 'Hi, I\'m Robot Vera!'
        },
        {
            content: 'Would you like to ... ?',
            actions: [
                {
                    text: 'Show me',
                    link: 'about',
                    type: 'action'
                }
            ]
        }
    ],
    about: [
        {
            content: 'Vera is ...',
            component: () => new VideoPlayer({
                youtubeID: 'IZk-x9Q4Z8U'
            }).domElem
        },
        {
            delay: 3000,
            content: 'D u want to try ?',
            actions: [
                {
                    text: 'Try now',
                    link: 'try',
                    type: 'action'
                },
                {
                    text: 'No, thanks',
                    link: 'end'
                }
            ]
        }
    ],
    try: [
        {
            content: 'Let\'s try! http://robotvera.com' // TODO: parse links: .match(/http.?:\/\/\w*/g)
        },
        {
            delay: 3000,
            content: 'This was interesting ?',
            actions: [
                {
                    text: 'Yes',
                    link: 'thanks'
                },
                {
                    text: 'No',
                    link: 'sadEnd'
                }
            ]
        }
    ],
    thanks: [
        {
            content: 'Thanks! Hope you enjoyed.',
            redirect: 'end'
        }
    ],
    sadEnd: [
        {
            content: 'So sad =_(',
            redirect: 'end'
        }
    ],
    end: [
        {
            content: 'Goodbye!'
        }
    ]
}
