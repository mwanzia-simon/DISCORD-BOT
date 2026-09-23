#  Neuron

**Neuron** is a Discord-based student productivity bot designed to help university students manage their everyday academic tasks directly from Discord.

It helps students keep track of **tasks, assignments, deadlines, class schedules, and reminders** without needing to leave their Discord server.

##  Features

###  Task Management

* Add tasks
* View your tasks
* Mark tasks as completed
* Delete tasks
* Tasks are stored persistently in MongoDB

###  Assignment Management

* Add assignments with due dates
* View upcoming assignments
* Check how much time is left before a deadline
* Track assignment completion

###  Class Schedule

* Add classes to your weekly schedule
* View your complete weekly schedule
* View today's classes
* Find your next upcoming class
* See a countdown until the next class

###  Reminders

* Create time-based reminders
* View active reminders
* Receive automatic Discord DMs when reminders are due
* Reminders are processed automatically using a background scheduler

##  Commands

### General

| Command | Description             |
| ------- | ----------------------- |
| `!help` | Show available commands |

###  Tasks

| Command            | Description              |
| ------------------ | ------------------------ |
| `!addtask <task>`  | Add a new task           |
| `!tasks`           | View your tasks          |
| `!done <number>`   | Mark a task as completed |
| `!delete <number>` | Delete a task            |

Example:

```text
!addtask Finish OOP assignment
!tasks
!done 1
!delete 2
```

###  Assignments

| Command                         | Description                  |
| ------------------------------- | ---------------------------- |
| `!addassignment <title> <date>` | Add an assignment            |
| `!assignments`                  | View your assignments        |
| `!deadline <number>`            | Check an assignment deadline |

Example:

```text
!addassignment Finish database project 2026-09-25
!assignments
!deadline 1
```

###  Schedule

| Command               | Description               |
| --------------------- | ------------------------- |
| `!addclass <details>` | Add a class               |
| `!schedule`           | View your weekly schedule |
| `!today`              | View today's classes      |
| `!nextclass`          | View your next class      |

Example:

```text
!addclass Database Systems | Monday | 10:00 | 12:00 | Room B204
!schedule
!today
!nextclass
```

###  Reminders

| Command                    | Description           |
| -------------------------- | --------------------- |
| `!remind <time> <message>` | Create a reminder     |
| `!reminders`               | View active reminders |

Example:

```text
!remind 30m Study OOP
!remind 2h Finish database assignment
!reminders
```

Supported time formats:

```text
30m → 30 minutes
2h  → 2 hours
1d  → 1 day
```

##  Tech Stack

* **Node.js** — Runtime
* **JavaScript** — Programming language
* **Discord.js** — Discord API integration
* **MongoDB** — Database
* **Mongoose** — MongoDB object modeling
* **Joi** — Input validation
* **date-fns** — Date and time handling
* **node-cron** — Background reminder scheduling
* **dotenv** — Environment variable management

##  Project Structure

```text
src/
├── commands/
│   ├── assignment.command.js
│   ├── help.command.js
│   ├── reminder.command.js
│   ├── schedule.command.js
│   └── task.command.js
│
├── config/
│   └── db.js
│
├── models/
│   ├── assignment.model.js
│   ├── reminder.model.js
│   ├── schedule.model.js
│   └── task.model.js
│
├── services/
│   ├── assignment.service.js
│   ├── reminder.scheduler.js
│   ├── reminder.service.js
│   ├── schedule.service.js
│   └── task.service.js
│
├── validations/
│   ├── assignment.validation.js
│   └── schedule.validation.js
│
└── server.js
```

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mwanzia-simon/DISCORD-BOT
cd DISCORD-BOT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the project root:

```env
BOT_TOKEN=your_discord_bot_token
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the bot

```bash
node src/server.js
```

If everything is configured correctly, you should see something similar to:

```text
MongoDB connected successfully
✅ Logged in as Neuron
⏰ Reminder scheduler started.
```

##  Architecture

Neuron follows a simple layered structure that separates different responsibilities:

```text
Discord Message
       ↓
Command Handler
       ↓
Validation
       ↓
Service Layer
       ↓
MongoDB
```

Background reminders use:

```text
node-cron
    ↓
Check MongoDB
    ↓
Find due reminders
    ↓
Send Discord DM
    ↓
Mark reminder as completed
```

This separation keeps Discord interaction, business logic, database operations, and validation from becoming tightly coupled.

## 🚧 Future Plans

Neuron is still being actively developed. Planned features include:

* [ ] Cancel reminders
* [ ] Study tracking and statistics
* [ ] Notes
* [ ] Expense/budget tracking
* [ ] Campus events and information
* [ ] AI-powered study assistance
* [ ] Web dashboard
* [ ] Improved command system
* [ ] Deployment so multiple students can use Neuron

##  Project Goal

Neuron started as a simple Discord bot learning project and is gradually evolving into a practical **student productivity assistant**.

The goal is to make everyday academic organization easier by bringing useful student tools into a platform students already use.

---

**Built with Node.js, MongoDB, Discord.js and a lot of debugging. 🚀**
