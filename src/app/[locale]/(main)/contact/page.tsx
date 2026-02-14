import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFCFC] py-12 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-16 text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBF1] border border-[#FFD3E0]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF668B]" />
            <span className="text-[#FF668B] font-bold uppercase text-[10px] tracking-[0.2em]">
              Contact Rose
            </span>
          </div>
          <h1 className="text-[#741C21] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            We&apos;re here to <span className="text-[#FF668B]">help</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl">
            Whether it&apos;s a question about an order, a custom floral request, or just to say hi, we&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Form */}
          <section className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FFD3E0]/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <MessageSquare size={200} className="text-[#A6252A]" />
            </div>

            <h2 className="text-2xl font-bold text-[#741C21] mb-8 flex items-center gap-3">
              Send us a message
            </h2>

            <form className="space-y-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#741C21]/80 ml-1">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FF668B]/20 focus:border-[#FF668B]"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#741C21]/80 ml-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FF668B]/20 focus:border-[#FF668B]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#741C21]/80 ml-1">Subject</label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FF668B]/20 focus:border-[#FF668B]"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#741C21]/80 ml-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FF668B]/20 focus:border-[#FF668B] resize-none"
                  placeholder="Tell us more about your request..."
                />
              </div>

              <Button className="w-full sm:w-auto bg-[#A6252A] hover:bg-[#8A1F23] text-white rounded-xl px-10 py-7 text-base font-bold shadow-lg shadow-[#A6252A]/20 transition-all hover:scale-[1.02] flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </section>

          {/* Right Column: Info & Cards */}
          <aside className="lg:col-span-5 space-y-8">

            {/* Quick Contact Cards */}
            <div className="grid gap-4">
              {[
                { icon: Mail, title: 'Email Us', value: 'support@rose.com', color: '#FF668B' },
                { icon: Phone, title: 'Call Us', value: '+20 100 000 0000', color: '#A6252A' },
                { icon: MapPin, title: 'Visit Us', value: 'Cairo, Egypt - Same day delivery', color: '#741C21' }
              ].map((item, idx) => (
                <div key={idx} className="group flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-[#FFD3E0]/30 shadow-sm hover:shadow-md transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFEBF1] flex items-center justify-center transition-transform group-hover:rotate-12">
                    <item.icon className="w-6 h-6 text-[#A6252A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#741C21] text-base">{item.title}</h3>
                    <p className="text-zinc-500 text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Occasions Card */}
            <div className="rounded-[2.5rem] bg-gradient-to-br from-[#741C21] to-[#A6252A] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />

              <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-2">
                Special Occasions
              </h3>
              <p className="text-rose-100/80 leading-relaxed mb-6 relative z-10">
                Planning a wedding or a corporate event? Our team specializes in custom floral installations and luxury bulk gifting.
              </p>

              <ul className="space-y-3 relative z-10 mb-8">
                {['Custom floral installations', 'Branded corporate gifting', 'Event styling & decor'].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-rose-50 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF668B]" />
                    {li}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full border-white/20 bg-white/10 hover:bg-white hover:text-[#741C21] text-white rounded-xl py-6 transition-all border-2">
                Learn More
              </Button>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}