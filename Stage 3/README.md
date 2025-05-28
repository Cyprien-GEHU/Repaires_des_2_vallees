### Technical Documentation - Repaire des 2 Vallées ![favicon-16x16](https://github.com/Cyprien-GEHU/Repaires_des_2_vallees/blob/bryan/Stage%201/Documents/Part%201/favicon.ico)

---

# User Stories and Mockups 📚

## Prioritized User Stories 🚀

### **Must Have** ✅

* **User Stories**:

  * 👤 *As a user, I want to sign up and log in so that I can securely access my account.*
  * 📰 *As a user, I want to browse the association's articles so that I can stay informed.*
  * 📅 *As a user, I want to see which activities/articles I am enrolled in so that I know when to attend.*
  * 🔔 *As a user, I want to receive notifications for activity/article deadlines so that I never miss anything.*

### **Should Have** 💡

* **User Stories**:

  * 💻 *As an administrator, I want to manage the association's articles so that I can edit or delete them if necessary.*
  * 🧑‍🔧 *As a user, I want to collaborate with others by sharing projects so that we can work efficiently together.*
  * 🕗 *As a user, I want to integrate my calendar with the application so that I can synchronize my tasks across platforms.*
  * 🎨 *As a user, I want to customize my profile so that I can make my experience more personal.*

### **Could Have** 🌟

* **User Stories**:

  * 🌃 *As a user, I want a dark mode so that I can use the application comfortably in low-light environments.*

### **Won’t Have (Excluded from MVP)** ❌

* **User Stories**:

  * 🎤 *As a user, I want to use voice commands to find an activity so that I can search without using the keyboard.*
  * 🤖 *As a user, I want an AI assistant to help clients so that it can assist them if they encounter problems on the site.*

---

## Main Screen Mockups 🎨

### 🏠 Home Screen

![Home Screen](images/Messenger_creation_201D34D1-0827-4A20-98E3-27BFC08A5AC9.jpg)

### 🔐 Login/Sign-Up Screen

![Login/Sign-Up Screen](images/logininscriptions.png)

### 📜 Articles Page Preview

![Articles Page Preview](images/Articles.png)

---

# Design System Architecture 🖌️

* **Frontend**: HTML, CSS
* **Backend**: Node.js, Express
* **Database**: MongoDB
* **External APIs**: Ionos

---

# Components, Classes, and Database Design 📊

### **Database Schema**:

* **Admin**:

  * `firstName`, `lastName`, `email`, `phoneNumber`, `role`, `password`, `id_admin`, `created_at`, `updated_at`
* **User**:

  * `firstName`, `lastName`, `role`, `email`, `address`, `password`, `phoneNumber`, `id_user`, `created_at`, `updated_at`
* **Agenda**:

  * `title`, `description`, `day`, `image` (optional), `price`, `id_agenda`, `created_at`, `updated_at`, `created_by`
* **Article**:

  * `title`, `description`, `date`, `image` (optional), `creator`, `id_article`, `created_at`, `updated_at`, `created_by`, `category`
* **Children**:

  * `firstName`, `lastName`, `age`
* **Event**:

  * `title`, `date`, `created_at`, `updated_at`, `image`, `id_event`

---

# High-Level Sequence Diagrams 📊

### **User Interaction**

```mermaid
sequenceDiagram
    actor User
    participant Ionos
    participant MongoDB

    User->>Ionos: Fetch all articles
    Ionos->>MongoDB: GET /articles
    MongoDB-->>Ionos: Return status 200
    Ionos-->>User: List of all articles

    User->>Ionos: Get one article
    Ionos->>MongoDB: GET /articles/{id_article}
    alt Article Found
    MongoDB-->>Ionos: Return status 200
    Ionos-->>User: Article details
    else Article Not Found
    MongoDB-->>Ionos: Return status 404
    Ionos-->>User: Article not found
    end

    User->>Ionos: Modify account information
    Ionos->>MongoDB: PUT /user/{user_id}
    alt Authorized User
    MongoDB-->>Ionos: Return status 200
    Ionos-->>User: Account updated
    else Unauthorized User
    MongoDB-->>Ionos: Return status 401
    Ionos-->>User: Unauthorized action
    end
```

### **Host Interaction**

```mermaid
sequenceDiagram
    actor Host
    participant Ionos
    participant MongoDB

    Host->>Ionos: Fetch all users
    Ionos->>MongoDB: GET /users
    MongoDB-->>Ionos: Return status 200
    Ionos-->>Host: List of all users

    Host->>Ionos: Create an article
    Ionos->>MongoDB: POST /articles
    alt Valid Request
    MongoDB-->>Ionos: Return status 201
    Ionos-->>Host: Article created!
    else Invalid Request
    MongoDB-->>Ionos: Return status 400
    Ionos-->>Host: Bad request
    end

    Host->>Ionos: Modify an article
    Ionos->>MongoDB: PUT /articles/{id_article}
    alt Authorized Host
    MongoDB-->>Ionos: Return status 200
    Ionos-->>Host: Article updated
    else Unauthorized Host
    MongoDB-->>Ionos: Return status 401
    Ionos-->>Host: Unauthorized action
    end
```

---

# Document External and Internal APIs 🔗

### **User APIs**

| **URL**               | **Method** | **Input** (JSON)                                        | **Output** (JSON)                               | **Description**     |
| --------------------- | ---------- | ------------------------------------------------------- | ----------------------------------------------- | ------------------- |
| `/api/user`           | POST       | `{ firstName, lastName, email, phoneNumber, password }` | `{ message: "Your account is created!" }`       | Create a new user   |
| `/api/auth/login`     | GET        | `{ email, password }`                                   | `{ token }`                                     | User login          |
| `/api/user/{id_user}` | PUT        | `{ firstName, lastName, email, phoneNumber, password }` | `{ message: "Your account has been updated." }` | Update user account |
| `/api/user/{id_user}` | DELETE     | `{ id_user }`                                           | `{ message: "Your account has been deleted." }` | Delete user account |
| `/api/articles`       | GET        | None                                                    | `{ articles: [...] }`                           | Get all articles    |

### **Admin APIs**

| **URL**                           | **Method** | **Input** (JSON)                                 | **Output** (JSON)                 | **Description**   |
| --------------------------------- | ---------- | ------------------------------------------------ | --------------------------------- | ----------------- |
| `/api/admin/user`                 | GET        | None                                             | `{ users: [...] }`                | View all users    |
| `/api/admin/article`              | POST       | `{ title, description, date, image (optional) }` | `{ message: "Article created!" }` | Create an article |
| `/api/admin/article/{id_article}` | PUT        | `{ title, description, date, image (optional) }` | `{ message: "Article updated!" }` | Update an article |
| `/api/admin/article/{id_article}` | DELETE     | `{ id_article }`                                 | `{ message: "Article deleted!" }` | Delete an article |

---

# Plan SCM and QA Strategies 🛠️

### **SCM Strategy**

* **Version Control**: Git
* **Branching Strategy**:

  * `main`: Stable, production-ready code
  * `development`: Integration branch for features/bug fixes
  * `feature/*`: Feature branches for individual tasks
  * `hotfix/*`: For urgent fixes
* **Commit Guidelines**: Use a standardized format, e.g., `feat: Add feature` or `fix: Correct issue`

### **Quality Assurance**

* **Testing Types**:

  * Unit Tests: Individual components (e.g., API endpoints)
  * Integration Tests: Modules working together
  * End-to-End Tests: User workflows
  * Manual Tests: Critical user flows/UI validation
* **Tools**:

  * W3C: HTML/CSS validation
  * Mocha: Backend testing
  * ESLint: Node.js linting
* **Environments**:

  * Test Environment: Automated/manual tests before deployment
  * Production Environment: Stable, fully tested code
* **Bug Tracking**: GitHub Issues for logging and resolution
* \*\*Release Management
* Maintain a changelog for each release, detailing new features, bug fixes, and improvements.


## Technical Justifications 🧐  

We goes with a classique technologie for these raison :
- Our client are a litle assiosiation
- If the client recrute a developper web the web site need to be simple
- The developper need to be simple
--- 
