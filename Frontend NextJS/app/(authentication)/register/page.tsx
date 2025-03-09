"use client"

import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import logo from '@/assets/math-tutor-logo.png'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import axios from 'axios'
import EmailSent from "@/components/ui/emailSent"
import { errorToast } from "@/helpers/toasts"

const authSchema = z.object({
    email: z.string({
        message: "Email Address is Required.",
    }).email({
        message: "Please enter a valid email address.",
    }),
})

const nameSchema = z.object({
    firstName: z.string({
        message: "First Name is Required.",
    }).min(2, "First Name must be at least 2 characters long."),
    lastName: z.string({
        message: "Last Name is Required.",
    }).min(2, "Last Name must be at least 2 characters long."),
    password: z.string({
        message: "Password is Required.",
    }).min(6, "Password must be at least 6 characters long."),
})

export default function SignUpPage() {
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)

    const formEmail = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
        },
    })

    const formDetails = useForm<z.infer<typeof nameSchema>>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
        },
    })

    const handleEmailSubmit = async (values: z.infer<typeof authSchema>) => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/api/users/authenticate?email=${values.email}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setIsEmailVerified(true)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            errorToast(err.response.data.error)
        })
    }

    const handleDetailsSubmit = (values: z.infer<typeof nameSchema>) => {
        setLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/api/users/authenticate`, {
            email: formEmail.getValues("email"),
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setLoading(false);
            setIsEmailSent(true)
        }).catch(err => {
            setLoading(false);
            errorToast(err.response.data.error)
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] space-y-8"
            >
                <div className="flex items-center">
                    <Image
                        src={logo}
                        alt="Math Tutor Logo"
                        width={350}
                        height={100}
                        className="h-14 w-auto"
                    />
                    <h1 className="text-2xl ml-3 font-semibold font-mono">MathTutor.ai</h1>
                </div>

                {
                    !isEmailSent && <Card className="bg-white">
                        <CardContent className="pt-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h1 className="text-2xl font-semibold text-center">
                                    Create your Math Tutor Account
                                </h1>

                                {!isEmailVerified ?(
                                    <form
                                        onSubmit={formEmail.handleSubmit(handleEmailSubmit)}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <Input
                                                {...formEmail.register("email")}
                                                placeholder="Enter your email address..."
                                                className="w-full"
                                            />
                                            {formEmail.formState.errors.email && (
                                                <p className="text-sm text-red-500">
                                                    {formEmail.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full py-5 bg-[#1a1d21] hover:bg-[#2c2f33]"
                                        >
                                            {!loading ? "Continue with email →" : "Signing Up..."}
                                        </Button>


                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <Separator />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-background px-2 text-muted-foreground">
                                                    OR
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full py-5"
                                            onClick={() => console.log("Google sign up")}
                                        >
                                            <svg
                                                className="mr-2 h-4 w-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    fill="#EA4335"
                                                />
                                            </svg>
                                            Sign up with Google
                                        </Button>

                                        <p className="text-center text-sm text-muted-foreground">
                                            By signing up, you agree to the{" "}
                                            <Link href="#" className="underline hover:text-primary">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="#" className="underline hover:text-primary">
                                                Privacy Policy
                                            </Link>
                                        </p>

                                        <p className="text-center text-sm text-muted-foreground mb-10">
                                            <span className="font-semibold pr-1">Already have an account?</span>
                                            <Link href="/login" className="underline font-semibold">
                                                Sign in
                                            </Link>
                                        </p>
                                    </form>
                                ) : (
                                    <form
                                        onSubmit={formDetails.handleSubmit(handleDetailsSubmit)}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <Input
                                                {...formDetails.register("firstName")}
                                                placeholder="Enter your First Name"
                                                className="w-full"
                                            />
                                            {formDetails.formState.errors.firstName && (
                                                <p className="text-sm text-red-500">
                                                    {formDetails.formState.errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <Input
                                                {...formDetails.register("lastName")}
                                                placeholder="Enter your Last Name"
                                                className="w-full"
                                            />
                                            {formDetails.formState.errors.lastName && (
                                                <p className="text-sm text-red-500">
                                                    {formDetails.formState.errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Password</label>
                                            <Input
                                                {...formDetails.register("password")}
                                                placeholder="Enter your Password"
                                                className="w-full"
                                            />
                                            {formDetails.formState.errors.password && (
                                                <p className="text-sm text-red-500">
                                                    {formDetails.formState.errors.password.message}
                                                </p>
                                            )}
                                            <p className="font-light text-xs text-gray-600 pr-3">Your password must contain at least 6 characters.</p>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full py-5 bg-[#1a1d21] hover:bg-[#2c2f33]"
                                        >
                                            {!loading ? "Complete Signup →" : "Signing Up..."}
                                        </Button>
                                        <p onClick={() => {
                                            setIsEmailVerified(false);
                                        }} className="py-1 font-light text-center underline cursor-pointer">Back</p>
                                    </form>
                                )}

                            </motion.div>
                        </CardContent>
                    </Card>
                }


                {isEmailSent && <EmailSent email={formEmail.getValues('email')} />}

            </motion.div>
        </div>
    )
}
