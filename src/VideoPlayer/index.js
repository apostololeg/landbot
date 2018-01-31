import { bind } from 'decko'
import { createElement } from '../utils.js'

import Spinner from '../Spinner'
import './VideoPlayer.styl'

class VideoPlayer {
    constructor(props) {
        this.props = props

        this.render()
        this.loadYoutubAPI()
            .then(() => {
                this.activate()
                this.updatePreviewControl()
            })
    }

    isAPIReady() {
        return window.YT
    }

    loadYoutubAPI() {
        if (this.isAPIReady()) {
            return Promise.resolve()
        }

        const script = createElement({
            tag: 'script',
            attrs: {
                src: 'https://www.youtube.com/player_api'
            }
        });

        document.body.append(script)

        return new Promise(resolve => window.onYouTubePlayerAPIReady = resolve)
    }

    @bind activate() {
        this._video = this.renderPlayer()

        document.body.append(this._video)
        this.bindEsc()
    }

    @bind deactivate() {
        this._video.remove()
        this.unbindEsc()
    }

    bindEsc() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    unbindEsc() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    @bind onKeyDown({ key }) {
        if (key === 'Escape') {
            this.deactivate()
        }
    }

    renderPreview() {
        const { youtubeID } = this.props

        this._preview = createElement({
            className: 'VideoPlayer__preview',
            attrs: {
                style: `background-image:
                    url(https://img.youtube.com/vi/${youtubeID}/mqdefault.jpg)`
            }
        })

        this.updatePreviewControl()

        return this._preview
    }

    getPreviewControl() {
        if (!this.isAPIReady()) {
            return (new Spinner()).domElem
        }

        const playButton = createElement({ className: 'VideoPlayer__play' })

        playButton.onclick = this.activate

        return playButton
    }

    updatePreviewControl() {
        const control = this.getPreviewControl()

        this._preview.innerHTML = ''
        this._preview.append(control)
    }

    renderVideo() {
        const { youtubeID } = this.props

        const params = {
            autoplay: 1,
            enablejsapi: 1,
            disablekb: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0
        }
        const paramsList = Object.keys(params)
            .map(name => `${name}=${params[name]}`)
            .join('&')

        return createElement({
            className: 'VideoPlayer__video',
            tag: 'iframe',
            attrs: {
                src: `https://www.youtube.com/embed/${youtubeID}?${paramsList}`
            }
        })
    }

    renderPlayer() {
        const video = this.renderVideo()
        const fsInner = createElement({ className: 'VideoPlayer__fullscreen-inner' })
        const pauseButton = createElement({ className: 'VideoPlayer__pause' })

        this.fs = createElement({ className: 'VideoPlayer__fullscreen' })
        this._player = new YT.Player(video, {
            events: {
                onStateChange: this.onStateChange
            }
        });

        pauseButton.addEventListener('click', this.togglePause)
        this.fs.addEventListener('click', this.deactivate)

        fsInner.append(video)
        fsInner.append(pauseButton)
        this.fs.append(fsInner)

        return this.fs
    }

    @bind togglePause(e) {
        const p = this._player
        const state = p.getPlayerState()

        state === 1
            ? p.pauseVideo()
            : p.playVideo()

        e.stopPropagation()
    }

    @bind onStateChange({ data }) {
        if (data === 2) {
            this.fs.classList.add('VideoPlayer_paused')
        } else {
            this.fs.classList.remove('VideoPlayer_paused')
        }
    }

    render() {
        this.domElem = createElement({
            className: 'VideoPlayer',
            content: this.renderPreview()
        })
    }
}

export default VideoPlayer
