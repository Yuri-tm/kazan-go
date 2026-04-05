import { useState } from "react";
import { Send } from "lucide-react";
import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import servicesImg from "@/assets/services.jpeg";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Заполните обязательные поля", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      if (!projectId || !anonKey) {
        throw new Error("Supabase not configured");
      }
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/send-telegram`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
          body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Ошибка отправки");
      }
      toast({ title: "Сообщение отправлено! Мы свяжемся с вами." });
      setName("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      toast({ title: err.message || "Ошибка отправки", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full snap-start overflow-hidden">
      <KenBurnsBackground image={servicesImg} effect="zoom-out" overlay="bg-gradient-to-b from-black/50 to-black/80">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-lg mb-10">
              Айда в Казань?
            </h2>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="glass w-full max-w-md p-8 space-y-5">
            <ScrollReveal animation="slide-in-left" delay={100}>
              <input
                type="text"
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kazan-gold/50 focus:border-kazan-gold/50 transition-all"
              />
            </ScrollReveal>

            <ScrollReveal animation="slide-in-right" delay={200}>
              <input
                type="tel"
                placeholder="Телефон *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kazan-gold/50 focus:border-kazan-gold/50 transition-all"
              />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <textarea
                placeholder="Расскажите о ваших планах..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-kazan-gold/50 focus:border-kazan-gold/50 transition-all resize-none"
              />
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-3 bg-kazan-gold text-accent-foreground font-semibold py-4 rounded-xl text-lg animate-pulse-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:animate-none"
              >
                <Send className="w-5 h-5" />
                {sending ? "Отправка..." : "Отправить в Telegram"}
              </button>
            </ScrollReveal>
          </form>
        </div>
      </KenBurnsBackground>
    </section>
  );
};

export default ContactSection;
