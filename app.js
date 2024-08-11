// Sign Up

let registerForm = document.querySelector(".sign-up");
const loginForm = document.querySelector(".login");

window.addEventListener("DOMContentLoaded", function () {
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.email === email);
      console.log(userExists);

      if (userExists) {
        alert(
          "This email is already registered. Please use a different email or log in."
        );
        location.replace("Login.html");
      } else {
        let user = { username, email, password };
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        registerForm.reset();

        alert("User registered successfully");
        location.replace("Login.html");
      }
    });
  }
});

// login
if (loginForm) {
  loginForm.addEventListener("submit", function logged(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (localStorage.getItem("users") == null) {
      alert("Please register first");
      window.location.href = "sign up.html";
    }

    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      location.replace("Quiz.html");
      console.log("pass");
    } else {
      alert("Invalid email or password");
    }
  });
}

// Quiz App

// if (location.href === "Quiz.html") {
//   if (!localStorage.getItem(users)) {
//     location.href = "Login.html"
//   }
// }
const quizData = [
  {
    question:
      "What is the primary benefit of using Facebook community groups for business?",
    options: [
      "Building a community and engaging with potential clients",
      "Selling products directly to group members",
      "Promoting other businesses",
      "Creating spammy content",
    ],
    answer: "Building a community and engaging with potential clients",
  },
  {
    question: "How can you increase engagement in a Facebook group?",
    options: [
      "Posting irrelevant content",
      "Regularly posting valuable content and encouraging discussions",
      "gnoring group members' comments",
      "Creating strict rules for group participation",
    ],
    answer: "Regularly posting valuable content and encouraging discussions",
  },
  {
    question:
      "What is a good practice when joining a new Facebook group to promote your business?",
    options: [
      "Spamming the group with promotional posts immediately",
      "Only promoting your business without engaging with others",
      "Introducing yourself and providing value before promoting your business",
      "Posting unrelated content to gain attention",
    ],
    answer:
      "Introducing yourself and providing value before promoting your business",
  },
  {
    question:
      "How often should you post in a Facebook group to keep it active?",
    options: [
      "Once a month",
      "Daily or several times a week",
      "Once a week",
      "Once every few months",
    ],
    answer: "Daily or several times a week",
  },
  {
    question: "What type of content is most effective in Facebook groups?",
    options: [
      "Lengthy promotional posts",
      "Memes and jokes",
      "Long articles without visuals",
      "Interactive content such as polls, questions, and live videos",
    ],
    answer: "Interactive content such as polls, questions, and live videos",
  },
  {
    question: "What is cloud marketing?",
    options: [
      "Traditional marketing methods",
      "Marketing products related to clouds",
      "Utilizing cloud-based tools and platforms to manage and execute marketing activities",
      "Marketing services for weather prediction",
    ],
    answer:
      "Utilizing cloud-based tools and platforms to manage and execute marketing activities",
  },
  {
    question: "Which cloud-based tool is commonly used for email marketing?",
    options: ["Mailchimp", "Adobe Photoshop", "Microsoft Excel", "Google Docs"],
    answer: "Mailchimp",
  },
  {
    question: "What is the advantage of using cloud marketing tools?",
    options: [
      "Limited accessibility",
      "High cost",
      "Scalability, flexibility, and cost efficiency",
      "Low security",
    ],
    answer: "Scalability, flexibility, and cost efficiency",
  },
  {
    question:
      "How can cloud marketing improve collaboration within a marketing team?*",
    options: [
      "By limiting access to marketing resources",
      "By providing shared access to marketing resources and real-time updates",
      "By increasing competition among team members",
      "By reducing communication channels",
    ],
    answer:
      "By providing shared access to marketing resources and real-time updates",
  },
  {
    question:
      "Which of the following is a popular cloud-based CRM for marketing?",
    options: ["Oracle", "SAP", "Salesforce", "IBM"],
    answer: "Salesforce",
  },
];

const quizContainer = document.getElementById("quiz");
const question = document.getElementById("question");
const options = document.getElementById("options");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");
const heading = document.querySelector(".h1");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  question.textContent = currentQuestion.question;

  options.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    options.appendChild(li);
  });
}

function checkAnswer(answer) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (answer === currentQuestion.answer) {
    score++;
    Swal.fire({
      title: "Good job!",
      text: "Correct Answer!",
      icon: "success"
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong Answer!",
    });
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.style.display = "none";
  result.style.display = "block";
  heading.style.display = "none";
  let condition = document.querySelector(".condition");
  let crtAns = (document.querySelector(".crt").innerHTML = `${score}`);
  let wrgAns = (document.querySelector(".wrg").innerHTML = `${
    quizData.length - score
  }`);
  let srtscr = (score * 100) / quizData.length;
  let percentage = document.querySelector(".per");
  percentage.innerHTML = `${srtscr}%`;

  if (srtscr >= 50) {
    condition.innerHTML = `Congratulations You Passed !`;
    condition.style.color = "#304107";
    percentage.style.color = "#304107";
    percentage.style.border = "2px solid #304107";
  } else {
    condition.innerHTML = `Failed !`;
    condition.style.color = "red";
    percentage.style.color = "red";
    percentage.style.border = "2px solid red";
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  result.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

loadQuestion();

// Event listener for option clicks
options.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const selectedOption = event.target.textContent;
    checkAnswer(selectedOption);
  }
});

// Event listener for submit button
submitButton.addEventListener("click", function () {
  const selectedOption = options.querySelector("div.selected");
  if (selectedOption) {
    checkAnswer(selectedOption.textContent);
  } else {
    // alert("Please select an answer.");
    Swal.fire("Please select an Answer!");
  }
});
