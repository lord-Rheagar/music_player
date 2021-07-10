window.onload = () => {
    const song_img_el = document.querySelector('#song-image');
    const song_title_el = document.querySelector('#song-title');
    const song_artist_el = document.querySelector('#song-artist');
    const song_next_up_el = document.querySelector('#song-next-up');
    const progressBar = document.querySelector('#progress-bar'); 

    const play_btn = document.querySelector('#play-btn');
    const play_btn_icon = document.querySelector('#play-btn .play-icon');
    const prev_btn = document.querySelector('#prev-btn');
    const next_btn = document.querySelector('#next-btn');

    const audio_player = document.querySelector('#music-player');

    let current_song_index;
    let next_song_index;

    let songs = [
        {
            title: 'Somebody New',
            artist: 'RYYZN',
            song_path: 'music/somebody-new.mp3',
            img_path: 'images/song-1.jpg'
        },
        {
            title: 'On and on ft. Daniel Levi',
            artist: 'Cartoon',
            song_path:'music/on-n-on.mp3',
            img_path: 'images/song-2.jpg'
        },
        {
            title: 'Bohemian Rhasphody',
            artist: 'Queen',
            song_path: 'music/queen-bohemian_rhasphody.mp3',
            img_path: 'images/song-3.png'
        },

        {
            title: 'Jenny of Old Stones',
            artist: 'Florence',
            song_path: 'music/jenny_of_old_stones.mp3',
            img_path: 'images/song-4.jpg'
        },

        {
            title: 'La Isla Bonita',
            artist: 'Madonna',
            song_path: 'music/la_isla_bonita.mp3',
            img_path: 'images/song-5.jpg'
        },

        {
            title: 'Red Right Hand',
            artist: 'Nick Cave & The Bad Seeds',
            song_path: 'music/red_right_hand.mp3',
            img_path: 'images/song-6.jpg'
        },

        {
            title: 'If I had a Heart',
            artist: 'Fever Ray',
            song_path: 'music/if_i_had_a_heart.mp3',
            img_path: 'images/song-7.jpg'
        },


        {
            title: 'Rains Of Castamare',
            artist: 'Serj Tankian & Ramin Djawadi',
            song_path: 'music/the_rains_of castamare.mp3',
            img_path: 'images/song-8.jpg'
        },


        {
            title: 'Heilung Norupo',
            artist: 'SKALD',
            song_path: 'music/heilung_norupo.mp3',
            img_path: 'images/song-9.jpg'
        }


        


    ];

    play_btn.addEventListener('click', TogglePlaySong);
    next_btn.addEventListener('click', () => ChangeSong());
    prev_btn.addEventListener('click', () => ChangeSong(false));

    InitPlayer();

    function InitPlayer () {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
        UpdatePlayer();
    }
    
    function TogglePlaySong () {
        if (audio_player.paused) {
            audio_player.play();
            play_btn_icon.classList.remove('fa-play')
            play_btn_icon.classList.add('fa-pause');
        } else {
            audio_player.pause();
            play_btn_icon.classList.add('fa-play')
            play_btn_icon.classList.remove('fa-pause');
        }
    }
    
    function ChangeSong (next = true) {
        if (next) {
            current_song_index++;
            next_song_index = current_song_index + 1;

            if (current_song_index > songs.length - 1) {
                current_song_index = 0;
                next_song_index = current_song_index+1;
            }

            if (next_song_index > songs.length - 1) {
                next_song_index = 0;
            }
        } else {
            current_song_index--;
            next_song_index = current_song_index + 1;

            if (current_song_index < 0) {
                current_song_index = songs.length - 1;
                next_song_index = 0;
            }
        }

        UpdatePlayer();
        TogglePlaySong();
    }

    function UpdatePlayer() {
        let song = songs[current_song_index];

        song_img_el.style = "background-image: url('" + song.img_path + "');";
        song_title_el.innerText = song.title;
        song_artist_el.innerText = song.artist;

        song_next_up_el.innerText = songs[next_song_index].title + " by " + songs[next_song_index].artist;

        audio_player.src = song.song_path;
    }
    setInterval(updateProgressValue, 500);

    function updateProgressValue() {
        progressBar.max = audio_player.duration;
        progressBar.value = audio_player.currentTime;
        document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio_player.currentTime)));
        if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
            document.querySelector('.durationTime').innerHTML = "0:00";
        } else {
            document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio_player.duration)));
        }
    };

    function formatTime(seconds) {
        let min = Math.floor((seconds / 60));
        let sec = Math.floor(seconds - (min * 60));
        if (sec < 10){ 
            sec  = `0${sec}`;
        };
        return `${min}:${sec}`;
    };


    


    function changeProgressBar() {
        audio_player.currentTime = progressBar.value;
    };




}
