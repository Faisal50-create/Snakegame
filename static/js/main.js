(function() {
  'use strict';

  // --- Hamburger Toggle ---
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
      });
    });
  }
  

  // --- Social Sharing ---
  
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent('Play Snake Game');

  var shareUrls = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
    twitter: 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url,
    whatsapp: 'https://api.whatsapp.com/send?text=' + title + '%20' + url,
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
    reddit: 'https://www.reddit.com/submit?url=' + url + '&title=' + title
  };

  document.querySelectorAll('[data-share]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var platform = btn.getAttribute('data-share');
      var shareUrl = shareUrls[platform];
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=500');
      }
    });
  });

  // --- Copy Link ---
  var copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var currentUrl = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl);
      } else {
        var input = document.createElement('input');
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      var icon = copyBtn.querySelector('i');
      icon.className = 'fas fa-check';
      setTimeout(function() {
        icon.className = 'fas fa-link';
      }, 2000);
    });
  }

  // --- Active nav link ---
  document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      document.querySelectorAll('.nav-menu a').forEach(function(l) {
        l.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // --- MOBILE PLACEHOLDER: Play Button Logic ---
  var playBtn = document.getElementById('playBtn');
  var redirectUrl = 'https://www.snakegame.net/game/1.3/index.html';
  var timeoutId = null;

  if (playBtn) {
    function startRedirect() {
      if (playBtn.classList.contains('loading')) {
        return;
      }

      playBtn.classList.add('loading');
      playBtn.disabled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(function() {
        window.location.href = redirectUrl;
      }, 5000);
    }

    playBtn.addEventListener('click', function(e) {
      e.preventDefault();
      startRedirect();
    });

    var placeholder = document.getElementById('mobilePlaceholder');
    if (placeholder) {
      placeholder.addEventListener('click', function(e) {
        if (e.target.closest('.play-btn')) {
          return;
        }
        startRedirect();
      });
    }
  }

  // --- Screen size detection ---
// ===== Desktop / Mobile Game Loader =====

var GAME_URL = "https://www.snakegame.net/game/1.3/index.html";

function loadGame() {

    var container = document.getElementById("iframeContainer");

    if (!container) {
        return;
    }

    // Mobile
    if (window.innerWidth < 880) {

        container.innerHTML = "";

        return;
    }

    // Desktop
    if (!document.getElementById("gameIframe")) {

        var iframe = document.createElement("iframe");

        iframe.id = "gameIframe";
        iframe.src = GAME_URL;
        iframe.title = "Snake Game - Play Classic Snake Online";
        iframe.setAttribute("allow", "autoplay; fullscreen");
        iframe.setAttribute("loading", "eager");

        container.appendChild(iframe);
    }
}

document.addEventListener("DOMContentLoaded", loadGame);

window.addEventListener("resize", function () {
    loadGame();
});j                  

})();