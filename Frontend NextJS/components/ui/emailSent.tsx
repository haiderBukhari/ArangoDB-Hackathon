import { Mail } from "lucide-react"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import axios from "axios";
import { errorToast, successToast } from "@/helpers/toasts";

interface EmailSend{
    email: string;
}

const EmailSent = ({email}: EmailSend) => {

  const handleEmailSubmit = async () => {
    axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/api/users/verify`, {
      email: email
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if(response.data.emailSent){
        successToast("Email Verification Sent")
      }else{
        successToast(response.data.message)
      }
    }).catch(err => {
      errorToast(err.response.data.error)
    })
  }

  return (
    <Card className="w-[400px] p-6">
      <h2 className="text-2xl font-semibold mb-4">Almost there</h2>
      <CardContent className="p-4 bg-slate-50 rounded-lg mb-4">
        <div className="flex gap-3">
          <Mail className="text-red-500" size={24} />
          <p className="text-md">
            Click the link we sent to{' '}
            <span className="font-medium">{email}</span>
            {' '}to complete your account set-up. Please check your <strong>inbox</strong> and <strong>spam</strong>
          </p>
        </div>
      </CardContent>

      <Button 
        onClick={handleEmailSubmit}
        variant="secondary" 
        className="w-full bg-slate-900 text-white hover:bg-slate-800"
      >
        Didnt receive an email? Click Here
      </Button>
      <a href='/login' className="py-1 font-light flex justify-center pt-5 text-center underline cursor-pointer text-sm">Back to Login</a>
    </Card>
  )
}

export default EmailSent