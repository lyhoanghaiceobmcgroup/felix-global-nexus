import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số").regex(/^[0-9+\-\s()]+$/, "Số điện thoại chỉ được chứa số và ký tự đặc biệt"),
  company: z.string().min(2, "Công ty/Ngành nghề phải có ít nhất 2 ký tự"),
});

const Register = () => {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  // Detect browser language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      setLanguage('vi');
    } else {
      setLanguage('en');
    }
  }, []);

  const content = {
    vi: {
      title: "Đăng Ký Tham Gia",
      subtitle: "Điền thông tin để đăng ký tham gia các hoạt động của FELIX Chapter",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      company: "Công ty hoặc Ngành nghề",
      submit: "Đăng ký",
      back: "Quay lại",
      success: "Đăng ký thành công!",
      successDesc: "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
    },
    en: {
      title: "Registration",
      subtitle: "Fill in the information to register for FELIX Chapter activities",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      company: "Company or Industry",
      submit: "Register",
      back: "Go Back",
      success: "Registration Successful!",
      successDesc: "We will contact you as soon as possible."
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Registration data:', values);
      
      // Here you can add API call to save registration data
      // await saveRegistration(values);
      
      toast({
        title: content[language].success,
        description: content[language].successDesc,
      });
      
      form.reset();
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Lỗi đăng ký",
        description: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
        variant: "destructive"
      });
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D71920] via-[#8B0000] to-[#2E2E2E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {language === 'vi' ? '🇺🇸 English' : '🇻🇳 Tiếng Việt'}
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-[#D71920]/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-[#D71920] rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#D71920]">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.name}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'vi' ? "Nhập họ và tên" : "Enter full name"} 
                            {...field} 
                            className="focus:border-[#D71920] focus:ring-[#D71920]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.email}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder={language === 'vi' ? "Nhập email" : "Enter email"} 
                            {...field} 
                            className="focus:border-[#D71920] focus:ring-[#D71920]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.phone}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'vi' ? "Nhập số điện thoại" : "Enter phone number"} 
                            {...field} 
                            className="focus:border-[#D71920] focus:ring-[#D71920]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.company}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'vi' ? "Nhập công ty hoặc ngành nghề" : "Enter company or industry"} 
                            {...field} 
                            className="focus:border-[#D71920] focus:ring-[#D71920]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
                  >
                    {t.submit}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;