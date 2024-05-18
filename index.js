const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("./db/connection");
require("dotenv").config();
const adminModel = require("./db/admin");
const PORT_NUMBER = process.env.PORT || 4600;

var nodemailer = require('nodemailer');


app.use(express.json())
app.use(cors())

app.put("/updatesavedata/:email", async (req, res) => {
    const email = req.params.email
    const result = await adminModel.updateOne({ email: email }, { $set: req.body })
    res.send(result)
})


// Email auth  'This data is highly sensitive; please do not share it with anyone.'
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mihirpatel6pg6090201@gmail.com',
        pass: process.env.ADMIN_EMAIL_KEY
    }
});


// Register Admin Not: first start the Super admin server for this mail functionalys
app.post("/registeradmin", async (req, res) => {
    const data = new adminModel(req.body)

    // mail send to super admin for create new password 
    var mailOptions = {
        from: 'mihirpatel6pg6090201@gmail.com',
        to: req.body.email,
        subject: `Hello ${req.body.firstName}`,
        html:
            `
  
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project OPEN X</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa; /* Set background color to light gray */
                    }
                    .container {
                        width: 90%;
                        max-width: 600px; /* Adjust card width */
                        margin: auto;
                        padding: 20px;
                        background-color: #ffffff; /* Set background color to white */
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* Adjust shadow */
                        border: 2px dashed #000000; /* Add dashed border */
                    }
                    h1 {
                        color: #007bff; /* Set heading color */
                        text-align: center;
                        margin-top: 0;
                        font-size: 28px; /* Adjust heading font size */
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                        margin-bottom: 20px; /* Add spacing below heading */
                    }
                    p {
                        color: #333333; /* Set paragraph color */
                        margin: 10px 0;
                        font-size: 16px; /* Adjust paragraph font size */
                        text-align: justify;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                        transition: color 0.3s ease;
                    }
                    a:hover {
                        color: #0056b3;
                        text-decoration: underline;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px; /* Adjust footer font size */
                        color: #777777;
                    }
                    .team {
                        color: #000000; /* Set team text color to dark black */
                        font-weight: bold;
                    }
                    /* Responsive Styling */
                    @media only screen and (max-width: 600px) {
                        .container {
                            width: 90%;
                            max-width: 90%;
                        }
                    }
                   
                </style>
            </head>
            <body>
            <div class="container">
                <p>Dear ${req.body.firstName} ${req.body.lastName},</p>
                <p>Thank you for joining us!</p>
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
                    <p style="margin: 5px 0;"><strong>Default Login Details:</strong></p>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        <li>Email: ${req.body.email}</li>
                        <li>Password: <strong>admin@123</strong></li>
                    </ul>
                    <p style="margin: 5px 0;">You can use these credentials to log in, or you can change your password for added security by clicking on the "Set Password" link provided below.</p>
                </div>
                <p>Please set your new password by visiting the following link:</p>
                <p><a href="https://superadmin-backend.onrender.com/newpassword/${req.body.email}">Set Password</a></p>
                <p>If you encounter any issues or have any questions, feel free to reach out to us.</p>

                <p class="footer">Best regards,<br><span class="team">PROJECT OPEN X team</span></p>
                
            </div>
            </body>
            </html>
            
        `,


        // attachments: [
        //     {
        //         filename: 'image.jpg',
        //         path: './db/attachment/PVOT_Designs_B.png',
                
        //     },
        //     {
        //         filename: 'document.pdf',
        //         path: './db/attachment/REMS.pdf',
        //         cid: 'pdfDocument' // Use a unique CID for the PDF
        //     },
        // ]

    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    const result = await data.save()
    res.send(result)

    // jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    //     if (err) {
    //         res.send({ error: "Somthing went wrong, Please after some time" })
    //     }
    //     res.send({ data, auth: token})
    // })
})


// Not: first start the Super admin server for this sending mail functionalys
app.post("/forgotadminpassword", async (req, res) => {
    
    // mail send to user for forgot password
    var mailOptions = {
        from: 'mihirpatel6pg6090201@gmail.com',
        to: req.body.email,
        subject: "Forgot Password",
        html:
            `
  

            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="x-apple-disable-message-reformatting" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="color-scheme" content="light dark" />
              <meta name="supported-color-schemes" content="light dark" />
              <title></title>
              <style type="text/css" rel="stylesheet" media="all">
                /* Base */
                @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
                body {
                  width: 100% !important;
                  height: 100%;
                  margin: 0;
                  -webkit-text-size-adjust: none;
                  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
                  background-color: #F2F4F6;
                  color: #51545E;
                }
                a {
                  color: #3869D4;
                  text-decoration: none;
                }
                a img {
                  border: none;
                }
                td {
                  word-break: break-word;
                }
                .preheader {
                  display: none !important;
                  visibility: hidden;
                  mso-hide: all;
                  font-size: 1px;
                  line-height: 1px;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                }
                /* Typography */
                h1, h2, h3 {
                  margin-top: 0;
                  color: #333333;
                  font-weight: bold;
                }
                h1 {
                  font-size: 22px;
                  text-align: left;
                }
                h2 {
                  font-size: 16px;
                }
                h3 {
                  font-size: 14px;
                }
                p, ul, ol, blockquote {
                  margin: .4em 0 1.1875em;
                  font-size: 16px;
                  line-height: 1.625;
                }
                p.sub {
                  font-size: 13px;
                }
                /* Utilities */
                .align-right {
                  text-align: right;
                }
                .align-left {
                  text-align: left;
                }
                .align-center {
                  text-align: center;
                }
                .u-margin-bottom-none {
                  margin-bottom: 0;
                }
                /* Buttons */
                .button {
                  background-color: #3869D4;
                  color: #FFF;
                  text-decoration: none;
                  border-radius: 3px;
                  padding: 10px 20px;
                  display: inline-block;
                  margin-top: 20px;
                }
                .button--green {
                  background-color: #22BC66;
                }
                .button--red {
                  background-color: #FF6136;
                }
                @media only screen and (max-width: 500px) {
                  .button {
                    width: 100% !important;
                    text-align: center !important;
                  }
                }
                /* Email Structure */
                .email-wrapper {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  background-color: #F2F4F6;
                }
                .email-content {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                .email-masthead {
                  padding: 25px 0;
                  text-align: center;
                }
                .email-masthead_name {
                  font-size: 16px;
                  font-weight: bold;
                  color: #A8AAAF;
                  text-decoration: none;
                  text-shadow: 0 1px 0 white;
                }
                .email-body {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                .email-body_inner {
                  width: 570px;
                  margin: 0 auto;
                  padding: 0;
                  -premailer-width: 570px;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  background-color: #FFFFFF;
                }
                .email-footer {
                  width: 570px;
                  margin: 0 auto;
                  padding: 0;
                  -premailer-width: 570px;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  text-align: center;
                }
                .email-footer p {
                  color: #A8AAAF;
                }
                .content-cell {
                  padding: 45px;
                }
                @media only screen and (max-width: 600px) {
                  .email-body_inner,
                  .email-footer {
                    width: 100% !important;
                  }
                }
                @media (prefers-color-scheme: dark) {
                  body,
                  .email-body,
                  .email-body_inner,
                  .email-content,
                  .email-wrapper,
                  .email-masthead,
                  .email-footer {
                    background-color: #333333 !important;
                    color: #FFF !important;
                  }
                  p,
                  ul,
                  ol,
                  blockquote,
                  h1,
                  h2,
                  h3,
                  span,
                  .purchase_item {
                    color: #FFF !important;
                  }
                  .attributes_content,
                  .discount {
                    background-color: #222 !important;
                  }
                  .email-masthead_name {
                    text-shadow: none !important;
                  }
                }
                :root {
                  color-scheme: light dark;
                  supported-color-schemes: light dark;
                }
              </style>
            </head>
            <body>
              <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
              <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="email-masthead">
                          <a href="https://example.com" class="email-masthead_name">PROJECT OPEN X</a>
                        </td>
                      </tr>
                      <!-- Email Body -->
                      <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                          <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <!-- Body content -->
                            <tr>
                              <td class="content-cell">
                                <h1>Hi Admin,</h1>
                                <p>You recently requested to reset your password for your admin panel account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p>
                                <!-- Action -->
                                <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center">
                                      <!-- Button -->
                                      <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                                        <tr>
                                          <td align="center">
                                            <a href="https://superadmin-backend.onrender.com/setforgotpassword/${req.body.email}" class="button button--green" target="_blank">Reset your password</a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <p style="padding-top: 20px">If you have any problem resetting your password from this email, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
                                <p>Thanks,<br>The PROJECT OPEN X team</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- Email Footer -->
                      <tr>
                        <td class="email-footer" align="center">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="content-cell" align="center">
                                <p class="sub">PROJECT OPEN X<br>1234 Street Rd.<br>Suite 1234</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            


            
        `,


        // attachments: [
        //     {
        //         filename: 'image.jpg',
        //         path: './db/attachment/PVOT_Designs_B.png',
                
        //     },
        //     {
        //         filename: 'document.pdf',
        //         path: './db/attachment/REMS.pdf',
        //         cid: 'pdfDocument' // Use a unique CID for the PDF
        //     },
        // ]

    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
})

app.delete("/deleteadmin/:_id", async (req, res) => {
    const datas = await adminModel.deleteOne({ _id: req.params._id })
    res.send(datas)
})

app.put("/updateadmin/:id", async (req, res) => {
    const id = req.params.id
    const result = await adminModel.updateOne({ _id: id }, { $set: req.body })
    res.send(result)
})






app.post("/validatedetail", async (req, res) => {
    const data = await adminModel.find(req.body)
    if (data.length >= 1) {
        res.send(data)
    } else {
        res.send({ error: "data not found" })
    }
})

/* -----------// For check admin login detail //------------ */
app.post("/adminlogin", async (req, res) => {
    if (req.body.email && req.body.password) {
        const datas = await adminModel.findOne(req.body)
        if (datas) {
            res.send(datas)
        }
        else {
            res.send({ error: "Not any data" })
        }
    }
    else {
        res.send({ error: "You not enter email and passwod" })
    }
})

// For check admin login password
app.post("/checkpassword", async (req, res) => {
    const datas = await adminModel.findOne(req.body)
    if (datas) {
        res.send(datas)
    }
    else {
        res.send({ error: "Not any data" })
    }
}
)


// Fetch superadmin data
app.get("/showadmin", async (req, res) => {
    const datas = await adminModel.find().sort({ _id: -1 })
    if (datas.length >= 1) {
        res.send(datas)
    } else {
        res.send({ error: "not any data" })
    }
})



app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port no ${PORT_NUMBER}`);
})


// app.listen(4600, () => {
//     console.log("server is running on port no 4600");
// })


