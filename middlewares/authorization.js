import jwt  from 'jsonwebtoken';

const allowedUrls = [
    '/auth/register',
    '/auth/login',
];

const authorization = (req, res, next) => {
    if (allowedUrls.includes(req.path)) return next();

    const token = req?.cookies?.accessToken || req.get('Authorization') || req.headers["authorization"];
    console.log(token)

    if (!token) return res.status(401).json({ success: false, message: "Authorization header missing!" });

    // If the token is in the "Bearer <token>" format, remove the prefix.
    if (token.startsWith("Bearer ")) {
        token = token?.split(' ')[1];
    }

    try {
        // eslint-disable-next-line no-undef
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export default authorization;
