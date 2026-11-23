const backdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const toast = document.getElementById("toast");

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  backdrop.hidden = false;
}

function closeModal() {
  backdrop.hidden = true;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("modalClose").addEventListener("click", closeModal);
backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function courseModal(name, progress) {
  openModal(name, `
    <div class="lesson-track"><i style="width:${progress}%"></i></div>
    <p>${progress}% complete</p>
    <div class="modal-row"><div><strong>1. Introduction</strong><span>Completed</span></div><button class="modal-action success" data-action="lesson-complete">Review</button></div>
    <div class="modal-row"><div><strong>2. Core concepts</strong><span>Continue where you left off</span></div><button class="modal-action" data-action="lesson-continue">Continue lesson</button></div>
    <div class="modal-row"><div><strong>3. Final project</strong><span>Locked until lesson 2 is complete</span></div><button class="modal-action warning" data-action="locked">View project</button></div>
  `);
}

document.querySelectorAll(".course-card").forEach((card) => {
  card.querySelector("button").addEventListener("click", () => {
    const name = card.querySelector("h4").textContent;
    const progress = card.querySelector(".course-progress b").textContent.replace("%", "");
    courseModal(name, progress);
  });
});

document.querySelector(".primary").addEventListener("click", () => {
  openModal("Choose a learning path", `
    <div class="modal-row"><div><strong>Web Development</strong><span>HTML, CSS and JavaScript</span></div><button class="modal-action" data-course="Web Development">Start</button></div>
    <div class="modal-row"><div><strong>Data Science</strong><span>Statistics and data analysis</span></div><button class="modal-action" data-course="Data Science">Start</button></div>
    <div class="modal-row"><div><strong>Python Programming</strong><span>Build applications with Python</span></div><button class="modal-action" data-course="Python Programming">Start</button></div>
  `);
});

document.querySelector(".details").addEventListener("click", () => {
  openModal("Learning progress", `
    <div class="modal-row"><div><strong>Courses</strong><span>5 of 6 completed</span></div><b>83%</b></div>
    <div class="modal-row"><div><strong>Quizzes</strong><span>8 of 10 passed</span></div><b>80%</b></div>
    <div class="modal-row"><div><strong>Projects</strong><span>2 of 3 submitted</span></div><b>67%</b></div>
    <button class="modal-action" id="downloadReport">Download progress report</button>
  `);
});

function quizModal() {
  openModal("Python quick quiz", `
    <p>Which data structure stores key-value pairs?</p>
    <button class="quiz-option" data-answer="wrong">A list</button>
    <button class="quiz-option" data-answer="wrong">A tuple</button>
    <button class="quiz-option" data-answer="correct">A dictionary</button>
    <button class="quiz-option" data-answer="wrong">A set</button>
  `);
}

document.querySelector(".quick-grid .quiz").addEventListener("click", quizModal);

document.querySelector(".quick-grid .progress").addEventListener("click", () => document.querySelector(".details").click());

document.querySelector(".quick-grid .group").addEventListener("click", () => {
  openModal("Study Groups", `
    <div class="modal-row"><div><strong>Python Study Group</strong><span>12 members • Starts Saturday</span></div><button class="modal-action" data-group="Python Study Group">Join</button></div>
    <div class="modal-row"><div><strong>Web Project Team</strong><span>8 members • Online now</span></div><button class="modal-action" data-group="Web Project Team">Join</button></div>
  `);
});

document.querySelector(".quick-grid .resources").addEventListener("click", () => {
  openModal("Learning resources", `
    <div class="modal-row"><div><strong>Python cheat sheet</strong><span>PDF • 2.4 MB</span></div><button class="modal-action" data-resource="Python cheat sheet">Open</button></div>
    <div class="modal-row"><div><strong>Web Development guide</strong><span>Course handbook</span></div><button class="modal-action" data-resource="Web Development guide">Open</button></div>
    <div class="modal-row"><div><strong>Data Science formulas</strong><span>Reference notes</span></div><button class="modal-action" data-resource="Data Science formulas">Open</button></div>
  `);
});

document.querySelectorAll(".section-title button").forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.closest(".section-title").querySelector("h3").textContent.trim();
    if (title.includes("Achievements")) openModal("Achievements", `
      <div class="modal-row"><div><strong>Top Learner</strong><span>Level 1 • Earned this month</span></div><span>★</span></div>
      <div class="modal-row"><div><strong>Knowledge Explorer</strong><span>Completed 5 courses</span></div><span>▣</span></div>
      <div class="modal-row"><div><strong>Fast Learner</strong><span>Finished 3 lessons in one day</span></div><span>🚀</span></div>
      <div class="modal-row"><div><strong>Course Champion</strong><span>Earned with 90%+ score</span></div><span>♛</span></div>
    `);
    else if (title.includes("Upcoming Events")) openModal("Upcoming Events", `
      <div class="modal-row"><div><strong>Online Workshop</strong><span>Advanced Python • Today 4:00 PM</span></div><button class="modal-action" data-event="Workshop">Set reminder</button></div>
      <div class="modal-row"><div><strong>Assignment Deadline</strong><span>Web Project • Tomorrow 11:59 PM</span></div><button class="modal-action" data-event="Assignment">Set reminder</button></div>
      <div class="modal-row"><div><strong>Study Group Session</strong><span>Sat, 24 May • 10:00 AM</span></div><button class="modal-action" data-event="Study Group">Set reminder</button></div>
    `);
    else openModal("My Courses", `
      <div class="modal-row"><div><strong>Web Development</strong><span>80% complete</span></div><button class="modal-action" data-course="Web Development">Open</button></div>
      <div class="modal-row"><div><strong>Data Science</strong><span>60% complete</span></div><button class="modal-action" data-course="Data Science">Open</button></div>
      <div class="modal-row"><div><strong>Python Programming</strong><span>90% complete</span></div><button class="modal-action" data-course="Python Programming">Open</button></div>
      <div class="modal-row"><div><strong>Graphic Design</strong><span>70% complete</span></div><button class="modal-action" data-course="Graphic Design">Open</button></div>
    `);
  });
});

document.querySelector(".bell").addEventListener("click", () => {
  openModal("Notifications", `
    <div class="modal-row"><div><strong>Advanced Python workshop</strong><span>Starts today at 4:00 PM</span></div><button class="modal-action" data-notification>Mark read</button></div>
    <div class="modal-row"><div><strong>Web Project due</strong><span>Deadline is tomorrow</span></div><button class="modal-action" data-notification>Mark read</button></div>
    <div class="modal-row"><div><strong>New study group</strong><span>Python group is accepting members</span></div><button class="modal-action" data-notification>Mark read</button></div>
  `);
});

document.querySelector(".header-actions").addEventListener("click", (event) => {
  if (event.target.closest(".profile") || event.target.closest(".avatar") || event.target.closest(".chevron")) {
    openModal("Student Profile", `
      <div class="modal-row"><div><strong>Thandwe Mokoena</strong><span>Student • Skillsphere Member</span></div><button class="modal-action" data-profile>Edit</button></div>
      <div class="settings-grid">
        <div class="setting"><strong>Learning streak</strong><br><span>12 days</span></div>
        <div class="setting"><strong>Current level</strong><br><span>Level 1</span></div>
      </div>
    `);
  }
});

const navActions = {
  Dashboard: () => closeModal(),
  "My Courses": () => document.querySelector(".courses .section-title button").click(),
  "Practice Tests": () => openModal("Practice Tests", `
    <div class="modal-row"><div><strong>Python Fundamentals</strong><span>10 questions • 15 minutes</span></div><button class="modal-action" data-practice="Python">Start</button></div>
    <div class="modal-row"><div><strong>Web Development</strong><span>12 questions • 20 minutes</span></div><button class="modal-action" data-practice="Web">Start</button></div>
  `),
  Achievements: () => document.querySelector(".achievements-card .section-title button").click(),
  Calendar: () => openModal("November Calendar", `
    <div class="modal-row"><div><strong>Today</strong><span>Advanced Python workshop • 4:00 PM</span></div><b>23</b></div>
    <div class="modal-row"><div><strong>Tomorrow</strong><span>Web Project deadline • 11:59 PM</span></div><b>24</b></div>
  `),
  Messages: () => openModal("Messages", `
    <div class="modal-row"><div><strong>Course Instructor</strong><span>Your project feedback is ready.</span></div><button class="modal-action" data-message>Reply</button></div>
    <div class="modal-row"><div><strong>Study Group</strong><span>Saturday session details.</span></div><button class="modal-action" data-message>Reply</button></div>
  `),
  Settings: () => openModal("Settings", `
    <div class="settings-grid">
      <div class="setting"><label>Course reminders <input type="checkbox" checked></label></div>
      <div class="setting"><label>Email updates <input type="checkbox" checked></label></div>
      <div class="setting"><label>Dark mode <input type="checkbox" checked></label></div>
      <div class="setting"><label>Sound effects <input type="checkbox"></label></div>
    </div>
  `),
  Logout: () => openModal("Log out", `
    <p>Are you sure you want to log out of SkillSphere?</p>
    <button class="modal-action danger" id="confirmLogout">Log out</button>
  `)
};

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
    if (!item.classList.contains("logout")) item.classList.add("active");
    navActions[item.textContent.trim().replace("3", "")]?.();
  });
});

modalBody.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.course) {
    const name = target.dataset.course;
    const progress = name === "Graphic Design" ? 70 : name === "Python Programming" ? 90 : name === "Data Science" ? 60 : 80;
    courseModal(name, progress);
  } else if (target.dataset.group) showToast(`You joined ${target.dataset.group}`);
  else if (target.dataset.resource) showToast(`${target.dataset.resource} opened`);
  else if (target.dataset.event) showToast(`${target.dataset.event} reminder set`);
  else if (target.dataset.notification) {
    target.textContent = "Read";
    target.disabled = true;
  } else if (target.dataset.practice) quizModal();
  else if (target.dataset.profile) showToast("Profile editing opened");
  else if (target.dataset.message) showToast("Reply composer opened");
  else if (target.dataset.answer) {
    modalBody.querySelectorAll(".quiz-option").forEach((option) => option.disabled = true);
    target.classList.add(target.dataset.answer);
    showToast(target.dataset.answer === "correct" ? "Correct answer! +10 points" : "Not quite - review the lesson");
  } else if (target.dataset.action === "lesson-continue") showToast("Lesson resumed");
  else if (target.dataset.action === "lesson-complete") showToast("Lesson review opened");
  else if (target.dataset.action === "locked") showToast("Complete the previous lesson to unlock this project");
  else if (target.id === "downloadReport") showToast("Progress report prepared");
  else if (target.id === "confirmLogout") {
    closeModal();
    showToast("You have been logged out");
  }
});
