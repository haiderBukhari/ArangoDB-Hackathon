import { Card, CardContent } from "@/components/ui/card";

export default function IntegryAI() {
    return (
        <div id="feature" className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-20">
                    <div className="text-sm text-gray-600 mb-4">Graph Powered AI Agents</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
                        Enhance your research with AI Drug Discovery Agent with Advanced Integrations
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
                        Seamlessly Connect Biomedical Data Sources</p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* AI-Powered Integrations Card */}
                    <Card className="p-8 text-center border-2">
                        <CardContent className="p-0">
                            <div className="text-4xl font-bold mb-4">AI-Powered Drug Discovery</div>
                            <h3 className="font-semibold mb-3 text-lg">Automate Research</h3>
                            <p className="text-gray-600">
                                Enable AI agent to access biomedical databases, analyze drug interactions, and execute real-time queries, streamlining research and accelerating insights.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Real-Time Query Resolution Card */}
                    <Card className="p-8 text-center border-2">
                        <CardContent className="p-0">
                            <div className="text-4xl font-bold mb-4">Instant Insights</div>
                            <h3 className="font-semibold mb-3 text-lg">Execute Complex Queries in Real Time</h3>
                            <p className="text-gray-600 mb-4">
                                With our platform, AI agent can dynamically fetch biomedical data, analyze drug-protein interactions, and provide actionable insights—all in real time
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
