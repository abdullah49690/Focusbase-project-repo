
exports.validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    // Simple Email Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Please provide a valid email address" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    next(); // All checks passed! Move to register controller
};

exports.validateTask = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ success: false, message: "Title cannot be empty" });
    }

    if (title.length < 3) {
        return res.status(400).json({ success: false, message: "Title must be at least 3 characters long" });
    }

    if (title.length > 200) {
        return res.status(400).json({ success: false, message: "Title cannot exceed 200 characters" });
    }

    next();
};


