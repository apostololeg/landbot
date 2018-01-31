export default {
    initial: [
        {
            text: 'Hi, I\'m Robot Vera!'
        },
        {
            text: 'Would you like to ... ?',
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
            text: 'Vera is ...'
        },
        {
            text: 'D u want to try ?',
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
            text: 'Let\'s try! http://robotvera.com' // TODO: parse links: .match(/http.?:\/\/\w*/g)
        },
        {
            delay: 3000,
            text: 'This was interesting ?',
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
            text: 'Thanks! Hope you enjoyed.',
            redirect: 'end'
        }
    ],
    sadEnd: [
        {
            text: 'So sad =_(',
            redirect: 'end'
        }
    ],
    end: [
        {
            text: 'Goodbye!'
        }
    ]
}
