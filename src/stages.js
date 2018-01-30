export default {
    initial: [
        {
            text: 'Hi, I\'m Robot Vera!'
        },
        {
            text: 'Would you like to ... ?',
            actions: [
                {
                    text: 'Yes, show me!',
                    link: 'about'
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
                    text: 'Try now!',
                    link: 'try'
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
            text: 'This was interesting ?',
            actions: [
                {
                    text: 'Yes!',
                    link: 'end'
                },
                {
                    text: 'No',
                    link: 'sadEnd'
                }
            ]
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
