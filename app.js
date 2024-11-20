let favBtn = document.querySelectorAll(".sng-fav");
let progressTime = document.querySelector(".curr-time");
let totTime = document.querySelector(".tot-time");
const songsList = document.getElementsByClassName("songs");
let curIdx = 0;
const audio = new Audio();
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let volume = document.getElementById("volume");
let libFav = document.querySelector(".sng-like");
let allRmvBtns = document.getElementsByClassName("remove-btn");
let searchBtns = document.querySelectorAll(".search-page-btn");
let homeBtns = document.querySelectorAll(".home-page-btn");

Array.from(allRmvBtns).forEach((item) => {
    item.addEventListener("click",function() {
        item.parentElement.classList.add("invi");
    })
});

for(searchBtn of searchBtns){
    searchBtn.addEventListener("click", function() {
        this.href = "search.html";
    });
}

for(homeBtn of homeBtns){
    homeBtn.addEventListener("click", function() {
        this.href = "index.html";
    });
}

libFav.addEventListener("click", () => {
    if(libFav.style.color == ""){
        libFav.classList.add("fa-solid");
        libFav.classList.remove("fa-regular");
        libFav.style.color = "#1ed760";
    }else{
        libFav.style.color = "";
        libFav.classList.remove("fa-solid");
        libFav.classList.add("fa-regular");
    }
});

for(let ele of favBtn){
    ele.addEventListener("click", changeColor);
}

function changeColor() {
    if(this.style.color == ""){
        this.classList.add("fa-solid");
        this.classList.remove("fa-regular");
        this.style.color = "#1ed760";
    }else{
        this.style.color = "";
        this.classList.remove("fa-solid");
        this.classList.add("fa-regular");
    }
}

Array.from(songsList).forEach((item, idx) => {
    let check = 0;
    item.addEventListener("click", () => {
        if(check == 0){
            for(btn of songsList){
                btn.childNodes[1].childNodes[1].childNodes[5].classList.add("invi");   
                btn.childNodes[1].childNodes[1].childNodes[3].classList.remove("invi");
                btn.childNodes[1].childNodes[1].childNodes[1].style.color = "";
                btn.childNodes[1].childNodes[3].childNodes[1].style.color = "";
    
            }
            curIdx = idx;
            songSrc(curIdx);
            item.childNodes[1].childNodes[1].childNodes[3].classList.add("invi");
            item.childNodes[1].childNodes[1].childNodes[5].classList.remove("invi");
            item.childNodes[1].childNodes[1].childNodes[1].style.color = "#1ed760";
            item.childNodes[1].childNodes[3].childNodes[1].style.color = "#1ed760";
            playSong(); 
            check = 1;
        }else{
            item.childNodes[1].childNodes[1].childNodes[5].classList.add("invi");
            item.childNodes[1].childNodes[1].childNodes[3].classList.remove("invi");
            item.childNodes[1].childNodes[1].childNodes[1].style.color = "";
            item.childNodes[1].childNodes[3].childNodes[1].style.color = "";
            pauseSong(); 
            check = 0;
        }
    });
});
let extra;
const songSrc = (idx) => {
    audio.src = songsList[idx].getAttribute("data-src");
    Array.from(songsList).forEach((item, i) => {
        if(item.getAttribute("data-src") === songsList[idx].getAttribute("data-src")){
           extra = item;
        }
    });
} 

const playSong = () => {
    audio.play();
    play.classList.add("invi");
    pause.classList.remove("invi");
    extra.childNodes[1].childNodes[1].childNodes[3].classList.add("invi");
    extra.childNodes[1].childNodes[1].childNodes[5].classList.remove("invi");
    extra.childNodes[1].childNodes[1].childNodes[1].style.color = "#1ed760";
    extra.childNodes[1].childNodes[3].childNodes[1].style.color = "#1ed760";
}

const pauseSong = () => {
    audio.pause();
    play.classList.remove("invi");
    pause.classList.add("invi");
    extra.childNodes[1].childNodes[1].childNodes[5].classList.add("invi");
    extra.childNodes[1].childNodes[1].childNodes[3].classList.remove("invi");
    extra.childNodes[1].childNodes[1].childNodes[1].style.color = "";
    extra.childNodes[1].childNodes[3].childNodes[1].style.color = "";
}

let nextSong = () => {
    extra.childNodes[1].childNodes[1].childNodes[5].classList.add("invi");
    extra.childNodes[1].childNodes[1].childNodes[3].classList.remove("invi");
    extra.childNodes[1].childNodes[1].childNodes[1].style.color = "";
    extra.childNodes[1].childNodes[3].childNodes[1].style.color = "";
    if(curIdx === songsList.length -1){
        curIdx = 0;
    }else{
        ++curIdx;
    }
    songSrc(curIdx);
    playSong();
}

let prevSong = () => {
    extra.childNodes[1].childNodes[1].childNodes[5].classList.add("invi");
    extra.childNodes[1].childNodes[1].childNodes[3].classList.remove("invi");
    extra.childNodes[1].childNodes[1].childNodes[1].style.color = "";
    extra.childNodes[1].childNodes[3].childNodes[1].style.color = "";
    if(curIdx === 0){
        curIdx = songsList.length -1;
    }else{
        --curIdx;
    }
    songSrc(curIdx);
    playSong();
}

songSrc(curIdx);

audio.addEventListener("timeupdate", () => {
    let totalTime = Math.floor(audio.duration / 60);
    let curTime = audio.currentTime;
    progressTime.innerText = curTime;
    totTime.innerText = totalTime;
});

const changeVolume = () => {
    audio.volume = volume.value;
}
