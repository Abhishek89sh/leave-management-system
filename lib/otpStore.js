let otpStore = {
    'abhisheksharma73341@gmail.com': 357371,
    'abhisheksharma8580468@gmail.com': 989129,
    'abhisheksharma858046@gmail.com': 417211
};

export function setOtp(email, otp) {
    otpStore[email] = otp;

    setTimeout(() => {
        delete otpStore[email];
    }, 10 * 60 * 1000);

    console.log(otpStore)
}

export function validateOtp(email, otp) {
    console.log(otpStore)
    const actualOtp = otpStore[email];
    if (!actualOtp) {
        return { status: 404, message: "OTP Not Found, Click Resend OTP to solve this." }
    }
    if (parseInt(otp) == parseInt(actualOtp)) {
        delete otpStore[email]
        return { status: 200, message: "OTP Matched" }
    } else {
        return { status: 401, message: "Incorrect OTP" }
    }
}
