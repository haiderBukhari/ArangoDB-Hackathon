import Image from "next/image"
import Link from "next/link"
import logo from '@/assets/math-tutor-logo.png'

function Design() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="HorizonUI"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="font-semibold text-xl">MATH TUTOR</span>
            </div>
            <p className="text-muted-foreground md:max-w-[400px]">
                Start your math learning journey in no time with our all-in-one personalized Math Tutor platform. Start mastering math today!
            </p>
          </div>
        </div>

        {/* Resources Column */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Resources</h3>
          <ul className="space-y-3">
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Analysis</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Efficieny</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Get Started</Link></li>
          </ul>
        </div>

        {/* Social Media Column */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Social Media</h3>
          <ul className="space-y-3">
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Github</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Twitter</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Instagram</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Facebook</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  )
}


const Footer = () => {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-white">
            <Design/>
            <div className="container-wrapper">
                <div className="container py-4">
                    <div className="text-balance text-center flex justify-center text-sm leading-loose text-muted-foreground md:text-left">
                        All Right Reserved by MATH TUTOR
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer