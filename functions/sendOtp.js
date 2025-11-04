export const sendOtp = async (name, email)=>{
    const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email
        })
      });
      const resData = await res.json();
      return resData;
}