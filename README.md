# studio-graphene-assessment

A Full-Stack task management application built using React, Node.js, and Express. This application allows users to manage daily tasks with features such as creation, editing, deletion, status updates, and filtering.

## Festures

- Create new tasks
- Edit exiting tasks
- Delete tasks
- Mark tasks(All, Active, Completed)
- Task statistics (Total, Active, Completed)
- JSON file-based data storage
- Responsive and clean user interface

## Tech Stack 

### Frontend
- React
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Storage
- JSON File('tasks.json')

## Project Structure

Personal Task Manager
│
├── client
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── services
│   │       └── taskService.js
│
├── server
│   ├── controllers
│   │   └── taskController.js
│   ├── routes
│   │   └── taskRoutes.js
│   ├── data
│   │   └── tasks.json
│   └── server.js


## Installation

### Clone Repository
```bash
git clone <repository-url>
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```


### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

### Toggle Task Status

```http
PATCH /api/tasks/:id/toggle
```

## Future Improvements

- User Authentication
- Search Functionality
- Task Priority Levels
- Database Integration (MongoDB)
- Drag and Drop Task Management

## Output
<img width="1918" height="903" alt="image" src="https://github.com/user-attachments/assets/2251a990-ec8c-435b-bbf9-6ae49ff3fae1" />


## Author

Taniya 

Studio Graphene Associate Software Engineer Assessment

  
  
