// گرفتن ارجاع به عناصر HTML
const video = document.getElementById('video'); // عنصر ویدئو
const playPauseBtn = document.getElementById('playPauseBtn'); // دکمه پخش/توقف
const volumeSlider = document.getElementById('volumeSlider'); // اسلایدر تنظیم حجم صدا
const muteBtn = document.getElementById('muteBtn'); // دکمه بی‌صدا کردن
const progressBar = document.getElementById('progressBar'); // اسلایدر پیشرفت ویدئو
const currentTimeElement = document.getElementById('currentTime'); // نمایش زمان فعلی پخش
const totalTimeElement = document.getElementById('totalTime'); // نمایش کل زمان ویدئو

// تعیین منبع ویدئو
video.src = '7025d8d2c520f9eb284a62722546a37f14687600-720p.mov'; 

// رویداد کلیک دکمه پخش/توقف
playPauseBtn.addEventListener('click', () => {
    if (video.paused) { // اگر ویدئو متوقف است
        video.play(); // پخش ویدئو
        playPauseBtn.textContent = '❚❚'; // تغییر آیکون به توقف
    } else {
        video.pause(); // توقف ویدئو
        playPauseBtn.textContent = '▶'; // تغییر آیکون به پخش
    }
});

// رویداد تغییر مقدار اسلایدر حجم صدا
volumeSlider.addEventListener('input', (event) => {
    video.volume = event.target.value; // تنظیم حجم ویدئو بر اساس مقدار اسلایدر
});

// رویداد کلیک دکمه بی‌صدا کردن
muteBtn.addEventListener('click', () => {
    video.muted = !video.muted; // تغییر وضعیت بی‌صدا
    muteBtn.textContent = video.muted ? '🔇' : '🔊'; // تغییر آیکون بر اساس وضعیت بی‌صدا
});

// رویداد به‌روزرسانی زمان پخش ویدئو
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100; // محاسبه درصد پیشرفت
    progressBar.value = progress; // تنظیم مقدار اسلایدر پیشرفت

    const currentTime = formatTime(video.currentTime); // فرمت زمان فعلی
    const totalTime = formatTime(video.duration); // فرمت کل زمان
    currentTimeElement.textContent = currentTime; // نمایش زمان فعلی
    totalTimeElement.textContent = totalTime; // نمایش کل زمان
});

// رویداد تغییر مقدار اسلایدر پیشرفت ویدئو (جابجایی موقعیت پخش)
progressBar.addEventListener('input', (event) => {
    const seekTime = (event.target.value / 100) * video.duration; // محاسبه زمان جدید بر اساس درصد
    video.currentTime = seekTime; // تنظیم موقعیت پخش ویدئو
});

// رویداد پایان ویدئو
video.addEventListener('ended', () => {
    playPauseBtn.textContent = 'Play'; // تغییر متن دکمه به پخش پس از اتمام ویدئو
});

// تابع فرمت‌بندی زمان به دقیقه:ثانیه
function formatTime(time) {
    const minutes = Math.floor(time / 60); // محاسبه دقیقه
    const seconds = Math.floor(time % 60); // محاسبه ثانیه
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // بازگشت رشته فرمت شده
}
