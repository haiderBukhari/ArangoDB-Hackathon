import React from 'react'
import { Radar } from '../ui/Radar'
import { IconContainer } from '../ui/IconContainer'
import { HiDocumentReport } from 'react-icons/hi'
import { HiPuzzlePiece } from "react-icons/hi2";
import { BookOpen, Brain, Calculator, ChartBar, Network } from 'lucide-react'

const RadarPreview = () => {
    return (
        <div className="relative flex h-96 w-full flex-col items-center justify-center space-y-4 overflow-hidden px-4 bg-white">
            <div className='relative flex h-96 md:w-[90%] flex-col items-center justify-center space-y-4 overflow-hidden px-4 bg-[#F8F8F9] rounded-3xl'>
                <div className="mx-auto w-full max-w-3xl ">
                    <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                        <IconContainer text="Automated Task Management" delay={0.2} icon={<Calculator className="h-8 w-8 text-teal-500" />} />
                        <IconContainer
                            delay={0.4}
                            text="Interactive Task Setup"
                            icon={<BookOpen className="h-8 w-8 text-indigo-500" />}
                        />
                        <IconContainer
                            text="AI-Powered Problem Solving"
                            delay={0.3}
                            icon={<Brain className="h-8 w-8 text-purple-600" />}
                        />
                    </div>
                </div>
                <div className="mx-auto w-full max-w-md">
                    <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                        <IconContainer
                            text="Real-Time Task Monitoring"
                            delay={0.5}
                            icon={<ChartBar className="h-8 w-8 text-blue-500" />}
                        />
                        <IconContainer
                            text="Adaptive Learning Paths"
                            icon={<HiPuzzlePiece className="h-8 w-8 text-yellow-500" />}
                            delay={0.8}
                        />
                    </div>
                </div>
                <div className="mx-auto w-full max-w-3xl">
                    <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                        <IconContainer
                            delay={0.6}
                            text="Seamless Collaboration"
                            icon={<Network className="h-8 w-8 text-green-500" />}
                        />
                        <IconContainer
                            delay={0.7}
                            text="Automating Task"
                            icon={<HiDocumentReport className="h-8 w-8 text-orange-500" />}
                        />
                    </div>
                </div>

                <Radar className="absolute -bottom-12" />
                <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>
        </div>
    );
};

export default RadarPreview;