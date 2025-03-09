'use client'
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import { successToast } from "@/helpers/toasts"
import { Navigation } from "@/components/dashboard/navigation"

// Validation schema for the form
const authSchema = z.object({
  userId: z.string({
    message: "User ID is Required.",
  }).email({
    message: "Please enter a valid email address.",
  }),
  apiKey: z.string({
    message: "API Key is Required.",
  }),
  appKey: z.string({
    message: "App Key is Required.",
  }),
})


export default function Page() {
  useEffect(() => {
    const data = localStorage.getItem('integry-api')
    if (data) {
      const parsedData = JSON.parse(data)
      formEmail.setValue("userId", parsedData.userId)
      formEmail.setValue("apiKey", parsedData.apiKey)
      formEmail.setValue("appKey", parsedData.appKey)
    }
  }, [])

  // Set up the form with react-hook-form and use the stored credentials if available
  const formEmail = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      userId: "", // Empty initially, will be updated after stored data is available
      apiKey: "",  // Empty initially, will be updated after stored data is available
      appKey: "",  // Empty initially, will be updated after stored data is available
    },
  })

  // Handle form submission
  const handleDataSubmit = async (values: z.infer<typeof authSchema>) => {
    // Get the existing credentials from localStorage
    const storedCredentials = localStorage.getItem('integry-api')
      ? JSON.parse(localStorage.getItem('integry-api')!)
      : {}

    // Merge the new data with the existing credentials
    const updatedCredentials = {
      userId: values.userId || storedCredentials.userId,
      apiKey: values.apiKey || storedCredentials.apiKey,
      appKey: values.appKey || storedCredentials.appKey,
      promptscount: 0,
      messages: [],
    }

    localStorage.setItem('integry-api', JSON.stringify(updatedCredentials))

    const isCredentialExists = storedCredentials.userId ? true : false
    successToast(isCredentialExists ? 'Credentials Updated Successfully' : 'Credentials Created Successfully')
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[screen]">
      <Navigation />
      <main className="flex-1 p-4">

        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[400px] space-y-8"
          >

            <Card className="bg-white">
              <CardContent className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <h1 className="text-2xl font-semibold text-center">
                    Authenticate Integry Langchain BOT
                  </h1>

                  <form
                    onSubmit={formEmail.handleSubmit(handleDataSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">User ID</label>
                      <Input
                        {...formEmail.register("userId")}
                        placeholder="Enter your Integry User ID..."
                        className="w-full"
                      />
                      {formEmail.formState.errors.userId && (
                        <p className="text-sm text-red-500">
                          {formEmail.formState.errors.userId.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Key</label>
                      <Input
                        {...formEmail.register("apiKey")}
                        placeholder="Enter your Integry Platform API Key..."
                        className="w-full"
                      />
                      {formEmail.formState.errors.apiKey && (
                        <p className="text-sm text-red-500">
                          {formEmail.formState.errors.apiKey.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">APP Key</label>
                      <Input
                        {...formEmail.register("appKey")}
                        placeholder="Enter your Integry Platform APP Key..."
                        className="w-full"
                      />
                      {formEmail.formState.errors.appKey && (
                        <p className="text-sm text-red-500">
                          {formEmail.formState.errors.appKey.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full py-5 bg-[#1a1d21] hover:bg-[#2c2f33]"
                    >
                      {"Authenticate →"}
                    </Button>

                  </form>

                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
