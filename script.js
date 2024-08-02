let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let section = document.querySelector('section');
let navLinks = document.querySelector('header nava');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            })
        }
    })
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
}

function radial_animate() {
    $('svg.radial-progress').each(function (index, value) {
        $(this).find('circle.bar--animated').removeAttr('style');
        // Get element in Viewport
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            var percent = $(value).data('countervalue');
            var radius = $(this).find('circle.bar--animated').attr('r');
            var circumference = 2 * Math.PI * radius;
            var strokeDashOffset = circumference - ((percent * circumference) / 100);
            $(this).find('circle.bar--animated').css({
                'stroke-dasharray': circumference,
                'stroke-dashoffset': circumference
            }).animate({ 'stroke-dashoffset': strokeDashOffset }, 2800);
        }
    });
}
// Skill
// To check If it is in Viewport 
var $window = $(window);
function check_if_in_view() {
    $('.countervalue').each(function () {
        if ($(this).hasClass('start')) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).removeClass('start');
                $('.countervalue').text();
                var myNumbers = $(this).text();
                if (myNumbers == Math.floor(myNumbers)) {
                    $(this).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2800,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + '%');
                        }
                    });
                } else {
                    $(this).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2800,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(now.toFixed(2) + '$');
                        }
                    });
                }

                radial_animate();
            }
        }
    });
}

$window.on('scroll', check_if_in_view);
$window.on('load', check_if_in_view);

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = 'conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)';
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// end Skill


window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

});


document.getElementById('download-cv').addEventListener('click', function (event) {
    event.preventDefault(); // ป้องกันการดำเนินการเริ่มต้นของลิงก์
    var url = this.href;
    // เปิดแท็บใหม่
    window.open(url, '_blank');

    // สร้างลิงก์ใหม่เพื่อดาวน์โหลดไฟล์
    var a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

fetch('home.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("home");
    data.forEach(function (item) {
        var section = document.createElement('section');
        var h3 = document.createElement('h3');
        var h1 = document.createElement('h1');
        var h3Text = document.createElement('h3');
        var p = document.createElement('p');

        h3.textContent = item.h3;
        h1.textContent = item.h1;
        h3Text.textContent = item['h3-text'];
        h3Text.classList.add('text-animation');
        p.textContent = item.p;

        // Apply dynamic styles or classes based on the JSON data
        if (item.class) {
            section.classList.add(item.class);
        }
        if (item.style) {
            Object.keys(item.style).forEach(function (key) {
                section.style[key] = item.style[key];
            });
        }

        section.appendChild(h3);
        section.appendChild(h1);
        section.appendChild(h3Text);
        section.appendChild(p);

        mainContainer.appendChild(section);
    });
}

