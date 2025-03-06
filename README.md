# **Feed App - Angular 19 + Angular Material**

A feed-like social networking application where users can post, comment, and manage their posts.
It implements authentication with an external API and a modern interface with Angular Material.

---
## **Índice**
- Technologies
- Installation
- Usage
- Features
- API Endpoints
- Styles

---

## **Technologies**
- **Angular 19 (Standalone)**
- **Angular Material**
- **RxJS**
- **Authentication with external API**
- **SCSS for styles**

---

## **Installation**
1. Clone the repository:
```sh
git clone https://github.com/Bootcamp-FS07/Practica-Final-Manuel-Monroy
cd Practica-Final-Manuel-Monroy
```
2. Install dependencies:
```sh
npm install
```
3. Run the project:
```sh
ng serve
```
4. Access the application at `http://localhost:4200`.

---

## **Usage**
### 1️ **Authentication**
- Log in with email and password.
- Authentication token is stored in `localStorage`.

### 2️ **Post Feed**
- Publish a new post (maximum 200 characters).
- Edit and delete own posts.
- View posts from other users.

### 3️ **Comments**
- Comment on any post.
- Edit and delete own comments.

### 4️ **Pagination**
- Navigation between pages of posts with <> buttons.
---

## **Features**
**Login with external API**
**Post publishing**
**Comments on posts**
**Editing and deleting content**
**Responsive interface with Angular Material**
**Post pagination**

---

## **API Endpoints**
### **Authentication**
- `POST http://localhost:3000/auth/login` → Returns user token.
- `GET http://localhost:3000/user/profile/` → Gets authenticated user data.

### **Posts**
- `GET http://localhost:3000/posts` → Gets all posts.
- `POST http://localhost:3000/posts` → Creates a new post.
- `PUT http://localhost:3000/posts/:id` → Edits a post.
- `DELETE http://localhost:3000/posts/:id` → Deletes a post.

### **Comments**
- `GET http://localhost:3000/comment?postId=<postId>` → Get comments on a post.
- `POST http://localhost:3000/comment` → Add a comment.
- `PUT http://localhost:3000/comment/:id` → Edit a comment.
- `DELETE http://localhost:3000/comment/:id` → Delete a comment.

---

## **Styles**
- Theme based on `Angular Material`.
- Responsive design with `CSS`.
- Custom styles in `src/styles.scss`.


