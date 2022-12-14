const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Witcher chill world 01',
        artist: 'Geralt of Rivia',
    },
    {
        name: 'jacinto-2',
        displayName: 'Witcher chill world 02',
        artist: 'Geralt of Rivia',
    },
    {
        name: 'jacinto-3',
        displayName: 'Witcher chill world 03',
        artist: 'Geralt of Rivia'
    }
]


//Check if playing
let isPlaying = false

//Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}
//Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//PLay or pause event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM

function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.png`
}

//CUrrent song
let songIndex = 0

//Previous song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

//Next song
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}


//On Load - select first song
loadSong(songs[songIndex])

//Update progress bar and time

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        //UPdate progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //delay switching duration element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

//set progress bar

function setProgressBar(e) {
    const width = this.clientWidth
    console.log('width', width)
    const clickX = e.offsetX
    console.log('clickx', clickX)
    const { duration } = music
    console.log('clickx/width', clickX / width)
    console.log('duration', duration)
    console.log((clickX / width) * duration)
    music.currentTime = (clickX / width) * duration

}

//Event listeners for buttons

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)