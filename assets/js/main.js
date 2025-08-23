document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // لو الضغط على # فقط (مثل # أو #_) نرجع
      if (!targetId || targetId === '#' || targetId === '#_') {
          return; // سلوك عادي
      }

      // نبحث عن العنصر المستهدف
      const targetElement = document.querySelector(targetId);

      // تأكد أن العنصر موجود وله كلاس tab-pane
      if (targetElement && targetElement.classList.contains('tab-pane')) {
          e.preventDefault(); // نمنع السلوك الطبيعي فقط لو ده تاب

          // إزالة active من كل التبز
          document.querySelectorAll('.nav-link').forEach(tab => {
              tab.classList.remove('active');
          });

          // تفعيل التب اللي يشير للـ targetId
          const correspondingTab = document.querySelector(`[data-bs-target="${targetId}"]`);
          if (correspondingTab) {
              correspondingTab.classList.add('active');
          }

          // إزالة show و active من كل tab-pane
          document.querySelectorAll('.tab-pane').forEach(pane => {
              pane.classList.remove('show', 'active');
          });

          // إضافة show و active للتاب المستهدف
          targetElement.classList.add('show', 'active');

          // سكروول ناعم (اختياري)
          window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
          });
      }
      // لو ما كانش tab-pane، نسمح بالسلوك الطبيعي (مثل القفز للقسم)
      // لا حاجة لـ preventDefault في الحالة دي
  });
});
// function handleSubmit(e, sheet) {
//   e.preventDefault();
//   let name, phone;
//   let nameInput, phoneInput; // Keep references to the input elements
//   // Select inputs based on sheet and get their values + references
//   if (sheet === "tajcity") {
//     nameInput = document.getElementById("name_tajcity");
//     phoneInput = document.getElementById("phone_tajcity");
//     name = nameInput.value;
//     phone = phoneInput.value;
//   }
//   else if (sheet === "talala") {
//     nameInput = document.getElementById("name_talala");
//     phoneInput = document.getElementById("phone_talala");
//     name = nameInput.value;
//     phone = phoneInput.value;
//   }
//   else if (sheet === "thebutterfly") {
//     nameInput = document.getElementById("name_thebutterfly");
//     phoneInput = document.getElementById("phone_thebutterfly");
//     name = nameInput.value;
//     phone = phoneInput.value;
//   }
//   else if (sheet === "sarai") {
//     nameInput = document.getElementById("name_sarai");
//     phoneInput = document.getElementById("phone_sarai");
//     name = nameInput.value;
//     phone = phoneInput.value;
//   }
//   else if (sheet === "mnhd all") {
//     nameInput = document.getElementById("name_sheet1");
//     phoneInput = document.getElementById("phone_sheet1");
//     name = nameInput.value;
//     phone = phoneInput.value;
//   }
//   else {
//     showAlert("Unknown city/sheet: " + sheet, "danger");
//     return;
//   }
//   const scriptURL = "https://script.google.com/macros/s/AKfycby5io5W_E8_PHm9XkFC1JqX7LXiNTrNZMSe9Wnb9Jy38GyLxU6N4iSvjv2nb5Od120L/exec";

//   console.log("Submitting:", name, phone, sheet); // ✅ Should now show real values
//   // Show progress bar
//   const progressContainer = document.getElementById("progressContainer");
//   progressContainer.classList.remove("d-none");
//   // Create form data
//   const formData = new FormData();
//   formData.append('Name', name);
//   formData.append('Phone', phone);
//   formData.append('Compound', sheet); 

//   fetch(scriptURL, {
//     method: 'POST',
//     mode:"no-cors",
//     body: formData
//   })
//   .then(response => response.text())
//   .then(text => {
//     if (nameInput) nameInput.value = "";
//     if (phoneInput) phoneInput.value = "";
//     showAlert("شكراً لك! تم إرسال بياناتك بنجاح.", "success");
//     window.location.href = 'thank_you.html';

//   })
//   .catch(error => {
//     showAlert("حدث خطأ، برجاء المحاولة مرة أخرى.", "danger");
//   })  .finally(() => {
//     // Hide progress bar after success or error
//     progressContainer.classList.add("d-none");
//   });
// }

// Reusable function to show Bootstrap alert
async function handleSubmit(e, sheet) {
  e.preventDefault();

  let name, phone;
  let nameInput, phoneInput;

  // Select inputs based on sheet
  if (sheet === "tajcity") {
    nameInput = document.getElementById("name_tajcity");
    phoneInput = document.getElementById("phone_tajcity");
    name = nameInput.value;
    phone = phoneInput.value;
  } else if (sheet === "talala") {
    nameInput = document.getElementById("name_talala");
    phoneInput = document.getElementById("phone_talala");
    name = nameInput.value;
    phone = phoneInput.value;
  } else if (sheet === "thebutterfly") {
    nameInput = document.getElementById("name_thebutterfly");
    phoneInput = document.getElementById("phone_thebutterfly");
    name = nameInput.value;
    phone = phoneInput.value;
  } else if (sheet === "sarai") {
    nameInput = document.getElementById("name_sarai");
    phoneInput = document.getElementById("phone_sarai");
    name = nameInput.value;
    phone = phoneInput.value;
  } else if (sheet === "mnhd all") {
    nameInput = document.getElementById("name_sheet1");
    phoneInput = document.getElementById("phone_sheet1");
    name = nameInput.value;
    phone = phoneInput.value;
  } else {
    showAlert("Unknown city/sheet: " + sheet, "danger");
    return;
  }

  // Validate inputs
  if (!name || !phone) {
    showAlert("الرجاء إدخال الاسم ورقم الهاتف.", "warning");
    return;
  }

  // Show progress bar
  const progressContainer = document.getElementById("progressContainer");
  progressContainer.classList.remove("d-none");

  // Send to your PHP backend
  try {
    const response = await fetch('../../submit-sheet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: name,
        phone: phone,
        compound: sheet
      })
    });

    const result = await response.json();

    if (result.success) {
      nameInput.value = "";
      phoneInput.value = "";
      showAlert("شكراً لك! تم إرسال بياناتك بنجاح.", "success");
      setTimeout(() => {
        window.location.href = 'thank_you.html';
      }, 1000);
    } else {
      throw new Error(result.error || "Submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("حدث خطأ، برجاء المحاولة مرة أخرى.", "danger");
  } finally {
    progressContainer.classList.add("d-none");
  }
}
function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");

  // Clear any existing alerts
  while (alertContainer.firstChild) {
    alertContainer.firstChild.remove();
  }

  if (!message || !type) return;

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    ${message}
  `;

  alertContainer.appendChild(alertDiv);

  // Trigger reflow to enable transition
  void alertDiv.offsetWidth;

  // Trigger fade-in
  alertDiv.classList.add("show");

  // Auto-close after 10 seconds
  const AUTO_CLOSE_DELAY = 10000;
    // This runs AFTER the fade-out animation completes
    if (type === "success") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  setTimeout(() => {
    const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
    bsAlert.close(); // Starts fade-out
  }, AUTO_CLOSE_DELAY);

  // ✅ Listen for when Bootstrap finishes removing the alert

}
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();