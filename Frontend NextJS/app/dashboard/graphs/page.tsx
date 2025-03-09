
'use client'

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
                            ArangoDB Graph Visualization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">ArangoDB drug_discovery Graph with 250 Limit</h2>
                            <div className="flex justify-center">
                                <Image
                                    src='/arangodbgraph.png'
                                    width={800}
                                    height={800}
                                    alt='Integry Configuration'
                                    className="rounded-lg shadow-lg my-4"
                                />
                            </div>
                        </section>
                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">ArangoDB drug_discovery Graph with 1250 Limit</h2>
                            <div className="flex justify-center">
                                <Image
                                    src='/arangodbgraph1.png'
                                    width={800}
                                    height={800}
                                    alt='Integry Configuration'
                                    className="rounded-lg shadow-lg my-4"
                                />
                            </div>
                        </section>
                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">Graph Visualization using Networkx Spring Layout</h2>

                            <div className="flex justify-center">
                                <Image
                                    src='/arangodbgraph2.png'
                                    width={800}
                                    height={800}
                                    alt='Integry Configuration'
                                    className="rounded-lg shadow-lg my-4"
                                />
                            </div>
                        </section>

                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">Graph Visualization using Spring Layout</h2>
                            <div className="flex justify-center">
                                <Image
                                    src='/arangodbgraph3.png'
                                    width={800}
                                    height={800}
                                    alt='Integry Configuration'
                                    className="rounded-lg shadow-lg my-4"
                                />
                            </div>
                        </section>

                        <section className="bg-gray-200 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">Graph Visualization using RAPIDS cuGraph - ForceAtlas2</h2>
                            <div className="flex justify-center">
                                <Image
                                    src='/arangodbgraph4.png'
                                    width={800}
                                    height={800}
                                    alt='Integry Configuration'
                                    className="rounded-lg shadow-lg my-4"
                                />
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default IntegryConfigInfo;