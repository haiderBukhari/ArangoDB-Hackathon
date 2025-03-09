import { Navigation } from '@/components/dashboard/navigation';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const IntegryConfigInfo = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <Navigation />
            <main className="flex-1 p-4 space-y-6 flex justify-center items-center">
                <Card className="w-full max-w-4xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-gray-700 flex items-center justify-center gap-3">
                            Integry API Configuration
                        </CardTitle>
                        <div className="flex items-center justify-center gap-2 mt-4 text-blue-600">
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-sm">
                                Please sign up at integry.io if you are not signed up
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-lg text-center text-black">
                            To interact with the Integry API, you will need the following details:
                        </p>

                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">User ID</h2>
                            <p className="text-black mb-3">
                                User Id is how you define users in your app or agent. By default, your email used during your Integry signup can act as a user_id as well. Function Calls and Integrations are linked to this id.</p>
                            <pre className="bg-gray-700 p-3 rounded-md text-green-400 overflow-x-auto">
                                user_id = `joe@example.com`
                            </pre>
                            <p className="text-black mt-3">
                                This value will be used to authenticate and associate your requests with a specific user.
                            </p>
                        </section>

                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">App Key and App Secret</h2>
                            <p className="text-black mb-3">
                                The App Key and App Secret are unique credentials provided by Integry to your application.
                                These keys are used for identifying your app and ensuring secure communication with the API.
                            </p>
                            <p className="text-black">
                                You can view and copy your App Key and App Secret from the{' '}
                                <a
                                    href="https://app.integry.io/platform/workspace/security/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Workspace Settings
                                </a>{' '}
                                in your Integry account.
                            </p>
                        </section>

                        <div className="flex justify-center">
                            <Image
                                src='/image.avif'
                                width={800}
                                height={800}
                                alt='Integry Configuration'
                                className="rounded-lg shadow-lg my-4"
                            />
                        </div>

                        <section className="bg-gray-300 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-black mb-4">Where to Find Your Credentials</h3>
                            <ul className="list-disc pl-6 text-black space-y-2">
                                <li>User ID: Typically your email address used for signing up on Integry.</li>
                                <li>
                                    App Key & App Secret: These can be found in the{' '}
                                    <a
                                        href="https://app.integry.io/platform/workspace/security/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Integry Workspace Settings
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default IntegryConfigInfo;