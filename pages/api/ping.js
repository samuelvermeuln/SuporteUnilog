export default async (req, res) => {
    res.status(200).json({
        message: "Pong",
        date: new Date()
    });
}
