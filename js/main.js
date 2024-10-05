jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2500,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect
    revealDuration = 600,
    revealAnimationDelay = 1500;

  initHeadline();

  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($(".cd-headline.letters").find("b"));
    //initialise headline animation
    animateHeadline($(".cd-headline"));
  }
  
  function singleLetters($words) {
    $words.each(function () {
      var word = $(this),
        letters = word.text().split(""),
        selected = word.hasClass("is-visible");
      for (i in letters) {
        if (word.parents(".rotate-2").length > 0)
          letters[i] = "<em>" + letters[i] + "</em>";
        letters[i] = selected
          ? '<i class="in">' + letters[i] + "</i>"
          : "<i>" + letters[i] + "</i>";
      }
      var newLetters = letters.join("");
      word.html(newLetters).css("opacity", 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function () {
      var headline = $(this);

      //trigger animation
      setTimeout(function () {
        hideWord(headline.find(".is-visible").eq(0));
      }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if ($word.parents(".cd-headline").hasClass("type")) {
      var parentSpan = $word.parent(".cd-words-wrapper");
      parentSpan.addClass("selected").removeClass("waiting");
      setTimeout(function () {
        parentSpan.removeClass("selected");
        $word
          .removeClass("is-visible")
          .addClass("is-hidden")
          .children("i")
          .removeClass("in")
          .addClass("out");
      }, selectionDuration);
      setTimeout(function () {
        showWord(nextWord, typeLettersDelay);
      }, typeAnimationDelay);
    } else if ($word.parents(".cd-headline").hasClass("letters")) {
      var bool =
        $word.children("i").length >= nextWord.children("i").length
          ? true
          : false;
      hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word
        .parents(".cd-words-wrapper")
        .animate({ width: "2px" }, revealDuration, function () {
          switchWord($word, nextWord);
          showWord(nextWord);
        });
    } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
      $word.parents(".cd-words-wrapper").removeClass("is-loading");
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, barAnimationDelay);
      setTimeout(function () {
        $word.parents(".cd-words-wrapper").addClass("is-loading");
      }, barWaiting);
    } else {
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if ($word.parents(".cd-headline").hasClass("type")) {
      showLetter($word.find("i").eq(0), $word, false, $duration);
      $word.addClass("is-visible").removeClass("is-hidden");
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word
        .parents(".cd-words-wrapper")
        .animate({ width: $word.width() + 10 }, revealDuration, function () {
          setTimeout(function () {
            hideWord($word);
          }, revealAnimationDelay);
        });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass("in").addClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function () {
        hideWord(takeNext($word));
      }, animationDelay);
    }

    if ($letter.is(":last-child") && $("html").hasClass("no-csstransitions")) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass("in").removeClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents(".cd-headline").hasClass("type")) {
        setTimeout(function () {
          $word.parents(".cd-words-wrapper").addClass("waiting");
        }, 200);
      }
      if (!$bool) {
        setTimeout(function () {
          hideWord($word);
        }, animationDelay);
      }
    }
  }

  function takeNext($word) {
    return !$word.is(":last-child")
      ? $word.next()
      : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return !$word.is(":first-child")
      ? $word.prev()
      : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass("is-visible").addClass("is-hidden");
    $newWord.removeClass("is-hidden").addClass("is-visible");
  }
});

// Tilt Effect

let el = document.getElementById("tilt");

const height = el.clientHeight;
const width = el.clientWidth;

el.addEventListener("mousemove", handleMove);

function handleMove(e) {
  const xVal = e.layerX;
  const yVal = e.layerY;

  const yRotation = 20 * ((xVal - width / 2) / width);

  const xRotation = -20 * ((yVal - height / 2) / height);

  const string =
    "perspective(500px) scale(1.1) rotateX(" +
    xRotation +
    "deg) rotateY(" +
    yRotation +
    "deg)";

  el.style.transform = string;
}

el.addEventListener("mouseout", function () {
  el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
});

el.addEventListener("mousedown", function () {
  el.style.transform = "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
});

el.addEventListener("mouseup", function () {
  el.style.transform = "perspective(500px) scale(0.5) rotateX(0) rotateY(0)";
});




const experienceList = document.getElementById('experience-list');
const addExperienceBtn = document.getElementById('add-experience-btn');
const experienceFormModal = document.getElementById('experience-form-modal');
const closeFormBtn = document.getElementById('close-form');
const experienceForm = document.getElementById('experience-form');

let editMode = false;
let editExperienceId = null;

// Function to add event listeners to delete buttons
function addDeleteButtonListener(button) {
    button.addEventListener('click', (event) => {
        const experienceId = button.getAttribute('data-id');
        experienceList.removeChild(document.getElementById(`experience-${experienceId}`)); 
    });
}

// Event listener for the Add Experience button
addExperienceBtn.addEventListener('click', () => {
    experienceFormModal.style.display = 'block';
    experienceForm.reset(); 
    editMode = false; 
});

// Event listener for closing the form modal
closeFormBtn.addEventListener('click', () => {
    experienceFormModal.style.display = 'none';
});

// Event listener for the experience form submission
experienceForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const companyUrl = document.getElementById('company-url').value;
    const dates = document.getElementById('dates').value;
    const location = document.getElementById('location').value;

    if (editMode) {
        const experienceItem = document.getElementById(`experience-${editExperienceId}`);
        experienceItem.innerHTML = `
            <strong>${jobTitle}</strong> at <a href="${companyUrl}" target="_blank">${companyName}</a>
            <div>${dates} | ${location}</div>
            <button class="btn btn-primary edit-btn" data-id="${editExperienceId}">Edit</button>
            <button class="btn btn-danger delete-btn" data-id="${editExperienceId}">Delete</button>
        `;
        addDeleteButtonListener(experienceItem.querySelector('.delete-btn')); // Re-add listener
    } else {
        const newExperienceId = experienceList.children.length + 1; 
        const newExperienceItem = document.createElement('li');
        newExperienceItem.className = 'list-group-item';
        newExperienceItem.id = `experience-${newExperienceId}`;
        newExperienceItem.innerHTML = `
            <strong>${jobTitle}</strong> at <a href="${companyUrl}" target="_blank">${companyName}</a>
            <div>${dates} | ${location}</div>
            <button class="btn btn-primary edit-btn" data-id="${newExperienceId}">Edit</button>
            <button class="btn btn-danger delete-btn" data-id="${newExperienceId}">Delete</button>
        `;
        experienceList.appendChild(newExperienceItem);
        addDeleteButtonListener(newExperienceItem.querySelector('.delete-btn')); // Add listener
    }

    experienceFormModal.style.display = 'none'; 
});

// Event listener for edit and delete actions
experienceList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const experienceId = event.target.getAttribute('data-id');
        const experienceItem = document.getElementById(`experience-${experienceId}`);
        document.getElementById('job-title').value = experienceItem.querySelector('strong').textContent;
        document.getElementById('company-name').value = experienceItem.querySelector('a').textContent;
        document.getElementById('company-url').value = experienceItem.querySelector('a').href;
        const [dates, location] = experienceItem.querySelector('div').textContent.split('|').map(item => item.trim());
        document.getElementById('dates').value = dates;
        document.getElementById('location').value = location;
        editMode = true; 
        editExperienceId = experienceId; 
        experienceFormModal.style.display = 'block'; 
    }

    if (event.target.classList.contains('delete-btn')) {
        const experienceId = event.target.getAttribute('data-id');
        experienceList.removeChild(document.getElementById(`experience-${experienceId}`)); 
    }
});

// Add delete listener to initial experience item (if exists)
const initialExperienceItem = document.getElementById('experience-1');
if (initialExperienceItem) {
    const initialDeleteButton = initialExperienceItem.querySelector('.delete-btn');
    addDeleteButtonListener(initialDeleteButton); // Add listener for initial item
}



addExperienceBtn.addEventListener('click', () => {
  console.log("Add Experience button clicked"); // Debugging message
  experienceFormModal.style.display = 'block';
  experienceForm.reset();
  editMode = false;
});