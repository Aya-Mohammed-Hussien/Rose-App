import React from 'react';
import { Heart, Package, Clock, Users, Award, Leaf, Sparkles, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-10 sm:gap-14 lg:gap-24 py-8 sm:py-10 lg:py-16 bg-[#FFFCFC]">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl mx-auto w-full">

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBF1] border border-[#FFD3E0]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF668B]" />
              <span className="text-[#FF668B] font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em]">
                About Rose
              </span>
            </div>

            <h1 className="text-[#741C21] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
              Thoughtful gifts <br className="hidden sm:block" />
              <span className="text-[#FF668B]"> & flowers</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              Rose helps you send something that feels personal, modern, and unforgettable — designed to celebrate every moment.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products">
                <Button className="bg-[#A6252A] hover:bg-[#8A1F23] text-white rounded-xl px-8 py-6 text-base shadow-lg shadow-[#A6252A]/20 transition-all hover:scale-105">
                  Shop Collections
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-[#A6252A] text-[#A6252A] hover:bg-[#FFEBF1] rounded-xl px-8 py-6 text-base transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Visual */}
          <div className="hidden lg:block relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FFEBF1] to-transparent rounded-[3rem] blur-2xl opacity-75" />
            <div className="relative h-[400px] rounded-[2.5rem] bg-white border border-[#FFD3E0] shadow-xl overflow-hidden flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-[#FFEBF1] p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-12 h-12 text-[#FF668B]" fill="#FF668B" fillOpacity="0.1" />
              </div>
              <h3 className="text-[#741C21] font-bold text-3xl mb-2 italic">Modern Experience</h3>
              <p className="text-zinc-400 font-medium tracking-widest uppercase text-xs">Premium Gifting Service</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {[
            { label: 'Happy Customers', value: '10K+' },
            { label: 'Cities Covered', value: '50+' },
            { label: 'Products', value: '500+' },
            { label: 'Satisfaction Rate', value: '98%' }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-[#FFD3E0] text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-black text-[#A6252A]">{stat.value}</div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-tighter mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-[#741C21] text-3xl font-bold border-l-4 border-[#FF668B] pl-6">Our Story</h2>
            <div className="space-y-4 text-zinc-600 leading-loose">
              <p>What started as a small local flower studio has grown into a full gifting experience. We saw how hard it could be to find something that feels personal, modern, and reliable.</p>
              <p>We built a platform that makes sending the perfect gift simple, fast, and joyful—ensuring everything you send looks special from the moment it arrives.</p>
            </div>
          </div>
          <div className="bg-[#A6252A] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={240} />
            </div>
            <h3 className="text-2xl font-bold mb-8 relative z-10">What we care about</h3>
            <ul className="space-y-6 relative z-10">
              {[
                { icon: Heart, text: 'Thoughtful design for unique moments' },
                { icon: Package, text: 'Reliable delivery with careful handling' },
                { icon: Award, text: 'Delight in every handwritten detail' },
                { icon: Leaf, text: 'Sustainable practices & local flowers' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center">
                  <div className="bg-white/20 p-2 rounded-lg"><item.icon className="w-5 h-5" /></div>
                  <span className="font-medium text-rose-50">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section - Centered for 2 members */}
        <section className="mt-32 text-center">
          <h2 className="text-[#741C21] text-3xl font-bold mb-16">Meet our founders</h2>
          <div className="flex flex-wrap justify-center gap-16 lg:gap-28">
            {[
              { name: 'Ahmed Emad', role: 'Founder & CEO', image: '/assets/images/file.jpg' },
              { name: 'Motaz', role: 'Head of Design', image: '/assets/images/2.jpg' },
            ].map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative w-44 h-44 mx-auto mb-6 rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-white group-hover:ring-[#FFEBF1] transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-bold text-xl text-[#741C21]">{member.name}</h3>
                <p className="text-[#FF668B] font-bold text-xs uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 rounded-[3rem] bg-gradient-to-br from-[#741C21] to-[#A6252A] p-10 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-white text-3xl sm:text-5xl font-bold">Let&apos;s celebrate something today</h2>
            <p className="text-rose-100/80 max-w-xl mx-auto text-lg leading-relaxed">
              Whether it&apos;s a surprise or a planned gift, we make every delivery feel like a personal hug.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-white text-[#A6252A] hover:bg-rose-50 rounded-xl px-10 py-7 text-lg font-bold shadow-xl">
                  Browse Collections <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}