import { Card, CardContent } from "@/components/ui/card";

export default function IntegryAI() {
    return (
        <div id="feature" className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-20">
                    <div className="text-sm text-gray-600 mb-4">Integry-Powered AI Agents</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
                        Enhance Your LangChain Agent with Seamless Integrations
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
                        Connect your LangChain agent with 300+ apps effortlessly using Integry. Enable real-time data fetching, API execution, and AI-driven automation—all with minimal coding effort.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* AI-Powered Integrations Card */}
                    <Card className="p-8 text-center border-2">
                        <CardContent className="p-0">
                            <div className="text-4xl font-bold mb-4">AI Integrations</div>
                            <h3 className="font-semibold mb-3 text-lg">Automate Workflows</h3>
                            <p className="text-gray-600">
                                Enable your AI agent to connect with apps, fetch live data, and execute API calls dynamically, reducing manual work and enhancing response accuracy.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Real-Time Query Resolution Card */}
                    <Card className="p-8 text-center border-2">
                        <CardContent className="p-0">
                            <div className="text-4xl font-bold mb-4">Instant Actions</div>
                            <h3 className="font-semibold mb-3 text-lg">Execute Functions in Real Time</h3>
                            <p className="text-gray-600 mb-4">
                                With Integry, your LangChain agent can seamlessly interact with external APIs, execute app functions, and provide real-time solutions to user queries.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
