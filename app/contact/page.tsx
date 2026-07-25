import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Marjaan Collection. Reach out for support regarding our premium footwear and organic self-care products. We are here to help.",
};

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen pb-24">
            <div className="pt-32 pb-20 border-b border-border/50">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
                    <h1 className="text-foreground mb-6">Contact Us</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Have a question about your order or want to learn more about our footwear? We&apos;d love to hear from you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                            <p className="text-muted-foreground mb-8">
                                Whether you&apos;re looking to order shoes online, inquire about wholesale, or just want to say hello, our team is ready to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Location</h3>
                                    <p className="text-muted-foreground">Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Phone / WhatsApp</h3>
                                    <p className="text-muted-foreground">
                                        <a href="tel:+12345678900" className="hover:text-primary">+1 234 567 8900</a>
                                        <br />
                                        <a href="tel:+12345678900" className="hover:text-primary">+1 234 567 8900</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                                    <p className="text-muted-foreground">hello@marjaancollection.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Business Hours</h3>
                                    <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.007L.18 24l6.115-1.603c1.761 1.002 3.766 1.531 5.827 1.531 6.645 0 12.03-5.384 12.03-12.03C24.152 5.385 18.767 0 12.031 0zm0 22.02c-1.802 0-3.568-.485-5.114-1.402l-.367-.217-4.542 1.191 1.214-4.428-.238-.38a10.057 10.057 0 0 1-1.543-5.37C1.44 5.922 6.516.848 12.03.848c5.513 0 10.59 5.074 10.59 10.567 0 5.492-5.077 10.605-10.59 10.605zm5.826-7.585c-.32-.16-1.892-.936-2.185-1.043-.292-.107-.506-.16-.72.16-.213.32-.826 1.042-1.013 1.256-.186.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.583-.948-.844-1.588-1.888-1.774-2.208-.187-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.622-.524-.537-.72-.546-.187-.01-.4-.01-.614-.01-.213 0-.56.08-.853.4s-1.12 1.093-1.12 2.666 1.147 3.093 1.306 3.306c.16.213 2.254 3.44 5.467 4.827.765.33 1.36.528 1.825.676.768.244 1.468.21 2.016.127.614-.093 1.892-.773 2.158-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Chat With Us</h2>
                        <p className="text-muted-foreground mb-8">
                            We handle all our customer support and inquiries directly through WhatsApp for faster, personalized service.
                        </p>
                        <a href="https://wa.me/12345678900" target="_blank" rel="noreferrer" className="w-full">
                            <Button size="lg" className="w-full rounded-full h-14 text-lg bg-green-500 hover:bg-green-600 text-white border-0">
                                Send WhatsApp Message
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
