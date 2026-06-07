
### 🧱 The System Architecture Document
This architectural layout helps you to understand the execution mechanics behind the scenes.



#### 🔄 The FocusBase Request Journey
Imagine a user triggers a `POST /api/tasks/` request:

1. **The Route Gate (`routes/taskRoutes.js`)**: The incoming HTTP request strikes the specified endpoint pattern.
2. **The Identity Shield (`middleware/authMiddleware.js`)**: The request is intercepted. The system inspects the `Authorization` header, extracts the bearer token, verifies it, and attaches `req.user = { id: decoded.userId }`. If missing or invalid, it returns a `401 Unauthorized`.
3. **The Data Inspector (`middleware/validateMiddleware.js`)**: The request moves to the validator layer to verify that the payload contains a valid, well-formed, non-empty text string for the task `title`. If invalid, it short-circuits with a `400 Bad Request`.
4. **The Brain / Controller (`controllers/taskController.js`)**: The request arrives safely at your `createTask` controller logic. It reads `req.user.id` to guarantee ownership and maps out the database creation inputs.
5. **The Blueprint / Model (`models/Task.js`)**: The controller communicates with the Mongoose Task layout blueprint to enforce field data types and default properties (`isCompleted: false`).
6. **The Storage Core (MongoDB Atlas)**: The database securely writes the record into the cloud cluster and returns the newly minted object.
7. **The Clean Return (Response)**: The controller intercepts the saved data object and wraps it into a beautiful, standardized JSON structure, issuing a `201 Created` confirmation code back to the client.

---




