import User from "../models/User.js";

export const getUsersByEmails = async (req, res) => {
    try {
        const emails = req.query.emails;
        if (!emails) {
            return res.status(400).json({ message: "Emails are required" });
        }

        const emailArray = emails.split(',').map(email => email.trim().toLowerCase());

        const users = await User.find({ email: { $in: emailArray } });

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
}
