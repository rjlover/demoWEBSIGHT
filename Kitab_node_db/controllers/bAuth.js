const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const swal = require('sweetalert2');

let db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

exports.contactUs = (req, res) => {
    const { name, mail, mobile, message } = req.body;

    db.query('INSERT INTO usermessage SET ?', { name: name, email: mail, mobile_no: mobile, message: message }, (error, results) => {
        if (error) throw error;

        setTimeout(() => {
            res.redirect('/');
        }, 2000);

    });
};



exports.register = (req, res) => {
    const { fname, email, mobile_no, password, cpassword } = req.body;

    db.query('SELECT email FROM userregistration WHERE email=?', [email], async (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            return res.render('account', { message: "That Email Is Already Used!" })
        }
        else if (password != cpassword) {
            return res.render('account', { message: "Password Do Not Match." })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO userregistration SET ?', { name: fname, email: email, mobile_no: mobile_no, password: hashPassword }, (error, results) => {
            if (error) throw error;
            res.render('index')
        });
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('account', { message: "Please provide email and password." });
        }

        db.query('SELECT * FROM userregistration WHERE email=?', [email], async (error, results) => {
            if (!results.length > 0 || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('account', { message: "The Email Or PAssword Are Incorrect" })
            } else {
                const userId = results[0].id;

                const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRES_TIME });

                // console.log(jwtToken)
                db.query('UPDATE userregistration SET token=' + mysql.escape(jwtToken) + 'WHERE id=' + mysql.escape(userId), (error, results) => {
                    if (error) throw error;
                });

                const cookieOption = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', jwtToken, cookieOption);
                // res.send('login success');
                res.status(200).render('index', { message: "HI," + results[0].name })
            }
        });
    } catch (error) {
        console.log(error);
    }

}