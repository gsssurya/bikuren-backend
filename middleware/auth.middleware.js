const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.signedCookies.token || req.cookies.token;
    if (!token) return res.status(403).json({ message: 'You are not sign in yet!' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

  // ambil exp lama
    const currentExp = decoded.exp * 1000; // ubah ke ms
    const now = Date.now();

    // hitung sisa waktu
    const remainingTime = currentExp - now;

    // tambah 1 jam
    const newMaxAge = remainingTime + (1000 * 60 * 60);

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: newMaxAge,
        signed: true
    });

    next();
};

module.exports = auth;