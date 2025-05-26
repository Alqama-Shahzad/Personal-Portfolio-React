import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const { isVisible, ref } = useIntersectionObserver({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate field on change if it's been touched
    if (touched[name as keyof FormData]) {
      validateField(name as keyof FormData, value);
    }
  }, [touched]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData]);
  }, [formData]);

  const validateField = useCallback((name: keyof FormData, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email address";
        }
        break;
      
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    return isValid;
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xqaerorq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
        setTouched({
          name: false,
          email: false,
          message: false,
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/30"
      aria-label="Contact Section"
    >
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20" aria-hidden="true">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Contact Information */}
          <div
            className={cn(
              "opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
              isVisible && "opacity-100 translate-y-0"
            )}
          >
            <span className="inline-block py-1 px-3 text-sm bg-primary/10 text-primary rounded-full mb-5 font-medium">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Whether you have a project in mind, a question, or just want to connect, 
              feel free to reach out. I'm always open to discussing new opportunities 
              and ideas.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  aria-hidden="true"
                >
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Email</h3>
                  <a
                    href="mailto:Alqamarex@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Send email to Alqamarex@gmail.com"
                  >
                    Alqamarex@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  aria-hidden="true"
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Phone</h3>
                  <a
                    href="tel:+923104790435"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Call +92 3104790435"
                  >
                    +92 3104790435
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  aria-hidden="true"
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-lg">Location</h3>
                  <p className="text-muted-foreground">Defence Phase view 1, Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-medium mb-4 text-lg">Connect with me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Alqama-Shahzad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground text-foreground/80 transition-all duration-300"
                  aria-label="Visit my GitHub profile"
                >
                  <Github size={22} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alqama-shahzad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground text-foreground/80 transition-all duration-300"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin size={22} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "opacity-0 transform translate-y-10 transition-all duration-700 delay-300 ease-out",
              isVisible && "opacity-100 translate-y-0"
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
              aria-label="Contact form"
              noValidate
            >
              <h3 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Send me a message
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full bg-white/5 border-white/10 focus:border-primary transition-all duration-300",
                      errors.name && touched.name && "border-destructive"
                    )}
                    aria-invalid={!!(errors.name && touched.name)}
                    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-1 text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full bg-white/5 border-white/10 focus:border-primary transition-all duration-300",
                      errors.email && touched.email && "border-destructive"
                    )}
                    aria-invalid={!!(errors.email && touched.email)}
                    aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full bg-white/5 border-white/10 focus:border-primary transition-all duration-300 min-h-[120px]",
                      errors.message && touched.message && "border-destructive"
                    )}
                    aria-invalid={!!(errors.message && touched.message)}
                    aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="mt-1 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
