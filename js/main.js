jQuery(document).ready(function($) {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAMNq2tQVQR3U30K82Dy77i8jHbElkEsTU",
        authDomain: "portfolio-d291f.firebaseapp.com",
        databaseURL: "https://portfolio-d291f.firebaseio.com",
        projectId: "portfolio-d291f",
        storageBucket: "portfolio-d291f.appspot.com",
        messagingSenderId: "922980179949"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database

    var name;
    var email;
    var subject;
    var phone;
    var message;

    // Capture Button Click
    $("#form-submit").on("click", function() {
        // Don't refresh the page!
        event.preventDefault();

        name = $('#name').val().trim();
        email = $('#email').val().trim();
        subject = $('#subject').val().trim();
        phone = $('#phone').val().trim();
        message = $('#message').val().trim();

        firebase.database().ref().push({
            nameKey: name,
            emailKey: email,
            subjectKey: subject,
            phoneKey: phone,
            messageKey: message
        });
        $('.form-control').val('');
    });

    firebase.database().ref().on('child_added', function(snapshot) {
            console.log(snapshot.val());
            // console.log(snapshot.val().nameKey);
            // console.log(snapshot.val().emailKey);
            // console.log(snapshot.val().phoneKey);
            // console.log(snapshot.val().subjectKey);
            // console.log(snapshot.val().messageKey);

            $('#name').text(snapshot.val().nameKey);
            $('#email').text(snapshot.val().emailKey);
            $('#subject').text(snapshot.val().subjectKey);
            $('#phone').text(snapshot.val().phoneKey);
            // $('#message').text(snapshot.val().messageKey);
        },
        // Create Error Handling
        function(errorObject) {
            console.log("Error Occured: " + errorObject);
        }
    );

    'use strict';

    $('.imageGallery1 a').simpleLightbox();


    var owl = $("#owl-portfolio");

    owl.owlCarousel({

        pagination: true,
        paginationNumbers: false,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        items: 4, //10 items above 1000px browser width
        itemsDesktop: [1000, 4], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 3], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option

    });


    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    })


    /************** Toggle *********************/
    // Cache selectors
    var lastId,
        topMenu = $(".menu-first"),
        topMenuHeight = 80,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {

            if ($(this).hasClass('external')) {
                return;
            }

            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 750);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });



    $(window).scroll(function() {
        $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
    });



    $('a[href="#top"]').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });


    $('.toggle-menu').click(function() {
        $('.menu-first').toggleClass('show');
        // $('.menu-first').slideToggle();
    });

    $('.menu-first li a').click(function() {
        $('.menu-first').removeClass('show');
    });


    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 79 }, 500, 'linear');
    });

    $("#ts").on("click", function() {
        if ($("#ts").style.display == "none") {
            $("#ts").style.display = 'block';
            $("#boot").style.display = 'none';
        }
    });
});